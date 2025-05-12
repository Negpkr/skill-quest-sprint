
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { findSprintIdBySlug, parseResources } from "@/utils/sprintUtils";
import { useFallbackData } from "@/hooks/useFallbackData";
import { Challenge, Sprint, UseChallengeReturn } from "@/types/sprint";

export const useChallenge = (id: string | undefined): UseChallengeReturn => {
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { user } = useAuth();

  // Get the fallback data function
  const useFallbackSprint = useFallbackData(id, setSprint, setChallenges, setNotFound);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    const fetchChallengeData = async () => {
      try {
        // Process the ID to handle both string IDs and UUIDs
        const processedId = findSprintIdBySlug(id);
        console.log("Processing ID:", id, "to:", processedId);
        
        if (!processedId) {
          console.error("Invalid ID and no mapping found:", id);
          setNotFound(true);
          setIsLoading(false);
          return;
        }
        
        // First, try to fetch from Supabase
        try {
          console.log("Fetching sprint with ID:", processedId);
          
          // Fetch sprint details
          const { data: sprintData, error: sprintError } = await supabase
            .from('sprints')
            .select('*')
            .eq('id', processedId)
            .single();
          
          if (sprintError) {
            console.error("Sprint error from Supabase:", sprintError);
            throw sprintError;
          }
          
          if (sprintData) {
            console.log("Successfully fetched sprint data:", sprintData);
            setSprint(sprintData);
            
            // Fetch all challenges for this sprint
            const { data: challengeData, error: challengeError } = await supabase
              .from('challenges')
              .select('*')
              .eq('sprint_id', processedId)
              .order('day', { ascending: true });
            
            if (challengeError) {
              console.error("Challenge error from Supabase:", challengeError);
              throw challengeError;
            }
            
            if (challengeData && challengeData.length > 0) {
              console.log("Successfully fetched challenge data:", challengeData);
              setChallenges(challengeData);
            } else {
              console.log("No challenges found for this sprint, using fallback data");
              // If no challenges found, try to use mock data
              useFallbackSprint();
            }
            
            // Fetch user progress if user is logged in
            await fetchUserProgress(processedId, sprintData?.duration);
          } else {
            console.log("No sprint data found in Supabase, using fallback data");
            useFallbackSprint();
          }
        } catch (supabaseErr) {
          console.error("Supabase error:", supabaseErr);
          console.log("Falling back to static data");
          useFallbackSprint();
        }
      } catch (error) {
        console.error("Error in fetchChallengeData:", error);
        useFallbackSprint();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallengeData();
  }, [id, user]);

  const fetchUserProgress = async (sprintId: string, duration: number = 30) => {
    if (!user) return;
    
    try {
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', sprintId)
        .eq('user_id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors
      
      if (progressError && progressError.code !== 'PGSQL_NO_ROWS_RETURNED') {
        console.error("Progress error from Supabase:", progressError);
      }
      
      // Calculate current day if progress data exists
      if (progressData) {
        const startDate = new Date(progressData.start_date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setCurrentDay(Math.min(diffDays, duration || 30));
        
        // Check if today's task is already completed
        if (progressData.completed_date) {
          const lastCompleted = new Date(progressData.completed_date);
          if (lastCompleted.toDateString() === currentDate.toDateString()) {
            setTaskCompleted(true);
          }
        }
      }
    } catch (progressErr) {
      console.error("Error fetching progress:", progressErr);
      // Continue execution even if progress fetch fails
    }
  };

  const handleMarkComplete = async () => {
    if (!user || !id) return;
    
    try {
      // Process the ID to handle both string IDs and UUIDs
      const processedId = findSprintIdBySlug(id);
      
      // Check if user progress exists first
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', processedId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGSQL_NO_ROWS_RETURNED') {
        throw checkError;
      }
        
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed_date: new Date().toISOString()
          })
          .eq('sprint_id', processedId)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        // Create new progress record
        const { error } = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            sprint_id: processedId,
            start_date: new Date().toISOString(),
            completed_date: new Date().toISOString(),
            current_day: currentDay
          }]);
          
        if (error) throw error;
      }
      
      // Update streak
      await updateUserStreak();
      
      setTaskCompleted(true);
      
      toast({
        title: "Task completed!",
        description: "Great job! You've completed your task for today.",
      });
    } catch (error) {
      console.error("Error marking task complete:", error);
      toast({
        title: "Error",
        description: "Failed to mark task as complete. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateUserStreak = async () => {
    if (!user) return;
    
    try {
      const { data: streakData, error: streakError } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (streakError && streakError.code !== 'PGSQL_NO_ROWS_RETURNED') throw streakError;
      
      if (streakData) {
        // Update existing streak
        const lastActivity = new Date(streakData.last_activity_date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let newStreak = streakData.current_streak;
        
        // If last activity was yesterday, increment streak
        if (lastActivity.toDateString() === yesterday.toDateString()) {
          newStreak += 1;
        } 
        // If last activity was not today (and not yesterday), reset streak to 1
        else if (lastActivity.toDateString() !== today.toDateString()) {
          newStreak = 1;
        }
        
        const { error: updateError } = await supabase
          .from('streaks')
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, streakData.longest_streak),
            last_activity_date: today.toISOString()
          })
          .eq('user_id', user.id);
          
        if (updateError) throw updateError;
      } else {
        // Create new streak
        const { error: createError } = await supabase
          .from('streaks')
          .insert([{
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: new Date().toISOString()
          }]);
          
        if (createError) throw createError;
      }
    } catch (streakErr) {
      console.error("Error updating streak:", streakErr);
      // Continue execution even if streak update fails
    }
  };
  
  const getCurrentChallenge = () => {
    return challenges.find(challenge => challenge.day === currentDay);
  };

  return {
    sprint,
    challenges,
    currentDay,
    isLoading,
    taskCompleted,
    notFound,
    handleMarkComplete,
    getCurrentChallenge,
    parseResources
  };
};

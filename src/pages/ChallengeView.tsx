
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { challengeData } from "../pages/ChallengeDetail";

// Define a mapping for string IDs to UUIDs for compatibility with mock data
const idToUuidMap: Record<string, string> = {
  'design-starter': 'd0d766ab-5ca8-45c1-b789-500d132c8710',
  'web-dev': '08c8f5db-c37e-417d-a6a4-d10c0bb78e52',
  'freelance-launchpad': '7ead586e-49a1-4ba0-bbeb-97f6cc482170',
  'personal-brand': '7a8d9d12-441d-4fe8-a9ab-3a40ea4fb2d3',
  'productivity': '07d5fc8e-a14c-42ee-b7e9-19fb27eb4b56',
  'freelance-pro': 'd43fed60-f098-42f9-8afc-ba2c19d61b70'
};

interface Challenge {
  id: string;
  title: string;
  description: string;
  day: number;
  resources: string | null;
}

interface Sprint {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
}

const ChallengeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { user } = useAuth();

  // Helper function to find the UUID from the challenge ID mapping
  const findSprintIdBySlug = (slug: string): string | null => {
    // Check if the slug is directly in our mapping
    if (idToUuidMap[slug]) {
      return idToUuidMap[slug];
    }
    return slug; // If not found, return the original slug (it might already be a UUID)
  };
  
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
              useFallbackData();
            }
            
            // Fetch user progress for this sprint if user is logged in
            if (user) {
              try {
                const { data: progressData, error: progressError } = await supabase
                  .from('user_progress')
                  .select('*')
                  .eq('sprint_id', processedId)
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
                  setCurrentDay(Math.min(diffDays, sprintData?.duration || 30));
                  
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
            }
          } else {
            console.log("No sprint data found in Supabase, using fallback data");
            useFallbackData();
          }
        } catch (supabaseErr) {
          console.error("Supabase error:", supabaseErr);
          console.log("Falling back to static data");
          useFallbackData();
        }
      } catch (error) {
        console.error("Error in fetchChallengeData:", error);
        useFallbackData();
      } finally {
        setIsLoading(false);
      }
    };
    
    // Function to use fallback static data when Supabase calls fail
    const useFallbackData = () => {
      console.log("Using fallback data for:", id);
      // Check if we have mock data for this challenge
      if (challengeData && id && challengeData[id]) {
        const mockData = challengeData[id];
        
        setSprint({
          id: id,
          title: mockData.title,
          description: mockData.description,
          category: mockData.category,
          difficulty: mockData.difficulty,
          duration: 30 // Default
        });
        
        // Create mock challenges from the tasks in the mock data
        const mockChallenges = mockData.tasks.map(task => ({
          id: task.id,
          title: task.title,
          description: "Complete this task to continue your progress in this challenge.",
          day: task.day,
          resources: JSON.stringify([
            { title: "Getting Started", url: "https://example.com/resources" }
          ])
        }));
        
        setChallenges(mockChallenges);
        return true;
      }
      
      // If no relevant mock data is found
      setNotFound(true);
      return false;
    };
    
    fetchChallengeData();
  }, [id, user]);

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
  
  const getCurrentChallenge = () => {
    return challenges.find(challenge => challenge.day === currentDay);
  };
  
  const parseResources = (resourcesStr: string | null) => {
    if (!resourcesStr) return [];
    
    try {
      return JSON.parse(resourcesStr);
    } catch (e) {
      console.error("Error parsing resources:", e);
      return [];
    }
  };
  
  // Redirect if not found
  if (notFound && !isLoading) {
    toast({
      title: "Challenge not found",
      description: "We couldn't find the challenge you're looking for.",
      variant: "destructive",
    });
    return <Navigate to="/challenges" replace />;
  }
  
  const currentChallenge = getCurrentChallenge();
  const progressPercent = sprint?.duration ? (currentDay / sprint.duration) * 100 : 0;
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isLoading ? "Loading..." : sprint?.title || "Challenge"}
          </h1>
          <p className="text-muted-foreground">
            Complete daily tasks to master this skill in {sprint?.duration || 30} days
          </p>
          
          <div className="mt-6">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>Day {currentDay} of {sprint?.duration || 30}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Day {currentDay}: {currentChallenge?.title || "Task"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentChallenge ? (
                    <>
                      <p className="text-muted-foreground mb-6">
                        {currentChallenge.description || "Complete this task to continue your progress in the challenge."}
                      </p>
                      <div className="flex items-start space-x-3 mb-6">
                        <Checkbox 
                          id="task-complete" 
                          checked={taskCompleted}
                          disabled={taskCompleted}
                          onCheckedChange={() => !taskCompleted && handleMarkComplete()}
                        />
                        <div>
                          <label
                            htmlFor="task-complete"
                            className={`text-sm font-medium leading-none cursor-pointer ${taskCompleted ? "line-through text-muted-foreground" : ""}`}
                          >
                            Mark as complete
                          </label>
                        </div>
                      </div>
                      <Button 
                        className="w-full sm:w-auto" 
                        disabled={taskCompleted}
                        onClick={handleMarkComplete}
                      >
                        {taskCompleted ? "Completed!" : "Mark as Complete"}
                      </Button>
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      No task found for day {currentDay}. Please contact support if this issue persists.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentChallenge && currentChallenge.resources ? (
                    <div className="space-y-2">
                      <p className="text-muted-foreground mb-2">
                        Additional materials to help you succeed.
                      </p>
                      <ul className="space-y-2">
                        {parseResources(currentChallenge.resources).map((resource: any, index: number) => (
                          <li key={index}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-skillpurple-400 hover:text-skillpurple-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {sprint?.description || "Additional materials to help you succeed."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChallengeView;

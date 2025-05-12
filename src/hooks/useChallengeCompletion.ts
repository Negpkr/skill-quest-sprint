
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { findSprintIdBySlug } from "@/utils/sprintUtils";

export const useChallengeCompletion = (
  id: string | undefined, 
  user: User | null,
  currentDay: number,
  setTaskCompleted: (completed: boolean) => void
) => {
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
  
  return {
    handleMarkComplete
  };
};

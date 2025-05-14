
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { findSprintIdBySlug } from "@/utils/sprintUtils";

export const useChallengeCompletion = (
  id: string | undefined,
  user: User | null,
  currentDay: number,
  setTaskCompleted: (completed: boolean) => void,
  refreshStreak?: () => Promise<void>
) => {
  const handleMarkComplete = async () => {
    if (!user || !id) {
      toast({
        title: "Error",
        description: "You must be logged in to mark tasks as complete.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use the ID directly without processing - it's already a UUID
      const sprintId = id;
      console.log("Using sprint ID:", sprintId);

      if (!sprintId) {
        console.error("Invalid sprint ID:", id);
        toast({
          title: "Error",
          description: "Invalid sprint ID. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Marking task complete for sprint:", sprintId, "user:", user.id, "day:", currentDay);

      // Check if user progress exists first
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', sprintId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing progress:", checkError);
        throw checkError;
      }

      const now = new Date().toISOString();

      if (existingProgress) {
        console.log("Updating existing progress:", existingProgress);

        // Try to update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed_date: now,
            completed: true  // Set completed to true
          })
          .eq('id', existingProgress.id);

        if (error) {
          console.error("Error updating progress:", error);

          // If the error is related to the current_day column, show a specific message
          if (error.message && error.message.includes('current_day')) {
            toast({
              title: "Database Issue Detected",
              description: "Please visit the Supabase Test page to fix database structure issues.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        }

        console.log("Successfully updated progress");
      } else {
        console.log("Creating new progress record");

        // Try to create new progress record
        // First try without the current_day field in case it doesn't exist
        const { error } = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            sprint_id: sprintId,
            start_date: now,
            completed_date: now,
            completed: true  // Set completed to true
          }]);

        if (error) {
          console.error("Error creating progress record:", error);

          // If the error is related to the current_day column, show a specific message
          if (error.message && error.message.includes('current_day')) {
            toast({
              title: "Database Issue Detected",
              description: "Please visit the Supabase Test page to fix database structure issues.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        }

        console.log("Successfully created progress record");
      }

      // Update streak
      await updateUserStreak();

      setTaskCompleted(true);

      // Refresh streak data in the UI
      if (refreshStreak) {
        await refreshStreak();
      }

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
      console.log("Updating streak for user:", user.id);

      const { data: streakData, error: streakError } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (streakError) {
        console.error("Error fetching streak data:", streakError);

        // Only throw if it's not the "no rows returned" error
        if (streakError.code !== 'PGRST116' && streakError.code !== 'PGSQL_NO_ROWS_RETURNED') {
          throw streakError;
        }
      }

      const today = new Date();

      // Format dates as YYYY-MM-DD for more reliable comparison
      const todayStr = today.toISOString().split('T')[0];

      if (streakData) {
        console.log("Found existing streak data:", streakData);

        // Handle case where last_activity_date is null
        if (!streakData.last_activity_date) {
          console.log("No last activity date, setting new streak to 1");

          const { error: updateError } = await supabase
            .from('streaks')
            .update({
              current_streak: 1,
              longest_streak: 1,
              last_activity_date: today.toISOString()
            })
            .eq('user_id', user.id);

          if (updateError) {
            console.error("Error updating streak with null last_activity_date:", updateError);
            throw updateError;
          }

          return;
        }

        // Update existing streak
        const lastActivity = new Date(streakData.last_activity_date);
        // Format as YYYY-MM-DD for more reliable comparison
        const lastActivityStr = lastActivity.toISOString().split('T')[0];

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        // Format as YYYY-MM-DD for more reliable comparison
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = streakData.current_streak || 0;
        let message = "";

        // If last activity was today, don't change the streak
        if (lastActivityStr === todayStr) {
          console.log("Already logged activity today, keeping streak at:", newStreak);
          return; // No need to update if already logged today
        }
        // If last activity was yesterday, increment streak
        else if (lastActivityStr === yesterdayStr) {
          newStreak += 1;
          message = `You're on a ${newStreak}-day streak! Keep it up!`;
          console.log("Last activity was yesterday, incrementing streak to:", newStreak);
        }
        // If last activity was not today or yesterday, reset streak to 1
        else {
          newStreak = 1;
          message = "You've started a new streak today!";
          console.log("Last activity was not recent, resetting streak to 1");
        }

        const longestStreak = Math.max(newStreak, streakData.longest_streak || 0);

        const { error: updateError } = await supabase
          .from('streaks')
          .update({
            current_streak: newStreak,
            longest_streak: longestStreak,
            last_activity_date: today.toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error("Error updating streak:", updateError);
          throw updateError;
        }

        console.log("Successfully updated streak to:", newStreak);

        // Show a toast message about the streak
        if (message) {
          toast({
            title: "Streak Updated",
            description: message,
          });
        }
      } else {
        console.log("No streak data found, creating new streak");

        // Create new streak
        const { error: createError } = await supabase
          .from('streaks')
          .insert([{
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: today.toISOString()
          }]);

        if (createError) {
          console.error("Error creating streak:", createError);
          throw createError;
        }

        console.log("Successfully created new streak");

        toast({
          title: "Streak Started",
          description: "You've started your first streak! Come back tomorrow to keep it going.",
        });
      }
    } catch (streakErr) {
      console.error("Error updating streak:", streakErr);
      // Continue execution even if streak update fails
    }
  };

  // New function to toggle task completion status
  const handleToggleComplete = async () => {
    if (!user || !id) {
      toast({
        title: "Error",
        description: "You must be logged in to update task status.",
        variant: "destructive",
      });
      return;
    }

    try {
      const sprintId = id;
      console.log("Toggling task completion for sprint:", sprintId, "user:", user.id, "day:", currentDay);

      // Check if user progress exists first
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', sprintId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing progress:", checkError);
        throw checkError;
      }

      const now = new Date().toISOString();

      if (existingProgress) {
        console.log("Existing progress found:", existingProgress);

        // Determine the new completion status (toggle the current value)
        const newCompletionStatus = !existingProgress.completed;

        // Update fields based on the new completion status
        const updateFields = {
          completed: newCompletionStatus,
          // Only set completed_date if marking as complete
          ...(newCompletionStatus ? { completed_date: now } : { completed_date: null })
        };

        // Update the record
        const { error } = await supabase
          .from('user_progress')
          .update(updateFields)
          .eq('id', existingProgress.id);

        if (error) {
          console.error("Error updating progress:", error);
          throw error;
        }

        console.log(`Successfully ${newCompletionStatus ? 'completed' : 'uncompleted'} task`);

        // If marking as complete, update the streak
        if (newCompletionStatus) {
          await updateUserStreak();
        }

        // Update the UI
        setTaskCompleted(newCompletionStatus);

        // Refresh streak data in the UI
        if (refreshStreak) {
          await refreshStreak();
        }

        // Show appropriate toast message
        toast({
          title: newCompletionStatus ? "Task completed!" : "Task marked as incomplete",
          description: newCompletionStatus
            ? "Great job! You've completed your task for today."
            : "Task has been marked as incomplete.",
        });
      } else {
        // If no progress record exists, create one with the task marked as complete
        console.log("No existing progress found, creating new record");

        const { error } = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            sprint_id: sprintId,
            start_date: now,
            completed_date: now,
            completed: true
          }]);

        if (error) {
          console.error("Error creating progress record:", error);
          throw error;
        }

        console.log("Successfully created progress record and completed task");

        // Update streak since we're marking as complete
        await updateUserStreak();

        // Update the UI
        setTaskCompleted(true);

        // Refresh streak data in the UI
        if (refreshStreak) {
          await refreshStreak();
        }

        toast({
          title: "Task completed!",
          description: "Great job! You've completed your task for today.",
        });
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    handleMarkComplete,
    handleToggleComplete
  };
};

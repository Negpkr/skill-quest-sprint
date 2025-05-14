import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fix streak issues by ensuring streak records exist for all users
 * and updating streaks for users who have completed tasks
 */
export const fixStreakIssues = async () => {
  try {
    console.log("Fixing streak issues...");

    // Step 1: Get all users who have progress records
    const { data: userProgressData, error: userProgressError } = await supabase
      .from('user_progress')
      .select('user_id, completed, completed_date')
      .order('completed_date', { ascending: false });

    if (userProgressError) {
      console.error("Error fetching user progress:", userProgressError);
      return { success: false, error: userProgressError };
    }

    // Get unique user IDs
    const userIds = [...new Set(userProgressData?.map(record => record.user_id))];
    console.log(`Found ${userIds.length} users with progress records`);

    if (userIds.length === 0) {
      console.log("No users found with progress records");
      return { success: true, message: "No users found with progress records" };
    }

    // Step 2: Check if streak records exist for these users
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('user_id, current_streak, longest_streak, last_activity_date')
      .in('user_id', userIds);

    if (streakError) {
      console.error("Error fetching streak data:", streakError);
      return { success: false, error: streakError };
    }

    // Create a map of user IDs to streak records
    const userStreakMap = new Map();
    streakData?.forEach(streak => {
      userStreakMap.set(streak.user_id, streak);
    });

    console.log(`Found ${streakData?.length || 0} existing streak records`);

    // Step 3: Create or update streak records for each user
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    for (const userId of userIds) {
      // Get the user's most recent completed task
      const completedTasks = userProgressData
        ?.filter(record => record.user_id === userId && record.completed && record.completed_date)
        .sort((a, b) => new Date(b.completed_date).getTime() - new Date(a.completed_date).getTime());

      const lastCompletedTask = completedTasks?.[0];

      if (!lastCompletedTask) {
        console.log(`User ${userId} has no completed tasks`);
        continue;
      }

      const lastCompletedDate = new Date(lastCompletedTask.completed_date);
      const lastCompletedStr = lastCompletedDate.toISOString().split('T')[0];

      // Check if the user has a streak record
      if (userStreakMap.has(userId)) {
        // Update existing streak record
        const streak = userStreakMap.get(userId);

        // Calculate the new streak value
        let newStreak = streak.current_streak || 0;
        let longestStreak = streak.longest_streak || 0;

        // If the last completed task was today, keep the current streak
        if (lastCompletedStr === todayStr) {
          console.log(`User ${userId} completed a task today, keeping streak at ${newStreak}`);

          // Only update if last_activity_date is not today
          if (!streak.last_activity_date || new Date(streak.last_activity_date).toISOString().split('T')[0] !== todayStr) {
            const { error: updateError } = await supabase
              .from('streaks')
              .update({
                last_activity_date: today.toISOString()
              })
              .eq('user_id', userId);

            if (updateError) {
              console.error(`Error updating streak for user ${userId}:`, updateError);
            } else {
              console.log(`Updated last_activity_date for user ${userId}`);
            }
          }
        }
        // If the streak record exists but is outdated, update it
        else {
          // Set streak to 1 for the most recent completion
          newStreak = 1;
          longestStreak = Math.max(1, longestStreak);

          const { error: updateError } = await supabase
            .from('streaks')
            .update({
              current_streak: newStreak,
              longest_streak: longestStreak,
              last_activity_date: lastCompletedDate.toISOString()
            })
            .eq('user_id', userId);

          if (updateError) {
            console.error(`Error updating streak for user ${userId}:`, updateError);
          } else {
            console.log(`Updated streak for user ${userId} to ${newStreak}`);
          }
        }
      } else {
        // Create a new streak record
        const { error: insertError } = await supabase
          .from('streaks')
          .insert([{
            user_id: userId,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: lastCompletedDate.toISOString()
          }]);

        if (insertError) {
          console.error(`Error creating streak for user ${userId}:`, insertError);
        } else {
          console.log(`Created new streak record for user ${userId}`);
        }
      }
    }

    console.log("Streak issues fixed successfully");
    return { success: true };
  } catch (error) {
    console.error("Error fixing streak issues:", error);
    return { success: false, error };
  }
};

/**
 * Fix streak issues for a specific user
 */
export const fixUserStreak = async (userId: string) => {
  try {
    console.log(`Fixing streak for user ${userId}...`);

    // Get the user's progress records
    const { data: userProgressData, error: userProgressError } = await supabase
      .from('user_progress')
      .select('completed, completed_date')
      .eq('user_id', userId)
      .order('completed_date', { ascending: false });

    if (userProgressError) {
      console.error("Error fetching user progress:", userProgressError);
      return { success: false, error: userProgressError };
    }

    // Get the user's streak record
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (streakError && streakError.code !== 'PGRST116') {
      console.error("Error fetching streak data:", streakError);
      return { success: false, error: streakError };
    }

    // Get the most recent completed task
    const completedTasks = userProgressData
      ?.filter(record => record.completed && record.completed_date)
      .sort((a, b) => new Date(b.completed_date).getTime() - new Date(a.completed_date).getTime());

    const lastCompletedTask = completedTasks?.[0];

    if (!lastCompletedTask) {
      console.log(`User ${userId} has no completed tasks`);

      // If there's no streak record, create one with streak = 0
      if (!streakData) {
        const { error: insertError } = await supabase
          .from('streaks')
          .insert([{
            user_id: userId,
            current_streak: 0,
            longest_streak: 0
          }]);

        if (insertError) {
          console.error(`Error creating streak for user ${userId}:`, insertError);
          return { success: false, error: insertError };
        }
      }

      return { success: true, message: "No completed tasks found" };
    }

    const lastCompletedDate = new Date(lastCompletedTask.completed_date);

    // Calculate streak value based on completion date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format dates as YYYY-MM-DD for comparison
    const lastCompletedStr = lastCompletedDate.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1; // Default to 1 for a new streak

    if (streakData) {
      // If the last completed task was today
      if (lastCompletedStr === todayStr) {
        // Keep the current streak, but ensure it's at least 1
        newStreak = Math.max(1, streakData.current_streak || 0);
        console.log(`Last completion was today, setting streak to ${newStreak}`);
      }
      // If the last completed task was yesterday and there's an existing streak
      else if (lastCompletedStr === yesterdayStr && streakData.current_streak > 0) {
        // Increment the streak
        newStreak = (streakData.current_streak || 0) + 1;
        console.log(`Last completion was yesterday, incrementing streak to ${newStreak}`);
      } else {
        // Otherwise, start a new streak at 1
        newStreak = 1;
        console.log(`Starting new streak at 1`);
      }

      // Update existing streak record
      const longestStreak = Math.max(newStreak, streakData.longest_streak || 0);

      const { error: updateError } = await supabase
        .from('streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: lastCompletedDate.toISOString()
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error(`Error updating streak for user ${userId}:`, updateError);
        return { success: false, error: updateError };
      }
    } else {
      // Create a new streak record
      const { error: insertError } = await supabase
        .from('streaks')
        .insert([{
          user_id: userId,
          current_streak: newStreak,
          longest_streak: newStreak,
          last_activity_date: lastCompletedDate.toISOString()
        }]);

      if (insertError) {
        console.error(`Error creating streak for user ${userId}:`, insertError);
        return { success: false, error: insertError };
      }
    }

    console.log(`Fixed streak for user ${userId}: current_streak=${newStreak}`);
    return { success: true };
  } catch (error) {
    console.error(`Error fixing streak for user ${userId}:`, error);
    return { success: false, error };
  }
};

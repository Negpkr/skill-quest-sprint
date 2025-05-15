
import { supabase } from "@/integrations/supabase/client";

export interface StreakFixResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixStreakIssues = async (userId: string): Promise<StreakFixResult> => {
  if (!userId) {
    return {
      success: false,
      message: "User ID is required to fix streak issues"
    };
  }

  try {
    // Check if user has a streak record
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (streakError) {
      return {
        success: false,
        message: "Error fetching streak record",
        details: streakError
      };
    }

    if (!streakData) {
      // Create new streak record
      const { data: newStreak, error: createError } = await supabase
        .from('streaks')
        .insert({
          user_id: userId,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString()
        })
        .select();

      if (createError) {
        return {
          success: false,
          message: "Error creating streak record",
          details: createError
        };
      }

      return {
        success: true,
        message: "Created new streak record successfully"
      };
    }

    // Update the streak record with valid values
    const updatedStreak = {
      current_streak: Math.max(0, streakData.current_streak || 0),
      longest_streak: Math.max(0, streakData.longest_streak || 0),
      last_activity_date: streakData.last_activity_date || new Date().toISOString()
    };

    const { error: updateError } = await supabase
      .from('streaks')
      .update(updatedStreak)
      .eq('id', streakData.id);

    if (updateError) {
      return {
        success: false,
        message: "Error updating streak record",
        details: updateError
      };
    }

    return {
      success: true,
      message: "Fixed streak issues successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: "Unexpected error fixing streak issues",
      details: error
    };
  }
};

import { supabase } from "@/integrations/supabase/client";
import { fixUserStreak } from "./fixStreakIssues";

/**
 * Utility function to fix a user's streak
 * This can be called from the browser console to fix a specific user's streak
 */
export const fixUserStreakUtil = async (userId: string) => {
  try {
    console.log(`Fixing streak for user ${userId}...`);
    
    if (!userId) {
      console.error("No user ID provided");
      return { success: false, error: "No user ID provided" };
    }
    
    // Check if the user exists
    const { data: userData, error: userError } = await supabase
      .from('user_progress')
      .select('user_id')
      .eq('user_id', userId)
      .limit(1);
    
    if (userError) {
      console.error("Error checking if user exists:", userError);
      return { success: false, error: userError };
    }
    
    if (!userData || userData.length === 0) {
      console.error(`User ${userId} not found in user_progress table`);
      return { success: false, error: `User ${userId} not found in user_progress table` };
    }
    
    // Fix the user's streak
    const result = await fixUserStreak(userId);
    
    if (!result.success) {
      console.error(`Error fixing streak for user ${userId}:`, result.error);
      return { success: false, error: result.error };
    }
    
    console.log(`Successfully fixed streak for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error(`Error in fixUserStreakUtil for user ${userId}:`, error);
    return { success: false, error };
  }
};

// Make the function available in the browser console
(window as any).fixUserStreak = fixUserStreakUtil;

export default fixUserStreakUtil;


import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fix issues with user streak data
 * @returns Promise<{success: boolean, message?: string, error?: any}> Result of the fix operation
 */
export const fixStreakIssues = async (): Promise<{success: boolean, message?: string, error?: any}> => {
  try {
    console.log("Starting streak issues fix");
    
    // Instead of getting all users via auth.admin (which requires admin access),
    // we'll get unique user IDs from user_progress table
    const { data: userProgressData, error: userProgressError } = await supabase
      .from('user_progress')
      .select('user_id')
      .order('user_id');
    
    if (userProgressError) {
      console.error("Error fetching user progress:", userProgressError);
      return { 
        success: false, 
        error: userProgressError 
      };
    }
    
    if (!userProgressData || userProgressData.length === 0) {
      console.log("No user progress found, nothing to fix");
      return { 
        success: true, 
        message: "No user progress found, nothing to fix" 
      };
    }
    
    // Get unique user IDs
    const userIds = [...new Set(userProgressData.map(record => record.user_id))];
    console.log(`Found ${userIds.length} users to check for streak issues`);
    
    // For each user, check if they have streak data
    for (const userId of userIds) {
      // Check if streak record exists
      const { data: streakData, error: streakError } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (streakError) {
        console.error(`Error checking streak for user ${userId}:`, streakError);
        continue;
      }
      
      // If no streak record exists, create one
      if (!streakData) {
        console.log(`Creating streak record for user ${userId}`);
        
        const { error: insertError } = await supabase
          .from('streaks')
          .insert({
            user_id: userId,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: new Date().toISOString()
          });
          
        if (insertError) {
          console.error(`Failed to create streak record for user ${userId}:`, insertError);
        } else {
          console.log(`Successfully created streak record for user ${userId}`);
        }
      } else {
        console.log(`Streak record already exists for user ${userId}`);
      }
    }
    
    return {
      success: true,
      message: `Checked and fixed streak records for ${userIds.length} users`
    };
    
  } catch (error) {
    console.error("Unexpected error fixing streak issues:", error);
    return { 
      success: false, 
      error: error 
    };
  }
};

export default fixStreakIssues;

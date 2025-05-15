
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fix issues with user streak data
 * @returns Promise<{success: boolean, message?: string, error?: any}> Result of the fix operation
 */
export const fixStreakIssues = async (): Promise<{success: boolean, message?: string, error?: any}> => {
  try {
    console.log("Starting streak issues fix");
    
    // Get all users
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error("Error fetching users:", usersError);
      return { 
        success: false, 
        error: usersError 
      };
    }
    
    if (!users || users.length === 0) {
      console.log("No users found, nothing to fix");
      return { 
        success: true, 
        message: "No users found, nothing to fix" 
      };
    }
    
    console.log(`Found ${users.length} users to check for streak issues`);
    
    // For each user, check if they have streak data
    for (const user of users) {
      const userId = user.id;
      
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
      message: `Checked and fixed streak records for ${users.length} users`
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


import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  created_at: string;
}

/**
 * Fixes streak-related issues in the database
 */
export async function fixStreakIssues(): Promise<boolean> {
  try {
    // Fetch all users
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error fetching users:", userError);
      toast({
        title: "Error fixing streaks",
        description: "Could not fetch users. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
    
    // Handle different response formats from Supabase
    const users = userData && 'users' in userData ? userData.users : [];
    
    if (!users || users.length === 0) {
      toast({
        title: "No users found",
        description: "No users found in the database. Nothing to fix.",
        variant: "warning",
      });
      return true; // No users to fix, so technically nothing failed
    }
    
    // Fix streaks for all users
    let fixCount = 0;
    
    for (const user of users) {
      // Check if user has a streak record
      const { data: streakData, error: streakError } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id);
      
      if (streakError) {
        console.error(`Error checking streak for user ${user.id}:`, streakError);
        continue;
      }
      
      if (!streakData || streakData.length === 0) {
        // Create streak record if it doesn't exist
        const { error: insertError } = await supabase
          .from('streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            last_activity: new Date().toISOString()
          });
        
        if (insertError) {
          console.error(`Error creating streak for user ${user.id}:`, insertError);
        } else {
          fixCount++;
        }
      }
    }
    
    toast({
      title: "Streak fixes applied",
      description: `Fixed streak records for ${fixCount} users out of ${users.length} total users.`,
    });
    
    return true;
  } catch (error) {
    console.error("Error fixing streak issues:", error);
    toast({
      title: "Error fixing streaks",
      description: "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
}

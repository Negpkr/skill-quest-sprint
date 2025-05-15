
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface FixResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixStreakIssues = async (userId: string): Promise<FixResult> => {
  if (!userId) {
    return {
      success: false,
      message: 'User ID is required'
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
      console.error('Error checking streak record:', streakError);
      return {
        success: false,
        message: 'Failed to check streak record',
        details: streakError
      };
    }

    if (!streakData) {
      // Create a new streak record for the user
      const { error: insertError } = await supabase
        .from('streaks')
        .insert([{
          user_id: userId,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString()
        }]);

      if (insertError) {
        console.error('Error creating streak record:', insertError);
        return {
          success: false,
          message: 'Failed to create streak record',
          details: insertError
        };
      }

      toast({
        title: 'Streak Created',
        description: 'A new streak record has been created for you'
      });

      return {
        success: true,
        message: 'New streak record created successfully'
      };
    } else {
      // Streak record exists, no action needed
      return {
        success: true,
        message: 'Streak record exists, no action needed'
      };
    }
  } catch (error: any) {
    console.error('Error fixing streak issues:', error);
    return {
      success: false,
      message: `Error fixing streak issues: ${error.message || error}`
    };
  }
};

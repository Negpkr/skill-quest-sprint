
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const fixStreakIssues = async (userId: string) => {
  if (!userId) {
    console.log('No user ID provided for streak fixing');
    return { success: false, message: 'No user ID provided' };
  }
  
  try {
    console.log('Fixing streak issues for user:', userId);
    
    // Check if user has streak record
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (streakError && streakError.code !== 'PGRST116') {
      console.error('Error checking streak record:', streakError);
      throw streakError;
    }
    
    // If no streak record exists, create one
    if (!streakData) {
      console.log('No streak record found, creating new record');
      
      const { error: createError } = await supabase
        .from('streaks')
        .insert([{
          user_id: userId,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: null
        }]);
        
      if (createError) {
        console.error('Error creating streak record:', createError);
        throw createError;
      }
      
      console.log('Streak record created successfully');
      
      // Fetch the newly created record
      const { data: newStreakData, error: fetchError } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (fetchError) {
        console.error('Error fetching new streak record:', fetchError);
        throw fetchError;
      }
      
      return {
        success: true,
        message: 'Created new streak record',
        data: newStreakData
      };
    }
    
    // Check if streak record has nulls that need to be fixed
    const needsFix = streakData.current_streak === null || 
                     streakData.longest_streak === null;
                     
    if (needsFix) {
      console.log('Fixing null values in streak record');
      
      const { error: updateError } = await supabase
        .from('streaks')
        .update({
          current_streak: streakData.current_streak ?? 0,
          longest_streak: streakData.longest_streak ?? 0
        })
        .eq('user_id', userId);
        
      if (updateError) {
        console.error('Error updating streak record:', updateError);
        throw updateError;
      }
      
      console.log('Streak record fixed successfully');
    } else {
      console.log('Streak record is already valid, no fixes needed');
    }
    
    return {
      success: true,
      message: needsFix ? 'Fixed streak record' : 'No fixes needed',
      data: streakData
    };
  } catch (error) {
    console.error('Error fixing streak issues:', error);
    
    toast({
      title: 'Error',
      description: 'Failed to fix streak issues. Please try again.',
      variant: 'destructive',
    });
    
    return { success: false, message: 'Failed to fix streak issues', error };
  }
};

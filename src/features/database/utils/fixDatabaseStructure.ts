
import { supabase } from '@/integrations/supabase/client';

interface FixResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixDatabaseStructure = async (): Promise<FixResult> => {
  try {
    // Step 1: Check if current_day column exists in user_progress
    console.log('Checking if current_day column exists in user_progress...');
    
    const { data: currentDayCheck, error: currentDayCheckError } = await supabase
      .rpc('check_column_exists', {
        p_table_name: 'user_progress',
        p_column_name: 'current_day'
      });
      
    if (currentDayCheckError) {
      console.error('Error checking current_day column:', currentDayCheckError);
      
      // Try to add the column anyway
      const { error: addCurrentDayError } = await supabase
        .rpc('add_column_if_not_exists', {
          p_table: 'user_progress',
          p_column: 'current_day',
          p_type: 'integer',
          p_default: '1'
        });
      
      if (addCurrentDayError) {
        console.error('Error adding current_day column:', addCurrentDayError);
        return {
          success: false,
          message: 'Failed to add current_day column',
          details: addCurrentDayError
        };
      }
    }
    
    // Step 2: Check if completed column exists in user_progress
    console.log('Checking if completed column exists in user_progress...');
    
    const { data: completedCheck, error: completedCheckError } = await supabase
      .rpc('check_column_exists', {
        p_table_name: 'user_progress',
        p_column_name: 'completed'
      });
      
    if (completedCheckError) {
      console.error('Error checking completed column:', completedCheckError);
      
      // Try to add the column anyway
      const { error: addCompletedError } = await supabase
        .rpc('add_column_if_not_exists', {
          p_table: 'user_progress',
          p_column: 'completed',
          p_type: 'boolean',
          p_default: 'false'
        });
      
      if (addCompletedError) {
        console.error('Error adding completed column:', addCompletedError);
        return {
          success: false,
          message: 'Failed to add completed column',
          details: addCompletedError
        };
      }
    }
    
    return {
      success: true,
      message: 'Database structure fixed successfully'
    };
  } catch (error: any) {
    console.error('Error fixing database structure:', error);
    return {
      success: false,
      message: `Error fixing database structure: ${error.message || error}`
    };
  }
};


import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const fixDatabaseStructure = async () => {
  try {
    console.log('Running database structure fixes...');
    
    // Check if user_progress table exists
    const { data: tableExists, error: tableError } = await supabase
      .from('user_progress')
      .select('id')
      .limit(1);
      
    if (tableError && tableError.code === '42P01') {
      console.log('user_progress table does not exist, creating it...');
      
      // Create user_progress table if it doesn't exist
      const { error: createError } = await supabase.rpc('create_user_progress_table');
      
      if (createError) {
        console.error('Error creating user_progress table:', createError);
        throw createError;
      }
      
      console.log('user_progress table created successfully');
    } else {
      console.log('user_progress table already exists');
    }
    
    // Check if current_day column exists
    const { data: columns, error: columnsError } = await supabase.rpc('check_column_exists', {
      p_table: 'user_progress',
      p_column: 'current_day'
    });
    
    if (columnsError) {
      console.error('Error checking columns:', columnsError);
      throw columnsError;
    }
    
    if (!columns || columns.length === 0) {
      console.log('current_day column does not exist, adding it...');
      
      // Add current_day column
      const { error: addColumnError } = await supabase.rpc('add_current_day_column');
      
      if (addColumnError) {
        console.error('Error adding current_day column:', addColumnError);
        throw addColumnError;
      }
      
      console.log('current_day column added successfully');
    } else {
      console.log('current_day column already exists');
    }
    
    return { success: true, message: 'Database structure fixed successfully' };
  } catch (error) {
    console.error('Error fixing database structure:', error);
    
    toast({
      title: 'Error',
      description: 'Failed to fix database structure. Please try again.',
      variant: 'destructive',
    });
    
    return { success: false, message: 'Failed to fix database structure', error };
  }
};

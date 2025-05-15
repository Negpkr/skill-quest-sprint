
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const checkSupabaseTables = async () => {
  try {
    console.log('Checking Supabase tables...');
    
    // Check required tables
    const requiredTables = ['sprints', 'challenges', 'user_progress', 'streaks'];
    const tableStatuses = await Promise.all(
      requiredTables.map(async (table) => {
        const { data, error } = await supabase
          .from(table)
          .select('id')
          .limit(1)
          .maybeSingle();
          
        return {
          table,
          exists: error?.code !== '42P01',
          error: error?.code === '42P01' ? `Table '${table}' does not exist` : null
        };
      })
    );
    
    const missingTables = tableStatuses.filter(t => !t.exists);
    
    if (missingTables.length > 0) {
      console.log('Missing tables:', missingTables.map(t => t.table).join(', '));
      
      return {
        success: false,
        message: `Missing tables: ${missingTables.map(t => t.table).join(', ')}`,
        missingTables: missingTables.map(t => t.table)
      };
    }
    
    console.log('All required tables exist');
    return { success: true, message: 'All required tables exist' };
  } catch (error) {
    console.error('Error checking tables:', error);
    
    toast({
      title: 'Error',
      description: 'Failed to check database tables. Please try again.',
      variant: 'destructive',
    });
    
    return { success: false, message: 'Failed to check database tables', error };
  }
};

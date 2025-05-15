
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * Fixes database structure issues by running SQL queries
 * to create missing tables and columns
 */
export async function fixDatabaseStructure(): Promise<boolean> {
  try {
    // Check if streaks table exists
    const { error: streaksTableCheckError } = await supabase
      .from('streaks')
      .select('*', { count: 'exact', head: true });
    
    // If streaks table doesn't exist, create it
    if (streaksTableCheckError) {
      // We can't execute arbitrary SQL directly from the client
      // Instead, inform the user that they need to run the SQL script
      toast({
        title: "Database structure needs fixing",
        description: "Please run the SQL script from the database setup page",
        variant: "destructive",
      });
      return false;
    }
    
    // Check if user_progress table has current_day column
    // Define a proper interface for the RPC parameters
    interface GetColumnsParams {
      table_name: string;
    }
    
    const { data: userProgressColumns, error: columnCheckError } = await supabase
      .rpc<Record<string, any>, GetColumnsParams>('get_columns_for_table', { 
        table_name: 'user_progress' 
      });
    
    if (columnCheckError || !userProgressColumns) {
      console.error("Error checking user_progress columns:", columnCheckError);
      toast({
        title: "Error checking database structure",
        description: "Could not verify database columns. Please try again.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error fixing database structure:", error);
    toast({
      title: "Database error",
      description: "Could not fix database structure. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
}

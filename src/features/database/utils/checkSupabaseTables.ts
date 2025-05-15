
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

/**
 * Checks if all required tables exist in the Supabase database
 * Returns true if all tables exist, false otherwise
 */
export async function checkSupabaseTables(): Promise<boolean> {
  const requiredTables = [
    'sprints',
    'challenges',
    'user_progress',
    'streaks',
  ] as const; // Using const assertion to create a readonly tuple type
  
  try {
    // We can't directly query pg_catalog.pg_tables, so we'll check each table individually
    let allTablesExist = true;
    
    for (const tableName of requiredTables) {
      try {
        // Try to query a single row from each table to check if it exists
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error(`Error checking table ${tableName}:`, error);
          allTablesExist = false;
        }
      } catch (err) {
        console.error(`Error checking table ${tableName}:`, err);
        allTablesExist = false;
      }
    }
    
    if (!allTablesExist) {
      toast({
        title: "Database structure issue detected",
        description: "Some required tables are missing. Please visit the Database Setup page.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking database tables:", error);
    
    toast({
      title: "Database error",
      description: "Could not check database structure. Please reload the page.",
      variant: "destructive",
    });
    
    return false;
  }
}

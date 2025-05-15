
import { supabase } from "@/integrations/supabase/client";

/**
 * Check if all required tables exist in the Supabase database
 * @returns Promise<Record<string, boolean>> Object with table names as keys and boolean indicating if they exist
 */
export const checkAllTablesExist = async (): Promise<Record<string, boolean>> => {
  // Define the tables we need to check for
  const requiredTables = [
    'sprints',
    'challenges',
    'user_progress',
    'streaks',
  ] as const;
  
  try {
    // We can't directly query pg_catalog.pg_tables, so we'll check each table individually
    const result: Record<string, boolean> = {};
    
    for (const tableName of requiredTables) {
      try {
        // Try to query a single row from each table to check if it exists
        // Type assertion to handle the strongly-typed Supabase client
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        // If there's no error, the table exists
        result[tableName] = !error;
      } catch {
        result[tableName] = false;
      }
    }
    
    console.log("Table existence check result:", result);
    return result;
    
  } catch (error) {
    console.error("Error checking tables:", error);
    // If there's an error, assume no tables exist
    const result: Record<string, boolean> = {};
    requiredTables.forEach(table => {
      result[table] = false;
    });
    return result;
  }
};

export default checkAllTablesExist;


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
  ];
  
  try {
    // Get list of all tables
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
      
    if (error) {
      console.error("Error fetching tables:", error);
      throw error;
    }
    
    // Create a set of existing table names for easier lookup
    const existingTables = new Set(data?.map(table => table.tablename) || []);
    console.log("Existing tables:", existingTables);
    
    // Build result object
    const result: Record<string, boolean> = {};
    requiredTables.forEach(table => {
      result[table] = existingTables.has(table);
    });
    
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

export default { checkAllTablesExist };

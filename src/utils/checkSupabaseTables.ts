import { supabase } from "@/integrations/supabase/client";

/**
 * Check if a table exists in the Supabase database
 * @param tableName The name of the table to check
 * @returns Promise<boolean> - True if the table exists, false otherwise
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Try to select a single row from the table
    const { error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    // If there's an error with code PGRST116, the table doesn't exist
    if (error && error.code === 'PGRST116') {
      console.error(`Table ${tableName} does not exist:`, error);
      return false;
    }
    
    // If there's another error, log it but assume the table exists
    if (error) {
      console.error(`Error checking table ${tableName}:`, error);
      // This could be a permissions error, not necessarily that the table doesn't exist
      return true;
    }
    
    // If no error, the table exists
    console.log(`Table ${tableName} exists`);
    return true;
  } catch (error) {
    console.error(`Exception checking table ${tableName}:`, error);
    return false;
  }
};

/**
 * Check if all required tables exist in the Supabase database
 * @returns Promise<{[tableName: string]: boolean}> - Object with table names as keys and existence as values
 */
export const checkAllTablesExist = async (): Promise<{[tableName: string]: boolean}> => {
  const requiredTables = [
    'sprints',
    'challenges',
    'user_progress',
    'streaks',
    'contact_messages',
    'problem_reports'
  ];
  
  const results: {[tableName: string]: boolean} = {};
  
  for (const tableName of requiredTables) {
    results[tableName] = await checkTableExists(tableName);
  }
  
  return results;
};

/**
 * Get the schema of a table
 * @param tableName The name of the table to get the schema for
 * @returns Promise<any> - The schema of the table
 */
export const getTableSchema = async (tableName: string): Promise<any> => {
  try {
    // This is a PostgreSQL query to get table schema
    const { data, error } = await supabase
      .rpc('get_table_schema', { table_name: tableName });
    
    if (error) {
      console.error(`Error getting schema for table ${tableName}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Exception getting schema for table ${tableName}:`, error);
    return null;
  }
};

/**
 * Check if the Supabase connection is working
 * @returns Promise<boolean> - True if the connection is working, false otherwise
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Try to get the Supabase version
    const { data, error } = await supabase
      .rpc('version');
    
    if (error) {
      console.error('Error checking Supabase connection:', error);
      return false;
    }
    
    console.log('Supabase connection working, version:', data);
    return true;
  } catch (error) {
    console.error('Exception checking Supabase connection:', error);
    return false;
  }
};

export default {
  checkTableExists,
  checkAllTablesExist,
  getTableSchema,
  checkSupabaseConnection
};

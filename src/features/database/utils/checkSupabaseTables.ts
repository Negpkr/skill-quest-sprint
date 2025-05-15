
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from '@supabase/supabase-js';

interface TablesResponse {
  success: boolean;
  error?: PostgrestError | null;
  data?: any[];
  message?: string;
}

// List of known tables in our database
const KNOWN_TABLES = [
  "challenges", "sprints", "comments", "community_posts", 
  "contact_messages", "problem_reports", "streaks", 
  "templates", "user_progress", "Users"
] as const;

// Type for known tables
type KnownTable = typeof KNOWN_TABLES[number];

// Function that checks if a string is a KnownTable
function isKnownTable(tableName: string): tableName is KnownTable {
  return KNOWN_TABLES.includes(tableName as KnownTable);
}

export const checkTable = async (tableName: string): Promise<TablesResponse> => {
  try {
    // Validate table name before query
    if (!isKnownTable(tableName)) {
      return {
        success: false,
        message: `Invalid table name: ${tableName}. Must be one of ${KNOWN_TABLES.join(', ')}`
      };
    }
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    if (error) {
      return {
        success: false,
        error,
        message: `Error checking ${tableName} table: ${error.message}`
      };
    }
    
    return {
      success: true,
      data,
      message: `Table ${tableName} exists and is accessible`
    };
    
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      message: `Unexpected error checking ${tableName} table: ${error.message}`
    };
  }
};

// Helper function to check multiple tables
export const checkTables = async (tableNames: string[]): Promise<Record<string, TablesResponse>> => {
  const results: Record<string, TablesResponse> = {};
  
  for (const tableName of tableNames) {
    results[tableName] = await checkTable(tableName);
  }
  
  return results;
};

export default checkTables;

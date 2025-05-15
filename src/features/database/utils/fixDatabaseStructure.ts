
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface FixDatabaseStructureResult {
  success: boolean;
  message: string;
  details?: any;
}

/**
 * Checks and fixes the structure of the database tables
 * @returns Promise<FixDatabaseStructureResult> Result of the fix operation
 */
export const fixAllDatabaseStructure = async (): Promise<FixDatabaseStructureResult> => {
  try {
    console.log("Checking for missing columns in user_progress table...");
    
    // Check if 'completed' column exists in user_progress table
    let columnsError = null;
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('completed')
        .limit(1);
        
      columnsError = error;
    } catch (error) {
      columnsError = error;
    }
    
    if (columnsError) {
      // If the error mentions the column doesn't exist, we need to add it
      const errorMessage = columnsError.message || '';
      if (errorMessage.includes("column") && errorMessage.includes("does not exist")) {
        console.log("Adding 'completed' column to user_progress table...");
        
        // We can't use supabase.rpc directly with exec for security reasons
        // Instead, display guidance to the user
        return {
          success: false,
          message: "Missing 'completed' column in user_progress table. Please run the SQL in supabase/migrations/fix_database_structure.sql to add it.",
          details: columnsError
        };
      } else {
        console.error("Error checking columns:", columnsError);
        return {
          success: false,
          message: `Error checking database structure: ${columnsError.message}`,
          details: columnsError
        };
      }
    }
    
    // If we got here without error, the column already exists
    console.log("All required columns already exist in user_progress table");
    return {
      success: true,
      message: "Database structure is valid, no fixes needed"
    };
    
  } catch (error) {
    console.error("Error fixing database structure:", error);
    return {
      success: false,
      message: `Unexpected error fixing database structure: ${error}`,
      details: error
    };
  }
};

export default fixAllDatabaseStructure;

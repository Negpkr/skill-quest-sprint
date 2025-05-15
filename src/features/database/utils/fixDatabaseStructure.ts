
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
    const { data: columns, error: columnsError } = await supabase
      .from('user_progress')
      .select('completed')
      .limit(1);
      
    if (columnsError) {
      // If the error mentions the column doesn't exist, we need to add it
      if (columnsError.message.includes("column") && columnsError.message.includes("does not exist")) {
        console.log("Adding 'completed' column to user_progress table...");
        
        // Add the column using raw SQL
        const { error: alterError } = await supabase.rpc(
          'exec',
          { 
            query: 'ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS completed BOOLEAN DEFAULT false;' 
          }
        );
        
        if (alterError) {
          console.error("Error adding column:", alterError);
          return {
            success: false,
            message: `Failed to add 'completed' column: ${alterError.message}`,
            details: alterError
          };
        }
        
        console.log("Successfully added 'completed' column to user_progress table");
        return {
          success: true,
          message: "Added missing 'completed' column to user_progress table"
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

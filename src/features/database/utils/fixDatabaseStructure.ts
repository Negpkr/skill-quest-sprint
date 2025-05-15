
import { supabase } from "@/integrations/supabase/client";

export interface DatabaseStructureResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixDatabaseStructure = async (): Promise<DatabaseStructureResult> => {
  try {
    console.log("Starting database structure check...");

    // Check if the streaks table exists
    console.log("Checking if streaks table exists...");
    const { data: streakTablesData, error: streakTablesError } = await supabase
      .from('streaks')
      .select('id')
      .limit(1);
    
    if (streakTablesError) {
      console.log("Streaks table not found or error:", streakTablesError.message);
    } else {
      console.log("Streaks table exists");
    }

    // Check if the user_progress table has the completed field
    console.log("Checking if user_progress table has the completed field...");
    const { data: userProgressData, error: userProgressError } = await supabase
      .from('user_progress')
      .select('completed')
      .limit(1);
    
    if (userProgressError) {
      console.log("Error checking user_progress completed field:", userProgressError.message);
    } else if (userProgressData && userProgressData.length > 0) {
      console.log("user_progress completed field exists");
    }

    return {
      success: true,
      message: "Database structure check completed",
    };
  } catch (error) {
    console.error("Error checking database structure:", error);
    return {
      success: false,
      message: "Error checking database structure",
      details: error
    };
  }
};

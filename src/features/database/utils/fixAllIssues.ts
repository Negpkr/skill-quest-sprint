
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import fixAllDatabaseStructure from "./fixDatabaseStructure";
import checkAllTablesExist from "./checkSupabaseTables";
import fixStreakIssues from "./fixStreakIssues";

/**
 * Fix all issues in the application
 * @returns Promise<{success: boolean, message: string, details: any}> - Result of the fix operation
 */
export const fixAllIssues = async (): Promise<{success: boolean, message: string, details: any}> => {
  try {
    // Step 1: Check if all required tables exist
    console.log("Step 1: Checking if all required tables exist...");
    const tableStatus = await checkAllTablesExist();

    const missingTables = Object.entries(tableStatus)
      .filter(([_, exists]) => !exists)
      .map(([name]) => name);

    if (missingTables.length > 0) {
      return {
        success: false,
        message: `Missing tables: ${missingTables.join(', ')}. Please run the SQL in supabase/migrations/create_tables.sql to create them.`,
        details: { tableStatus }
      };
    }

    // Step 2: Fix database structure issues
    console.log("Step 2: Fixing database structure issues...");
    const structureResult = await fixAllDatabaseStructure();

    if (!structureResult.success) {
      return {
        success: false,
        message: `Database structure issues: ${structureResult.message}`,
        details: { structureResult }
      };
    }

    // Step 3: Check if there are any sprints
    console.log("Step 3: Checking if there are any sprints...");
    const { data: sprints, error: sprintsError } = await supabase
      .from('sprints')
      .select('*', { head: true });

    if (sprintsError) {
      return {
        success: false,
        message: `Error checking sprints: ${sprintsError.message}`,
        details: { sprintsError }
      };
    }

    if (!sprints) {
      return {
        success: false,
        message: "No sprints found. Please run the SQL in supabase/migrations/create_tables.sql to create sample data.",
        details: { sprints }
      };
    }

    // Step 4: Check if there are any challenges
    console.log("Step 4: Checking if there are any challenges...");
    const { data: challenges, error: challengesError } = await supabase
      .from('challenges')
      .select('*', { head: true });

    if (challengesError) {
      return {
        success: false,
        message: `Error checking challenges: ${challengesError.message}`,
        details: { challengesError }
      };
    }

    if (!challenges) {
      return {
        success: false,
        message: "No challenges found. Please run the SQL in supabase/migrations/create_tables.sql to create sample data.",
        details: { challenges }
      };
    }

    // Step 5: Fix streak issues
    console.log("Step 5: Fixing streak issues...");
    const streakResult = await fixStreakIssues();

    if (!streakResult.success) {
      return {
        success: false,
        message: `Error fixing streak issues: ${streakResult.error}`,
        details: { streakResult }
      };
    }

    // All checks passed
    return {
      success: true,
      message: "All issues fixed successfully",
      details: {
        tableStatus,
        structureResult,
        sprints,
        challenges,
        streakResult
      }
    };
  } catch (error) {
    console.error("Error fixing all issues:", error);
    return {
      success: false,
      message: `Error fixing all issues: ${error}`,
      details: { error }
    };
  }
};

// Make the function available in the browser console
(window as any).fixAllIssues = fixAllIssues;

export default fixAllIssues;


import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { fixDatabaseStructure } from "./fixDatabaseStructure";
import { checkSupabaseTables } from "./checkSupabaseTables";
import { fixStreakIssues } from "@/utils/fixStreakIssues";

export async function fixAllIssues() {
  try {
    toast({
      title: "Database Check Started",
      description: "Checking and fixing database issues...",
    });

    // Step 1: Try the RPC function call
    let result = await callFixAllIssuesRPC();
    
    // If RPC succeeded, we're done
    if (result.success) {
      toast({
        title: "Database Successfully Fixed",
        description: "All database issues have been resolved.",
      });
      return result;
    }
    
    // Step 2: If RPC failed, try individual fixes
    console.log("RPC method failed, trying individual fixes...");
    
    // Fix database structure
    const structureResult = await fixDatabaseStructure();
    if (!structureResult.success) {
      console.error("Failed to fix database structure:", structureResult.error);
    } else {
      console.log("Database structure fixed successfully");
    }
    
    // Check and create tables
    const tablesResult = await checkSupabaseTables();
    if (!tablesResult.success) {
      console.error("Failed to check/create tables:", tablesResult.error);
    } else {
      console.log("Tables checked/created successfully");
    }
    
    // Fix streak issues
    const streakResult = await fixStreakIssues();
    if (!streakResult.success) {
      console.error("Failed to fix streak issues:", streakResult.error);
    } else {
      console.log("Streak issues fixed successfully");
    }
    
    toast({
      title: "Database Check Complete",
      description: "Database issues have been addressed. Please check console for details.",
    });
    
    return {
      success: true,
      message: "Individual fixes applied"
    };
  } catch (error) {
    console.error("Error fixing database issues:", error);
    toast({
      title: "Database Fix Failed",
      description: "An error occurred while fixing database issues. Please try again.",
      variant: "destructive",
    });
    return { success: false, error };
  }
}

async function callFixAllIssuesRPC() {
  try {
    const { data, error } = await supabase.rpc('fix_all_issues');
    
    if (error) {
      console.error("RPC fix_all_issues error:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Exception in callFixAllIssuesRPC:", error);
    return { success: false, error };
  }
}

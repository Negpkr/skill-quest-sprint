
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { fixDatabaseStructure } from "./fixDatabaseStructure";
import { checkSupabaseTables } from "./checkSupabaseTables";
import { fixStreakIssues } from "./fixStreakIssues";

export interface FixAllResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixAllIssues = async (userId: string): Promise<FixAllResult> => {
  if (!userId) {
    toast({
      title: "Error",
      description: "User ID is required to fix issues",
      variant: "destructive"
    });
    
    return {
      success: false,
      message: "User ID is required"
    };
  }
  
  try {
    // Step 1: Check database structure
    const dbStructureResult = await fixDatabaseStructure();
    
    // Step 2: Check tables
    const tablesResult = await checkSupabaseTables();
    
    // Step 3: Fix streak issues
    const streakResult = await fixStreakIssues(userId);
    
    // Step 4: Fix user_progress completed field if needed
    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('id, completed')
      .eq('user_id', userId);
    
    if (progressError) {
      console.error("Error checking user progress:", progressError);
      return {
        success: false,
        message: "Error checking user progress",
        details: progressError
      };
    }
    
    let updatedCount = 0;
    
    // Fix any null completed values
    for (const progress of progressData || []) {
      if (progress.completed === null) {
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({ completed: false })
          .eq('id', progress.id);
        
        if (!updateError) {
          updatedCount++;
        }
      }
    }
    
    // Consolidate all results
    const allSuccess = 
      dbStructureResult.success && 
      streakResult.success;
    
    let message = "All issues fixed successfully";
    
    if (!allSuccess) {
      message = "Some issues were not fixed";
    }
    
    const details = {
      databaseStructure: dbStructureResult,
      tables: tablesResult,
      streak: streakResult,
      progress: {
        checked: (progressData || []).length,
        updated: updatedCount
      }
    };
    
    return {
      success: allSuccess,
      message,
      details
    };
  } catch (error) {
    console.error("Error fixing issues:", error);
    
    return {
      success: false,
      message: "Unexpected error fixing issues",
      details: error
    };
  }
};

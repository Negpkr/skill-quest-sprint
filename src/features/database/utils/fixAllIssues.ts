
import { checkSupabaseTables } from './checkSupabaseTables';
import { fixDatabaseStructure } from './fixDatabaseStructure';
import { fixStreakIssues } from './fixStreakIssues';
import { toast } from '@/hooks/use-toast';

/**
 * Attempts to fix all known database issues
 */
export async function fixAllIssues(): Promise<boolean> {
  try {
    // First check if required tables exist
    const tablesExist = await checkSupabaseTables();
    
    if (!tablesExist) {
      toast({
        title: "Missing tables",
        description: "Can't proceed with fixes. Please create required tables first.",
        variant: "destructive",
      });
      return false;
    }
    
    // Fix database structure (create missing columns, etc.)
    const structureFixed = await fixDatabaseStructure();
    
    if (!structureFixed) {
      toast({
        title: "Structure fix failed",
        description: "Could not fix database structure. See console for details.",
        variant: "destructive",
      });
      return false;
    }
    
    // Fix streak-related issues
    const streaksFixed = await fixStreakIssues();
    
    if (!streaksFixed) {
      toast({
        title: "Streak fix failed",
        description: "Could not fix streak issues. See console for details.",
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Fixes applied successfully",
      description: "All database issues have been fixed.",
    });
    
    return true;
  } catch (error) {
    console.error("Error applying fixes:", error);
    toast({
      title: "Error fixing issues",
      description: "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
}

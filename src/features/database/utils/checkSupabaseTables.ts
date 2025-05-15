
import { supabase } from '@/integrations/supabase/client';

interface TableCheckResult {
  success: boolean;
  message: string;
  existingTables?: string[];
  missingTables?: string[];
}

export const checkSupabaseTables = async (): Promise<TableCheckResult> => {
  try {
    const requiredTables = [
      'challenges', 
      'sprints', 
      'user_progress', 
      'streaks'
    ];
    
    const existingTables: string[] = [];
    const missingTables: string[] = [];
    
    // Check each table
    for (const tableName of requiredTables) {
      const { count, error } = await supabase
        .from(tableName as any)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error(`Error checking table ${tableName}:`, error);
        missingTables.push(tableName);
      } else {
        existingTables.push(tableName);
      }
    }
    
    if (missingTables.length === 0) {
      return {
        success: true,
        message: 'All required tables exist in the database',
        existingTables
      };
    } else {
      return {
        success: false,
        message: `Missing tables: ${missingTables.join(', ')}`,
        existingTables,
        missingTables
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error checking tables: ${error.message || error}`
    };
  }
};

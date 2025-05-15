
import { supabase } from "@/integrations/supabase/client";

export interface TableCheckResult {
  tableName: string;
  exists: boolean;
  error?: any;
}

export const checkSupabaseTables = async (): Promise<TableCheckResult[]> => {
  const tableNames = [
    "users",
    "sprints",
    "challenges",
    "user_progress",
    "streaks"
  ];

  const results: TableCheckResult[] = [];

  for (const tableName of tableNames) {
    try {
      // Using a generic query approach to avoid TypeScript issues
      const { data, error } = await supabase
        .rpc('check_table_exists', { table_name: tableName });
      
      results.push({
        tableName,
        exists: data === true,
        error: error || undefined
      });
    } catch (error) {
      results.push({
        tableName,
        exists: false,
        error
      });
    }
  }

  return results;
};

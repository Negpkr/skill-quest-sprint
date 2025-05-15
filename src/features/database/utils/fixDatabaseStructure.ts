
import { supabase } from "@/integrations/supabase/client";

export async function fixDatabaseStructure() {
  try {
    // Check if tables exist and create them if they don't
    const { data: tablesData, error: tablesError } = await supabase
      .rpc('check_tables_exist');

    if (tablesError) {
      console.error("Error checking tables:", tablesError);
      return { success: false, error: tablesError };
    }

    // Check if columns exist and create them if they don't
    const { data: columnsData, error: columnsError } = await supabase
      .rpc('check_columns_exist');

    if (columnsError) {
      console.error("Error checking columns:", columnsError);
      return { success: false, error: columnsError };
    }

    return { success: true, message: "Database structure checked and fixed if needed." };
  } catch (error) {
    console.error("Error fixing database structure:", error);
    return { success: false, error };
  }
}

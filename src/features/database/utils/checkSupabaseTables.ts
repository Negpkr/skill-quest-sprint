
import { supabase } from "@/integrations/supabase/client";

export async function checkSupabaseTables() {
  try {
    const { data, error } = await supabase
      .rpc('check_and_create_tables');
      
    if (error) {
      console.error("Error checking and creating tables:", error);
      return { success: false, error };
    }
    
    return { success: true, message: "Tables checked and created if needed." };
  } catch (error) {
    console.error("Error in checkSupabaseTables:", error);
    return { success: false, error };
  }
}

import { supabase } from "@/integrations/supabase/client";

/**
 * Simple function to test the Supabase connection
 * This can be run directly in the browser console
 */
export const testConnection = async () => {
  try {
    console.log("Testing Supabase connection...");
    console.log("Supabase URL:", (supabase as any).supabaseUrl);
    console.log("Supabase Key:", (supabase as any).supabaseKey ? "Key exists (not showing for security)" : "No key found");
    
    // Try a simple query
    const { data, error } = await supabase.from('sprints').select('count(*)');
    
    if (error) {
      console.error("Connection error:", error);
      return { success: false, error };
    }
    
    console.log("Connection successful! Data:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Exception during connection test:", err);
    return { success: false, error: err };
  }
};

/**
 * Check if the Supabase project exists and is accessible
 */
export const checkProject = async () => {
  try {
    // Try to get the Supabase version (this should work even if tables don't exist)
    const { data, error } = await supabase.rpc('get_service_status');
    
    if (error) {
      console.error("Project check error:", error);
      return { success: false, error };
    }
    
    console.log("Project check successful! Status:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Exception during project check:", err);
    return { success: false, error: err };
  }
};

// Export a function that can be called from the browser console
(window as any).testSupabaseConnection = testConnection;
(window as any).checkSupabaseProject = checkProject;

export default {
  testConnection,
  checkProject
};

import { supabase } from "@/integrations/supabase/client";

/**
 * Directly mark a challenge as complete
 * This function bypasses all the hooks and directly updates the database
 */
export const directMarkComplete = async (sprintId: string, userId: string) => {
  try {
    console.log("Directly marking challenge as complete for sprint:", sprintId, "user:", userId);
    
    // Check if user progress exists
    const { data: existingProgress, error: checkError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('sprint_id', sprintId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking existing progress:", checkError);
      return { success: false, error: checkError };
    }
    
    const now = new Date().toISOString();
    
    if (existingProgress) {
      console.log("Updating existing progress:", existingProgress);
      
      // Update existing progress
      const { data, error } = await supabase
        .from('user_progress')
        .update({
          completed_date: now,
          current_day: existingProgress.current_day || 1,
          completed: true
        })
        .eq('id', existingProgress.id)
        .select();
      
      if (error) {
        console.error("Error updating progress:", error);
        return { success: false, error };
      }
      
      console.log("Successfully updated progress:", data);
      return { success: true, data };
    } else {
      console.log("Creating new progress record");
      
      // Create new progress record
      const { data, error } = await supabase
        .from('user_progress')
        .insert([{
          user_id: userId,
          sprint_id: sprintId,
          start_date: now,
          completed_date: now,
          current_day: 1,
          completed: true
        }])
        .select();
      
      if (error) {
        console.error("Error creating progress record:", error);
        return { success: false, error };
      }
      
      console.log("Successfully created progress record:", data);
      return { success: true, data };
    }
  } catch (error) {
    console.error("Exception marking complete:", error);
    return { success: false, error };
  }
};

// Make the function available in the browser console
(window as any).directMarkComplete = directMarkComplete;

export default directMarkComplete;

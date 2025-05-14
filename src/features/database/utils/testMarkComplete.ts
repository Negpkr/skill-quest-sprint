import { supabase } from "@/integrations/supabase/client";

/**
 * Test marking a challenge as complete
 * @param sprintId - The ID of the sprint
 * @param userId - The ID of the user
 * @param currentDay - The current day of the challenge
 */
export const testMarkComplete = async (sprintId: string, userId: string, currentDay: number = 1) => {
  try {
    console.log("Testing mark complete for sprint:", sprintId, "user:", userId, "day:", currentDay);
    
    // Check if user progress exists first
    const { data: existingProgress, error: checkError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('sprint_id', sprintId)
      .eq('user_id', userId)
      .maybeSingle();
    
    console.log("Existing progress:", existingProgress);
    
    if (checkError) {
      console.error("Error checking existing progress:", checkError);
      return { success: false, error: checkError };
    }
    
    const now = new Date().toISOString();
    
    if (existingProgress) {
      console.log("Updating existing progress:", existingProgress);
      
      // Update existing progress
      const updateData = {
        completed_date: now,
        current_day: currentDay,
        completed: true
      };
      
      const { data: updateResult, error } = await supabase
        .from('user_progress')
        .update(updateData)
        .eq('id', existingProgress.id)
        .select();
      
      if (error) {
        console.error("Error updating progress:", error);
        return { success: false, error };
      }
      
      console.log("Successfully updated progress:", updateResult);
      return { success: true, data: updateResult };
    } else {
      console.log("Creating new progress record");
      
      // Create new progress record
      const insertData = {
        user_id: userId,
        sprint_id: sprintId,
        start_date: now,
        completed_date: now,
        current_day: currentDay,
        completed: true
      };
      
      const { data, error } = await supabase
        .from('user_progress')
        .insert([insertData])
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

/**
 * Test checking user progress
 * @param userId - The ID of the user
 */
export const testCheckUserProgress = async (userId: string) => {
  try {
    console.log("Testing check user progress for user:", userId);
    
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error checking user progress:", error);
      return { success: false, error };
    }
    
    console.log("User progress:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Exception checking user progress:", error);
    return { success: false, error };
  }
};

/**
 * Test checking sprint details
 * @param sprintId - The ID of the sprint
 */
export const testCheckSprintDetails = async (sprintId: string) => {
  try {
    console.log("Testing check sprint details for sprint:", sprintId);
    
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .eq('id', sprintId)
      .maybeSingle();
    
    if (error) {
      console.error("Error checking sprint details:", error);
      return { success: false, error };
    }
    
    console.log("Sprint details:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Exception checking sprint details:", error);
    return { success: false, error };
  }
};

// Make the test functions available in the browser console
(window as any).testMarkComplete = testMarkComplete;
(window as any).testCheckUserProgress = testCheckUserProgress;
(window as any).testCheckSprintDetails = testCheckSprintDetails;

export default {
  testMarkComplete,
  testCheckUserProgress,
  testCheckSprintDetails
};

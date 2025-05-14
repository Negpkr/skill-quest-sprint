import { supabase } from "@/integrations/supabase/client";

/**
 * Test if the completed field can be set to true in the user_progress table
 * This function creates a test user progress record and then updates it to completed=true
 */
export const testCompletedField = async () => {
  try {
    console.log("Testing if completed field can be set to true...");
    
    // Use a test user ID and sprint ID
    const testUserId = "00000000-0000-0000-0000-000000000001";
    
    // Get a real sprint ID from the database
    const { data: sprintData, error: sprintError } = await supabase
      .from('sprints')
      .select('id')
      .limit(1)
      .single();
    
    if (sprintError) {
      console.error("Error getting sprint ID:", sprintError);
      return { success: false, error: sprintError };
    }
    
    const sprintId = sprintData.id;
    console.log("Using sprint ID:", sprintId);
    
    // First, delete any existing test records
    const { error: deleteError } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', testUserId);
    
    if (deleteError) {
      console.error("Error deleting existing test records:", deleteError);
      // Continue anyway
    }
    
    // Create a new user progress record with completed=false
    const { data: insertData, error: insertError } = await supabase
      .from('user_progress')
      .insert([{
        user_id: testUserId,
        sprint_id: sprintId,
        start_date: new Date().toISOString(),
        current_day: 1,
        completed: false
      }])
      .select();
    
    if (insertError) {
      console.error("Error creating test record:", insertError);
      return { success: false, error: insertError };
    }
    
    console.log("Created test record:", insertData);
    
    // Now update the record to completed=true
    const { data: updateData, error: updateError } = await supabase
      .from('user_progress')
      .update({
        completed: true,
        completed_date: new Date().toISOString()
      })
      .eq('user_id', testUserId)
      .select();
    
    if (updateError) {
      console.error("Error updating test record:", updateError);
      return { success: false, error: updateError };
    }
    
    console.log("Updated test record:", updateData);
    
    // Verify that the record was updated correctly
    const { data: verifyData, error: verifyError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', testUserId)
      .single();
    
    if (verifyError) {
      console.error("Error verifying test record:", verifyError);
      return { success: false, error: verifyError };
    }
    
    console.log("Verified test record:", verifyData);
    
    if (verifyData.completed === true) {
      console.log("SUCCESS: completed field can be set to true!");
      return { success: true, data: verifyData };
    } else {
      console.error("FAILURE: completed field was not set to true!");
      return { success: false, error: "completed field was not set to true" };
    }
  } catch (error) {
    console.error("Exception testing completed field:", error);
    return { success: false, error };
  }
};

// Make the function available in the browser console
(window as any).testCompletedField = testCompletedField;

export default testCompletedField;

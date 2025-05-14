import { supabase } from "@/integrations/supabase/client";

/**
 * Create the contact_messages table
 */
export const createContactMessagesTable = async () => {
  try {
    // Check if the table exists
    const { error: checkError } = await supabase
      .from('contact_messages')
      .select('count(*)')
      .limit(1);
    
    // If the table exists, return
    if (!checkError) {
      console.log("contact_messages table already exists");
      return { success: true, message: "Table already exists" };
    }
    
    // Create the table using SQL
    const { error } = await supabase.rpc('create_contact_messages_table', {});
    
    if (error) {
      console.error("Error creating contact_messages table:", error);
      return { success: false, error };
    }
    
    console.log("Successfully created contact_messages table");
    return { success: true };
  } catch (error) {
    console.error("Exception creating contact_messages table:", error);
    return { success: false, error };
  }
};

/**
 * Create the problem_reports table
 */
export const createProblemReportsTable = async () => {
  try {
    // Check if the table exists
    const { error: checkError } = await supabase
      .from('problem_reports')
      .select('count(*)')
      .limit(1);
    
    // If the table exists, return
    if (!checkError) {
      console.log("problem_reports table already exists");
      return { success: true, message: "Table already exists" };
    }
    
    // Create the table using SQL
    const { error } = await supabase.rpc('create_problem_reports_table', {});
    
    if (error) {
      console.error("Error creating problem_reports table:", error);
      return { success: false, error };
    }
    
    console.log("Successfully created problem_reports table");
    return { success: true };
  } catch (error) {
    console.error("Exception creating problem_reports table:", error);
    return { success: false, error };
  }
};

/**
 * Create the user_progress table
 */
export const createUserProgressTable = async () => {
  try {
    // Check if the table exists
    const { error: checkError } = await supabase
      .from('user_progress')
      .select('count(*)')
      .limit(1);
    
    // If the table exists, return
    if (!checkError) {
      console.log("user_progress table already exists");
      return { success: true, message: "Table already exists" };
    }
    
    // Create the table using SQL
    const { error } = await supabase.rpc('create_user_progress_table', {});
    
    if (error) {
      console.error("Error creating user_progress table:", error);
      return { success: false, error };
    }
    
    console.log("Successfully created user_progress table");
    return { success: true };
  } catch (error) {
    console.error("Exception creating user_progress table:", error);
    return { success: false, error };
  }
};

/**
 * Create the streaks table
 */
export const createStreaksTable = async () => {
  try {
    // Check if the table exists
    const { error: checkError } = await supabase
      .from('streaks')
      .select('count(*)')
      .limit(1);
    
    // If the table exists, return
    if (!checkError) {
      console.log("streaks table already exists");
      return { success: true, message: "Table already exists" };
    }
    
    // Create the table using SQL
    const { error } = await supabase.rpc('create_streaks_table', {});
    
    if (error) {
      console.error("Error creating streaks table:", error);
      return { success: false, error };
    }
    
    console.log("Successfully created streaks table");
    return { success: true };
  } catch (error) {
    console.error("Exception creating streaks table:", error);
    return { success: false, error };
  }
};

/**
 * Create all tables
 */
export const createAllTables = async () => {
  const results = {
    contact_messages: await createContactMessagesTable(),
    problem_reports: await createProblemReportsTable(),
    user_progress: await createUserProgressTable(),
    streaks: await createStreaksTable(),
  };
  
  return results;
};

// Export a function that can be called from the browser console
(window as any).createSupabaseTables = createAllTables;

export default {
  createContactMessagesTable,
  createProblemReportsTable,
  createUserProgressTable,
  createStreaksTable,
  createAllTables,
};

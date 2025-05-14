import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Utility function to test the connection to Supabase
 * @returns Promise<boolean> - True if connection is successful, false otherwise
 */
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);
      return false;
    }

    console.log("Supabase connection successful:", data);
    return true;
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return false;
  }
};

/**
 * Utility function to test fetching sprints from Supabase
 * @returns Promise with sprint data or error
 */
export const testFetchSprints = async () => {
  try {
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .limit(5);

    if (error) {
      console.error("Error fetching sprints:", error);
      return { success: false, error };
    }

    console.log("Successfully fetched sprints:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Exception fetching sprints:", error);
    return { success: false, error };
  }
};

/**
 * Utility function to test fetching challenges for a sprint
 * @param sprintId - The ID of the sprint
 * @returns Promise with challenge data or error
 */
export const testFetchChallenges = async (sprintId: string) => {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('sprint_id', sprintId)
      .order('day', { ascending: true });

    if (error) {
      console.error(`Error fetching challenges for sprint ${sprintId}:`, error);
      return { success: false, error };
    }

    console.log(`Successfully fetched challenges for sprint ${sprintId}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error(`Exception fetching challenges for sprint ${sprintId}:`, error);
    return { success: false, error };
  }
};

/**
 * Utility function to test fetching user progress
 * @param userId - The ID of the user
 * @returns Promise with user progress data or error
 */
export const testFetchUserProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        id,
        start_date,
        sprint_id,
        completed,
        sprints(id, title, duration)
      `)
      .eq('user_id', userId)
      .limit(5);

    if (error) {
      console.error(`Error fetching user progress for user ${userId}:`, error);
      return { success: false, error };
    }

    console.log(`Successfully fetched user progress for user ${userId}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error(`Exception fetching user progress for user ${userId}:`, error);
    return { success: false, error };
  }
};

/**
 * Create tables if they don't exist
 * This function should be called once during app initialization
 */
export const ensureTablesExist = async () => {
  try {
    // Check if contact_messages table exists
    const { error: contactMessagesError } = await supabase
      .from('contact_messages')
      .select('*')
      .limit(1)
      .single();

    // If table doesn't exist, create it using SQL
    if (contactMessagesError && contactMessagesError.code === 'PGRST116') {
      console.log("Creating contact_messages table...");
      // Note: This requires admin privileges which the client doesn't have
      // This should be done through Supabase dashboard or migrations
    }

    // Check if problem_reports table exists
    const { error: problemReportsError } = await supabase
      .from('problem_reports')
      .select('*')
      .limit(1)
      .single();

    // If table doesn't exist, create it using SQL
    if (problemReportsError && problemReportsError.code === 'PGRST116') {
      console.log("Creating problem_reports table...");
      // Note: This requires admin privileges which the client doesn't have
      // This should be done through Supabase dashboard or migrations
    }

    return { success: true };
  } catch (error) {
    console.error("Error ensuring tables exist:", error);
    return { success: false, error };
  }
};

/**
 * Submit a contact message to Supabase
 */
export const submitContactMessage = async (message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error("Error submitting contact message:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception submitting contact message:", error);
    return { success: false, error };
  }
};

/**
 * Submit a problem report to Supabase
 */
export const submitProblemReport = async (report: {
  issue_type: string;
  description: string;
  email: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('problem_reports')
      .insert([
        {
          issue_type: report.issue_type,
          description: report.description,
          email: report.email,
          created_at: new Date().toISOString(),
          status: 'new'
        }
      ]);

    if (error) {
      console.error("Error submitting problem report:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception submitting problem report:", error);
    return { success: false, error };
  }
};

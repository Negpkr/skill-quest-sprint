
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Challenge, Sprint } from "@/types/sprint";

/**
 * Add additional days to a sprint challenge
 * @param sprintId - The ID of the sprint to extend
 * @param currentDaysCount - Current number of days in the sprint
 * @param additionalDays - Number of days to add
 * @returns Promise with success status and data
 */
export const extendChallenge = async (
  sprintId: string, 
  currentDaysCount: number,
  additionalDays: number = 30
): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log(`Extending challenge ${sprintId} with ${additionalDays} more days`);
    
    // Get the sprint details to use as a reference
    const { data: sprint, error: sprintError } = await supabase
      .from('sprints')
      .select('*')
      .eq('id', sprintId)
      .single();
    
    if (sprintError) {
      console.error("Error fetching sprint:", sprintError);
      return { success: false, error: sprintError };
    }
    
    // Update the sprint duration
    const newDuration = (sprint.duration || currentDaysCount) + additionalDays;
    
    const { error: updateError } = await supabase
      .from('sprints')
      .update({ duration: newDuration })
      .eq('id', sprintId);
    
    if (updateError) {
      console.error("Error updating sprint duration:", updateError);
      return { success: false, error: updateError };
    }
    
    // Create new challenge entries for the additional days
    const newChallenges = [];
    
    // Get the last existing challenge for reference
    const { data: existingChallenges, error: challengesError } = await supabase
      .from('challenges')
      .select('*')
      .eq('sprint_id', sprintId)
      .order('day', { ascending: false })
      .limit(1);
    
    if (challengesError) {
      console.error("Error fetching existing challenges:", challengesError);
      return { success: false, error: challengesError };
    }
    
    const lastChallenge = existingChallenges && existingChallenges.length > 0 ? existingChallenges[0] : null;
    
    // Generate titles based on the sprint topic
    const sprintTopic = sprint.title.includes(":") 
      ? sprint.title.split(":")[1].trim() 
      : sprint.title;
    
    // Create challenges for each new day
    for (let i = 1; i <= additionalDays; i++) {
      const dayNumber = currentDaysCount + i;
      
      newChallenges.push({
        sprint_id: sprintId,
        day: dayNumber,
        title: `Advanced ${sprintTopic} - Day ${i}`,
        description: `Continue building your skills with ${sprintTopic} through today's exercise. Complete this task to maintain your streak!`,
        resources: lastChallenge?.resources || null,
      });
    }
    
    // Insert all new challenges
    if (newChallenges.length > 0) {
      const { error: insertError } = await supabase
        .from('challenges')
        .insert(newChallenges);
      
      if (insertError) {
        console.error("Error inserting new challenges:", insertError);
        return { success: false, error: insertError };
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Exception extending challenge:", error);
    return { success: false, error };
  }
};

/**
 * Save user progress when a task is completed
 * This is an enhanced version that ensures all user progress is properly updated
 */
export const saveTaskCompletion = async (
  sprintId: string,
  userId: string,
  currentDay: number,
  completed: boolean
): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log(`Saving task completion for sprint ${sprintId}, user ${userId}, day ${currentDay}, completed: ${completed}`);
    
    const now = new Date().toISOString();
    
    // Check if user progress exists
    const { data: existingProgress, error: checkError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('sprint_id', sprintId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking existing progress:", checkError);
      return { success: false, error: checkError };
    }
    
    if (existingProgress) {
      // Update existing progress
      const updateData: any = {
        current_day: currentDay,
        completed: completed
      };
      
      // Only update completed_date if marking as completed
      if (completed) {
        updateData.completed_date = now;
      } else {
        updateData.completed_date = null;
      }
      
      const { error: updateError } = await supabase
        .from('user_progress')
        .update(updateData)
        .eq('id', existingProgress.id);
      
      if (updateError) {
        console.error("Error updating progress:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      // Create new progress record
      const insertData: any = {
        user_id: userId,
        sprint_id: sprintId,
        start_date: now,
        current_day: currentDay,
        completed: completed
      };
      
      // Only set completed_date if marking as completed
      if (completed) {
        insertData.completed_date = now;
      }
      
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert([insertData]);
      
      if (insertError) {
        console.error("Error creating progress record:", insertError);
        return { success: false, error: insertError };
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Exception saving task completion:", error);
    return { success: false, error };
  }
};

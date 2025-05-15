
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface ChallengeTask {
  day: number;
  title: string;
  description: string;
}

interface ChallengeTaskList {
  challengeId: string;
  tasks: ChallengeTask[];
}

/**
 * Adds multiple challenge days to an existing sprint
 * @param taskList - List of tasks to add to the challenge
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const addChallengeDays = async (taskList: ChallengeTaskList): Promise<boolean> => {
  const { challengeId, tasks } = taskList;
  
  try {
    console.log(`Adding ${tasks.length} tasks to challenge ${challengeId}`);
    
    // Check if the sprint exists first
    const { data: sprintData, error: sprintError } = await supabase
      .from('sprints')
      .select('id, title')
      .eq('id', challengeId)
      .maybeSingle();

    if (sprintError) {
      console.error("Error checking sprint:", sprintError);
      throw new Error(`Failed to check if sprint exists: ${sprintError.message}`);
    }

    if (!sprintData) {
      console.error(`Sprint with ID ${challengeId} not found`);
      throw new Error(`Sprint with ID ${challengeId} not found`);
    }

    console.log(`Found sprint: ${sprintData.title}`);

    // Prepare tasks for insertion
    const challengeEntries = tasks.map(task => ({
      sprint_id: challengeId,
      day: task.day,
      title: task.title,
      description: task.description,
      content: null, // Set to null or provide appropriate content
      resources: null // Set to null or provide appropriate resources
    }));

    // First check if any of these days already exist
    const { data: existingDays, error: daysError } = await supabase
      .from('challenges')
      .select('day')
      .eq('sprint_id', challengeId);

    if (daysError) {
      console.error("Error checking existing days:", daysError);
      throw new Error(`Failed to check existing days: ${daysError.message}`);
    }

    const existingDayNumbers = existingDays?.map(day => day.day) || [];
    console.log(`Existing days: ${existingDayNumbers.join(", ")}`);

    // Filter out tasks for days that already exist
    const newChallengeEntries = challengeEntries.filter(
      entry => !existingDayNumbers.includes(entry.day)
    );

    if (newChallengeEntries.length === 0) {
      console.log("No new days to add - all days already exist");
      toast({
        title: "No changes needed",
        description: "All of these challenge days already exist.",
      });
      return true;
    }

    console.log(`Adding ${newChallengeEntries.length} new challenge days`);

    // Insert the new tasks
    const { data, error } = await supabase
      .from('challenges')
      .insert(newChallengeEntries)
      .select();

    if (error) {
      console.error("Error adding challenge days:", error);
      throw new Error(`Failed to add challenge days: ${error.message}`);
    }

    console.log(`Successfully added ${data?.length} challenge days`);
    toast({
      title: "Challenge updated",
      description: `Successfully added ${data?.length} new days to the challenge.`,
    });

    return true;
  } catch (error) {
    console.error("Error in addChallengeDays:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to add challenge days",
      variant: "destructive",
    });
    return false;
  }
};

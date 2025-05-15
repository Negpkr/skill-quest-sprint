
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Sprint } from "@/types/sprint";

export const addMoreChallengeDays = async (
  sprintId: string,
  currentChallengeDays: number = 30,
  additionalDays: number = 30
) => {
  try {
    // Fetch the current sprint
    const { data: sprint, error: sprintError } = await supabase
      .from("sprints")
      .select("*")
      .eq("id", sprintId)
      .single();

    if (sprintError) {
      console.error("Error fetching sprint:", sprintError);
      toast({
        title: "Error",
        description: "Failed to fetch sprint information.",
        variant: "destructive",
      });
      return null;
    }

    // Generate additional days of challenges
    const newChallenges = [];
    const canvaDesignChallenges = [
      "Create a social media post using Canva templates",
      "Design a business card from scratch",
      "Create a presentation slide deck",
      "Design an Instagram story",
      "Create a Facebook cover image",
      "Design a YouTube thumbnail",
      "Create a logo using Canva",
      "Design a flyer for an event",
      "Create a resume/CV in Canva",
      "Design a Twitter header",
      "Create a Pinterest pin graphic",
      "Design a digital invitation",
      "Create an infographic",
      "Design a menu for a restaurant",
      "Create an ebook cover",
      "Design a LinkedIn banner",
      "Create a certificate design",
      "Design a poster",
      "Create a media kit page",
      "Design a newsletter template",
      "Create a blog post header image",
      "Design brand guidelines",
      "Create a mood board",
      "Design social media quote graphics",
      "Create a photo collage",
      "Design a product label",
      "Create a booklet or brochure",
      "Design animated social media posts",
      "Create a calendar design",
      "Master Canva Pro features"
    ];

    for (let i = 0; i < additionalDays; i++) {
      const dayNumber = currentChallengeDays + i + 1;
      const challengeTitle = dayNumber <= canvaDesignChallenges.length 
        ? canvaDesignChallenges[i % canvaDesignChallenges.length] 
        : `Day ${dayNumber} Canva design challenge`;
      
      newChallenges.push({
        sprint_id: sprintId,
        day: dayNumber,
        title: `Day ${dayNumber}: ${challengeTitle}`,
        description: `Complete today's task to continue building your Canva design skills.`,
        content: `# Day ${dayNumber}: ${challengeTitle}\n\nToday, you'll work on ${challengeTitle.toLowerCase()}. This will help you improve your design skills and become more familiar with Canva's features.\n\n## Instructions:\n\n1. Sign in to your Canva account\n2. Navigate to the templates or start a new design\n3. Create your design following today's theme\n4. Save and download your work\n5. Mark this task as complete when you're done`,
        resources: JSON.stringify([
          {
            title: "Canva Official Tutorials",
            url: "https://www.canva.com/learn/"
          },
          {
            title: "Design Tips for Today's Challenge",
            url: "https://www.canva.com/design-tips/"
          }
        ])
      });
    }

    // Insert the new challenges
    const { error: insertError } = await supabase
      .from("challenges")
      .insert(newChallenges);

    if (insertError) {
      console.error("Error adding challenge days:", insertError);
      toast({
        title: "Error",
        description: "Failed to add additional challenge days.",
        variant: "destructive",
      });
      return null;
    }

    // Update the sprint duration
    const newDuration = currentChallengeDays + additionalDays;
    const { error: updateError } = await supabase
      .from("sprints")
      .update({ duration: newDuration })
      .eq("id", sprintId);

    if (updateError) {
      console.error("Error updating sprint duration:", updateError);
      toast({
        title: "Error",
        description: "Failed to update sprint duration.",
        variant: "destructive",
      });
      return null;
    }

    // Return updated sprint
    return {
      ...sprint,
      duration: newDuration
    };
  } catch (error) {
    console.error("Error in addMoreChallengeDays:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { addChallengeDays } from "@/utils/addChallengeDays";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// This is our task list data from the specification
const canvaTaskList = {
  "challengeId": "7f649785-a610-40d7-b144-29c36fc14628",
  "tasks": [
    {
      "day": 2,
      "title": "Create First Instagram Post",
      "description": "Use a Canva template to create a basic Instagram post. Explore elements like text, color, and layout."
    },
    {
      "day": 3,
      "title": "Practice Adding Text & Images",
      "description": "Learn to insert text, upload images, and play with font settings."
    },
    {
      "day": 4,
      "title": "Customize a Template",
      "description": "Duplicate a template and make it your own by changing colors, photos, and text."
    },
    {
      "day": 5,
      "title": "Explore Alignment & Grouping",
      "description": "Use the 'Position' and 'Group' tools to align elements neatly in your design."
    },
    {
      "day": 6,
      "title": "Test Color & Font Combinations",
      "description": "Create 3 versions of a post using different colors and fonts."
    },
    {
      "day": 7,
      "title": "Weekly Review",
      "description": "Reflect on what you've learned so far. Save all designs in a folder."
    },
    {
      "day": 8,
      "title": "Use Brand Kit",
      "description": "Add your brand color and font (use free tools or Canva Pro trial)."
    },
    {
      "day": 9,
      "title": "Design a Simple Logo",
      "description": "Use only shapes and text to make a logo for yourself or a made-up brand."
    },
    {
      "day": 10,
      "title": "Create a YouTube Thumbnail",
      "description": "Use a Canva template to design a thumbnail for a video idea."
    },
    {
      "day": 11,
      "title": "Edit Images",
      "description": "Learn to crop, flip, apply filters, and adjust brightness/contrast."
    },
    {
      "day": 12,
      "title": "Use Canva Elements",
      "description": "Create a mood board using icons, illustrations, and stickers."
    },
    {
      "day": 13,
      "title": "Create a Carousel Post",
      "description": "Design 3 connected slides for a single carousel (e.g., for Instagram)."
    },
    {
      "day": 14,
      "title": "Weekly Review",
      "description": "Review your Week 2 work. Look for consistency in colors, fonts, and layout."
    },
    {
      "day": 15,
      "title": "Add Animation",
      "description": "Animate text or objects in a design. Export as GIF or MP4."
    },
    {
      "day": 16,
      "title": "Try Canva Video",
      "description": "Create a 10-second video using stock clips, music, and text."
    },
    {
      "day": 17,
      "title": "Make a Presentation Slide",
      "description": "Design 1–3 clean slides on a topic you like."
    },
    {
      "day": 18,
      "title": "Use Charts or Infographics",
      "description": "Build a small visual infographic using Canva's chart tool."
    },
    {
      "day": 19,
      "title": "Focus on Layout Simplicity",
      "description": "Design a poster or post with good white space and visual hierarchy."
    },
    {
      "day": 20,
      "title": "Make a Worksheet",
      "description": "Design a simple worksheet or checklist using Canva's layout tools."
    },
    {
      "day": 21,
      "title": "Weekly Review",
      "description": "Review all animations, slides, and videos created. What's your favorite?"
    },
    {
      "day": 22,
      "title": "Pick a Design Niche",
      "description": "Choose a theme like fitness, tech, food. Research 2 trends in that area."
    },
    {
      "day": 23,
      "title": "Mockup for a Brand",
      "description": "Create a sample logo, post, and flyer for a fictional brand."
    },
    {
      "day": 24,
      "title": "Create Your Portfolio",
      "description": "Build a Canva presentation or PDF showing your best 5 designs."
    },
    {
      "day": 25,
      "title": "Design a LinkedIn Banner",
      "description": "Create a clean and professional banner for your profile."
    },
    {
      "day": 26,
      "title": "Publish 1 Design",
      "description": "Share one of your Canva designs online (Instagram, LinkedIn, or GitHub)."
    },
    {
      "day": 27,
      "title": "Try Canva Docs or Website",
      "description": "Explore Canva Docs or design a simple one-page Canva Website."
    },
    {
      "day": 28,
      "title": "Organize Your Files",
      "description": "Sort all designs into folders. Rename them with clear titles."
    },
    {
      "day": 29,
      "title": "Reflect on Progress",
      "description": "Write 3 things you've improved and 1 thing you want to learn more."
    },
    {
      "day": 30,
      "title": "Final Showcase",
      "description": "Share your full portfolio or a screen-recorded walkthrough. Celebrate!"
    }
  ]
};

interface AddChallengeDaysProps {
  challengeId: string;
}

const AddChallengeDays: React.FC<AddChallengeDaysProps> = ({ challengeId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Function to handle adding tasks
  const handleAddDays = async () => {
    setIsAdding(true);
    try {
      // Update the challengeId in the task list to match the current challenge
      const taskList = {
        ...canvaTaskList,
        challengeId
      };
      
      const success = await addChallengeDays(taskList);
      if (success) {
        // Refresh the page to show new challenge days
        navigate(0); // This will refresh the current page
      }
    } catch (error) {
      console.error("Error adding challenge days:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-4 mb-6">
      <Button 
        onClick={handleAddDays} 
        disabled={isAdding}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isAdding ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding Challenge Days...
          </>
        ) : (
          <>
            Add Days 2-30
          </>
        )}
      </Button>
    </div>
  );
};

export default AddChallengeDays;

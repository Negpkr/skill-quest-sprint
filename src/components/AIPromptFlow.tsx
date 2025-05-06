
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface AIPromptFlowProps {
  skill: string;
  onComplete: () => void;
}

interface Task {
  id: string;
  title: string;
  day: number;
  description?: string;
}

const AIPromptFlow: React.FC<AIPromptFlowProps> = ({ skill, onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  
  // Simulated AI generated tasks - in a real app, this would call an OpenAI API endpoint
  const generateTasks = (skill: string) => {
    // This is a simulation of what an AI might return
    const baseTasksForSkill: { [key: string]: Task[] } = {
      "photography": [
        { id: "1", title: "Choose your camera or smartphone", day: 1 },
        { id: "2", title: "Learn basic composition rules", day: 2 },
        { id: "3", title: "Practice with natural light", day: 3 },
        // More tasks would be here
      ],
      "podcast": [
        { id: "1", title: "Define your podcast topic and audience", day: 1 },
        { id: "2", title: "Research basic equipment needed", day: 2 },
        { id: "3", title: "Create an intro script", day: 3 },
        // More tasks would be here
      ],
      "canva": [
        { id: "1", title: "Sign up for Canva account", day: 1 },
        { id: "2", title: "Learn the basic interface", day: 2 },
        { id: "3", title: "Create your first social media template", day: 3 },
        // More tasks would be here
      ]
    };
    
    // Detect which predefined skill set to use or generate generic tasks
    const lowerSkill = skill.toLowerCase();
    let matchedCategory = Object.keys(baseTasksForSkill).find(key => 
      lowerSkill.includes(key)
    );
    
    if (!matchedCategory) {
      // Generate generic tasks for unrecognized skills
      return Array.from({ length: 30 }, (_, i) => ({
        id: `gen-${i+1}`,
        title: `Day ${i+1}: ${i < 10 ? 'Learn basics of' : i < 20 ? 'Practice' : 'Create project with'} ${skill}`,
        day: i+1,
        description: `Complete your task for day ${i+1} of your ${skill} learning journey`
      }));
    }
    
    // Return predefined tasks for recognized skills
    return baseTasksForSkill[matchedCategory];
  };
  
  useEffect(() => {
    // In a real implementation, this would be an API call to OpenAI or similar
    setTimeout(() => {
      const generatedTasks = generateTasks(skill);
      setTasks(generatedTasks);
      setLoading(false);
    }, 2000); // Simulate API delay
  }, [skill]);
  
  const handleSaveSprint = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // First create a custom sprint
      const { data: sprintData, error: sprintError } = await supabase
        .from('sprints')
        .insert([
          {
            title: `Custom: ${skill}`,
            description: `A custom 30-day sprint to learn ${skill}`,
            category: 'Custom',
            difficulty: 'Beginner',
            cover_image: 'https://placehold.co/600x400/e5deff/7e69ab?text=Custom+Sprint'
          }
        ])
        .select();
      
      if (sprintError) throw sprintError;
      if (!sprintData || sprintData.length === 0) throw new Error('Failed to create sprint');
      
      const sprintId = sprintData[0].id;
      
      // Then add the tasks as challenges
      const challengePromises = tasks.map(task => 
        supabase
          .from('challenges')
          .insert([{
            title: task.title,
            description: task.description || '',
            sprint_id: sprintId,
            day: task.day
          }])
      );
      
      await Promise.all(challengePromises);
      
      // Finally add the sprint to user_progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert([{
          user_id: user.id,
          sprint_id: sprintId,
          start_date: new Date().toISOString()
        }]);
      
      if (progressError) throw progressError;
      
      toast({
        title: "Success!",
        description: `Your custom ${skill} sprint has been created and added to your dashboard.`,
      });
      
      onComplete();
    } catch (error: any) {
      console.error("Error saving sprint:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create your sprint. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Custom 30-Day Plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've created a personalized plan to help you learn {skill} in 30 days
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-skillpurple-500 mb-4" />
            <p className="text-muted-foreground">
              {tasks.length === 0 
                ? "Generating your personalized plan..." 
                : "Saving your custom sprint..."}
            </p>
          </div>
        ) : (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your 30-Day Task Plan for {skill}</CardTitle>
                <CardDescription>
                  Complete these micro-tasks day by day to build your skill and launch a side hustle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {tasks.slice(0, 10).map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 border-b pb-3">
                      <Checkbox id={`task-${task.id}`} />
                      <div>
                        <label
                          htmlFor={`task-${task.id}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Day {task.day}: {task.title}
                        </label>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {tasks.length > 10 && (
                    <div className="text-center text-muted-foreground text-sm pt-4">
                      + {tasks.length - 10} more tasks for your 30-day sprint
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={handleSaveSprint} 
                    className="w-full bg-skillpurple-400 hover:bg-skillpurple-500"
                  >
                    Start My Journey to Learn {skill}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">What's Next?</h3>
              <p className="text-muted-foreground">
                Once you start your journey, you'll see your daily tasks in your dashboard. 
                Complete each task to build your streak and track your progress.
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AIPromptFlow;

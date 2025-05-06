
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import AIPromptFlow from "../components/AIPromptFlow";

const StartSprint: React.FC = () => {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const [customSkill, setCustomSkill] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleStartSprint = async () => {
    if (!selectedSprint || !user) return;
    
    setIsLoading(true);
    
    try {
      if (selectedSprint === 'custom') {
        // Show AI prompt flow for custom skill
        setShowAIPrompt(true);
      } else {
        // Add selected pre-defined sprint to user progress
        const { error } = await supabase
          .from('user_progress')
          .insert([
            { 
              user_id: user.id,
              sprint_id: selectedSprint,
              start_date: new Date().toISOString(),
              completed: false
            }
          ]);
          
        if (error) throw error;
        
        toast({
          title: "Sprint added!",
          description: "The sprint has been added to your dashboard.",
        });
        
        navigate(`/challenge/${selectedSprint}`);
      }
    } catch (error: any) {
      console.error("Error starting sprint:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start sprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const sprints = [
    {
      id: "design-starter",
      title: "Design Starter Sprint",
      description: "Learn graphic design fundamentals and create your first portfolio pieces"
    },
    {
      id: "web-dev",
      title: "Web Dev Sprint",
      description: "Build your first website with HTML, CSS and JavaScript"
    },
    {
      id: "freelance",
      title: "Freelance Starter Pack",
      description: "Set up your freelance business and land your first client"
    }
  ];

  if (showAIPrompt) {
    return <AIPromptFlow skill={customSkill} onComplete={() => navigate("/dashboard")} />;
  }

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Start Your Skill Sprint</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a 30-day sprint or create your own custom skill challenge. Your journey to new skills and side income begins here.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Choose a Sprint</h2>
        <div className="space-y-6">
          {sprints.map((sprint) => (
            <Card 
              key={sprint.id} 
              className={`cursor-pointer transition-all ${selectedSprint === sprint.id ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
              onClick={() => setSelectedSprint(sprint.id)}
            >
              <CardHeader>
                <CardTitle>{sprint.title}</CardTitle>
                <CardDescription>{sprint.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          
          <Card 
            className={`cursor-pointer transition-all ${selectedSprint === 'custom' ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
            onClick={() => setSelectedSprint('custom')}
          >
            <CardHeader>
              <CardTitle>Create Custom Sprint</CardTitle>
              <CardDescription>Define your own 30-day sprint with a custom skill you want to learn</CardDescription>
            </CardHeader>
            {selectedSprint === 'custom' && (
              <CardContent>
                <div>
                  <Label htmlFor="customSkill">What skill do you want to learn?</Label>
                  <Input 
                    id="customSkill" 
                    placeholder="E.g., Photography, Podcast Creation, Python Programming, etc."
                    className="mt-1"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                  />
                </div>
              </CardContent>
            )}
          </Card>
          
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleStartSprint}
              disabled={!selectedSprint || isLoading}
              className="bg-skillpurple-400 hover:bg-skillpurple-500"
            >
              {isLoading ? "Starting..." : "Start My 30-Day Sprint"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartSprint;


import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SprintOption {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

const StartSprint: React.FC = () => {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprints, setSprints] = useState<SprintOption[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Fetch sprints from database on component mount
  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const { data, error } = await supabase
          .from('sprints')
          .select('id, title, description, category, difficulty')
          .order('title');
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setSprints(data);
        } else {
          // Fallback to default sprints if no data in database
          setSprints([
            {
              id: "00000000-0000-0000-0000-000000000001", // Using placeholder UUIDs
              title: "Design Starter Sprint",
              description: "Learn graphic design fundamentals and create your first portfolio pieces",
              category: "Design",
              difficulty: "Beginner"
            },
            {
              id: "00000000-0000-0000-0000-000000000002",
              title: "Web Dev Sprint",
              description: "Build your first website with HTML, CSS and JavaScript",
              category: "Tech",
              difficulty: "Intermediate"
            },
            {
              id: "00000000-0000-0000-0000-000000000003",
              title: "Freelance Starter Pack",
              description: "Set up your freelance business and land your first client",
              category: "Freelance",
              difficulty: "Beginner"
            }
          ]);
        }
      } catch (error: any) {
        console.error("Error fetching sprints:", error);
        toast({
          title: "Error",
          description: "Failed to load sprints. Using default options.",
          variant: "destructive",
        });
        
        // Use hardcoded sprints as fallback
        setSprints([
          {
            id: "00000000-0000-0000-0000-000000000001",
            title: "Design Starter Sprint",
            description: "Learn graphic design fundamentals and create your first portfolio pieces",
            category: "Design",
            difficulty: "Beginner"
          },
          {
            id: "00000000-0000-0000-0000-000000000002",
            title: "Web Dev Sprint",
            description: "Build your first website with HTML, CSS and JavaScript",
            category: "Tech",
            difficulty: "Intermediate"
          },
          {
            id: "00000000-0000-0000-0000-000000000003",
            title: "Freelance Starter Pack",
            description: "Set up your freelance business and land your first client",
            category: "Freelance",
            difficulty: "Beginner"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSprints();
  }, []);
  
  const handleStartSprint = async () => {
    if (!selectedSprint || !user) return;
    
    setIsLoading(true);
    
    try {
      // Add selected sprint to user progress
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
      
      navigate('/dashboard');
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

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Start Your Skill Sprint</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a 30-day sprint to learn new skills and build your side hustle.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Choose a Sprint</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {sprints.map((sprint) => (
              <Card 
                key={sprint.id} 
                className={`cursor-pointer transition-all ${selectedSprint === sprint.id ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
                onClick={() => setSelectedSprint(sprint.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{sprint.title}</CardTitle>
                      <CardDescription>{sprint.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                        {sprint.category}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                        {sprint.difficulty}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
            
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
        )}
      </div>
    </Layout>
  );
};

export default StartSprint;

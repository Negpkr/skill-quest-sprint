
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SprintOption {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

export const useSprintOptions = () => {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprints, setSprints] = useState<SprintOption[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch sprints from database on hook initialization
  useEffect(() => {
    fetchSprints();
  }, []);

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

  return {
    sprints,
    isLoading,
    selectedSprint,
    setSelectedSprint,
    handleStartSprint
  };
};

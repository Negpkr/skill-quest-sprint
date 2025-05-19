import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SprintProgress {
  id: string;
  sprint_id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  start_date: string;
  current_day: number;
  total_days: number;
  completed: boolean;
  completed_date?: string;
  progress_percent: number;
  slug?: string;
}

interface UseUserSprintsReturn {
  sprints: SprintProgress[];
  activeSprint: SprintProgress | null;
  completedSprints: SprintProgress[];
  isLoading: boolean;
  error: Error | null;
  refreshSprints: () => Promise<void>;
}

export const useUserSprints = (userId: string | undefined): UseUserSprintsReturn => {
  const [sprints, setSprints] = useState<SprintProgress[]>([]);
  const [activeSprint, setActiveSprint] = useState<SprintProgress | null>(null);
  const [completedSprints, setCompletedSprints] = useState<SprintProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserSprints = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      
      // Fetch all user progress with sprint details
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select(`
          id,
          user_id,
          sprint_id,
          start_date,
          completed_date,
          current_day,
          completed,
          sprints (
            id,
            title,
            description,
            duration,
            difficulty,
            category,
            slug
          )
        `)
        .eq('user_id', userId)
        .order('start_date', { ascending: false });

      if (progressError) throw progressError;

      if (!userProgress || userProgress.length === 0) {
        setIsLoading(false);
        return; // No sprints found
      }

      // Process the data
      const processedSprints = userProgress.map(progress => {
        const sprint = progress.sprints as any;
        const startDate = new Date(progress.start_date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalDays = sprint.duration || 30;
        const currentDay = progress.current_day || Math.min(diffDays, totalDays);
        
        return {
          id: progress.id,
          sprint_id: progress.sprint_id,
          title: sprint.title,
          description: sprint.description,
          category: sprint.category,
          difficulty: sprint.difficulty,
          start_date: progress.start_date,
          current_day: currentDay,
          total_days: totalDays,
          completed: progress.completed,
          completed_date: progress.completed_date,
          progress_percent: Math.min((currentDay / totalDays) * 100, 100),
          slug: sprint.slug
        };
      });

      // Set all sprints
      setSprints(processedSprints);
      
      // Set active sprint (first non-completed sprint)
      const active = processedSprints.find(sprint => !sprint.completed);
      setActiveSprint(active || null);
      
      // Set completed sprints
      const completed = processedSprints.filter(sprint => sprint.completed);
      setCompletedSprints(completed);
      
    } catch (error) {
      console.error("Error fetching user sprints:", error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
      toast({
        title: "Error",
        description: "Failed to load sprint data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (!userId) return;
    fetchUserSprints();
  }, [userId]);

  // Function to refresh data
  const refreshSprints = async () => {
    await fetchUserSprints();
  };

  return { 
    sprints, 
    activeSprint, 
    completedSprints,
    isLoading, 
    error,
    refreshSprints
  };
};

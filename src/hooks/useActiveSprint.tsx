
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Sprint {
  id: string;
  title: string;
  current_day: number;
  total_days: number;
  progress_percent: number;
}

interface UseActiveSprintReturn {
  activeSprint: Sprint | null;
  todaysTasks: Task[];
  isLoading: boolean;
  error: Error | null;
}

export const useActiveSprint = (userId: string | undefined): UseActiveSprintReturn => {
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchActiveSprintData = async () => {
      try {
        // Fetch active sprints for the user
        const { data: userProgress, error: progressError } = await supabase
          .from('user_progress')
          .select(`
            id,
            start_date,
            sprint_id,
            completed,
            sprints(id, title, duration)
          `)
          .eq('user_id', userId)
          .eq('completed', false)
          .order('start_date', { ascending: false })
          .limit(1);
        
        if (progressError) throw progressError;
        
        if (userProgress && userProgress.length > 0) {
          const progress = userProgress[0];
          const startDate = new Date(progress.start_date);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const totalDays = (progress.sprints as any).duration || 30;
          
          setActiveSprint({
            id: progress.sprint_id,
            title: (progress.sprints as any).title,
            current_day: Math.min(diffDays, totalDays),
            total_days: totalDays,
            progress_percent: Math.min((diffDays / totalDays) * 100, 100)
          });
          
          // Fetch today's tasks for this sprint
          const { data: challenges, error: challengesError } = await supabase
            .from('challenges')
            .select('id, title, description')
            .eq('sprint_id', progress.sprint_id)
            .eq('day', Math.min(diffDays, totalDays));
          
          if (challengesError) throw challengesError;
          
          if (challenges && challenges.length > 0) {
            setTodaysTasks(challenges.map(challenge => ({
              id: challenge.id,
              title: challenge.title,
              completed: false
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching active sprint data:", error);
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
    
    fetchActiveSprintData();
  }, [userId]);

  return { activeSprint, todaysTasks, isLoading, error };
};

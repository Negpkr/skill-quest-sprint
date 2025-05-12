
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { findSprintIdBySlug } from "@/utils/sprintUtils";

export const useChallengeProgress = (id: string | undefined, user: User | null, sprintDuration: number = 30) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [taskCompleted, setTaskCompleted] = useState(false);
  
  useEffect(() => {
    if (!user || !id) return;
    
    fetchUserProgress(id, sprintDuration);
  }, [id, user, sprintDuration]);
  
  const fetchUserProgress = async (sprintId: string, duration: number = 30) => {
    if (!user) return;
    
    try {
      const processedId = findSprintIdBySlug(sprintId);
      
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', processedId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (progressError && progressError.code !== 'PGSQL_NO_ROWS_RETURNED') {
        console.error("Progress error from Supabase:", progressError);
      }
      
      // Calculate current day if progress data exists
      if (progressData) {
        const startDate = new Date(progressData.start_date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setCurrentDay(Math.min(diffDays, duration || 30));
        
        // Check if today's task is already completed
        if (progressData.completed_date) {
          const lastCompleted = new Date(progressData.completed_date);
          if (lastCompleted.toDateString() === currentDate.toDateString()) {
            setTaskCompleted(true);
          }
        }
      }
    } catch (progressErr) {
      console.error("Error fetching progress:", progressErr);
    }
  };
  
  return {
    currentDay,
    taskCompleted,
    setTaskCompleted
  };
};

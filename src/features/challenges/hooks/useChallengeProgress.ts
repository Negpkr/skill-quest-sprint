
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { findSprintIdBySlug } from "@/utils/sprintUtils";
import { toast } from "@/components/ui/use-toast";
import { testFetchUserProgress } from "@/utils/supabaseUtils";

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
      // Use the sprint ID directly - it's already a UUID
      console.log("Fetching user progress for sprint:", sprintId, "and user:", user.id);

      // Now try the actual query for this specific sprint
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('sprint_id', sprintId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (progressError) {
        console.error("Progress error from Supabase:", progressError);

        // Only show error if it's not just "no rows returned"
        if (progressError.code !== 'PGRST116' && progressError.code !== 'PGSQL_NO_ROWS_RETURNED') {
          toast({
            title: "Error loading progress",
            description: "There was a problem loading your progress data.",
            variant: "destructive",
          });
        } else {
          console.log("No progress data found for this sprint and user");

          // If no progress data exists, create a new entry
          const { error: insertError } = await supabase
            .from('user_progress')
            .insert([{
              user_id: user.id,
              sprint_id: sprintId,
              start_date: new Date().toISOString(),
              current_day: 1,
              completed: false
            }]);

          if (insertError) {
            console.error("Error creating progress record:", insertError);
          } else {
            console.log("Created new progress record for user");
            // Set current day to 1 for a new sprint
            setCurrentDay(1);
          }
        }
        return;
      }

      // Calculate current day if progress data exists
      if (progressData) {
        console.log("Found progress data:", progressData);

        // Check if the current_day field exists, if not, handle it gracefully
        if (progressData.current_day === undefined) {
          console.log("current_day field is missing, calculating based on start date");

          // If current_day is missing, we'll calculate it based on the start date
          // and store it in a local variable instead of trying to update the database
          // This avoids errors when the column doesn't exist
          const startDate = new Date(progressData.start_date);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const calculatedDay = Math.min(diffDays, duration || 30);

          // Add the current_day property to the progressData object
          progressData.current_day = calculatedDay > 0 ? calculatedDay : 1;

          console.log("Calculated current_day:", progressData.current_day);

          // Show a toast message to the user
          toast({
            title: "Database Issue Detected",
            description: "Please visit the Supabase Test page to fix database structure issues.",
            variant: "destructive",
          });
        }

        // Check if the sprint is already marked as completed
        if (progressData.completed === true) {
          console.log("Sprint is already marked as completed");
          setTaskCompleted(true);
          setCurrentDay(progressData.current_day || 1);
          return;
        }

        if (!progressData.start_date) {
          console.error("Progress data missing start_date:", progressData);
          // Update the record with a start date
          const { error: updateError } = await supabase
            .from('user_progress')
            .update({
              start_date: new Date().toISOString(),
              current_day: 1,
              completed: false
            })
            .eq('id', progressData.id);

          if (updateError) {
            console.error("Error updating progress start date:", updateError);
          }

          setCurrentDay(1);
          return;
        }

        const startDate = new Date(progressData.start_date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Ensure we don't exceed the sprint duration
        const calculatedDay = Math.min(diffDays, duration || 30);
        console.log("Calculated current day:", calculatedDay, "from start date:", startDate);
        setCurrentDay(calculatedDay > 0 ? calculatedDay : 1);

        // Check if today's task is already completed
        if (progressData.completed_date) {
          const lastCompleted = new Date(progressData.completed_date);
          if (lastCompleted.toDateString() === currentDate.toDateString()) {
            console.log("Task already completed today");
            setTaskCompleted(true);
          } else {
            console.log("Task not completed today. Last completed:", lastCompleted);
            setTaskCompleted(false);
          }
        }
      } else {
        console.log("No progress data found after query");
      }
    } catch (progressErr) {
      console.error("Error fetching progress:", progressErr);
      toast({
        title: "Error loading progress",
        description: "There was a problem loading your progress data.",
        variant: "destructive",
      });
    }
  };

  return {
    currentDay,
    taskCompleted,
    setTaskCompleted
  };
};

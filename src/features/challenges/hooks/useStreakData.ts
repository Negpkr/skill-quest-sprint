
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StreakData {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

export const useStreakData = (userId: string | undefined) => {
  const [streakDays, setStreakDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStreakData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setStreakDays(data.current_streak || 0);
      }
    } catch (error) {
      console.error("Error fetching streak data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStreakData();
  }, [userId]);

  const refreshStreak = () => {
    fetchStreakData();
  };

  return {
    streakDays,
    isLoading,
    refreshStreak,
  };
};

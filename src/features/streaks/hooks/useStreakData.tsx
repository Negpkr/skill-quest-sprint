
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RealtimeChannel } from "@supabase/supabase-js";

export const useStreakData = (userId: string | undefined): {
  streakDays: number;
  isLoading: boolean;
  refreshStreak: () => Promise<void>;
} => {
  const [streakDays, setStreakDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const fetchStreakData = useCallback(async () => {
    if (!userId) return;

    try {
      console.log("Fetching streak data for user:", userId);
      setIsLoading(true);

      // Fetch user streak - using maybeSingle() instead of single()
      const { data: streakData, error: streakError } = await supabase
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .maybeSingle();

      if (streakError && streakError.code !== 'PGRST116') {
        // Only throw if it's not the "no rows returned" error
        throw streakError;
      }

      if (streakData) {
        console.log("Found streak data:", streakData);
        setStreakDays(streakData.current_streak || 0);
      } else {
        console.log("No streak data found, creating new record");
        // If no streak found, create a new streak record
        const { error: createError } = await supabase
          .from('streaks')
          .insert([{ user_id: userId, current_streak: 0, longest_streak: 0 }]);

        if (createError) {
          console.error("Error creating streak record:", createError);
        }
      }
    } catch (error) {
      console.error("Error fetching streak data:", error);
      toast({
        title: "Error",
        description: "Failed to load streak data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Set up realtime subscription to streak changes
  useEffect(() => {
    if (!userId) return;

    // Initial fetch
    fetchStreakData();

    // Set up realtime subscription
    const streakChannel = supabase
      .channel(`streak-changes-${userId}`) // Make channel name unique per user
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'streaks',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('Streak change detected:', payload);
          fetchStreakData();
        }
      )
      .subscribe((status) => {
        console.log(`Streak channel status for user ${userId}:`, status);
      });

    setChannel(streakChannel);

    // Also subscribe to user_progress changes as they might affect streaks
    const progressChannel = supabase
      .channel(`progress-changes-${userId}`) // Make channel name unique per user
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('User progress change detected:', payload);
          // Refresh streak data when user completes a task
          if (payload.new && payload.new.completed) {
            fetchStreakData();
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      supabase.removeChannel(progressChannel);
    };
  }, [userId, fetchStreakData]);

  // Function to manually refresh streak data
  const refreshStreak = useCallback(async () => {
    await fetchStreakData();
  }, [fetchStreakData]);

  return { streakDays, isLoading, refreshStreak };
};

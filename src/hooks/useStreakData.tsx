
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useStreakData = (userId: string | undefined): { streakDays: number; isLoading: boolean } => {
  const [streakDays, setStreakDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    const fetchStreakData = async () => {
      try {
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
          setStreakDays(streakData.current_streak || 0);
        } else {
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
    };
    
    fetchStreakData();
  }, [userId]);

  return { streakDays, isLoading };
};

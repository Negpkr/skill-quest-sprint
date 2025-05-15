
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Challenge, Sprint } from "@/types/sprint";

export const useChallengeFetch = (id: string | undefined) => {
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      setNotFound(true);
      return;
    }

    try {
      setIsLoading(true);

      // Fetch sprint data
      console.log("Fetching sprint with ID:", id);
      const { data: sprintData, error: sprintError } = await supabase
        .from("sprints")
        .select("*")
        .eq("id", id)
        .single();

      if (sprintError || !sprintData) {
        console.error("Error fetching sprint:", sprintError);
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setSprint(sprintData as Sprint);

      // Fetch challenges
      const { data: challengesData, error: challengesError } = await supabase
        .from("challenges")
        .select("*")
        .eq("sprint_id", id)
        .order("day", { ascending: true });

      if (challengesError) {
        console.error("Error fetching challenges:", challengesError);
        setIsLoading(false);
        return;
      }

      setChallenges(challengesData as Challenge[]);
    } catch (error) {
      console.error("Exception fetching sprint data:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to refresh data (for use after extending a challenge)
  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    sprint,
    challenges,
    isLoading,
    notFound,
    refreshData
  };
};


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { findSprintIdBySlug } from "@/utils/sprintUtils";
import { useFallbackData } from "@/hooks/useFallbackData";
import { Sprint, Challenge } from "@/types/sprint";

export const useChallengeFetch = (id: string | undefined) => {
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Get the fallback data function
  const useFallbackSprint = useFallbackData(id, setSprint, setChallenges, setNotFound);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    const fetchChallengeData = async () => {
      try {
        // Process the ID to handle both string IDs and UUIDs
        const processedId = findSprintIdBySlug(id);
        console.log("Processing ID:", id, "to:", processedId);
        
        if (!processedId) {
          console.error("Invalid ID and no mapping found:", id);
          setNotFound(true);
          setIsLoading(false);
          return;
        }
        
        // First, try to fetch from Supabase
        try {
          console.log("Fetching sprint with ID:", processedId);
          
          // Fetch sprint details
          const { data: sprintData, error: sprintError } = await supabase
            .from('sprints')
            .select('*')
            .eq('id', processedId)
            .single();
          
          if (sprintError) {
            console.error("Sprint error from Supabase:", sprintError);
            throw sprintError;
          }
          
          if (sprintData) {
            console.log("Successfully fetched sprint data:", sprintData);
            setSprint(sprintData);
            
            // Fetch all challenges for this sprint
            const { data: challengeData, error: challengeError } = await supabase
              .from('challenges')
              .select('*')
              .eq('sprint_id', processedId)
              .order('day', { ascending: true });
            
            if (challengeError) {
              console.error("Challenge error from Supabase:", challengeError);
              throw challengeError;
            }
            
            if (challengeData && challengeData.length > 0) {
              console.log("Successfully fetched challenge data:", challengeData);
              setChallenges(challengeData);
            } else {
              console.log("No challenges found for this sprint, using fallback data");
              // If no challenges found, try to use mock data
              useFallbackSprint();
            }
          } else {
            console.log("No sprint data found in Supabase, using fallback data");
            useFallbackSprint();
          }
        } catch (supabaseErr) {
          console.error("Supabase error:", supabaseErr);
          console.log("Falling back to static data");
          useFallbackSprint();
        }
      } catch (error) {
        console.error("Error in fetchChallengeData:", error);
        useFallbackSprint();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallengeData();
  }, [id]);

  return {
    sprint,
    challenges,
    isLoading,
    notFound
  };
};

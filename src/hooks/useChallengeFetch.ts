
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { findSprintIdBySlug } from "@/utils/sprintUtils";
import { useFallbackData } from "@/hooks/useFallbackData";
import { Sprint, Challenge } from "@/types/sprint";
import { toast } from "@/components/ui/use-toast";
import { testFetchChallenges } from "@/utils/supabaseUtils";

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

          // Fetch sprint details with better error handling
          const { data: sprintData, error: sprintError } = await supabase
            .from('sprints')
            .select('*')
            .eq('id', processedId)
            .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no data is found

          if (sprintError) {
            console.error("Sprint error from Supabase:", sprintError);
            // Only throw if it's not the "no rows returned" error
            if (sprintError.code !== 'PGRST116') {
              throw sprintError;
            }
            // If no sprint found, use fallback data
            console.log("No sprint found in database, using fallback data");
            useFallbackSprint();
            return;
          }

          if (sprintData) {
            console.log("Successfully fetched sprint data:", sprintData);
            setSprint(sprintData);

            // Use the utility function to test fetching challenges
            const challengeResult = await testFetchChallenges(processedId);

            if (challengeResult.success && challengeResult.data && challengeResult.data.length > 0) {
              console.log("Successfully fetched challenge data:", challengeResult.data);
              setChallenges(challengeResult.data);
            } else {
              console.log("No challenges found for this sprint, trying direct query...");

              // Try a direct query as a fallback
              const { data: challengeData, error: challengeError } = await supabase
                .from('challenges')
                .select('*')
                .eq('sprint_id', processedId)
                .order('day', { ascending: true });

              if (challengeError) {
                console.error("Challenge error from Supabase:", challengeError);
                toast({
                  title: "Error loading challenges",
                  description: "There was a problem loading the challenge data. Using fallback data instead.",
                  variant: "destructive",
                });
                useFallbackSprint();
                return;
              }

              if (challengeData && challengeData.length > 0) {
                console.log("Successfully fetched challenge data with direct query:", challengeData);
                setChallenges(challengeData);
              } else {
                console.log("No challenges found for this sprint with direct query, using fallback data");
                toast({
                  title: "No challenge data found",
                  description: "No challenge data was found for this sprint. Using fallback data instead.",
                });
                // If no challenges found, try to use mock data
                useFallbackSprint();
              }
            }
          } else {
            console.log("No sprint data found in Supabase, using fallback data");
            useFallbackSprint();
          }
        } catch (supabaseErr) {
          console.error("Supabase error:", supabaseErr);
          console.log("Falling back to static data");
          toast({
            title: "Database connection error",
            description: "There was a problem connecting to the database. Using fallback data instead.",
            variant: "destructive",
          });
          useFallbackSprint();
        }
      } catch (error) {
        console.error("Error in fetchChallengeData:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the data. Using fallback data instead.",
          variant: "destructive",
        });
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

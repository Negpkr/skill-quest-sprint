
import { useAuth } from "@/contexts/AuthContext";
import { parseResources } from "@/utils/sprintUtils";
import { Challenge } from "@/types/sprint";
import { useChallengeFetch } from "./useChallengeFetch";
import { useChallengeProgress } from "./useChallengeProgress";
import { useChallengeCompletion } from "./useChallengeCompletion";
import { UseChallengeReturn } from "@/types/sprint";

export const useChallenge = (id: string | undefined): UseChallengeReturn => {
  const { user } = useAuth();
  
  // Use the new hooks
  const { sprint, challenges, isLoading, notFound } = useChallengeFetch(id);
  const { currentDay, taskCompleted, setTaskCompleted } = useChallengeProgress(
    id, 
    user, 
    sprint?.duration
  );
  const { handleMarkComplete } = useChallengeCompletion(
    id, 
    user, 
    currentDay, 
    setTaskCompleted
  );
  
  // Helper function to get the current day's challenge
  const getCurrentChallenge = () => {
    return challenges.find(challenge => challenge.day === currentDay);
  };

  return {
    sprint,
    challenges,
    currentDay,
    isLoading,
    taskCompleted,
    notFound,
    handleMarkComplete,
    getCurrentChallenge,
    parseResources
  };
};

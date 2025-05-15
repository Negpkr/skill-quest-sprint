
import { useAuth } from "@/contexts/AuthContext";
import { parseResources } from "@/utils/sprintUtils";
import { Challenge } from "@/types/sprint";
import { useChallengeFetch } from "./useChallengeFetch";
import { useChallengeProgress } from "./useChallengeProgress";
import { useChallengeCompletion } from "./useChallengeCompletion";
import { useStreakData } from "./useStreakData";
import { UseChallengeReturn } from "@/types/sprint";
import { useState, useCallback } from 'react';

export const useChallenge = (id: string | undefined): UseChallengeReturn => {
  const { user } = useAuth();

  // Get streak data and refresh function
  const { refreshStreak } = useStreakData(user?.id);

  // Use the new hooks
  const { 
    sprint, 
    challenges, 
    isLoading, 
    notFound,
    refreshData: refreshChallengeData 
  } = useChallengeFetch(id);
  
  const { currentDay, taskCompleted, setTaskCompleted } = useChallengeProgress(
    id,
    user,
    sprint?.duration
  );
  
  const { handleMarkComplete, handleToggleComplete } = useChallengeCompletion(
    id,
    user,
    currentDay,
    setTaskCompleted,
    refreshStreak
  );

  // Helper function to get the current day's challenge
  const getCurrentChallenge = () => {
    return challenges.find(challenge => challenge.day === currentDay);
  };

  // Function to refresh challenges data
  const refreshChallenges = useCallback(async () => {
    if (refreshChallengeData) {
      await refreshChallengeData();
    }
  }, [refreshChallengeData]);

  return {
    sprint,
    challenges,
    currentDay,
    isLoading,
    taskCompleted,
    notFound,
    handleMarkComplete,
    handleToggleComplete,
    getCurrentChallenge,
    parseResources,
    refreshChallenges
  };
};

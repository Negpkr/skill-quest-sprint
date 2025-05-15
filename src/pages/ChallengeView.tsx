
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import ChallengeHeader from "@/components/challenge/ChallengeHeader";
import ChallengeBody from "@/components/challenge/ChallengeBody";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import ChallengeLoading from "@/components/challenge/ChallengeLoading";
import StreakDisplay from "@/components/challenge/StreakDisplay";
import { useChallenge } from "@/hooks/useChallenge";
import { useStreakData } from "@/hooks/useStreakData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { extendChallenge } from "@/utils/challengeUtils";

const ChallengeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isExtending, setIsExtending] = useState(false);
  
  const {
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
  } = useChallenge(id);

  const { streakDays, isLoading: isStreakLoading, refreshStreak } = useStreakData(user?.id);

  // Redirect if not found
  if (notFound && !isLoading) {
    toast({
      title: "Challenge not found",
      description: "We couldn't find the challenge you're looking for.",
      variant: "destructive",
    });
    return <Navigate to="/challenges" replace />;
  }

  const currentChallenge = getCurrentChallenge();
  const progressPercent = sprint?.duration ? (currentDay / sprint.duration) * 100 : 0;

  const handleExtendChallenge = async () => {
    if (!id || !sprint || !user) return;
    
    try {
      setIsExtending(true);
      
      const result = await extendChallenge(id, sprint.duration || challenges.length, 30);
      
      if (result.success) {
        toast({
          title: "Challenge Extended",
          description: "30 more days have been added to this challenge!",
        });
        
        // Refresh the challenges data
        if (refreshChallenges) {
          await refreshChallenges();
        } else {
          window.location.reload(); // Fallback if refreshChallenges is not available
        }
      } else {
        toast({
          title: "Failed to Extend Challenge",
          description: "There was an error extending the challenge. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error extending challenge:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsExtending(false);
    }
  };

  return (
    <Layout>
      <ChallengeHeader
        sprint={sprint}
        currentDay={currentDay}
        progressPercent={progressPercent}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <ChallengeLoading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ChallengeBody
                currentChallenge={currentChallenge}
                currentDay={currentDay}
                taskCompleted={taskCompleted}
                handleMarkComplete={handleMarkComplete}
                handleToggleComplete={handleToggleComplete}
              />
              
              {user && sprint && progressPercent > 80 && (
                <div className="mt-6">
                  <Button 
                    onClick={handleExtendChallenge} 
                    disabled={isExtending}
                    className="bg-skillpurple-500 hover:bg-skillpurple-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Extend Challenge (Add 30 More Days)
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <StreakDisplay
                streakDays={streakDays}
                isLoading={isStreakLoading}
                refreshStreak={refreshStreak}
              />

              <ChallengeResources
                currentChallenge={currentChallenge}
                sprint={sprint}
                parseResources={parseResources}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChallengeView;

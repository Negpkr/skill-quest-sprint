
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChallengeHeader from "@/components/challenge/ChallengeHeader";
import ChallengeBody from "@/components/challenge/ChallengeBody";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import ChallengeLoading from "@/components/challenge/ChallengeLoading";
import StreakDisplay from "@/components/challenge/StreakDisplay";
import { useChallenge } from "@/hooks/useChallenge";
import { useStreakData } from "@/hooks/useStreakData";
import { useAuth } from "@/contexts/AuthContext";
import { addMoreChallengeDays } from "@/utils/challengeUtils";

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
    parseResources
  } = useChallenge(id);

  const { streakDays, isLoading: isStreakLoading, refreshStreak } = useStreakData(user?.id);

  // Function to extend challenge by 30 more days
  const handleExtendChallenge = async () => {
    if (!id || !sprint) return;
    
    setIsExtending(true);
    try {
      const updatedSprint = await addMoreChallengeDays(id, sprint.duration);
      
      if (updatedSprint) {
        toast({
          title: "Challenge Extended!",
          description: `Your challenge now has ${updatedSprint.duration} days.`,
        });
        
        // Refresh the page to show the updated challenge days
        window.location.reload();
      }
    } catch (error) {
      console.error("Error extending challenge:", error);
      toast({
        title: "Error",
        description: "Failed to extend the challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtending(false);
    }
  };

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

              {/* Add button to extend challenge by 30 more days */}
              {user && currentDay > (sprint?.duration || 30) * 0.7 && (
                <div className="mt-8 bg-muted/50 rounded-lg p-5 border border-border">
                  <h3 className="text-lg font-medium mb-2">Want more days?</h3>
                  <p className="text-muted-foreground mb-4">
                    You're making great progress! Extend this challenge with 30 more days of tasks.
                  </p>
                  <Button 
                    onClick={handleExtendChallenge}
                    disabled={isExtending}
                    className="flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {isExtending ? "Adding more days..." : "Add 30 more days"}
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

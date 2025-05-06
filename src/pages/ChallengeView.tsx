
import React from "react";
import Layout from "../components/Layout";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import ChallengeHeader from "@/components/challenge/ChallengeHeader";
import ChallengeBody from "@/components/challenge/ChallengeBody";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import ChallengeLoading from "@/components/challenge/ChallengeLoading";
import { useChallenge } from "@/hooks/useChallenge";

const ChallengeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    sprint, 
    challenges, 
    currentDay, 
    isLoading, 
    taskCompleted, 
    notFound,
    handleMarkComplete, 
    getCurrentChallenge, 
    parseResources 
  } = useChallenge(id);
  
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
              />
            </div>
            
            <div>
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

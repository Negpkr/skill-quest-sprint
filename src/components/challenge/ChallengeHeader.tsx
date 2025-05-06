
import React from "react";
import { Progress } from "@/components/ui/progress";
import { type Sprint } from "@/hooks/useChallenge";

interface ChallengeHeaderProps {
  sprint: Sprint | null;
  currentDay: number;
  progressPercent: number;
  isLoading: boolean;
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ 
  sprint, 
  currentDay, 
  progressPercent,
  isLoading
}) => {
  return (
    <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isLoading ? "Loading..." : sprint?.title || "Challenge"}
        </h1>
        <p className="text-muted-foreground">
          Complete daily tasks to master this skill in {sprint?.duration || 30} days
        </p>
        
        <div className="mt-6">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>Day {currentDay} of {sprint?.duration || 30}</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeHeader;

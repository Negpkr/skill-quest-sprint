
import React from "react";
import SprintOptionCard from "./SprintOptionCard";
import { Button } from "@/components/ui/button";

interface SprintOption {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

interface SprintOptionsContainerProps {
  sprints: SprintOption[];
  isLoading: boolean;
  selectedSprint: string | null;
  onSelectSprint: (id: string) => void;
  onStartSprint: () => void;
}

const SprintOptionsContainer: React.FC<SprintOptionsContainerProps> = ({
  sprints,
  isLoading,
  selectedSprint,
  onSelectSprint,
  onStartSprint
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sprints.map((sprint) => (
        <SprintOptionCard 
          key={sprint.id}
          sprint={sprint}
          isSelected={selectedSprint === sprint.id}
          onSelect={onSelectSprint}
        />
      ))}
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={onStartSprint}
          disabled={!selectedSprint || isLoading}
          className="bg-skillpurple-400 hover:bg-skillpurple-500"
        >
          {isLoading ? "Starting..." : "Start My 30-Day Sprint"}
        </Button>
      </div>
    </div>
  );
};

export default SprintOptionsContainer;

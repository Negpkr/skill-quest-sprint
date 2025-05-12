
import React from "react";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

interface SprintOption {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

interface SprintOptionCardProps {
  sprint: SprintOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SprintOptionCard: React.FC<SprintOptionCardProps> = ({ sprint, isSelected, onSelect }) => {
  return (
    <Card 
      key={sprint.id} 
      className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
      onClick={() => onSelect(sprint.id)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{sprint.title}</CardTitle>
            <CardDescription>{sprint.description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
              {sprint.category}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
              {sprint.difficulty}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SprintOptionCard;

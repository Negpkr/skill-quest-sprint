
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ActiveChallengeProps {
  id: string;
  title: string;
  currentDay: number;
  totalDays: number;
  progressPercent: number;
}

const ActiveChallenge: React.FC<ActiveChallengeProps> = ({ 
  id, 
  title, 
  currentDay, 
  totalDays, 
  progressPercent 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Challenge</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>Day {currentDay} of {totalDays}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        <Button asChild variant="outline" className="w-full">
          <Link to={`/challenge/${id}`}>View Full Challenge</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActiveChallenge;

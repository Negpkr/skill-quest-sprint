
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface ProgressStreakProps {
  streakDays: number;
}

const ProgressStreak: React.FC<ProgressStreakProps> = ({ streakDays }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Streak</CardTitle>
        <CardDescription>Keep the momentum going!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center p-4 bg-softpurple rounded-lg">
          <span className="text-2xl font-bold">{streakDays} Days</span>
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(streakDays, 5) }).map((_, i) => (
              <Flame key={i} className="h-6 w-6 text-red-500" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStreak;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Award, TrendingUp } from "lucide-react";

interface ProgressStreakProps {
  streakDays: number;
}

const ProgressStreak: React.FC<ProgressStreakProps> = ({ streakDays }) => {
  return (
    <Card className="relative overflow-hidden border-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          Progress Streak
        </CardTitle>
        <CardDescription>Keep your daily momentum going!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-lg p-5 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-3xl font-bold">{streakDays} Days</span>
            <Award className="h-8 w-8 text-yellow-200" />
          </div>
          
          <div className="flex space-x-1 mt-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-3 flex-1 rounded ${
                  i < (streakDays % 7) ? "bg-yellow-200" : "bg-white/30"
                }`}
              />
            ))}
          </div>
          
          {streakDays > 0 && (
            <div className="flex items-center mt-4 text-yellow-200 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>On fire! Keep it up!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStreak;

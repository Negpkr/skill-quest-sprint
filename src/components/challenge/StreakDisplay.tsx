
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Award, Calendar } from "lucide-react";

interface StreakDisplayProps {
  streakDays: number;
  isLoading: boolean;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakDays, isLoading }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          Your Progress Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-full bg-slate-200 animate-pulse rounded" />
        ) : (
          <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-lg p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{streakDays} Days</span>
              {streakDays > 0 && <Award className="h-6 w-6 text-yellow-200" />}
            </div>
            
            <div className="flex space-x-1 mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 flex-1 rounded ${
                    i < (streakDays % 7) ? "bg-yellow-200" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            
            {streakDays > 0 ? (
              <div className="flex items-center mt-3 text-yellow-200 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Keep it up! Complete today's task!</span>
              </div>
            ) : (
              <div className="flex items-center mt-3 text-yellow-200 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Start your streak by completing today's task!</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakDisplay;

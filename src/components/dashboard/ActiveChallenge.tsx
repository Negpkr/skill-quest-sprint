
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";

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
    <Card className="border-2 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 text-yellow-400 mr-2" />
          Active Challenge
        </CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              Day {currentDay} of {totalDays}
            </span>
          </div>
          
          <div className="relative h-3 bg-black/20 rounded-full overflow-hidden mt-2">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          <div className="text-center mt-3">
            <div className="text-2xl font-bold">{Math.round(progressPercent)}%</div>
            <div className="text-xs text-white/80">completed</div>
          </div>
        </div>
        
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/challenge/${id}`} className="flex items-center justify-center">
            View Full Challenge 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActiveChallenge;

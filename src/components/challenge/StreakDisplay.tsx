
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Flame, Award, Calendar, RefreshCw } from "lucide-react";
import FixStreakButton from "@/components/FixStreakButton";
import { useAuth } from "@/contexts/AuthContext";

interface StreakDisplayProps {
  streakDays: number;
  isLoading: boolean;
  refreshStreak?: () => Promise<void>;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakDays, isLoading, refreshStreak }) => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to manually refresh streak data with loading state
  const handleRefresh = async () => {
    if (!refreshStreak) return;

    setIsRefreshing(true);
    try {
      await refreshStreak();
      toast({
        title: "Streak Updated",
        description: "Your streak data has been refreshed.",
      });
    } catch (error) {
      console.error("Error refreshing streak:", error);
      toast({
        title: "Error",
        description: "Failed to refresh streak data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Flame className="h-5 w-5 text-orange-500 mr-2" />
            Your Progress Streak
          </div>
          <div className="flex items-center">
            {isRefreshing ? (
              <div className="mr-2 text-xs text-muted-foreground">Refreshing...</div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 text-xs"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            )}
            {user && <FixStreakButton userId={user.id} onSuccess={refreshStreak} />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || isRefreshing ? (
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

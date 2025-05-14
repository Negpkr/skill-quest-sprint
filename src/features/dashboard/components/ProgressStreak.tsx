
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Flame, Award, TrendingUp, RefreshCw } from "lucide-react";
import FixStreakButton from "@/components/FixStreakButton";
import { useAuth } from "@/contexts/AuthContext";

interface ProgressStreakProps {
  streakDays: number;
  refreshStreak?: () => Promise<void>;
}

const ProgressStreak: React.FC<ProgressStreakProps> = ({ streakDays, refreshStreak }) => {
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
    <Card className="relative overflow-hidden border-2">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Flame className="h-5 w-5 text-orange-500 mr-2" />
            Progress Streak
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
                disabled={isRefreshing}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            )}
            {user && <FixStreakButton userId={user.id} onSuccess={refreshStreak} />}
          </div>
        </CardTitle>
        <CardDescription>Keep your daily momentum going!</CardDescription>
      </CardHeader>
      <CardContent>
        {isRefreshing ? (
          <div className="h-24 w-full bg-slate-200 animate-pulse rounded" />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressStreak;

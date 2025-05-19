import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle, Clock, Calendar, RefreshCw } from "lucide-react";

interface SprintProgress {
  id: string;
  sprint_id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  start_date: string;
  current_day: number;
  total_days: number;
  completed: boolean;
  completed_date?: string;
  progress_percent: number;
  slug?: string;
}

interface UserSprintsListProps {
  sprints: SprintProgress[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  showViewButton?: boolean;
  onRefresh?: () => Promise<void>;
}

const UserSprintsList: React.FC<UserSprintsListProps> = ({
  sprints,
  title = "Your Sprints",
  description = "Track your progress across all challenges",
  emptyMessage = "You haven't started any sprints yet.",
  showViewButton = true,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-2 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
            {title}
          </div>
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 px-2 text-xs"
            >
              {isRefreshing ? (
                <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
              )}
              Refresh
            </Button>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {sprints.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="border rounded-lg p-4 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{sprint.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Started: {formatDate(sprint.start_date)}

                      {sprint.completed && sprint.completed_date && (
                        <span className="ml-3 flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                          Completed: {formatDate(sprint.completed_date)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {sprint.category && (
                      <Badge variant="outline" className="bg-indigo-50">
                        {sprint.category}
                      </Badge>
                    )}
                    {sprint.difficulty && (
                      <Badge variant="outline" className="bg-amber-50">
                        {sprint.difficulty}
                      </Badge>
                    )}
                    {sprint.completed ? (
                      <Badge className="bg-green-500">Completed</Badge>
                    ) : (
                      <Badge className="bg-blue-500">In Progress</Badge>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Day {sprint.current_day} of {sprint.total_days}
                    </span>
                    <span>{Math.round(sprint.progress_percent)}% complete</span>
                  </div>
                  <Progress value={sprint.progress_percent} className="h-2" />
                </div>

                {showViewButton && (
                  <div className="mt-4 flex justify-end">
                    <Button asChild variant="outline" size="sm" className="group">
                      <Link to={`/challenge/${sprint.sprint_id}`} className="flex items-center">
                        View Challenge
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserSprintsList;

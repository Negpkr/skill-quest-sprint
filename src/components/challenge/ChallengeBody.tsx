
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { type Challenge } from "@/types/sprint";

interface ChallengeBodyProps {
  currentChallenge: Challenge | undefined;
  currentDay: number;
  taskCompleted: boolean;
  handleMarkComplete: () => Promise<void>;
}

const ChallengeBody: React.FC<ChallengeBodyProps> = ({
  currentChallenge,
  currentDay,
  taskCompleted,
  handleMarkComplete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Day {currentDay}: {currentChallenge?.title || "Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        {currentChallenge ? (
          <>
            <p className="text-muted-foreground mb-6">
              {currentChallenge.description || "Complete this task to continue your progress in the challenge."}
            </p>
            <div className="flex items-start space-x-3 mb-6">
              <Checkbox 
                id="task-complete" 
                checked={taskCompleted}
                disabled={taskCompleted}
                onCheckedChange={() => !taskCompleted && handleMarkComplete()}
              />
              <div>
                <label
                  htmlFor="task-complete"
                  className={`text-sm font-medium leading-none cursor-pointer ${taskCompleted ? "line-through text-muted-foreground" : ""}`}
                >
                  Mark as complete
                </label>
              </div>
            </div>
            <Button 
              className="w-full sm:w-auto" 
              disabled={taskCompleted}
              onClick={handleMarkComplete}
            >
              {taskCompleted ? "Completed!" : "Mark as Complete"}
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground">
            No task found for day {currentDay}. Please contact support if this issue persists.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeBody;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, ListChecks, RotateCcw, Zap } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onMarkAllComplete: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskComplete,
  onMarkAllComplete
}) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="border-2 relative overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center">
          <ListChecks className="h-5 w-5 text-purple-500 mr-2" />
          Today's Tasks
        </CardTitle>
        <CardDescription>
          Complete these tasks to continue your progress
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {tasks.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Progress: {completedTasks}/{totalTasks} complete
              </span>
              <div className="text-xs font-medium text-purple-500">
                {Math.round(progressPercent)}%
              </div>
            </div>

            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="pt-4 space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-start space-x-3 p-3 rounded-md transition-all ${task.completed ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => onTaskComplete(task.id)}
                    className={`${task.completed ? 'bg-purple-500 text-white border-purple-500' : ''}`}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className={`text-sm font-medium leading-none cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-6 hover:bg-transparent"
                    onClick={() => onTaskComplete(task.id)}
                  >
                    {task.completed ? (
                      <CheckSquare className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Toggle</span>
                    )}
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={onMarkAllComplete}
            >
              <Zap className="mr-2 h-4 w-4" />
              Complete All Tasks
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-500 mb-4">
              <ListChecks className="h-6 w-6" />
            </div>
            <p className="text-muted-foreground">
              No tasks found for today. Try refreshing or contact support if this issue persists.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;

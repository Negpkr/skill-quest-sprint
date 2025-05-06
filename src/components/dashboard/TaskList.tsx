
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Tasks</CardTitle>
        <CardDescription>
          Complete these tasks to continue your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3">
                <Checkbox 
                  id={task.id} 
                  checked={task.completed}
                  onCheckedChange={() => onTaskComplete(task.id)}
                />
                <div>
                  <label
                    htmlFor={task.id}
                    className={`text-sm font-medium leading-none cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                </div>
              </div>
            ))}
            
            <Button 
              className="mt-4 w-full bg-skillpurple-400 hover:bg-skillpurple-500"
              onClick={onMarkAllComplete}
            >
              Mark All Complete
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No tasks found for today. Try refreshing or contact support if this issue persists.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;


import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "@/contexts/AuthContext";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useActiveSprint } from "@/hooks/useActiveSprint";
import { useStreakData } from "@/hooks/useStreakData";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { activeSprint, todaysTasks: initialTasks, isLoading: isSprintLoading } = useActiveSprint(user?.id);
  const { streakDays, isLoading: isStreakLoading } = useStreakData(user?.id);
  
  const [todaysTasks, setTodaysTasks] = useState(initialTasks);
  
  // Update tasks when initialTasks changes
  React.useEffect(() => {
    setTodaysTasks(initialTasks);
  }, [initialTasks]);
  
  const handleTaskComplete = async (taskId: string) => {
    setTodaysTasks(tasks => 
      tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleMarkAllComplete = async () => {
    setTodaysTasks(tasks => 
      tasks.map(task => ({ ...task, completed: true }))
    );
  };
  
  const isLoading = isSprintLoading || isStreakLoading;
  
  return (
    <Layout>
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <DashboardContent
          isLoading={isLoading}
          activeSprint={activeSprint}
          todaysTasks={todaysTasks}
          streakDays={streakDays}
          onTaskComplete={handleTaskComplete}
          onMarkAllComplete={handleMarkAllComplete}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;

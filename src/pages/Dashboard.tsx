
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "@/contexts/AuthContext";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useActiveSprint } from "@/hooks/useActiveSprint";
import { useStreakData } from "@/hooks/useStreakData";
import { motion } from "framer-motion";

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1
    }
  };
  
  return (
    <Layout>
      <DashboardHeader />
      
      <motion.div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardContent
            isLoading={isLoading}
            activeSprint={activeSprint}
            todaysTasks={todaysTasks}
            streakDays={streakDays}
            onTaskComplete={handleTaskComplete}
            onMarkAllComplete={handleMarkAllComplete}
          />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;

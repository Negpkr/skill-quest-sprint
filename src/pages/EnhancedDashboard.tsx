import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

// Import components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TaskList from "@/components/dashboard/TaskList";
import SprintCalendar from "@/components/dashboard/SprintCalendar";
import ActiveChallenge from "@/components/dashboard/ActiveChallenge";
import ProgressStreak from "@/components/dashboard/ProgressStreak";
import UserProfileSummary from "@/components/dashboard/UserProfileSummary";
import UserSprintsList from "@/components/dashboard/UserSprintsList";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import NoActiveSprint from "@/components/dashboard/NoActiveSprint";
import EnhancedNoActiveSprint from "@/components/dashboard/EnhancedNoActiveSprint";

// Import hooks
import { useUserSprints } from "@/hooks/useUserSprints";
import { useStreakData } from "@/hooks/useStreakData";

// Interface for calendar days
interface CalendarDay {
  day: number;
  status: 'completed' | 'today' | 'upcoming';
}

const EnhancedDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    sprints,
    activeSprint,
    completedSprints,
    isLoading: isSprintsLoading,
    refreshSprints
  } = useUserSprints(user?.id);

  const {
    streakDays,
    isLoading: isStreakLoading,
    refreshStreak
  } = useStreakData(user?.id);

  // State for today's tasks
  const [todaysTasks, setTodaysTasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);

  // Set initial tasks when active sprint changes
  React.useEffect(() => {
    if (activeSprint) {
      // Create a task based on the active sprint
      setTodaysTasks([{
        id: activeSprint.sprint_id,
        title: `Day ${activeSprint.current_day}: ${activeSprint.title}`,
        completed: false
      }]);
    }
  }, [activeSprint]);

  // Generate calendar days based on active sprint
  const generateCalendarDays = (): CalendarDay[] => {
    if (!activeSprint) return Array.from({ length: 30 }).map((_, i) => ({ day: i + 1, status: 'upcoming' }));

    return Array.from({ length: activeSprint.total_days }).map((_, i) => {
      const day = i + 1;
      let status = 'upcoming' as 'upcoming' | 'completed' | 'today';

      if (day < activeSprint.current_day) {
        status = 'completed';
      } else if (day === activeSprint.current_day) {
        status = 'today';
      }

      return { day, status };
    });
  };

  // Handle task completion
  const handleTaskComplete = async (taskId: string) => {
    setTodaysTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    // In a real implementation, this would update the database
  };

  // Handle marking all tasks as complete
  const handleMarkAllComplete = async () => {
    setTodaysTasks(tasks =>
      tasks.map(task => ({ ...task, completed: true }))
    );
    // In a real implementation, this would update the database
  };

  const isLoading = isSprintsLoading || isStreakLoading;

  // Animation variants
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

  if (isLoading) {
    return (
      <Layout>
        <DashboardHeader />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <DashboardLoading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardHeader />

      <motion.div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* User Profile Summary */}
        <motion.div variants={itemVariants} className="mb-8">
          <UserProfileSummary
            user={user}
            totalSprints={sprints.length}
            completedSprints={completedSprints.length}
            streakDays={streakDays}
          />
        </motion.div>

        {activeSprint ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              {/* Today's Tasks */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all"></div>
                <TaskList
                  tasks={todaysTasks}
                  onTaskComplete={handleTaskComplete}
                  onMarkAllComplete={handleMarkAllComplete}
                />
              </div>

              {/* Calendar View */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-60 transition-all"></div>
                <SprintCalendar days={generateCalendarDays()} />
              </div>

              {/* All Sprints List */}
              <motion.div variants={itemVariants}>
                <UserSprintsList
                  sprints={sprints}
                  title="All Your Sprints"
                  description="Track your progress across all challenges"
                  onRefresh={refreshSprints}
                />
              </motion.div>
            </motion.div>

            {/* Right column - stats and links */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Current Challenge */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-60 transition-all"></div>
                <ActiveChallenge
                  id={activeSprint.sprint_id}
                  title={activeSprint.title}
                  currentDay={activeSprint.current_day}
                  totalDays={activeSprint.total_days}
                  progressPercent={activeSprint.progress_percent}
                />
              </div>

              {/* Progress Streak */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-60 transition-all"></div>
                <ProgressStreak streakDays={streakDays} refreshStreak={refreshStreak} />
              </div>

              {/* Completed Sprints */}
              {completedSprints.length > 0 && (
                <UserSprintsList
                  sprints={completedSprints}
                  title="Completed Sprints"
                  description="Your achievements so far"
                  showViewButton={false}
                  onRefresh={refreshSprints}
                />
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div variants={itemVariants}>
            {sprints.length > 0 ? (
              <div>
                <UserSprintsList
                  sprints={sprints}
                  title="Your Previous Sprints"
                  description="Resume or review your previous challenges"
                  onRefresh={refreshSprints}
                />
              </div>
            ) : (
              <EnhancedNoActiveSprint hasCompletedSprints={false} />
            )}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default EnhancedDashboard;

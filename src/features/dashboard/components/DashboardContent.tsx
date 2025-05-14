
import React from "react";
import TaskList from "./TaskList";
import SprintCalendar from "./SprintCalendar";
import ActiveChallenge from "./ActiveChallenge";
import ProgressStreak from "./ProgressStreak";
import NoActiveSprint from "./NoActiveSprint";
import DashboardLoading from "./DashboardLoading";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Sprint {
  id: string;
  title: string;
  current_day: number;
  total_days: number;
  progress_percent: number;
}

interface CalendarDay {
  day: number;
  status: 'completed' | 'today' | 'upcoming';
}

interface DashboardContentProps {
  isLoading: boolean;
  activeSprint: Sprint | null;
  todaysTasks: Task[];
  streakDays: number;
  refreshStreak?: () => Promise<void>;
  onTaskComplete: (taskId: string) => void;
  onMarkAllComplete: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  isLoading,
  activeSprint,
  todaysTasks,
  streakDays,
  refreshStreak,
  onTaskComplete,
  onMarkAllComplete,
}) => {
  // Generate calendar days
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

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!activeSprint) {
    return <NoActiveSprint />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Today's Tasks */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all"></div>
          <TaskList
            tasks={todaysTasks}
            onTaskComplete={onTaskComplete}
            onMarkAllComplete={onMarkAllComplete}
          />
        </div>

        {/* Calendar View */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-60 transition-all"></div>
          <SprintCalendar days={generateCalendarDays()} />
        </div>
      </div>

      {/* Right column - stats and links */}
      <div className="space-y-8">
        {/* Current Challenge */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-60 transition-all"></div>
          <ActiveChallenge
            id={activeSprint.id}
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
      </div>
    </div>
  );
};

export default DashboardContent;

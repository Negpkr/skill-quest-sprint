
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

// Import refactored components
import TaskList from "@/components/dashboard/TaskList";
import SprintCalendar from "@/components/dashboard/SprintCalendar";
import ActiveChallenge from "@/components/dashboard/ActiveChallenge";
import ProgressStreak from "@/components/dashboard/ProgressStreak";
import NoActiveSprint from "@/components/dashboard/NoActiveSprint";
import DashboardLoading from "@/components/dashboard/DashboardLoading";

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

const Dashboard: React.FC = () => {
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchUserData = async () => {
      try {
        // Fetch active sprints for the user
        const { data: userProgress, error: progressError } = await supabase
          .from('user_progress')
          .select(`
            id,
            start_date,
            sprint_id,
            completed,
            sprints(id, title, duration)
          `)
          .eq('user_id', user.id)
          .eq('completed', false)
          .order('start_date', { ascending: false })
          .limit(1);
        
        if (progressError) throw progressError;
        
        if (userProgress && userProgress.length > 0) {
          const progress = userProgress[0];
          const startDate = new Date(progress.start_date);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const totalDays = (progress.sprints as any).duration || 30;
          
          setActiveSprint({
            id: progress.sprint_id,
            title: (progress.sprints as any).title,
            current_day: Math.min(diffDays, totalDays),
            total_days: totalDays,
            progress_percent: Math.min((diffDays / totalDays) * 100, 100)
          });
          
          // Fetch today's tasks for this sprint
          const { data: challenges, error: challengesError } = await supabase
            .from('challenges')
            .select('id, title, description')
            .eq('sprint_id', progress.sprint_id)
            .eq('day', Math.min(diffDays, totalDays));
          
          if (challengesError) throw challengesError;
          
          if (challenges && challenges.length > 0) {
            setTodaysTasks(challenges.map(challenge => ({
              id: challenge.id,
              title: challenge.title,
              completed: false
            })));
          }
        }
        
        // Fetch user streak - MODIFIED: using maybeSingle() instead of single()
        const { data: streakData, error: streakError } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (streakError && streakError.code !== 'PGRST116') {
          // Only throw if it's not the "no rows returned" error
          throw streakError;
        }
        
        if (streakData) {
          setStreakDays(streakData.current_streak || 0);
        } else {
          // If no streak found, create a new streak record
          const { error: createError } = await supabase
            .from('streaks')
            .insert([{ user_id: user.id, current_streak: 0, longest_streak: 0 }]);
            
          if (createError) {
            console.error("Error creating streak record:", createError);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
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
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">Track your progress, complete daily tasks, and launch your side hustle.</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <DashboardLoading />
        ) : !activeSprint ? (
          <NoActiveSprint />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Tasks */}
              <TaskList 
                tasks={todaysTasks}
                onTaskComplete={handleTaskComplete}
                onMarkAllComplete={handleMarkAllComplete}
              />
              
              {/* Calendar View */}
              <SprintCalendar days={generateCalendarDays()} />
            </div>
            
            {/* Right column - stats and links */}
            <div className="space-y-8">
              {/* Current Challenge */}
              <ActiveChallenge 
                id={activeSprint.id}
                title={activeSprint.title}
                currentDay={activeSprint.current_day}
                totalDays={activeSprint.total_days}
                progressPercent={activeSprint.progress_percent}
              />
              
              {/* Progress Streak */}
              <ProgressStreak streakDays={streakDays} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

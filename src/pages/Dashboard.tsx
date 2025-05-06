
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

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
        
        // Fetch user streak
        const { data: streakData, error: streakError } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .single();
        
        if (streakError && streakError.code !== 'PGSQL_NO_ROWS_RETURNED') throw streakError;
        
        if (streakData) {
          setStreakDays(streakData.current_streak || 0);
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
  const generateCalendarDays = () => {
    if (!activeSprint) return Array.from({ length: 30 }).map((_, i) => ({ day: i + 1, status: 'upcoming' }));
    
    return Array.from({ length: activeSprint.total_days }).map((_, i) => {
      const day = i + 1;
      let status = 'upcoming';
      
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
          </div>
        ) : !activeSprint ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No Active Sprint</h2>
            <p className="text-muted-foreground mb-8">Start a new sprint to begin your learning journey.</p>
            <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
              <Link to="/start-sprint">Start a Sprint</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Tasks</CardTitle>
                  <CardDescription>
                    Complete these tasks to continue your progress on {activeSprint.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todaysTasks.length > 0 ? (
                    <div className="space-y-4">
                      {todaysTasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-3">
                          <Checkbox 
                            id={task.id} 
                            checked={task.completed}
                            onCheckedChange={() => handleTaskComplete(task.id)}
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
                        onClick={handleMarkAllComplete}
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
              
              {/* Calendar View */}
              <Card>
                <CardHeader>
                  <CardTitle>Sprint Calendar</CardTitle>
                  <CardDescription>
                    Your 30-day challenge roadmap
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map(({ day, status }) => (
                      <div
                        key={day}
                        className={`
                          aspect-square flex items-center justify-center rounded-md text-sm relative
                          ${status === 'completed' ? "bg-softgreen text-green-800" : 
                            status === 'today' ? "bg-skillpurple-400 text-white" : "bg-muted"}
                        `}
                      >
                        <span>{day}</span>
                        {(status === 'completed') && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-skillpurple-400 rounded-full"></div>
                      <span>Today</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-softgreen rounded-full"></div>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-muted rounded-full"></div>
                      <span>Upcoming</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - stats and links */}
            <div className="space-y-8">
              {/* Current Challenge */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Challenge</CardTitle>
                  <CardDescription>{activeSprint.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>Day {activeSprint.current_day} of {activeSprint.total_days}</span>
                    </div>
                    <Progress value={activeSprint.progress_percent} className="h-2" />
                  </div>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/challenge/${activeSprint.id}`}>View Full Challenge</Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Progress Streak */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Streak</CardTitle>
                  <CardDescription>Keep the momentum going!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center p-4 bg-softpurple rounded-lg">
                    <span className="text-2xl font-bold">{streakDays} Days</span>
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(streakDays, 5) }).map((_, i) => (
                        <Flame key={i} className="h-6 w-6 text-red-500" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

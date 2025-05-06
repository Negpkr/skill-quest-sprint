
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Flame, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for tasks
const todaysTasks = [
  {
    id: "task1",
    title: "Complete Canva basics tutorial",
    completed: true
  },
  {
    id: "task2",
    title: "Create your first social media template",
    completed: false
  },
  {
    id: "task3",
    title: "Research pricing for design templates",
    completed: false
  }
];

const Dashboard: React.FC = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>
                  Complete these tasks to continue your progress on Design Starter Sprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      <Checkbox id={task.id} checked={task.completed} />
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
                  
                  <Button className="mt-4 w-full bg-skillpurple-400 hover:bg-skillpurple-500">
                    Mark All Complete
                  </Button>
                </div>
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
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isCompleted = day < 5;
                    const isToday = day === 5;
                    
                    return (
                      <div
                        key={day}
                        className={`
                          aspect-square flex items-center justify-center rounded-md text-sm relative
                          ${isCompleted ? "bg-softgreen text-green-800" : isToday ? "bg-skillpurple-400 text-white" : "bg-muted"}
                        `}
                      >
                        <span>{day}</span>
                        {(isCompleted) && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                    );
                  })}
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
                <CardDescription>Design Starter Sprint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>Day 5 of 30</span>
                  </div>
                  <Progress value={16.7} className="h-2" />
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/challenge/design-starter">View Full Challenge</Link>
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
                  <span className="text-2xl font-bold">4 Days</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Flame key={i} className="h-6 w-6 text-red-500" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Side Hustle Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Side Hustle Progress</CardTitle>
                <CardDescription>Track your earning goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>First Income Goal</span>
                    <span>$0 / $50</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/hustle-tracker">Update Progress</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Public Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Public Templates</CardTitle>
                <CardDescription>Resources to help you launch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="secondary" className="w-full">Fiverr Gig Description</Button>
                <Button variant="secondary" className="w-full">Portfolio Layout</Button>
                <Button variant="secondary" className="w-full">Canva Design Templates</Button>
                <Button variant="link" className="w-full">Browse All Resources</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

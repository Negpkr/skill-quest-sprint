
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "react-router-dom";
import { ChallengeProps } from "../components/ChallengeCard";

// Sample challenge details data
const challengeData: Record<string, ChallengeProps & { 
  longDescription: string; 
  syllabus: { title: string; description: string; }[];
  tasks: { id: string; day: number; title: string; completed: boolean; }[];
}> = {
  "design-starter": {
    id: "design-starter",
    title: "Design Starter Sprint",
    description: "Learn Canva basics and create your first sellable design in 30 days.",
    longDescription: "Perfect for complete beginners, this challenge walks you through the fundamentals of graphic design using Canva - no design experience needed! By the end of 30 days, you'll have created several marketable design templates that you can start selling online.",
    category: "Design",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
    resources: [
      { title: "Canva Design School", url: "https://www.canva.com/designschool/" },
      { title: "Canva Beginner Tutorial", url: "https://www.youtube.com/watch?v=oDFM4cLv9_c" },
      { title: "Etsy Template Shop Guide", url: "https://www.etsy.com/seller-handbook/" }
    ],
    syllabus: [
      { 
        title: "Week 1: Canva Basics", 
        description: "Master the Canva interface, basic design principles, and create your first simple designs." 
      },
      { 
        title: "Week 2: Design Fundamentals", 
        description: "Learn about typography, color theory, and layout principles to improve your designs." 
      },
      { 
        title: "Week 3: Creating Templates", 
        description: "Build a collection of templates for different purposes: social media, presentations, and print." 
      },
      { 
        title: "Week 4: Launch Your Design Store", 
        description: "Set up your online presence, price your templates, and make your first sale." 
      }
    ],
    tasks: [
      { id: "task1", day: 1, title: "Sign up for a free Canva account", completed: true },
      { id: "task2", day: 2, title: "Complete the Canva beginner interface tutorial", completed: true },
      { id: "task3", day: 3, title: "Create your first social media graphic", completed: true },
      { id: "task4", day: 4, title: "Learn about font pairing and create a typography sample", completed: true },
      { id: "task5", day: 5, title: "Create a color palette for your design brand", completed: false },
      { id: "task6", day: 6, title: "Design your first Instagram post template", completed: false },
      { id: "task7", day: 7, title: "Create a simple logo design", completed: false },
      // More tasks would be added here...
      { id: "task8", day: 8, title: "Learn about design grids and alignment", completed: false },
      { id: "task9", day: 9, title: "Create a Pinterest pin template", completed: false },
      { id: "task10", day: 10, title: "Design a simple business card template", completed: false }
    ]
  },
  // More challenges would be added here...
};

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = id ? challengeData[id] : null;
  
  if (!challenge) {
    return (
      <Layout>
        <div className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <p>The challenge you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const difficultyClass = 
    challenge.difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : challenge.difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";

  return (
    <Layout>
      {/* Challenge Header */}
      <div 
        className="relative bg-cover bg-center py-16" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${challenge.imageUrl})` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <Badge className={difficultyClass}>
                {challenge.difficulty}
              </Badge>
              <Badge className="ml-2 bg-softpurple text-purple-800">
                {challenge.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mt-4">{challenge.title}</h1>
              <p className="mt-2 max-w-2xl">{challenge.description}</p>
            </div>
            
            <Button className="mt-4 sm:mt-0 bg-skillpurple-400 hover:bg-skillpurple-500">Start This Challenge</Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main challenge content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About this challenge */}
            <Card>
              <CardHeader>
                <CardTitle>About This Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{challenge.longDescription}</p>
                
                <h3 className="font-semibold text-lg mb-3">What You'll Learn</h3>
                <div className="space-y-4">
                  {challenge.syllabus.map((week, index) => (
                    <div key={index}>
                      <h4 className="font-medium">{week.title}</h4>
                      <p className="text-muted-foreground">{week.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Task Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>30-Day Task Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenge.tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-2 rounded hover:bg-muted">
                      <Checkbox id={task.id} checked={task.completed} />
                      <div className="space-y-1">
                        <label
                          htmlFor={task.id}
                          className={`font-medium leading-none cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          Day {task.day}: {task.title}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.resources.map((resource, index) => (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-skillpurple-500 hover:text-skillpurple-600 hover:underline flex items-center"
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="mr-2"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Join Challenge */}
            <Card className="bg-skillpurple-400 text-white">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Ready to Begin?</h3>
                <p className="mb-4">Start this 30-day challenge and unlock daily tasks and tracking.</p>
                <Button className="w-full bg-white text-skillpurple-500 hover:bg-gray-100 hover:text-skillpurple-600">
                  Start This Challenge
                </Button>
              </CardContent>
            </Card>
            
            {/* Community */}
            <Card>
              <CardHeader>
                <CardTitle>Join the Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">Connect with others taking this challenge to share tips and progress.</p>
                <Button variant="outline" className="w-full">
                  View Challenge Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeDetail;

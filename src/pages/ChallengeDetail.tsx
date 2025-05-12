
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Rocket, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { useChallenges } from "@/hooks/useChallenges";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { filteredChallenges, isLoading } = useChallenges();
  
  const challenge = filteredChallenges.find(c => c.id === id);
  
  const handleStartSprint = () => {
    toast({
      title: "Sprint Started!",
      description: `You've started the ${challenge?.title} sprint.`,
    });
    
    navigate(`/challenge/${id}`);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!challenge) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold">Sprint Not Found</h2>
          <p className="mt-2 text-muted-foreground">We couldn't find the sprint you're looking for.</p>
          <Button 
            className="mt-6" 
            onClick={() => navigate('/sprints')}
          >
            Return to Sprint Library
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Example days for the sprint
  const sprintDays = Array.from({ length: 30 }, (_, i) => {
    const dayNumber = i + 1;
    return {
      day: dayNumber,
      title: `Day ${dayNumber}`,
      description: `${challenge.title} - Day ${dayNumber} task`
    };
  });
  
  const difficultyClass = 
    challenge.difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : challenge.difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";
  
  const categoryColors: Record<string, string> = {
    Design: "bg-softpurple text-purple-800",
    Tech: "bg-softblue text-blue-800",
    Marketing: "bg-softpink text-pink-800",
    Creator: "bg-softorange text-orange-800",
    Business: "bg-softpeach text-orange-800",
    Freelance: "bg-softgreen text-green-800",
    Productivity: "bg-softblue text-blue-800",
    Custom: "bg-gray-200 text-gray-800"
  };
    
  return (
    <Layout>
      <div className="bg-gradient-to-b from-dark-background to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <Badge className={categoryColors[challenge.category] || "bg-secondary"}>
                {challenge.category}
              </Badge>
              <Badge className={difficultyClass}>
                {challenge.difficulty}
              </Badge>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gradient">
              {challenge.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {challenge.description}
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Sprint Overview</h2>
            
            <div className="bg-dark-card rounded-lg p-6 mb-8 border border-dark-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-skillpurple-400/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-skillpurple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">30-Day Sprint</h3>
                  <p className="text-muted-foreground">Complete daily micro-tasks to build your skills</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                This 30-day sprint will guide you through a series of daily tasks designed to help you 
                master {challenge.category.toLowerCase()} skills and start earning with your new abilities.
              </p>
              
              <Button
                size="lg"
                onClick={handleStartSprint}
                className="w-full sm:w-auto bg-skillpurple-400 hover:bg-skillpurple-500"
              >
                <span>Start The Sprint</span>
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-xl font-bold">What You'll Learn</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Core {challenge.category} principles and best practices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Essential tools and techniques used by professionals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>How to create marketable projects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Strategies to monetize your new skills</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <h3 className="text-lg font-medium">Resources Included</h3>
              </CardHeader>
              <CardContent>
                {challenge.resources.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {challenge.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-skillpurple-400 hover:text-skillpurple-300 hover:underline"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Resources will be provided as you progress through the sprint.</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <h3 className="text-lg font-medium">Sprint Structure</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Days 1-10</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn the fundamentals and set up your workspace
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Days 11-20</h4>
                    <p className="text-sm text-muted-foreground">
                      Build projects and practice your skills
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Days 21-30</h4>
                    <p className="text-sm text-muted-foreground">
                      Create a portfolio and prepare to earn
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={handleStartSprint} 
                  className="w-full"
                >
                  View Full Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Days Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Sprint Schedule</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sprintDays.slice(0, 6).map((day) => (
              <Card key={day.day} className="bg-dark-card border-dark-border">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit">Day {day.day}</Badge>
                  <h3 className="font-medium">{day.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{day.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={handleStartSprint}
              className="bg-skillpurple-400 hover:bg-skillpurple-500"
            >
              Start The Sprint
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeDetail;

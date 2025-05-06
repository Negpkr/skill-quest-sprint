
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const StartSprint: React.FC = () => {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleStartSprint = () => {
    if (selectedSprint) {
      navigate(`/challenge/${selectedSprint}`);
    }
  };
  
  const sprints = [
    {
      id: "design-starter",
      title: "Design Starter Sprint",
      description: "Learn graphic design fundamentals and create your first portfolio pieces"
    },
    {
      id: "web-dev",
      title: "Web Dev Sprint",
      description: "Build your first website with HTML, CSS and JavaScript"
    },
    {
      id: "freelance",
      title: "Freelance Starter Pack",
      description: "Set up your freelance business and land your first client"
    }
  ];

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Start Your Skill Sprint</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a 30-day sprint or create your own custom skill challenge. Your journey to new skills and side income begins here.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Choose a Sprint</h2>
        <div className="space-y-6">
          {sprints.map((sprint) => (
            <Card 
              key={sprint.id} 
              className={`cursor-pointer transition-all ${selectedSprint === sprint.id ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
              onClick={() => setSelectedSprint(sprint.id)}
            >
              <CardHeader>
                <CardTitle>{sprint.title}</CardTitle>
                <CardDescription>{sprint.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          
          <Card 
            className={`cursor-pointer transition-all ${selectedSprint === 'custom' ? 'ring-2 ring-skillpurple-400' : 'hover:border-skillpurple-300'}`}
            onClick={() => setSelectedSprint('custom')}
          >
            <CardHeader>
              <CardTitle>Create Custom Sprint</CardTitle>
              <CardDescription>Define your own 30-day sprint with a custom skill you want to learn</CardDescription>
            </CardHeader>
            {selectedSprint === 'custom' && (
              <CardContent>
                <div>
                  <Label htmlFor="customSkill">What skill do you want to learn?</Label>
                  <Input 
                    id="customSkill" 
                    placeholder="E.g., Photography, Podcast Creation, Python Programming, etc."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            )}
          </Card>
          
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleStartSprint}
              disabled={!selectedSprint}
              className="bg-skillpurple-400 hover:bg-skillpurple-500"
            >
              Start My 30-Day Sprint
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartSprint;

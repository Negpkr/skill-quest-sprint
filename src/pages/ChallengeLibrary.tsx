
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ChallengeLibrary: React.FC = () => {
  const challenges = [
    {
      id: "design-starter",
      title: "Design Starter Sprint",
      description: "Learn graphic design basics and create your first designs",
      category: "Design",
      difficulty: "Beginner"
    },
    {
      id: "web-dev",
      title: "Web Dev Sprint",
      description: "Build your first website with HTML, CSS and JavaScript",
      category: "Tech",
      difficulty: "Beginner"
    },
    {
      id: "freelance",
      title: "Freelance Starter Pack",
      description: "Set up your freelance business and land your first client",
      category: "Freelance",
      difficulty: "Intermediate"
    }
  ];

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Skill Challenge Library</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Browse our collection of 30-day challenges to learn new skills and launch side hustles
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <Input placeholder="Search challenges..." />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{challenge.category}</span>
                  <span>{challenge.difficulty}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/challenge/${challenge.id}`}>View Challenge</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeLibrary;

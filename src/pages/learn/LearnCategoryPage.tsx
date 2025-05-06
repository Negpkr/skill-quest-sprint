
import React from "react";
import Layout from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";

interface CategoryInfo {
  title: string;
  description: string;
  sprints: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
  }[];
}

const LearnCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // This would ideally come from a database or API
  const categoryInfo: Record<string, CategoryInfo> = {
    design: {
      title: "Design",
      description: "Learn graphic design fundamentals and create stunning visuals",
      sprints: [
        {
          id: "design-starter",
          title: "Design Starter Sprint",
          description: "Learn Canva basics and create your first designs",
          difficulty: "Beginner"
        },
        {
          id: "logo-design",
          title: "Logo Design Sprint",
          description: "Master the art of creating memorable logos",
          difficulty: "Intermediate"
        }
      ]
    },
    tech: {
      title: "Tech",
      description: "Build coding skills and develop web applications",
      sprints: [
        {
          id: "html-css",
          title: "HTML & CSS Basics",
          description: "Create your first website from scratch",
          difficulty: "Beginner"
        },
        {
          id: "javascript",
          title: "JavaScript Fundamentals",
          description: "Add interactivity to your websites",
          difficulty: "Intermediate"
        }
      ]
    },
    // Additional categories would be defined here
  };
  
  const currentCategory = category ? categoryInfo[category] : null;
  
  if (!currentCategory) {
    return (
      <Layout>
        <div className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentCategory.title}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {currentCategory.description}
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Available Sprints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.sprints.map((sprint) => (
            <Card key={sprint.id}>
              <CardHeader>
                <CardTitle>{sprint.title}</CardTitle>
                <CardDescription>{sprint.difficulty} Level</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{sprint.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/challenge/${sprint.id}`}>View Sprint</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearnCategoryPage;

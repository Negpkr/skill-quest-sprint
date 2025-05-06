
import React from "react";
import Layout from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TechStarter: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tech Starter</h1>
          <p className="text-muted-foreground max-w-2xl">
            Your first steps into the world of coding and web development.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none mb-12">
          <h2>Start Your Coding Journey</h2>
          <p>
            Learning to code opens up countless opportunities for creative expression, 
            problem-solving, and career advancement. Our tech starter guides will help you
            build a solid foundation in web development fundamentals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>HTML & CSS Basics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn the building blocks of the web - structure content with HTML and
                style it with CSS.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>JavaScript Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add interactivity to your websites with JavaScript, the programming
                language of the web.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create websites that look great on any device - from desktop computers
                to mobile phones.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
            <Link to="/start-sprint">Start Tech Sprint</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TechStarter;

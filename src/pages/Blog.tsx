
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">The SkillSprint Blog</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Tips, success stories, and expert advice to help you build skills and launch side hustles
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <CardTitle>Blog Post Title #{i}</CardTitle>
                <CardDescription>May 1, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A short preview of the blog post content goes here...
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Read Article</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

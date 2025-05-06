
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Build: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Build & Showcase</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Upload your projects, get feedback, and build your portfolio
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center pb-12">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Project</CardTitle>
              <CardDescription>
                Share your work, get feedback, and build your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Showcase your skills and get constructive feedback from the community
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Upload Project</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Build;

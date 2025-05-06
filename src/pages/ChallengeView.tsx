
import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ChallengeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Challenge: {id}</h1>
          <p className="text-muted-foreground">
            Complete daily tasks to master this skill in 30 days
          </p>
          
          <div className="mt-6">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>Day 5 of 30</span>
                </div>
                <Progress value={16.7} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Task</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Complete this task to continue your progress in the challenge.
                </p>
                <Button className="w-full sm:w-auto">Mark as Complete</Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Challenge Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Additional materials to help you succeed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeView;

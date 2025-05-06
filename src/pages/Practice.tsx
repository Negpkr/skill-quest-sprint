
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Practice: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Practice Your Skills</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Strengthen your abilities with these daily exercises, quizzes, and mini-challenges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="dailyChallenge">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dailyChallenge">Daily Challenges</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="miniProjects">Mini Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dailyChallenge" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Daily Challenge #{i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Complete this challenge to improve your skills and earn points.
                    </p>
                    <Button className="w-full">Start Challenge</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quizzes">
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Quizzes coming soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="miniProjects">
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Mini projects coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Practice;

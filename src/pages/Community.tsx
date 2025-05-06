
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Community: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Community</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Connect with fellow skill builders, share your progress, and get inspired
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center pb-12">
          <Card>
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Share your progress, ask questions, and connect with others on the same journey
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Create Post</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;

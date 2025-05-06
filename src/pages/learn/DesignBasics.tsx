
import React from "react";
import Layout from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DesignBasics: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Design Basics</h1>
          <p className="text-muted-foreground max-w-2xl">
            Learn fundamental design principles and start creating beautiful graphics.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none mb-12">
          <h2>What is Graphic Design?</h2>
          <p>
            Graphic design is the craft of creating visual content to communicate messages. Designers use 
            typography, images, color, and layout to meet users' specific needs and focus on the logic of 
            displaying elements in interactive designs to optimize the user experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Color Theory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn how colors interact, create emotion, and establish brand identity through effective color combinations.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Master the art of selecting and combining typefaces to create readable, visually appealing text hierarchies.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Layout & Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Understand visual hierarchy, balance, and alignment to guide viewers through your design effectively.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
            <Link to="/start-sprint">Start Design Sprint</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DesignBasics;

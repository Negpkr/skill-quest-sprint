
import React from "react";
import Layout from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Freelancing101: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Freelancing 101</h1>
          <p className="text-muted-foreground max-w-2xl">
            Everything you need to know to start your freelancing career and land your first clients.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="prose max-w-none mb-12">
          <h2>Why Freelancing?</h2>
          <p>
            Freelancing offers flexibility, independence, and the ability to choose your projects and clients.
            It's a great way to monetize your skills while building a diversified portfolio of work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Setting Up Your Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn how to establish your freelance business, including legal considerations,
                branding, and essential tools.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Finding Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discover strategies for finding and attracting high-quality clients, from
                networking to online platforms.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn how to price your services confidently and create winning proposals
                that convert prospects into clients.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
            <Link to="/start-sprint">Start Freelancing Sprint</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Freelancing101;

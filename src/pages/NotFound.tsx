
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-300px)] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8">
          <span className="text-5xl font-bold">404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Oops! It looks like the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/challenges">Explore Challenges</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

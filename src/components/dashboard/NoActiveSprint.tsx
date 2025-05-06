
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

const NoActiveSprint: React.FC = () => {
  return (
    <div className="w-full py-16 px-8 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 animate-float shadow-lg">
        <Rocket className="h-12 w-12 text-white" />
      </div>
      
      <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Start Your First Sprint
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-8">
        You don't have any active skill sprints. Choose a 30-day challenge to start building your skills and side hustle.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md">
          <Link to="/challenges">Browse Sprints</Link>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="border-2">
          <Link to="/sprints/custom">Create Custom Sprint</Link>
        </Button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-3 text-white font-bold">
            1
          </div>
          <h3 className="font-semibold mb-1">Choose a Sprint</h3>
          <p className="text-sm text-muted-foreground">Select from curated 30-day skill challenges</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-3 text-white font-bold">
            2
          </div>
          <h3 className="font-semibold mb-1">Daily Tasks</h3>
          <p className="text-sm text-muted-foreground">Complete micro-tasks to build skills</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mb-3 text-white font-bold">
            3
          </div>
          <h3 className="font-semibold mb-1">Launch & Earn</h3>
          <p className="text-sm text-muted-foreground">Start your side hustle with your new skills</p>
        </div>
      </div>
    </div>
  );
};

export default NoActiveSprint;

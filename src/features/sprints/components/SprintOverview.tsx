
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Rocket, CheckCircle } from "lucide-react";

interface SprintOverviewProps {
  challenge: any;
  handleStartSprint: () => void;
}

const SprintOverview: React.FC<SprintOverviewProps> = ({ challenge, handleStartSprint }) => {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-bold mb-6">Sprint Overview</h2>
      
      <div className="bg-dark-card rounded-lg p-6 mb-8 border border-dark-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-skillpurple-400/20 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-skillpurple-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">30-Day Sprint</h3>
            <p className="text-muted-foreground">Complete daily micro-tasks to build your skills</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6">
          This 30-day sprint will guide you through a series of daily tasks designed to help you 
          master {challenge.category.toLowerCase()} skills and start earning with your new abilities.
        </p>
        
        <Button
          size="lg"
          onClick={handleStartSprint}
          className="w-full sm:w-auto bg-skillpurple-400 hover:bg-skillpurple-500"
        >
          <span>Start The Sprint</span>
          <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-8">
        <h3 className="text-xl font-bold">What You'll Learn</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Core {challenge.category} principles and best practices</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Essential tools and techniques used by professionals</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>How to create marketable projects</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Strategies to monetize your new skills</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SprintOverview;

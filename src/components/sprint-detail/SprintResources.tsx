
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SprintResourcesProps {
  challenge: {
    resources: Array<{title: string, url: string}>;
  };
  handleStartSprint: () => void;
}

const SprintResources: React.FC<SprintResourcesProps> = ({ challenge, handleStartSprint }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <h3 className="text-lg font-medium">Resources Included</h3>
        </CardHeader>
        <CardContent>
          {challenge.resources.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {challenge.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-skillpurple-400 hover:text-skillpurple-300 hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Resources will be provided as you progress through the sprint.</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <h3 className="text-lg font-medium">Sprint Structure</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Days 1-10</h4>
              <p className="text-sm text-muted-foreground">
                Learn the fundamentals and set up your workspace
              </p>
            </div>
            <div>
              <h4 className="font-medium">Days 11-20</h4>
              <p className="text-sm text-muted-foreground">
                Build projects and practice your skills
              </p>
            </div>
            <div>
              <h4 className="font-medium">Days 21-30</h4>
              <p className="text-sm text-muted-foreground">
                Create a portfolio and prepare to earn
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={handleStartSprint} 
            className="w-full"
          >
            View Full Schedule
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SprintResources;

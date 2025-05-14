
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface DaysPreviewProps {
  sprintDays: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  handleStartSprint: () => void;
}

const DaysPreview: React.FC<DaysPreviewProps> = ({ sprintDays, handleStartSprint }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Sprint Schedule</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sprintDays.slice(0, 6).map((day) => (
          <Card key={day.day} className="bg-dark-card border-dark-border">
            <CardHeader className="pb-2">
              <Badge variant="outline" className="w-fit">Day {day.day}</Badge>
              <h3 className="font-medium">{day.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{day.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button 
          onClick={handleStartSprint}
          className="bg-skillpurple-400 hover:bg-skillpurple-500"
        >
          Start The Sprint
          <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DaysPreview;

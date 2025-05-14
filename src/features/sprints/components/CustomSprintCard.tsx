
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkle } from "lucide-react";

const CustomSprintCard: React.FC = () => {
  return (
    <div className="mb-8 bg-gradient-to-r from-skillpurple-50 to-skillpurple-100 p-6 rounded-lg border border-skillpurple-200">
      <div className="flex items-start gap-4">
        <div className="bg-skillpurple-200 rounded-full p-2 mt-1">
          <Sparkle className="h-5 w-5 text-skillpurple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-skillpurple-700">Generate Custom Sprint with AI</h2>
          <p className="text-sm text-skillpurple-600 mb-4">
            Want to learn a specific skill? Let our AI create a personalized 30-day sprint just for you.
          </p>
          <Button 
            asChild
            className="bg-skillpurple-500 hover:bg-skillpurple-600 text-white"
          >
            <Link to="/generate-sprint">Create Custom Sprint</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomSprintCard;

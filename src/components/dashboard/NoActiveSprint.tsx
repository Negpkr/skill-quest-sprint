
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NoActiveSprint: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">No Active Sprint</h2>
      <p className="text-muted-foreground mb-8">Start a new sprint to begin your learning journey.</p>
      <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500">
        <Link to="/start-sprint">Start a Sprint</Link>
      </Button>
    </div>
  );
};

export default NoActiveSprint;

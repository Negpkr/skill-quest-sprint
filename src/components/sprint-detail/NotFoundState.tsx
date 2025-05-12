
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Sprint Not Found</h2>
      <p className="mt-2 text-muted-foreground">We couldn't find the sprint you're looking for.</p>
      <Button 
        className="mt-6" 
        onClick={() => navigate('/sprints')}
      >
        Return to Sprint Library
      </Button>
    </div>
  );
};

export default NotFoundState;


import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration?: number;
  resources?: string;
}

// Component supports both direct props and a challenge prop
interface ChallengeCardComponentProps {
  challenge?: ChallengeProps;
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  duration?: number;
  resources?: string;
}

const ChallengeCard: React.FC<ChallengeCardComponentProps> = (props) => {
  // Extract properties from either challenge prop or direct props
  const challenge = props.challenge || props;
  const {
    id,
    title,
    description,
    category,
    difficulty,
    duration = 30
  } = challenge;

  const difficultyClass = 
    difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";
  
  const categoryColors: Record<string, string> = {
    Design: "bg-softpurple text-purple-800",
    Tech: "bg-softblue text-blue-800",
    Marketing: "bg-softpink text-pink-800",
    Creator: "bg-softorange text-orange-800",
    Business: "bg-softpeach text-orange-800",
    Freelance: "bg-softgreen text-green-800",
    Productivity: "bg-softblue text-blue-800",
    Custom: "bg-gray-200 text-gray-800"
  };

  const categoryClass = categoryColors[category] || "bg-gray-200 text-gray-800";

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md overflow-hidden border border-gray-200 hover:border-gray-300">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={`${categoryClass} hover:${categoryClass}`}>
            {category}
          </Badge>
          <Badge className={`${difficultyClass} hover:${difficultyClass}`}>
            {difficulty}
          </Badge>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{duration} Days</span>
        </div>
        <Button asChild size="sm" variant="ghost" className="text-primary">
          <Link to={`/challenge/${id}`}>
            View <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;

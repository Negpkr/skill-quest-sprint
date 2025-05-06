
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  resources: {
    title: string;
    url: string;
  }[];
}

const ChallengeCard: React.FC<{ challenge: ChallengeProps }> = ({ challenge }) => {
  const difficultyClass = 
    challenge.difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : challenge.difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";

  const categoryColors: Record<string, string> = {
    Design: "bg-softpurple text-purple-800",
    Tech: "bg-softblue text-blue-800",
    Marketing: "bg-softpink text-pink-800",
    Creator: "bg-softorange text-orange-800",
    Business: "bg-softpeach text-orange-800",
    Freelance: "bg-softgreen text-green-800"
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-muted">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={difficultyClass}>
            {challenge.difficulty}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{challenge.title}</h3>
          <Badge className={categoryColors[challenge.category] || "bg-secondary"}>
            {challenge.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {challenge.description}
        </p>
        {challenge.resources.length > 0 && (
          <div className="text-sm">
            <p className="font-medium mb-1">Resources:</p>
            <ul className="list-disc pl-5 space-y-1">
              {challenge.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-skillpurple-500 hover:text-skillpurple-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-4">
        <Button asChild className="w-full bg-skillpurple-400 hover:bg-skillpurple-500">
          <Link to={`/challenge/${challenge.id}`}>View Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;

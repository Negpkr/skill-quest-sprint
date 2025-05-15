
import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  resources?: Array<{ title: string; url: string }>;
}

interface ChallengeCardProps {
  challenge: ChallengeProps;
  index?: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, index = 0 }) => {
  const { id, title, description, category, difficulty, imageUrl } = challenge;
  
  // Generate badge color based on difficulty
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <ScrollAnimationWrapper 
      animation="slideUp" 
      delay={index * 0.1}
    >
      <Link to={`/challenge/${id}`}>
        <Card className="h-full overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={imageUrl} 
                alt={title} 
                className="object-cover w-full h-full rounded-t-lg"
              />
            </AspectRatio>
            <div className="absolute top-4 right-4">
              <Badge className={`${getBadgeColor(difficulty)}`}>
                {difficulty}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                {category}
              </Badge>
            </div>
          </div>
          
          <CardContent className="pt-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
          </CardContent>
          
          <CardFooter className="border-t px-6 py-4">
            <span className="text-xs font-medium text-skillpurple-500 flex items-center">
              View Challenge
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </CardFooter>
        </Card>
      </Link>
    </ScrollAnimationWrapper>
  );
};

export default ChallengeCard;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprint, Challenge } from "@/types/sprint";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowUp, InfoIcon } from "lucide-react"; // Using ArrowUp instead of Launch
import AddChallengeDays from './AddChallengeDays';

interface ChallengeResourcesProps {
  currentChallenge: Challenge | undefined;
  sprint: Sprint | null;
  parseResources: (resourcesStr: string | null) => any[];
}

const ChallengeResources: React.FC<ChallengeResourcesProps> = ({
  currentChallenge,
  sprint,
  parseResources
}) => {
  const resources = currentChallenge?.resources ? parseResources(currentChallenge.resources) : [];

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Resources</CardTitle>
        <CardDescription>Helpful links for this challenge</CardDescription>
      </CardHeader>
      
      {/* Add the new component here */}
      {sprint?.id === "7f649785-a610-40d7-b144-29c36fc14628" && (
        <CardContent className="pb-1">
          <AddChallengeDays challengeId={sprint.id} />
          <Separator className="my-2" />
        </CardContent>
      )}
      
      <CardContent>
        {resources && resources.length > 0 ? (
          <ul className="space-y-2">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-start">
                <ArrowUp className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <Link
                  to={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {resource.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-6 text-gray-500">
            <InfoIcon className="h-4 w-4 mr-2" />
            <p>No resources available for this day.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeResources;

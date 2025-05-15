
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Sprint, type Challenge } from "@/types/sprint";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {currentChallenge && currentChallenge.resources ? (
          <div className="space-y-2">
            <p className="text-muted-foreground mb-2">
              Additional materials to help you succeed.
            </p>
            <ul className="space-y-2">
              {parseResources(currentChallenge.resources).map((resource: any, index: number) => (
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
          </div>
        ) : (
          <p className="text-muted-foreground">
            {sprint?.description || "Additional materials to help you succeed."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeResources;

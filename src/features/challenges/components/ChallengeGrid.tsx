
import React from "react";
import { ChallengeProps } from "@/features/challenges/components/ChallengeCard";
import { Skeleton } from "@/components/ui/skeleton";

export interface ChallengeGridProps {
  challenges: ChallengeProps[];
  isLoading: boolean;
  resetFilters: () => void;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges, isLoading, resetFilters }) => {
  const ChallengeCard = React.lazy(() => import("@/features/challenges/components/ChallengeCard"));

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 h-64">
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-7 w-3/4 mb-4" />
            <Skeleton className="h-20 w-full mb-6" />
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No results
  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No challenges found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
        <button 
          onClick={resetFilters}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Clear filters
        </button>
      </div>
    );
  }

  // Render challenges
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {challenges.map((challenge) => (
        <React.Suspense key={challenge.id} fallback={<div className="border rounded-lg p-4 h-64 animate-pulse bg-gray-100" />}>
          <ChallengeCard {...challenge} />
        </React.Suspense>
      ))}
    </div>
  );
};

export default ChallengeGrid;

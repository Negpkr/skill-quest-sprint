
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChallengeCard, { ChallengeProps } from "@/features/challenges/components/ChallengeCard";
import { containerVariants, itemVariants, emptyStateAnimations } from "./animations";

interface ChallengeGridProps {
  challenges: ChallengeProps[];
  isLoading: boolean;
  resetFilters: () => void;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({
  challenges,
  isLoading,
  resetFilters
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        {...emptyStateAnimations}
      >
        <h3 className="text-xl font-medium mb-2">No challenges found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <Button onClick={resetFilters}>
          Reset Filters
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {challenges.map((challenge) => (
        <motion.div key={challenge.id} variants={itemVariants}>
          <ChallengeCard 
            id={challenge.id}
            title={challenge.title}
            description={challenge.description}
            category={challenge.category}
            difficulty={challenge.difficulty}
            duration={challenge.duration}
            resources={challenge.resources}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChallengeGrid;


import React, { useEffect } from "react";
import { useChallenges } from "@/hooks/useChallenges";
import Layout from "@/components/Layout";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import ChallengeGrid from "@/components/challenges/ChallengeGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Challenges: React.FC = () => {
  const {
    challenges: filteredChallenges,
    allChallenges,
    isLoading,
    categories,
    difficulties,
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchQuery,
    resetFilters
  } = useChallenges();

  return (
    <Layout>
      <ChallengeHeader />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ChallengeFilters 
          categories={categories}
          difficulties={difficulties}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          searchQuery={searchQuery}
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficulty={setSelectedDifficulty}
          setSearchQuery={setSearchQuery}
          resetFilters={resetFilters}
        />
        
        <ChallengeGrid 
          challenges={filteredChallenges}
          isLoading={isLoading}
          resetFilters={resetFilters}
        />
      </div>
    </Layout>
  );
};

export default Challenges;

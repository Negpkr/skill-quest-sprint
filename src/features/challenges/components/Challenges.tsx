
import React, { useEffect } from "react";
import { useChallenges } from "@/hooks/useChallenges";
import Layout from "@/components/Layout";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import ChallengeGrid from "@/components/challenges/ChallengeGrid";
import { Skeleton } from "@/components/ui/skeleton";

const Challenges: React.FC = () => {
  const {
    filteredChallenges,
    allChallenges,
    isLoading,
    categories,
    difficulties,
    selectedCategory,
    selectedDifficulty,
    searchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchTerm,
    resetFilters
  } = useChallenges();

  return (
    <Layout>
      <ChallengeHeader />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ChallengeFilters 
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          searchTerm={searchTerm}
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficulty={setSelectedDifficulty}
          setSearchTerm={setSearchTerm}
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

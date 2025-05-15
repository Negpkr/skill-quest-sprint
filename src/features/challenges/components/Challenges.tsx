
import React from "react";
import { useChallenges } from "@/features/challenges/hooks/useChallenges";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeFilters from "./ChallengeFilters";
import ChallengeGrid from "./ChallengeGrid";

const Challenges: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredChallenges,
    isLoading,
    resetFilters,
    categories,
    difficulties
  } = useChallenges();
  
  return (
    <>
      <div className="bg-gradient-to-b from-dark-background to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <ChallengeHeader />
          
          <ChallengeFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            resetFilters={resetFilters}
            categories={categories}
            difficulties={difficulties}
          />
        </div>
      </div>
      
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <ChallengeGrid 
            challenges={filteredChallenges}
            isLoading={isLoading}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </>
  );
};

export default Challenges;

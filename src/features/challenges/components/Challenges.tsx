
import React from "react";
import Layout from "./Layout";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeFilters from "./ChallengeFilters";
import ChallengeGrid from "./ChallengeGrid";
import { useChallenges } from "@/hooks/useChallenges";

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
    resetFilters
  } = useChallenges();

  return (
    <Layout>
      <ChallengeHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ChallengeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          resetFilters={resetFilters}
        />
        
        <ChallengeGrid 
          challenges={filteredChallenges} 
          isLoading={isLoading} 
        />
      </div>
    </Layout>
  );
};

export default Challenges;

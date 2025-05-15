
import React from "react";
import Layout from "../components/Layout";
import { useChallenges } from "@/hooks/useChallenges";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import ChallengeGrid from "@/components/challenges/ChallengeGrid";

const Sprints: React.FC = () => {
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
  
  // Handler to ensure resetFilters is called with proper context
  const handleResetFilters = () => {
    console.log("Page level reset called");
    resetFilters();
  };
  
  return (
    <Layout>
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
            resetFilters={handleResetFilters}
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
            resetFilters={handleResetFilters}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Sprints;

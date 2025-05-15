
import React from 'react';
import { useChallenges } from '@/hooks/useChallenges';
import ChallengeFilters from './ChallengeFilters';
import ChallengeGrid from './ChallengeGrid';

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <ChallengeFilters
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          searchTerm={searchTerm}
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficulty={setSelectedDifficulty}
          setSearchTerm={setSearchTerm}
          resetFilters={resetFilters}
        />
      </div>
      <ChallengeGrid challenges={filteredChallenges} isLoading={isLoading} />
    </div>
  );
};

export default Challenges;

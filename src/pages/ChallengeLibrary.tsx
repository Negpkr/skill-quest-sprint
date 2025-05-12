
import React from "react";
import Layout from "../components/Layout";
import { useChallenges, categories, difficulties } from "@/hooks/useChallenges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChallengeCard from "@/components/ChallengeCard";
import { Link } from "react-router-dom";

const ChallengeLibrary: React.FC = () => {
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

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? "All" : category);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? "All" : difficulty);
  };

  const getCategoryClass = (category: string) => {
    if (selectedCategory === category) {
      return "bg-primary text-primary-foreground";
    }
    return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  };

  const getDifficultyClass = (difficulty: string) => {
    if (selectedDifficulty === difficulty) {
      return "bg-primary text-primary-foreground";
    }
    return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  };

  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Skill Challenge Library</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Browse our collection of 30-day challenges to learn new skills and launch side hustles
          </p>
          
          {/* Search */}
          <div className="max-w-lg mx-auto">
            <Input 
              placeholder="Search challenges..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6"
            />
          </div>
          
          {/* Filter buttons */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.filter(category => category !== "All").map(category => (
                <Button 
                  key={category}
                  variant="secondary" 
                  className={getCategoryClass(category)}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Difficulty</h2>
            <div className="flex flex-wrap gap-2">
              {difficulties.filter(difficulty => difficulty !== "All").map(difficulty => (
                <Button 
                  key={difficulty}
                  variant="secondary" 
                  className={getDifficultyClass(difficulty)}
                  onClick={() => handleDifficultyFilter(difficulty)}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
          </div>
        ) : filteredChallenges.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No challenges found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChallengeLibrary;

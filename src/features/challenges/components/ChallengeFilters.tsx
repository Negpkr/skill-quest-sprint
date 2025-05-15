
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, difficulties } from "@/features/challenges/hooks/useChallenges";

interface ChallengeFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  resetFilters: () => void;
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  resetFilters,
}) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        
        {/* Category Filter */}
        <div>
          <select
            className="w-full h-10 px-3 rounded-md bg-background border border-input text-foreground"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Difficulty Filter */}
        <div className="flex space-x-2">
          <select
            className="w-full h-10 px-3 rounded-md bg-background border border-input text-foreground"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === "All" ? "All Difficulties" : difficulty}
              </option>
            ))}
          </select>
          
          {/* Reset Button */}
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilters;

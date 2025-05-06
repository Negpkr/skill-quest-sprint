
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { filterAnimations } from "./animations";
import { categories, difficulties } from "@/hooks/useChallenges";

interface ChallengeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  resetFilters: () => void;
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  resetFilters
}) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-8"
      {...filterAnimations}
    >
      {/* Search */}
      <div className="w-full sm:w-64 md:w-96 relative">
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search challenges..."
          className="pl-9 bg-dark-card border-dark-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full sm:w-auto">
        <div>
          <label htmlFor="category-filter" className="sr-only">Category Filter</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-2 px-3 bg-dark-card border border-dark-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-skillpurple-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="difficulty-filter" className="sr-only">Difficulty Filter</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="py-2 px-3 bg-dark-card border border-dark-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-skillpurple-400"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === "All" ? "All Difficulties" : difficulty}
              </option>
            ))}
          </select>
        </div>
        
        <Button
          variant="outline"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeFilters;

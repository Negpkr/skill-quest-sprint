
import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { filterAnimations } from "./animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChallengeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  resetFilters: () => void;
  categories: string[];
  difficulties: string[];
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  resetFilters,
  categories,
  difficulties
}) => {
  // Local handler to ensure resetFilters is properly called
  const handleResetFilters = useCallback(() => {
    console.log("Reset button clicked");
    resetFilters();
    // Explicitly set values locally as well to ensure UI updates
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDifficulty("");
  }, [resetFilters, setSearchTerm, setSelectedCategory, setSelectedDifficulty]);

  // Check if any filters are active
  const hasActiveFilters = 
    searchTerm !== "" || 
    selectedCategory !== "" || 
    selectedDifficulty !== "";

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
          placeholder="Search sprints..."
          className="pl-9 bg-dark-card border-dark-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full sm:w-auto">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          onClick={handleResetFilters}
          disabled={!hasActiveFilters}
          className="min-w-[80px]"
        >
          Reset
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeFilters;

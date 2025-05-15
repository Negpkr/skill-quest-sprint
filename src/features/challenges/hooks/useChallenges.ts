
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { mockChallengeData } from "@/data/mockSprintData";
import { ChallengeProps } from "@/features/challenges/components/ChallengeCard";
import { toast } from "@/components/ui/use-toast";

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<ChallengeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    filterChallenges();
  }, [challenges, selectedCategory, selectedDifficulty, searchQuery]);

  const fetchChallenges = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("sprints")
        .select("*");

      if (error) {
        console.error("Error fetching challenges:", error);
        // Fall back to mock data
        useMockData();
        return;
      }

      if (data && data.length > 0) {
        setChallenges(data);
        
        // Extract unique categories and difficulties
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
        const uniqueDifficulties = Array.from(new Set(data.map(item => item.difficulty)));
        
        setCategories(uniqueCategories);
        setDifficulties(uniqueDifficulties);
      } else {
        // Fall back to mock data if no data from Supabase
        useMockData();
      }
    } catch (error) {
      console.error("Error in fetchChallenges:", error);
      // Fall back to mock data
      useMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const useMockData = () => {
    setChallenges(mockChallengeData);
    
    // Extract unique categories and difficulties from mock data
    const uniqueCategories = Array.from(new Set(mockChallengeData.map(item => item.category)));
    const uniqueDifficulties = Array.from(new Set(mockChallengeData.map(item => item.difficulty)));
    
    setCategories(uniqueCategories);
    setDifficulties(uniqueDifficulties);
    
    toast({
      title: "Using demo data",
      description: "We're showing you demo challenges because we couldn't connect to the database.",
      variant: "default",
    });
  };

  const filterChallenges = () => {
    let filtered = [...challenges];
    
    if (selectedCategory) {
      filtered = filtered.filter(challenge => challenge.category === selectedCategory);
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(query) || 
        challenge.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredChallenges(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSearchQuery("");
  };

  return {
    challenges: filteredChallenges,
    allChallenges: challenges,
    isLoading,
    categories,
    difficulties,
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchQuery,
    resetFilters,
    filteredChallenges
  };
};

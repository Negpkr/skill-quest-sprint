
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  resources?: string;
}

export const useChallenges = () => {
  const [allChallenges, setAllChallenges] = useState<ChallengeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    fetchChallenges();
  }, []);
  
  const fetchChallenges = async () => {
    try {
      setIsLoading(true);
      
      const { data: sprintsData, error } = await supabase
        .from('sprints')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (sprintsData) {
        // Make sure sprintsData is properly typed as ChallengeProps[]
        const typedSprintsData: ChallengeProps[] = sprintsData.map(sprint => ({
          id: sprint.id,
          title: sprint.title,
          description: sprint.description,
          category: sprint.category,
          difficulty: sprint.difficulty,
          duration: sprint.duration || 30,
          resources: sprint.resources || ""
        }));
        
        setAllChallenges(typedSprintsData);
        
        // Extract unique categories and difficulties
        const uniqueCategories: string[] = [...new Set(typedSprintsData.map(sprint => sprint.category))];
        const uniqueDifficulties: string[] = [...new Set(typedSprintsData.map(sprint => sprint.difficulty))];
        
        setCategories(uniqueCategories);
        setDifficulties(uniqueDifficulties);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSearchTerm('');
  };
  
  // Filter challenges based on selected filters and search term
  const filteredChallenges = allChallenges.filter(challenge => {
    const matchesCategory = selectedCategory ? challenge.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? challenge.difficulty === selectedDifficulty : true;
    const matchesSearch = searchTerm
      ? challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });
  
  return {
    allChallenges,
    filteredChallenges,
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
  };
};

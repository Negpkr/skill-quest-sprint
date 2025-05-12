
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ChallengeProps } from "@/components/ChallengeCard";

// Sample challenges data with improved images as fallback
const challengesData: ChallengeProps[] = [
  {
    id: "design-starter",
    title: "Design Starter Sprint",
    description: "Learn Canva basics and create your first sellable design in 30 days. Perfect for beginners looking to start a design side hustle.",
    category: "Design",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000",
    resources: [
      { title: "Canva Design School", url: "https://www.canva.com/designschool/" },
      { title: "Canva Beginner Tutorial", url: "https://www.youtube.com/watch?v=oDFM4cLv9_c" }
    ]
  },
  {
    id: "web-dev",
    title: "Web Dev Sprint",
    description: "Build and launch your first website with HTML, CSS, and basic JavaScript. Learn to host it on GitHub Pages.",
    category: "Tech",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000",
    resources: [
      { title: "freeCodeCamp HTML Course", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
      { title: "GitHub Pages Guide", url: "https://pages.github.com/" }
    ]
  },
  {
    id: "freelance-launchpad",
    title: "Freelance Launchpad",
    description: "Start and earn from your first freelancing gig in just 30 days. Perfect for beginners wanting to enter the gig economy.",
    category: "Freelance",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000",
    resources: [
      { title: "Fiverr Academy", url: "https://www.fiverr.com/resources/guides" },
      { title: "Freelance Client Acquisition", url: "https://www.youtube.com/watch?v=iHXbP7uMSWo" }
    ]
  },
  {
    id: "personal-brand",
    title: "Personal Brand Builder",
    description: "Establish your professional online presence through LinkedIn optimization and personal branding strategies.",
    category: "Marketing",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000",
    resources: [
      { title: "LinkedIn Profile Tips", url: "https://www.linkedin.com/business/talent/blog/product-tips/linkedin-profile-tips" },
      { title: "Personal Branding Tutorial", url: "https://www.youtube.com/watch?v=0ytB9aO0ZTo" }
    ]
  },
  {
    id: "productivity",
    title: "Productivity Booster",
    description: "Create a productivity system using Notion and time-management techniques to maximize your effectiveness.",
    category: "Business",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2000",
    resources: [
      { title: "Notion Templates", url: "https://www.notion.so/templates" },
      { title: "Productivity System Video", url: "https://www.youtube.com/watch?v=PAMCpX-QpnM" }
    ]
  },
  {
    id: "freelance-pro",
    title: "Freelance Pro Sprint",
    description: "Scale your freelancing business from occasional gigs to consistent income with advanced client acquisition and management.",
    category: "Freelance",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000",
    resources: [
      { title: "Upwork Scaling Guide", url: "https://www.upwork.com/resources/scaling-your-freelance-business" },
      { title: "Freelance Scaling Guide", url: "https://www.youtube.com/watch?v=KBtJOq3EqQw" }
    ]
  }
];

// Define categories and difficulties arrays
export const categories = ["All", "Design", "Tech", "Marketing", "Creator", "Business", "Freelance", "Productivity", "Custom"];
export const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export const useChallenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sprints, setSprints] = useState<ChallengeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const { data, error } = await supabase
          .from('sprints')
          .select('id, title, description, category, difficulty')
          .order('title');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // Transform Supabase data to match ChallengeProps format
          const formattedSprints = data.map(sprint => ({
            id: sprint.id,
            title: sprint.title,
            description: sprint.description || "",
            category: sprint.category,
            difficulty: sprint.difficulty as "Beginner" | "Intermediate" | "Advanced",
            imageUrl: getCategoryImage(sprint.category),
            resources: [] // Default empty resources
          }));
          
          setSprints(formattedSprints);
          console.log("Fetched sprints:", formattedSprints);
        } else {
          // Only use fallback data if no data was returned from Supabase
          setSprints(challengesData);
          console.log("Using fallback challenge data - no data found in database");
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
        toast({
          title: "Error",
          description: "Failed to load sprint data. Using sample data instead.",
          variant: "destructive"
        });
        // Use hardcoded data as fallback only if there was an error
        setSprints(challengesData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSprints();
  }, []);

  // Helper function to get image URLs based on category
  const getCategoryImage = (category: string): string => {
    const categoryImages: Record<string, string> = {
      Design: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000",
      Tech: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000",
      Freelance: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000",
      Marketing: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000",
      Business: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2000",
      Creator: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2000",
      Productivity: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2000",
      Custom: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2000"
    };
    
    return categoryImages[category] || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000";
  };

  // Improved filter function with more robust string comparison
  const filteredChallenges = sprints.filter((challenge) => {
    // Case insensitive search in title and description
    const matchesSearch = 
      searchTerm === "" || 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (challenge.description && challenge.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filtering
    const matchesCategory = 
      selectedCategory === "All" || 
      challenge.category === selectedCategory;
    
    // Difficulty filtering
    const matchesDifficulty = 
      selectedDifficulty === "All" || 
      challenge.difficulty === selectedDifficulty;
    
    // All conditions must be true for the item to be included
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredChallenges,
    isLoading,
    resetFilters
  };
};

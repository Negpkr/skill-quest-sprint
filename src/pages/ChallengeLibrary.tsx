
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  resources: {
    title: string;
    url: string;
  }[];
}

const ChallengeLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);

  const challenges: Challenge[] = [
    {
      id: "design-starter",
      title: "Design Starter Sprint",
      description: "Learn graphic design basics with Canva and create your first sellable templates in 30 days",
      category: "Design",
      difficulty: "Beginner",
      imageUrl: "https://placehold.co/600x400/e5deff/7e69ab?text=Design+Sprint",
      resources: [
        { title: "Canva Design School", url: "https://www.canva.com/designschool/" },
        { title: "Canva Beginner Tutorial", url: "https://www.youtube.com/watch?v=d4z1GNAjOQ4" }
      ]
    },
    {
      id: "web-dev",
      title: "Web Dev Sprint",
      description: "Build and deploy your first website with HTML, CSS, and basic JavaScript",
      category: "Tech",
      difficulty: "Intermediate",
      imageUrl: "https://placehold.co/600x400/d3e4fd/4285F4?text=Web+Dev",
      resources: [
        { title: "freeCodeCamp HTML Course", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
        { title: "GitHub Pages Guide", url: "https://pages.github.com/" }
      ]
    },
    {
      id: "freelance-starter",
      title: "Freelance Launchpad",
      description: "Set up your freelance business and land your first client in 30 days",
      category: "Freelance",
      difficulty: "Beginner",
      imageUrl: "https://placehold.co/600x400/f2fce2/43A047?text=Freelance",
      resources: [
        { title: "Fiverr Academy", url: "https://learn.fiverr.com/" },
        { title: "Client Acquisition Guide", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    },
    {
      id: "personal-brand",
      title: "Personal Brand Builder",
      description: "Create a distinctive personal brand and online presence",
      category: "Marketing",
      difficulty: "Intermediate",
      imageUrl: "https://placehold.co/600x400/ffdee2/e91e63?text=Personal+Brand",
      resources: [
        { title: "LinkedIn Profile Tips", url: "https://www.linkedin.com/business/sales/blog/profile-best-practices/" },
        { title: "Branding Tutorial", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    },
    {
      id: "productivity",
      title: "Productivity Booster",
      description: "Build an effective productivity system that works for you",
      category: "Business",
      difficulty: "Beginner",
      imageUrl: "https://placehold.co/600x400/fef7cd/FBC02D?text=Productivity",
      resources: [
        { title: "Notion Templates", url: "https://www.notion.so/templates" },
        { title: "Productivity System Guide", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    },
    {
      id: "freelance-pro",
      title: "Freelance Pro Sprint",
      description: "Scale your freelance business and increase your rates",
      category: "Freelance",
      difficulty: "Intermediate",
      imageUrl: "https://placehold.co/600x400/fde1d3/ff9800?text=Freelance+Pro",
      resources: [
        { title: "Upwork Scaling Guide", url: "https://www.upwork.com/resources/start-freelancing" },
        { title: "Freelance Scaling Tutorial", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  const categories = ["Design", "Tech", "Marketing", "Creator", "Business", "Freelance"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    let filtered = [...challenges];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(challenge => challenge.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }
    
    setFilteredChallenges(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
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

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch(difficulty) {
      case "Beginner":
        return "bg-softgreen text-green-800";
      case "Intermediate":
        return "bg-softyellow text-yellow-800";
      case "Advanced":
        return "bg-softorange text-orange-800";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    const categoryColors: Record<string, string> = {
      Design: "bg-softpurple text-purple-800",
      Tech: "bg-softblue text-blue-800",
      Marketing: "bg-softpink text-pink-800",
      Creator: "bg-softorange text-orange-800",
      Business: "bg-softpeach text-orange-800",
      Freelance: "bg-softgreen text-green-800"
    };
    
    return categoryColors[category] || "bg-secondary text-secondary-foreground";
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
              {categories.map(category => (
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
              {difficulties.map(difficulty => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-muted">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getDifficultyBadgeClass(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{challenge.title}</h3>
                  <Badge className={getCategoryBadgeClass(challenge.category)}>
                    {challenge.category}
                  </Badge>
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                {challenge.resources.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium mb-1">Resources:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {challenge.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-skillpurple-500 hover:text-skillpurple-600 hover:underline"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-4 mt-4">
                <Button asChild className="w-full bg-skillpurple-400 hover:bg-skillpurple-500">
                  <Link to={`/challenge/${challenge.id}`}>View Challenge</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeLibrary;

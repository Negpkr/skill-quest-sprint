
import React, { useState } from "react";
import Layout from "../components/Layout";
import ChallengeCard, { ChallengeProps } from "../components/ChallengeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// Sample challenges data with improved images
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

const categories = ["All", "Design", "Tech", "Marketing", "Creator", "Business", "Freelance"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Challenges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  
  const filteredChallenges = challengesData.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
    
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  return (
    <Layout>
      <div className="bg-gradient-to-b from-dark-background to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Skill Challenge Library</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of 30-day skill sprints. Each challenge includes daily micro-tasks 
              and resources to help you learn and start earning.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
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
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
              >
                Reset
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {filteredChallenges.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredChallenges.map((challenge) => (
                <motion.div key={challenge.id} variants={itemVariants}>
                  <ChallengeCard challenge={challenge} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;

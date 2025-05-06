
import React from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChallengeProps } from "@/components/ChallengeCard";
import { Award, ExternalLink, Book, Rocket } from "lucide-react";

// Sample challenge details data with improved images - now exported
export const challengeData: Record<string, ChallengeProps & { 
  longDescription: string; 
  syllabus: { title: string; description: string; }[];
  tasks: { id: string; day: number; title: string; completed: boolean; }[];
}> = {
  "design-starter": {
    id: "design-starter",
    title: "Design Starter Sprint",
    description: "Learn Canva basics and create your first sellable design in 30 days.",
    longDescription: "Perfect for complete beginners, this challenge walks you through the fundamentals of graphic design using Canva - no design experience needed! By the end of 30 days, you'll have created several marketable design templates that you can start selling online.",
    category: "Design",
    difficulty: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000",
    resources: [
      { title: "Canva Design School", url: "https://www.canva.com/designschool/" },
      { title: "Canva Beginner Tutorial", url: "https://www.youtube.com/watch?v=oDFM4cLv9_c" },
      { title: "Etsy Template Shop Guide", url: "https://www.etsy.com/seller-handbook/" }
    ],
    syllabus: [
      { 
        title: "Week 1: Canva Basics", 
        description: "Master the Canva interface, basic design principles, and create your first simple designs." 
      },
      { 
        title: "Week 2: Design Fundamentals", 
        description: "Learn about typography, color theory, and layout principles to improve your designs." 
      },
      { 
        title: "Week 3: Creating Templates", 
        description: "Build a collection of templates for different purposes: social media, presentations, and print." 
      },
      { 
        title: "Week 4: Launch Your Design Store", 
        description: "Set up your online presence, price your templates, and make your first sale." 
      }
    ],
    tasks: [
      { id: "task1", day: 1, title: "Sign up for a free Canva account", completed: true },
      { id: "task2", day: 2, title: "Complete the Canva beginner interface tutorial", completed: true },
      { id: "task3", day: 3, title: "Create your first social media graphic", completed: true },
      { id: "task4", day: 4, title: "Learn about font pairing and create a typography sample", completed: true },
      { id: "task5", day: 5, title: "Create a color palette for your design brand", completed: false },
      { id: "task6", day: 6, title: "Design your first Instagram post template", completed: false },
      { id: "task7", day: 7, title: "Create a simple logo design", completed: false },
      // More tasks would be added here...
      { id: "task8", day: 8, title: "Learn about design grids and alignment", completed: false },
      { id: "task9", day: 9, title: "Create a Pinterest pin template", completed: false },
      { id: "task10", day: 10, title: "Design a simple business card template", completed: false }
    ]
  },
  "web-dev": {
    id: "web-dev",
    title: "Web Dev Sprint",
    description: "Build and launch your first website with HTML, CSS, and basic JavaScript.",
    longDescription: "This 30-day challenge will take you from zero to launching your first website. You'll learn HTML, CSS, and basic JavaScript, with a focus on practical projects that you can showcase to potential clients or employers.",
    category: "Tech",
    difficulty: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000",
    resources: [
      { title: "freeCodeCamp HTML Course", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
      { title: "GitHub Pages Guide", url: "https://pages.github.com/" },
      { title: "JavaScript Basics", url: "https://javascript.info/" }
    ],
    syllabus: [
      { 
        title: "Week 1: HTML Fundamentals", 
        description: "Learn the basic structure of web pages, tags, and elements." 
      },
      { 
        title: "Week 2: CSS Styling", 
        description: "Master styling techniques, layouts, and responsive design." 
      },
      { 
        title: "Week 3: JavaScript Basics", 
        description: "Add interactivity to your site with JavaScript features." 
      },
      { 
        title: "Week 4: Deployment & Optimization", 
        description: "Launch your site on GitHub Pages and optimize for performance." 
      }
    ],
    tasks: [
      { id: "task1", day: 1, title: "Set up your development environment", completed: true },
      { id: "task2", day: 2, title: "Create your first HTML page", completed: true },
      { id: "task3", day: 3, title: "Add basic elements to your page", completed: false },
      { id: "task4", day: 4, title: "Create a navigation menu", completed: false },
      { id: "task5", day: 5, title: "Style your page with CSS", completed: false },
      { id: "task6", day: 6, title: "Make your design responsive", completed: false },
      { id: "task7", day: 7, title: "Add your first JavaScript function", completed: false },
      { id: "task8", day: 8, title: "Create a contact form", completed: false },
      { id: "task9", day: 9, title: "Set up GitHub account", completed: false },
      { id: "task10", day: 10, title: "Deploy your site to GitHub Pages", completed: false }
    ]
  },
  // More challenges would be added here...
};

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = id ? challengeData[id] : null;
  
  if (!challenge) {
    return (
      <Layout>
        <div className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <p>The challenge you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const difficultyClass = 
    challenge.difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : challenge.difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      {/* Challenge Header */}
      <motion.div 
        className="relative bg-cover bg-center py-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.7)), url(${challenge.imageUrl})` 
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neo-purple/50 to-neo-blue/50 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative">
          <div className="flex flex-wrap items-center justify-between">
            <motion.div variants={fadeInUp}>
              <div className="flex space-x-2 mb-4">
                <Badge className={`${difficultyClass} px-3 py-1 text-sm font-medium`}>
                  {challenge.difficulty}
                </Badge>
                <Badge className="bg-softpurple text-purple-800 px-3 py-1 text-sm font-medium">
                  {challenge.category}
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mt-4 text-white">{challenge.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/90">{challenge.description}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp} 
              className="mt-6 sm:mt-0"
            >
              <Button className="mt-4 sm:mt-0 bg-white text-neo-purple hover:bg-white/90 hover:text-neo-blue transition-colors shadow-lg px-8 py-6 text-lg rounded-full">
                <Rocket className="mr-2 h-5 w-5" />
                Start This Challenge
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main challenge content */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* About this challenge */}
            <Card className="border-dark-border bg-dark-card shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-neo-purple to-neo-blue"></div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Book className="mr-2 h-5 w-5 text-neo-purple" />
                  About This Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">{challenge.longDescription}</p>
                
                <h3 className="font-semibold text-xl mb-4 text-white">What You'll Learn</h3>
                <div className="space-y-6">
                  {challenge.syllabus.map((week, index) => (
                    <motion.div 
                      key={index}
                      className="p-4 border border-dark-border bg-dark-background/50 rounded-lg hover:shadow-md transition-shadow"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-medium text-lg text-neo-purple">{week.title}</h4>
                      <p className="text-muted-foreground">{week.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Task Checklist */}
            <Card className="border-dark-border bg-dark-card shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-neo-green to-neo-teal"></div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Award className="mr-2 h-5 w-5 text-neo-green" />
                  30-Day Task Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenge.tasks.map((task) => (
                    <motion.div 
                      key={task.id} 
                      className={`flex items-start space-x-3 p-3 rounded-lg ${task.completed ? 'bg-green-950/30' : 'hover:bg-dark-muted/30'}`}
                      whileHover={{ x: 5 }}
                    >
                      <Checkbox 
                        id={task.id} 
                        checked={task.completed} 
                        className={task.completed ? "bg-neo-green border-neo-green text-white" : ""}
                      />
                      <div className="space-y-1">
                        <label
                          htmlFor={task.id}
                          className={`font-medium leading-none cursor-pointer ${task.completed ? "line-through text-muted-foreground" : "text-white"}`}
                        >
                          <span className="inline-block w-12 text-center mr-2 px-2 py-1 text-xs font-bold rounded-full bg-neo-purple text-white">
                            Day {task.day}
                          </span>
                          {task.title}
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Resources */}
            <Card className="border-dark-border bg-dark-card shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-neo-orange to-neo-yellow"></div>
              <CardHeader>
                <CardTitle className="text-xl">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {challenge.resources.map((resource, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                    >
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-skillpurple-400 hover:text-skillpurple-300 transition-colors flex items-center group"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 text-gray-400 group-hover:text-skillpurple-400 transition-colors" />
                        <span className="underline underline-offset-4">{resource.title}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Join Challenge */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-neo-purple to-neo-blue text-white">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
                  <p className="mb-6 text-white/90">Start this 30-day challenge and unlock daily tasks and tracking.</p>
                  <Button className="w-full bg-white text-neo-purple hover:bg-white/90 hover:text-neo-blue transition-colors">
                    Start This Challenge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Community */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-dark-border bg-dark-card shadow-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Join the Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">Connect with others taking this challenge to share tips and progress.</p>
                  <Button variant="outline" className="w-full border-neo-purple text-neo-purple hover:bg-neo-purple/10">
                    View Challenge Community
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeDetail;

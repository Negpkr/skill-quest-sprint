
import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SprintHeaderProps {
  challenge: {
    category: string;
    difficulty: string;
    title: string;
    description: string;
  };
  categoryColors: Record<string, string>;
  difficultyClass: string;
}

const SprintHeader: React.FC<SprintHeaderProps> = ({ 
  challenge, 
  categoryColors, 
  difficultyClass 
}) => {
  return (
    <div className="bg-gradient-to-b from-dark-background to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-10"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <Badge className={categoryColors[challenge.category] || "bg-secondary"}>
              {challenge.category}
            </Badge>
            <Badge className={difficultyClass}>
              {challenge.difficulty}
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-gradient">
            {challenge.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {challenge.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SprintHeader;

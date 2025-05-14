
import React from "react";
import { motion } from "framer-motion";
import { headerAnimations } from "./animations";

const ChallengeHeader: React.FC = () => {
  return (
    <motion.div 
      className="text-center mb-12"
      {...headerAnimations}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Skill Sprint Library</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Browse our collection of 30-day skill sprints. Each challenge includes daily micro-tasks 
        and resources to help you learn and start earning.
      </p>
    </motion.div>
  );
};

export default ChallengeHeader;

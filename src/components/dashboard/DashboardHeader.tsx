
import React from "react";
import { Sparkles } from "lucide-react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-softpurple via-skillpurple-300 to-softblue py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute h-8 w-8 rounded-full bg-white opacity-70 animate-float"
            style={{
              top: `${Math.floor(Math.random() * 100)}%`,
              left: `${Math.floor(Math.random() * 100)}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-2">
            <Sparkles className="text-white h-8 w-8 mr-2" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Your Dashboard</h1>
          </div>
          <p className="text-white/80">Track your progress, complete daily tasks, and launch your side hustle.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

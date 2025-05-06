
import React from "react";
import { Sparkles, Star, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHeader: React.FC = () => {
  const floatingElements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? 'circle' : Math.random() > 0.5 ? 'triangle' : 'square',
    size: Math.floor(Math.random() * 30) + 10,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 7,
  }));

  return (
    <div className="bg-gradient-to-r from-dark-background via-neo-purple/20 to-neo-blue/20 py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-lg shadow-lg">
      {/* Animated floating elements */}
      <div className="absolute inset-0 opacity-20">
        {floatingElements.map((el) => (
          <div 
            key={el.id} 
            className={`absolute animate-float ${
              el.type === 'circle' ? 'rounded-full' : 
              el.type === 'triangle' ? 'triangle' : 'rounded'
            } bg-white`}
            style={{
              top: el.top,
              left: el.left,
              width: el.size,
              height: el.size,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern for background */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-white/30 blur-md animate-pulse"></div>
              <div className="bg-gradient-to-br from-neo-violet via-neo-purple to-neo-blue p-4 rounded-full relative">
                <Sparkles className="text-white h-8 w-8" />
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white ml-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Your Dashboard</h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-sans">
            Track your progress, complete daily tasks, and launch your side hustle.
          </p>
          
          {/* Visual indicators */}
          <div className="flex justify-center items-center mt-6 space-x-6">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star className="text-yellow-300 h-5 w-5 mr-2" />
              <span className="text-white font-medium font-sans">Build Skills Daily</span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Rocket className="text-orange-300 h-5 w-5 mr-2" />
              <span className="text-white font-medium font-sans">Launch Your Hustle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;


import React, { useEffect, useState } from "react";
import { Sparkles, Star, Rocket, Code } from "lucide-react";
import { motion } from "framer-motion";

interface ParticleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const DashboardHeader: React.FC = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  
  // Generate animated floating elements
  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(51, 136, 223, 0.6)',  // Neo blue
        'rgba(26, 107, 199, 0.6)',  // Navy blue
        'rgba(61, 90, 250, 0.5)',   // Neo indigo
        'rgba(87, 212, 244, 0.5)',  // Neo cyan
        'rgba(255, 255, 255, 0.3)',  // White
      ][Math.floor(Math.random() * 5)],
      speed: 2 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

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
    <motion.div 
      className="bg-gradient-to-r from-dark-background via-neo-navy/20 to-neo-blue/20 py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(21, 24, 34, 0.8), rgba(21, 24, 34, 0.9)), url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
            y: [`${particle.y}%`, `${particle.y + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Grid pattern for background */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            className="flex justify-center items-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 rounded-full bg-white/30 blur-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <div className="bg-gradient-to-br from-neo-navy via-neo-blue to-neo-cyan p-4 rounded-full relative">
                <Code className="text-white h-8 w-8" />
              </div>
            </div>
            <motion.h1 
              className="font-display text-4xl sm:text-5xl font-bold text-white ml-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Your Dashboard
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-white/90 text-lg max-w-2xl mx-auto font-sans"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Track your progress, complete daily tasks, and launch your side hustle.
          </motion.p>
          
          {/* Visual indicators */}
          <motion.div 
            className="flex flex-wrap justify-center items-center mt-6 gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.8,
              staggerChildren: 0.1
            }}
          >
            <motion.div 
              className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Star className="text-yellow-300 h-5 w-5 mr-2 group-hover:animate-spin-slow" />
              <span className="text-white font-medium font-sans">Build Skills Daily</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Rocket className="text-orange-300 h-5 w-5 mr-2 group-hover:animate-bounce-slow" />
              <span className="text-white font-medium font-sans">Launch Your Hustle</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Sparkles className="text-neo-cyan h-5 w-5 mr-2 group-hover:animate-pulse" />
              <span className="text-white font-medium font-sans">Track Your Progress</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;

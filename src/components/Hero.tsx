
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Trophy, Lightbulb } from "lucide-react";

const Hero: React.FC = () => {
  const floatingElements = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'triangle' : 'square',
    size: Math.floor(Math.random() * 24) + 8,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: Math.random() * 7,
    duration: 5 + Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-neo-purple via-skillpurple-400 to-neo-blue py-20 sm:py-28">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {floatingElements.map((el) => (
          <motion.div 
            key={el.id} 
            className={`absolute ${
              el.type === 'circle' ? 'rounded-full' : 
              el.type === 'triangle' ? 'triangle' : 'rounded'
            } bg-white`}
            style={{
              top: el.top,
              left: el.left,
              width: el.size,
              height: el.size,
              opacity: el.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [el.opacity, el.opacity + 0.2, el.opacity]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Logo icon */}
        <motion.div 
          className="w-28 h-28 mb-8 bg-white rounded-2xl flex items-center justify-center shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 21H21M13 21H3M13 21V13M21 13V21M3 13V21M3 13H21M3 13C3 7.477 7.477 3 13 3C18.523 3 21 7.477 21 13" 
                stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8L11 11L8 8" stroke="url(#paint1_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8E2DE2" />
                  <stop offset="1" stopColor="#4A00E0" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="8" y1="9.5" x2="16" y2="9.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8E2DE2" />
                  <stop offset="1" stopColor="#4A00E0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Main headline */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Start Your <span className="relative">
            Skill
            <span className="absolute -top-6 -right-8">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </span>
          </span> Adventure
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Learn a skill. Launch a hustle. <span className="font-semibold relative inline-block">
            30 days
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </span>.
        </motion.p>
        
        {/* Call-to-Action button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-lg h-14 px-10 rounded-full bg-white text-neo-purple hover:bg-white/90 shadow-lg">
            <Link to="/challenges" className="flex items-center">
              Start Sprint <Rocket className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
        
        {/* Feature boxes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-softblue rounded-full mx-auto mb-4 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Daily Micro-Tasks</h3>
            <p className="text-white/80 text-center">Simple, achievable daily actions to build momentum</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-softgreen rounded-full mx-auto mb-4 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Real Results</h3>
            <p className="text-white/80 text-center">Actual earning potential with guided side hustle launches</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 bg-softyellow rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Expert Resources</h3>
            <p className="text-white/80 text-center">Curated tutorials, templates and guidance</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

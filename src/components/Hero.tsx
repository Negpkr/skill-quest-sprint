
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-softpurple to-white py-16 sm:py-24">
      {/* Mountain climbing pixel art journey background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -bottom-6 right-0 left-0 h-20 bg-grid-skillpurple-400/[0.2] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute -z-10 h-8 w-8 rounded bg-skillpurple-400 opacity-${Math.floor(Math.random() * 70) + 20} animate-float`}
            style={{
              top: `${Math.floor(Math.random() * 100)}%`,
              left: `${Math.floor(Math.random() * 100)}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-24 h-24 mb-6 bg-skillpurple-400 rounded-xl flex items-center justify-center shadow-lg pixel-shadow">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 21H21M13 21H3M13 21V13M21 13V21M3 13V21M3 13H21M3 13C3 7.477 7.477 3 13 3C18.523 3 21 7.477 21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 8L11 11L8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Main headline and subtext */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-skillpurple-600 via-skillpurple-400 to-purple-400">
          Start Your Skill Adventure
        </h1>
        
        <p className="text-xl md:text-2xl text-center text-foreground/80 max-w-3xl mb-10">
          Learn a skill. Launch a hustle. <span className="text-skillpurple-500 font-semibold">30 days.</span>
        </p>
        
        {/* Call-to-Action button */}
        <Button asChild size="lg" className="text-lg h-14 px-8 bg-skillpurple-400 hover:bg-skillpurple-500 text-white pixel-shadow">
          <Link to="/challenges">Start Sprint</Link>
        </Button>
        
        {/* Feature boxes */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-md border border-skillpurple-100 text-center">
            <div className="w-12 h-12 bg-softblue rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L11 15L16 9" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Daily Micro-Tasks</h3>
            <p className="text-muted-foreground">Simple, achievable daily actions to build momentum</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-skillpurple-100 text-center">
            <div className="w-12 h-12 bg-softgreen rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L19 9M19 9L15 13M19 9H9C6.79086 9 5 10.7909 5 13V19" stroke="#43A047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Real Results</h3>
            <p className="text-muted-foreground">Actual earning potential with guided side hustle launches</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-skillpurple-100 text-center">
            <div className="w-12 h-12 bg-softyellow rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V23" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 19H16" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Expert Resources</h3>
            <p className="text-muted-foreground">Curated tutorials, templates and guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

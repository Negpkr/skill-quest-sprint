
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Rocket, Trophy, Lightbulb, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect with framer-motion
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  // Generate floating elements
  const floatingElements = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'triangle' : 'square',
    size: Math.floor(Math.random() * 24) + 8,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: Math.random() * 7,
    duration: 5 + Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.2,
    depth: Math.random() > 0.5 ? 'front' : 'back',
  }));

  // GSAP animations
  useEffect(() => {
    if (!heroRef.current) return;

    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach((element, i) => {
      const depth = i % 3 === 0 ? 0.3 : i % 3 === 1 ? 0.2 : 0.1;
      gsap.to(element, {
        y: `${-100 * depth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Scroll indicator animation
    gsap.to('.scroll-indicator', {
      y: 10,
      opacity: 0.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      duration: 1
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-neo-purple via-skillpurple-400 to-neo-blue py-20 sm:py-28 min-h-screen flex flex-col justify-center"
    >
      {/* Background grid pattern with parallax effect */}
      <div className="absolute inset-0 bg-grid opacity-30 parallax-element"></div>

      {/* Floating elements with parallax effect */}
      <motion.div
        ref={parallaxRef}
        style={{ y }}
        className="absolute inset-0"
      >
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute ${
              el.type === 'circle' ? 'rounded-full' :
              el.type === 'triangle' ? 'triangle' : 'rounded'
            } bg-white parallax-element ${el.depth === 'front' ? 'z-10' : 'z-0'}`}
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
              opacity: [el.opacity, el.opacity + 0.2, el.opacity],
              scale: [1, el.depth === 'front' ? 1.1 : 1, 1]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <div ref={contentRef} className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10">
        {/* Logo icon with 3D hover effect */}
        <motion.div
          className="w-28 h-28 mb-8 bg-white rounded-2xl flex items-center justify-center shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            rotateY: 10,
            rotateX: -10,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
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

        {/* Main headline with text reveal animation */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Start Your <span className="relative inline-block">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-6 -right-8 z-10"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.span>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
              className="relative z-0 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300"
            >
              Skill
            </motion.span>
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

        {/* Call-to-Action buttons with hover effects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            asChild
            size="lg"
            className="text-lg h-14 px-10 rounded-full bg-white text-neo-purple hover:bg-white/90 shadow-lg relative overflow-hidden group"
          >
            <Link to="/sprints" className="flex items-center">
              <span className="relative z-10">Start Sprint</span>
              <motion.span
                className="ml-2 h-5 w-5 relative z-10"
                whileHover={{ rotate: 15 }}
              >
                <Rocket />
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="text-lg h-14 px-10 rounded-full bg-white text-neo-purple hover:bg-white/90 shadow-lg relative overflow-hidden group"
          >
            <Link to="/generate-sprint" className="flex items-center">
              <span className="relative z-10">Generate Sprint</span>
              <motion.span
                className="ml-2 h-5 w-5 relative z-10"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles />
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </Link>
          </Button>
        </motion.div>

        {/* Feature boxes with enhanced animations */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <motion.div
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg relative overflow-hidden group"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="w-12 h-12 bg-softblue rounded-full mx-auto mb-4 flex items-center justify-center relative">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="w-6 h-6 text-blue-700" />
              </motion.div>
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Daily Micro-Tasks</h3>
            <p className="text-white/80 text-center">Simple, achievable daily actions to build momentum</p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg relative overflow-hidden group"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="w-12 h-12 bg-softgreen rounded-full mx-auto mb-4 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className="w-6 h-6 text-green-700" />
              </motion.div>
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Real Results</h3>
            <p className="text-white/80 text-center">Actual earning potential with guided side hustle launches</p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg relative overflow-hidden group"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <div className="w-12 h-12 bg-softyellow rounded-full mx-auto mb-4 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Lightbulb className="w-6 h-6 text-yellow-700" />
              </motion.div>
            </div>
            <h3 className="font-semibold text-center text-white mb-2">Expert Resources</h3>
            <p className="text-white/80 text-center">Curated tutorials, templates and guidance</p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <ArrowDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

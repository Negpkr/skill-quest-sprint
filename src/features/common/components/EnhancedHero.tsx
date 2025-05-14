import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Rocket, Trophy, Lightbulb, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Particle configuration
const PARTICLE_COUNT = 50;
const generateParticles = () => {
  return Array.from({ length: PARTICLE_COUNT }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    color: Math.random() > 0.6 ? "#a87cdd" : Math.random() > 0.3 ? "#6964e9" : "#57d4f4",
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
};

// Floating elements configuration
const generateFloatingElements = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.6 ? 'circle' : Math.random() > 0.3 ? 'triangle' : 'square',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 40 + 10}px`,
    opacity: Math.random() * 0.1 + 0.05,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    depth: Math.random() > 0.7 ? 'front' : 'back',
    rotation: Math.random() * 360,
  }));
};

const EnhancedHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [particles] = useState(generateParticles());
  const [floatingElements] = useState(generateFloatingElements());

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  // Smooth mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax scroll effect with framer-motion
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]); // Slow layer
  const y2 = useTransform(scrollY, [0, 500], [0, -250]); // Medium layer
  const y3 = useTransform(scrollY, [0, 500], [0, -350]); // Fast layer
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const scrollToContent = () => {
    const contentTop = heroRef.current?.clientHeight || 0;
    window.scrollTo({
      top: contentTop,
      behavior: 'smooth'
    });
  };

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

  return (
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-neo-purple via-skillpurple-400 to-neo-blue py-20 sm:py-28 min-h-screen flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background grid pattern with parallax effect */}
      <div className="absolute inset-0 bg-grid opacity-30 parallax-element"></div>

      {/* Floating elements with parallax effect */}
      <motion.div
        ref={parallaxRef}
        style={{ y: y1 }}
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
              rotate: el.rotation,

            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [el.opacity, el.opacity + 0.1, el.opacity],
              rotate: [el.rotation, el.rotation + 10, el.rotation],
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

      {/* Content container with 3D tilt effect */}
      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10"
        ref={contentRef}
        style={{
          opacity,
          scale,
          rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]),
          rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]),
          perspective: "1000px",
        }}
      >
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
          style={{
            rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]),
            rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]),
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          Master a <span className="relative inline-block">
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
          </span> in 30 Days
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Learn, build, and launch your side hustle with <span className="font-semibold relative inline-block">
            guided daily challenges
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </span>
        </motion.p>

        {/* Call-to-Action buttons with hover effects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
        >
          <ArrowDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedHero;

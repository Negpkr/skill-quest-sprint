import React, { useEffect } from "react";
import Layout from "../components/Layout";
import EnhancedHero from "../components/EnhancedHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Trophy, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import ParallaxSection from "@/components/ParallaxSection";
import InteractiveCard from "@/components/InteractiveCard";
import MagneticButton from "@/components/MagneticButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import { motion, useScroll, useTransform } from "framer-motion";

const Home: React.FC = () => {
  // Scroll progress for animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <Layout>
      <EnhancedHero />

      {/* Featured Challenges Section with Parallax */}
      <ParallaxSection
        bgColor="#f8f9fa"
        speed={0.2}
        direction="up"
        className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative">
          <ScrollAnimationWrapper animation="slideUp" delay={0.1}>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-skillpurple-500 to-neo-blue">
                Featured Sprints
              </h2>
              <MagneticButton
                variant="ghost"
                className="text-skillpurple-500 hover:text-skillpurple-600"
                magneticStrength={40}
                glowColor="rgba(168, 124, 221, 0.5)"
                asChild
              >
                <Link to="/sprints" className="flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </MagneticButton>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Design Starter Sprint Card */}
            <ScrollAnimationWrapper animation="slideUp" delay={0.2}>
              <InteractiveCard
                depth={30}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.03}
                className="h-full"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border h-full">
                  <div className="h-48 bg-gradient-to-r from-neo-purple to-neo-blue flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '60px 60px'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <h3 className="text-lg font-semibold">Design Starter Sprint</h3>
                      <span className="badge-beginner px-3 py-1 rounded-full text-sm">Beginner</span>
                    </div>
                    <p className="text-muted-foreground mb-6">Learn Canva basics and create your first sellable design in 30 days.</p>
                    <div className="flex">
                      <MagneticButton
                        asChild
                        className="flex-1 bg-gradient-to-r from-neo-purple to-neo-blue text-white hover:shadow-lg transition-all"
                        magneticStrength={20}
                        glowColor="rgba(168, 124, 221, 0.7)"
                      >
                        <Link to="/sprint-detail/design-starter" className="flex items-center justify-center">
                          View Sprint
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Web Dev Sprint Card */}
            <ScrollAnimationWrapper animation="slideUp" delay={0.3}>
              <InteractiveCard
                depth={30}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.03}
                className="h-full"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border h-full">
                  <div className="h-48 bg-gradient-to-r from-neo-green to-neo-cyan flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '60px 60px'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <h3 className="text-lg font-semibold">Web Dev Sprint</h3>
                      <span className="badge-intermediate px-3 py-1 rounded-full text-sm">Intermediate</span>
                    </div>
                    <p className="text-muted-foreground mb-6">Build and launch your first website with HTML, CSS, and basic JavaScript.</p>
                    <div className="flex">
                      <MagneticButton
                        asChild
                        className="flex-1 bg-gradient-to-r from-neo-green to-neo-cyan text-white hover:shadow-lg transition-all"
                        magneticStrength={20}
                        glowColor="rgba(42, 224, 176, 0.7)"
                      >
                        <Link to="/sprint-detail/web-dev" className="flex items-center justify-center">
                          View Sprint
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Freelance Launchpad Card */}
            <ScrollAnimationWrapper animation="slideUp" delay={0.4}>
              <InteractiveCard
                depth={30}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.03}
                className="h-full"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-border h-full">
                  <div className="h-48 bg-gradient-to-r from-neo-orange to-neo-yellow flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '60px 60px'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.59 13.51L15.42 17.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <h3 className="text-lg font-semibold">Freelance Launchpad</h3>
                      <span className="badge-beginner px-3 py-1 rounded-full text-sm">Beginner</span>
                    </div>
                    <p className="text-muted-foreground mb-6">Start and earn from your first freelancing gig in just 30 days.</p>
                    <div className="flex">
                      <MagneticButton
                        asChild
                        className="flex-1 bg-gradient-to-r from-neo-orange to-neo-yellow text-white hover:shadow-lg transition-all"
                        magneticStrength={20}
                        glowColor="rgba(255, 122, 89, 0.7)"
                      >
                        <Link to="/sprint-detail/freelance-launchpad" className="flex items-center justify-center">
                          View Sprint
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </ParallaxSection>

      {/* How it Works Section */}
      <AnimatedBackground
        type="grid"
        color1="#a87cdd"
        color2="#6964e9"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollAnimationWrapper animation="slideUp" delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neo-purple to-neo-blue">
                How SkillSprint Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Our 30-day challenge system breaks down skill learning and side hustle creation into simple daily actions.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ScrollAnimationWrapper animation="slideUp" delay={0.2}>
              <InteractiveCard
                depth={20}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.05}
                className="h-full"
              >
                <div className="text-center p-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-neo-purple to-neo-blue rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    1
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-3">Choose a Skill</h3>
                  <p className="text-muted-foreground">
                    Select from our curated challenges or create a custom skill sprint
                  </p>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animation="slideUp" delay={0.3}>
              <InteractiveCard
                depth={20}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.05}
                className="h-full"
              >
                <div className="text-center p-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-neo-green to-neo-cyan rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    2
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-3">Complete Daily Tasks</h3>
                  <p className="text-muted-foreground">
                    Follow simple micro-tasks that take 15-30 minutes each day
                  </p>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animation="slideUp" delay={0.4}>
              <InteractiveCard
                depth={20}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.05}
                className="h-full"
              >
                <div className="text-center p-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-neo-blue to-neo-indigo rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    3
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-3">Build Your Project</h3>
                  <p className="text-muted-foreground">
                    Create a real portfolio piece or minimum viable service
                  </p>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animation="slideUp" delay={0.5}>
              <InteractiveCard
                depth={20}
                glare={true}
                shadow={true}
                border={true}
                borderColor="rgba(168, 124, 221, 0.2)"
                hoverScale={1.05}
                className="h-full"
              >
                <div className="text-center p-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-neo-orange to-neo-yellow rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    4
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-3">Launch Your Hustle</h3>
                  <p className="text-muted-foreground">
                    Start earning from your new skill with our launch guidance
                  </p>
                </div>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </AnimatedBackground>

      {/* CTA Section */}
      <ParallaxSection
        bgColor="#151822"
        speed={0.3}
        direction="up"
        className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <ScrollAnimationWrapper animation="scale" delay={0.1}>
          <div className="max-w-7xl mx-auto relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neo-purple to-neo-blue p-1">
              <div className="absolute inset-0 bg-grid opacity-20"></div>

              {/* Animated particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: Math.random() * 60 + 20,
                    height: Math.random() * 60 + 20,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: 'blur(20px)'
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}

              <div className="relative bg-dark-card/90 backdrop-blur-sm rounded-xl text-white p-12 md:p-16 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                    Ready to Start Your Skill Adventure?
                  </h2>
                  <p className="mb-10 max-w-2xl mx-auto text-white/80 text-lg">
                    Join thousands of others who are learning new skills and earning their first side income through our 30-day sprints.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <MagneticButton
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-neo-purple to-neo-blue text-white hover:shadow-lg transition-all text-lg px-8 py-6"
                      magneticStrength={30}
                      glowColor="rgba(168, 124, 221, 0.7)"
                      hoverScale={1.05}
                    >
                      <Link to="/signup" className="flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Get Started For Free
                      </Link>
                    </MagneticButton>

                    <MagneticButton
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 transition-all text-lg px-8 py-6"
                      magneticStrength={30}
                      glowColor="rgba(255, 255, 255, 0.3)"
                      hoverScale={1.05}
                    >
                      <Link to="/sprints" className="flex items-center justify-center gap-2">
                        <Rocket className="h-5 w-5" />
                        Explore Sprints
                      </Link>
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </ParallaxSection>
    </Layout>
  );
};

export default Home;

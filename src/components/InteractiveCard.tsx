import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  depth?: number;
  glare?: boolean;
  glareColor?: string;
  glareOpacity?: number;
  shadow?: boolean;
  shadowColor?: string;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: string;
  backgroundColor?: string;
  hoverScale?: number;
  clickScale?: number;
  perspective?: number;
  rotationFactor?: number;
  transitionDuration?: number;
  onClick?: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  style = {},
  depth = 20,
  glare = true,
  glareColor = 'rgba(255, 255, 255, 0.8)',
  glareOpacity = 0.3,
  shadow = true,
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  border = false,
  borderColor = 'rgba(255, 255, 255, 0.2)',
  borderWidth = 1,
  borderRadius = '1rem',
  backgroundColor = 'transparent',
  hoverScale = 1.02,
  clickScale = 0.98,
  perspective = 1000,
  rotationFactor = 10,
  transitionDuration = 0.2,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotationFactor, -rotationFactor]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotationFactor, rotationFactor]), springConfig);
  
  // Glare effect position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']), springConfig);
  const glareOpacityValue = useSpring(
    useTransform(
      mouseX, 
      [-0.5, 0, 0.5], 
      [glareOpacity * 0.5, glareOpacity, glareOpacity * 0.5]
    ),
    springConfig
  );
  
  // Shadow effect
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth/2, depth/2]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-depth/2, depth/2]), springConfig);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position between -0.5 and 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };
  
  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      animate={{
        scale: isPressed ? clickScale : isHovered ? hoverScale : 1,
      }}
      transition={{
        duration: transitionDuration,
        ease: 'easeOut',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          borderRadius,
          backgroundColor,
          border: border ? `${borderWidth}px solid ${borderColor}` : 'none',
          boxShadow: shadow ? `${shadowX.get()}px ${shadowY.get()}px ${depth}px ${shadowColor}` : 'none',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
        
        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor}, transparent 70%)`,
              opacity: glareOpacityValue,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCard;

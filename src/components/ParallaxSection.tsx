import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  bgColor?: string;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  style?: React.CSSProperties;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  bgImage,
  bgColor = 'transparent',
  speed = 0.5,
  className = '',
  direction = 'up',
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 0.5,
  height = 'auto',
  style = {},
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Calculate transform values based on direction
  const getTransformValues = () => {
    const distance = 200 * speed;
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
      default:
        return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    }
  };

  const transformValue = getTransformValues();
  const isHorizontal = direction === 'left' || direction === 'right';
  
  // Calculate opacity for fade effect
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  // Calculate scale for subtle zoom effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.05, 1]
  );

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor: bgColor,
        height,
        ...style
      }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            [isHorizontal ? 'x' : 'y']: transformValue,
            scale,
          }}
        />
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        />
      )}
      
      <motion.div 
        className="relative z-10"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;

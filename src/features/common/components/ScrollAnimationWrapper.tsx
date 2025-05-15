import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | '3dFlip';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  rotate: {
    hidden: { rotate: 10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 }
  },
  '3dFlip': {
    hidden: { rotateY: 90, opacity: 0, perspective: 1000 },
    visible: { rotateY: 0, opacity: 1, perspective: 1000 }
  }
};

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
  once = true,
  style = {},
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    once, 
    threshold,
    // Add a small amount of margin to trigger the animation slightly before the element is in view
    margin: "-100px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  const selectedAnimation = animations[animation];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedAnimation}
      transition={{ 
        duration, 
        delay,
        type: animation === '3dFlip' ? 'spring' : 'easeOut',
        stiffness: animation === '3dFlip' ? 100 : undefined,
        damping: animation === '3dFlip' ? 10 : undefined
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  magneticStrength?: number;
  glowOnHover?: boolean;
  glowColor?: string;
  glowRadius?: number;
  hoverScale?: number;
  clickScale?: number;
  className?: string;
  asChild?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  magneticStrength = 30,
  glowOnHover = true,
  glowColor = 'rgba(168, 124, 221, 0.7)',
  glowRadius = 15,
  hoverScale = 1.05,
  clickScale = 0.95,
  className = '',
  asChild = false,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Motion values for the magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Glow effect
  const glowOpacity = useTransform(
    mouseX,
    [-1, 0, 1],
    [0, isHovered ? 1 : 0, 0]
  );
  
  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Set motion values based on distance and strength
    mouseX.set(distanceX / magneticStrength);
    mouseY.set(distanceY / magneticStrength);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  return (
    <div className="relative inline-block">
      {/* Glow effect */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            boxShadow: `0 0 ${glowRadius}px ${glowColor}`,
            opacity: glowOpacity,
          }}
        />
      )}
      
      <motion.div
        style={{ x, y }}
        animate={{
          scale: isPressed ? clickScale : isHovered ? hoverScale : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <Button
          ref={buttonRef}
          variant={variant}
          size={size}
          className={cn(
            'relative transition-all duration-200',
            className
          )}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          asChild={asChild}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </div>
  );
};

export default MagneticButton;

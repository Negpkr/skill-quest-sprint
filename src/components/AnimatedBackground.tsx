import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  type?: 'particles' | 'gradient' | 'grid' | 'waves' | 'noise';
  color1?: string;
  color2?: string;
  color3?: string;
  particleCount?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
  density?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  type = 'particles',
  color1 = '#a87cdd',
  color2 = '#6964e9',
  color3 = '#57d4f4',
  particleCount = 50,
  speed = 1,
  className = '',
  style = {},
  interactive = true,
  density = 1,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Generate particles
  const generateParticles = () => {
    return Array.from({ length: particleCount * density }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3,
      duration: (Math.random() * 20 + 10) / speed,
      delay: Math.random() * 5,
    }));
  };
  
  const [particles] = useState(generateParticles());
  
  // Update mouse position for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const { clientX, clientY } = e;
    setMousePosition({
      x: clientX / windowSize.width,
      y: clientY / windowSize.height,
    });
  };
  
  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Render different background types
  const renderBackground = () => {
    switch (type) {
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
                animate={{
                  x: interactive 
                    ? [`${particle.x}%`, `${particle.x + (mousePosition.x * 10 - 5)}%`]
                    : [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
                  y: interactive
                    ? [`${particle.y}%`, `${particle.y + (mousePosition.y * 10 - 5)}%`]
                    : [`${particle.y}%`, `${particle.y + (Math.random() * 10 - 5)}%`],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        );
        
      case 'gradient':
        return (
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`,
              backgroundSize: '400% 400%',
            }}
            animate={{
              backgroundPosition: interactive
                ? [
                    '0% 0%',
                    `${100 * mousePosition.x}% ${100 * mousePosition.y}%`,
                  ]
                : ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 10 / speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
        
      case 'grid':
        return (
          <motion.div
            className="absolute inset-0 bg-grid"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${color1}10 1px, transparent 1px),
                linear-gradient(to bottom, ${color1}10 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            animate={{
              backgroundPosition: interactive
                ? [
                    '0px 0px',
                    `${10 * mousePosition.x}px ${10 * mousePosition.y}px`,
                  ]
                : ['0px 0px', '40px 40px', '0px 0px'],
            }}
            transition={{
              duration: 20 / speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
        
      case 'waves':
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill={color1}
              fillOpacity="0.2"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 10 / speed,
                repeat: Infinity,
                ease: "easeInOut",
                yoyo: true,
              }}
            />
            <motion.path
              fill={color2}
              fillOpacity="0.2"
              d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,218.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,218.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,165.3C672,149,768,107,864,112C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 8 / speed,
                repeat: Infinity,
                ease: "easeInOut",
                yoyo: true,
              }}
            />
            <motion.path
              fill={color3}
              fillOpacity="0.2"
              d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,202.7C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 12 / speed,
                repeat: Infinity,
                ease: "easeInOut",
                yoyo: true,
              }}
            />
          </svg>
        );
        
      case 'noise':
        return (
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundBlendMode: 'overlay',
              opacity: 0.1,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, ${color1}40, ${color2}40, ${color3}40)`,
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: interactive
                  ? [
                      '0% 0%',
                      `${100 * mousePosition.x}% ${100 * mousePosition.y}%`,
                    ]
                  : ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 10 / speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
    >
      {renderBackground()}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;

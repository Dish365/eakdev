'use client';

import { useEffect, useRef, useState } from 'react';
import { LinkButton } from '../ui/Button';
import { Section } from '../ui/Section';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo } from '@/data/projects';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// CSS for grid pattern - will be injected at component mount
const useGridPattern = () => {
  useEffect(() => {
    // Only add the style if it doesn't exist
    if (!document.getElementById('grid-pattern-style')) {
      const style = document.createElement('style');
      style.id = 'grid-pattern-style';
      style.innerHTML = `
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .space-bg {
          background-image: radial-gradient(circle at center, rgba(16, 24, 64, 0.8) 0%, rgba(8, 8, 24, 0.95) 100%);
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 4s infinite alternate;
        }
        
        /* Twinkle Star Effect */
        .twinkle-star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: white;
          box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.5);
          animation: twinkle 3s infinite ease-in-out;
        }
        
        .star-medium {
          width: 3px;
          height: 3px;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.5), 0 0 10px 4px rgba(6, 182, 212, 0.3);
        }
        
        .star-large {
          width: 4px;
          height: 4px;
          box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.6), 0 0 12px 6px rgba(99, 102, 241, 0.4);
          animation: twinkle-large 4s infinite ease-in-out;
        }
        
        /* Twinkling Stars Animation */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.3), 0 0 5px 2px rgba(6, 182, 212, 0.2);
            transform: scale(1);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.7), 0 0 8px 4px rgba(6, 182, 212, 0.4);
            transform: scale(1.1);
          }
        }
        
        @keyframes twinkle-large {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 4px 2px rgba(255, 255, 255, 0.4), 0 0 8px 4px rgba(99, 102, 241, 0.2);
            transform: scale(1);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.8), 0 0 16px 8px rgba(99, 102, 241, 0.5);
            transform: scale(1.2);
          }
        }
        
        .cyber-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent);
          height: 1px;
          width: 100%;
          z-index: 0;
          transform-origin: left;
          animation: scan-line 20s infinite linear;
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          2% { opacity: 1; }
          98% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        }
        
        .pulse-point {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(99, 102, 241, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 10px 4px rgba(99, 102, 241, 0.6);
          z-index: 0;
          animation: pulse-point 8s infinite alternate;
        }
        
        @keyframes pulse-point {
          0% { transform: scale(0.5); opacity: 0.5; box-shadow: 0 0 5px 2px rgba(99, 102, 241, 0.4); }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 15px 4px rgba(99, 102, 241, 0.7); }
          100% { transform: scale(0.5); opacity: 0.5; box-shadow: 0 0 5px 2px rgba(99, 102, 241, 0.4); }
        }
        
        /* Enhanced Shooting Star */
        .shooting-star {
          position: absolute;
          height: 3px;
          background: linear-gradient(90deg, rgba(75, 75, 255, 0), #ffffff 30%, #00ddff 80%, #7f8eff);
          border-radius: 0;
          filter: drop-shadow(0 0 10px #5f7fff);
          z-index: 5;
          transform-origin: left center;
          pointer-events: none;
          opacity: 0.9;
        }
        
        .shooting-star-medium {
          height: 4px;
        }
        
        .shooting-star-large {
          height: 5px;
          box-shadow: 0 0 12px 4px rgba(99, 102, 241, 0.5);
        }
        
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          border-radius: 50%;
          filter: blur(4px);
        }
        
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0) rotate(var(--angle));
            opacity: 0;
            width: 0;
          }
          5% {
            opacity: 0.9;
            width: calc(var(--length) * 0.3);
          }
          15% {
            width: var(--length);
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
            width: var(--length);
          }
          100% {
            transform: translateX(var(--travel-x)) translateY(var(--travel-y)) rotate(var(--angle));
            opacity: 0;
            width: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // Clean up on unmount
      const styleElem = document.getElementById('grid-pattern-style');
      if (styleElem) styleElem.remove();
    };
  }, []);
};

// Enhanced stars background with cyberpunk elements
const StarsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create stars - fewer for less crowding
    const stars: HTMLDivElement[] = [];
    const numStars = 70; // Reduced from 100
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (smaller = more distant stars)
      const size = Math.random() * 2 + 1;
      
      // Random animation delay for twinkling effect
      const delay = Math.random() * 5;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      
      container.appendChild(star);
      stars.push(star);
    }
    
    // Add cyber scan lines
    const numLines = 6; // Small number of scan lines
    const scanLines: HTMLDivElement[] = [];
    
    for (let i = 0; i < numLines; i++) {
      const line = document.createElement('div');
      line.className = 'cyber-line';
      
      // Staggered animation
      line.style.animationDelay = `${i * 3}s`;
      line.style.top = `${Math.random() * 100}%`;
      line.style.opacity = '0.7';
      
      container.appendChild(line);
      scanLines.push(line);
    }
    
    // Add glowing points (network nodes)
    const numPoints = 10;
    const pulsePoints: HTMLDivElement[] = [];
    
    for (let i = 0; i < numPoints; i++) {
      const point = document.createElement('div');
      point.className = 'pulse-point';
      
      // Strategic positions across screen
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      point.style.left = `${x}%`;
      point.style.top = `${y}%`;
      point.style.animationDelay = `${i * 0.8}s`;
      
      container.appendChild(point);
      pulsePoints.push(point);
    }
    
    // Create enhanced twinkling stars
    const createTwinklingStars = () => {
      const twinklingStars: HTMLDivElement[] = [];
      const starSizes = ['small', 'medium', 'large'];
      
      // Strategically position twinkling stars in different quadrants
      const starPositions = [
        // Top left quadrant
        { top: '15%', left: '5%', size: 'large', delay: '0s' },
        { top: '25%', left: '15%', size: 'small', delay: '0.7s' },
        { top: '10%', left: '25%', size: 'medium', delay: '1.5s' },
        
        // Top right quadrant
        { top: '8%', left: '65%', size: 'medium', delay: '0.3s' },
        { top: '20%', left: '78%', size: 'large', delay: '2.1s' },
        { top: '32%', left: '92%', size: 'small', delay: '1.2s' },
        
        // Bottom left quadrant
        { top: '60%', left: '12%', size: 'medium', delay: '0.9s' },
        { top: '75%', left: '22%', size: 'small', delay: '2.5s' },
        
        // Bottom right quadrant
        { top: '55%', left: '75%', size: 'large', delay: '1.8s' },
        { top: '70%', left: '88%', size: 'small', delay: '0.2s' },
        
        // Center area
        { top: '35%', left: '40%', size: 'medium', delay: '1.4s' },
        { top: '50%', left: '50%', size: 'large', delay: '0.8s' },
        { top: '42%', left: '62%', size: 'small', delay: '2.2s' },
      ];
      
      starPositions.forEach((position) => {
        const star = document.createElement('div');
        star.className = `twinkle-star ${position.size === 'medium' ? 'star-medium' : position.size === 'large' ? 'star-large' : ''}`;
        
        star.style.top = position.top;
        star.style.left = position.left;
        star.style.animationDelay = position.delay;
        
        container.appendChild(star);
        twinklingStars.push(star);
      });
      
      return twinklingStars;
    };
    
    // Create enhanced shooting stars
    const createShootingStar = () => {
      // Create element
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random starting position - favor top half of screen
      let x, y;
      const positionType = Math.random();
      
      if (positionType < 0.6) { // 60% chance for top edge
        x = Math.random() * 100;
        y = 0;
      } else if (positionType < 0.8) { // 20% chance for left edge
        x = 0;
        y = Math.random() * 60; // Top 60% of screen height
      } else { // 20% chance for right edge
        x = 100;
        y = Math.random() * 60; // Top 60% of screen height
      }
      
      // Direction angles based on starting position
      let minAngle, maxAngle;
      
      if (y === 0) { // Top edge
        minAngle = 230;
        maxAngle = 310;
      } else if (x === 0) { // Left edge
        minAngle = 300;
        maxAngle = 360;
      } else { // Right edge
        minAngle = 180;
        maxAngle = 240;
      }
      
      // Random angle within determined range (converted to radians)
      const angleDeg = minAngle + Math.random() * (maxAngle - minAngle);
      const angle = angleDeg * (Math.PI / 180);
      
      // Random length and travel distance
      const length = 80 + Math.random() * 150; // Longer
      const distance = 150 + Math.random() * 250; // Further
      
      // Calculate end point based on angle
      const travelX = Math.cos(angle) * distance;
      const travelY = Math.sin(angle) * distance;
      
      // Duration for animation - slower for a more gentle effect
      const duration = 1.4 + Math.random() * 1.6;
      
      // Add size variation - small, medium or large
      const sizeClass = Math.random() > 0.7 ? 'shooting-star-large' : 
                         Math.random() > 0.4 ? 'shooting-star-medium' : '';
      if (sizeClass) {
        shootingStar.classList.add(sizeClass);
      }
      
      // Apply styles
      shootingStar.style.setProperty('--angle', `${angleDeg}deg`);
      shootingStar.style.setProperty('--length', `${length}px`);
      shootingStar.style.setProperty('--travel-x', `${travelX}px`);
      shootingStar.style.setProperty('--travel-y', `${travelY}px`);
      
      shootingStar.style.left = `${x}%`;
      shootingStar.style.top = `${y}%`;
      
      // Set explicit animation with all required properties
      shootingStar.style.animation = `shooting-star ${duration}s forwards cubic-bezier(0.05, 0.2, 0.25, 1.0)`;
      
      // Add to container
      container.appendChild(shootingStar);
      
      // Enhanced glow effect
      shootingStar.style.boxShadow = '0 0 8px 3px rgba(255, 255, 255, 0.7), 0 0 12px 6px rgba(6, 182, 212, 0.5)';
      
      // Remove after animation completes
      shootingStar.addEventListener('animationend', () => {
        shootingStar.remove();
      });
    };
    
    // Create twinkling stars (static placement)
    const twinklingStars = createTwinklingStars();
    
    // Schedule periodic shooting stars
    const interval = setInterval(() => {
      // Create 1-3 shooting stars at a time
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        setTimeout(() => createShootingStar(), i * 300);
      }
    }, 3500); // New batch less frequently
    
    // Add star field glow effects
    const createGlowEffects = () => {
      const glowElements: HTMLDivElement[] = [];
      
      // Add subtle radial gradients for cosmic nebula effects
      const glowPositions = [
        { top: '10%', left: '30%', color: 'indigo' },
        { top: '20%', left: '60%', color: 'cyan' },
        { top: '50%', left: '20%', color: 'purple' }
      ];
      
      glowPositions.forEach(position => {
        const glow = document.createElement('div');
        const colorClass = position.color === 'indigo' ? 'from-indigo-500/10' :
                           position.color === 'cyan' ? 'from-cyan-500/10' : 'from-purple-500/8';
        
        glow.className = `absolute inset-0 bg-gradient-radial ${colorClass} via-transparent to-transparent`;
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.top = position.top;
        glow.style.left = position.left;
        
        container.appendChild(glow);
        glowElements.push(glow);
      });
      
      return glowElements;
    };
    
    const glowElements = createGlowEffects();
    
    return () => {
      stars.forEach(star => star.remove());
      scanLines.forEach(line => line.remove());
      pulsePoints.forEach(point => point.remove());
      twinklingStars.forEach(star => star.remove());
      glowElements.forEach(glow => glow.remove());
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-1"
    />
  );
};

// Code animation background - Cyberpunk-enhanced
const CodeBackground = ({ universeMode = false }: { universeMode?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Define snippet type
    type CodeSnippet = { code: string; language: string };
    type SnippetMap = Record<string, CodeSnippet[]>;
    
    // Strategic code snippets organized by domain expertise - More cyberpunk-flavored
    const codeSnippetsMap: SnippetMap = {
      // Cybersecurity
      security: [
        { code: 'decrypt(encodedData, 0xF340A1C9);', language: 'Crypto' },
        { code: 'const secureChannel = await tunnel.establish(targetNode);', language: 'Node' },
      ],
      
      // Neural Networks
      neural: [
        { code: 'model.compile(optimizer="quantum", loss="entropy");', language: 'Python' },
        { code: 'brain.connect(new Synapse(nodeA, nodeB, 0.854));', language: 'Neural' },
      ],
      
      // System
      system: [
        { code: 'proc::memory::override(0x7FFC4399, &payload);', language: 'Rust' },
        { code: 'sys.kernel.patch({auth: bypass, trace: false});', language: 'JS' },
      ],
    };
    
    if (universeMode) {
      // Add extra snippets in universe mode
      codeSnippetsMap.network = [
        { code: 'const darknet = new Network({encrypted: true});', language: 'TS' },
        { code: 'ping.traceroute({avoid: "government"});', language: 'JS' },
      ];
      
      codeSnippetsMap.quantum = [
        { code: 'qbit.entangle(remote_qbit, "secure");', language: 'Q#' },
        { code: 'const state = superposition.collapse();', language: 'TS' },
      ];
    }
    
    // Flatten and prepare all snippets
    const allSnippets = Object.values(codeSnippetsMap).flat();
    
    // Color map for different languages - Cyberpunk color palette
    const languageColors = {
      'TypeScript': '#00ddff',
      'TS': '#00ddff',
      'JS': '#ff00aa',
      'Python': '#7700ff',
      'Rust': '#ff9900',
      'Neural': '#00ffaa',
      'C++': '#ff77aa',
      'Crypto': '#ffdd00',
      'Node': '#00ffee',
      'Q#': '#19e6a3',
    };
    
    // Strategic positions - pre-defined to avoid cluttering
    const strategicPositions = [
      { x: 15, y: 25, delay: 0 },    // Top left
      { x: 50, y: 15, delay: 8000 }, // Top center
      { x: 85, y: 30, delay: 4000 }, // Top right
      { x: 70, y: 60, delay: 12000 }, // Bottom right
      { x: 25, y: 70, delay: 16000 }, // Bottom left
    ];
    
    // Add more positions in universe mode
    if (universeMode) {
      strategicPositions.push(
        { x: 35, y: 45, delay: 6000 },  // Middle left
        { x: 65, y: 45, delay: 10000 }, // Middle right
        { x: 50, y: 70, delay: 14000 }, // Bottom center
        { x: 20, y: 50, delay: 18000 }, // Middle far left
        { x: 80, y: 50, delay: 2000 }   // Middle far right
      );
    }
    
    // Create code lines strategically - Fewer lines for less crowding
    const createCodeLine = (index: number, positionIndex: number) => {
      const snippet = allSnippets[index % allSnippets.length];
      const line = document.createElement('div');
      const position = strategicPositions[positionIndex % strategicPositions.length];
      
      // Style based on language
      const langColor = languageColors[snippet.language as keyof typeof languageColors] || '#00ffcc';
      
      // Create language badge
      const badge = document.createElement('span');
      badge.textContent = snippet.language;
      badge.style.backgroundColor = `${langColor}`;
      badge.style.color = '#000000';
      badge.style.padding = '2px 6px';
      badge.style.borderRadius = '2px';
      badge.style.fontSize = '10px';
      badge.style.marginRight = '8px';
      badge.style.fontWeight = 'bold';
      badge.style.fontFamily = 'monospace';
      badge.style.textTransform = 'uppercase';
      badge.style.letterSpacing = '1px';
      
      // Create code content
      const code = document.createElement('code');
      code.textContent = snippet.code;
      code.style.fontFamily = 'monospace';
      code.style.letterSpacing = '0.5px';
      
      // Add elements to line
      line.appendChild(badge);
      line.appendChild(code);
      
      // Style the line container
      line.className = 'absolute font-mono whitespace-nowrap py-2 px-3 rounded-sm';
      line.style.backgroundColor = 'rgba(10, 10, 30, 0.85)';
      line.style.backdropFilter = 'blur(4px)';
      line.style.fontSize = '12px';
      line.style.color = '#e0f0ff';
      line.style.borderLeft = `2px solid ${langColor}`;
      line.style.boxShadow = `0 2px 10px rgba(0,0,0,0.3), 0 0 15px ${langColor}60`;
      line.style.zIndex = '2';
      line.style.textShadow = `0 0 3px ${langColor}80`;
      line.style.borderBottom = `1px solid ${langColor}40`;
      
      // Position at strategic location
      line.style.left = `${position.x}%`;
      line.style.top = '-60px';
      line.style.transform = 'translateX(-50%)';
      line.style.maxWidth = '90%';
      line.style.textOverflow = 'ellipsis';
      line.style.opacity = '0';
      
      container.appendChild(line);
      
      // Start animation after strategic delay
      setTimeout(() => {
        // Animate with improved visibility
        const duration = 35000 + Math.random() * 15000; // Even slower, more ambient movement
        const keyframes = [
          { top: '-60px', opacity: 0, transform: 'translateX(-50%) scale(0.95)' },
          { top: `${position.y - 15}%`, opacity: 0.9, transform: 'translateX(-50%) scale(1)' },
          { top: `${position.y}%`, opacity: 0.9, transform: 'translateX(-50%) scale(1)' },
          { top: `${position.y + 15}%`, opacity: 0.8, transform: 'translateX(-50%) scale(0.98)' },
          { top: '120%', opacity: 0, transform: 'translateX(-50%) scale(0.95)' }
        ];
        
        line.animate(keyframes, {
          duration,
          easing: 'ease-in-out'
        }).onfinish = () => {
          line.remove();
          // Add some randomness to when lines are replaced
          setTimeout(() => {
            createCodeLine(Math.floor(Math.random() * allSnippets.length), positionIndex);
          }, Math.random() * 8000); // Random delay before spawning the next snippet
        };
      }, position.delay);
    };
    
    // Initialize lines - even fewer, positioned strategically
    const maxLines = universeMode ? strategicPositions.length : Math.min(4, strategicPositions.length);
    for (let i = 0; i < maxLines; i++) {
      createCodeLine(i, i);
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [universeMode]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-1"
    />
  );
};

// Terminal typing effect
const TerminalTyping = ({ className }: { className?: string }) => {
  const [text, setText] = useState('');
  const fullText = `$ ./showcase-skills.sh\n> Initializing portfolio...\n> Loading projects: [=========>] 100%\n> System architecture analysis: EXPERT\n> Backend/Frontend integration: SEAMLESS\n> Technical expertise verified. Ready to collaborate.`;
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  
  return (
    <div className={`font-mono text-sm sm:text-base text-green-400 bg-gray-900/95 p-4 rounded-md shadow-green-500/20 shadow-lg overflow-hidden ${className}`}>
      <pre className="whitespace-pre-wrap">
        {text}
        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
      </pre>
    </div>
  );
};

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({ 
  title = personalInfo.title,
  subtitle = personalInfo.summary,
  ctaText = "View My Work",
  ctaLink = "/projects" 
}: HeroProps) {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: false });
  const [universeMode, setUniverseMode] = useState(false);
  
  // Use grid pattern
  useGridPattern();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Toggle universe view mode
  const toggleUniverseMode = () => {
    setUniverseMode(prev => !prev);
  };
  
  return (
    <Section variant="default" spacing="none" container={false} className="overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full min-h-[90vh] overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/80 to-slate-950 z-0"></div>
        <div className="absolute inset-0 space-bg opacity-95 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-8 z-0"></div>
        
        {/* Cyberpunk effect - diagonal accent line */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-60 pointer-events-none">
          <div className="absolute top-0 left-[-10%] w-[120%] h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform rotate-[25deg] origin-left"></div>
          <div className="absolute bottom-[30%] right-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent transform rotate-[-15deg] origin-right"></div>
        </div>
        
        {/* Main background elements */}
        <StarsBackground />
        <CodeBackground universeMode={universeMode} />
        
        {/* Universe mode toggle button */}
        <motion.div 
          className="absolute bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.button
            onClick={toggleUniverseMode}
            className={`group flex items-center space-x-3 px-5 py-3 rounded-lg ${
              universeMode 
                ? 'bg-green-800/60 text-white border-green-400/80' 
                : 'bg-indigo-950/70 text-green-200 border-green-500/40'
            } backdrop-blur-md border-2 hover:border-green-400/80 transition-all duration-300 relative overflow-hidden shadow-xl`}
            whileHover={{ 
              scale: 1.08,
              boxShadow: universeMode 
                ? "0 0 25px rgba(72, 255, 167, 0.7)" 
                : "0 0 15px rgba(72, 255, 167, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            // Additional glow for the button
            style={{
              boxShadow: universeMode 
                ? "0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(5, 205, 153, 0.3)" 
                : "0 0 10px rgba(16, 185, 129, 0.3)"
            }}
          >
            {/* Animated background gradient for button */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-600/20 via-emerald-500/20 to-cyan-500/20 opacity-80"></div>
            
            {/* Animated highlight effect */}
            <motion.div 
              className="absolute inset-0 -z-5 opacity-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent" 
              animate={{ 
                opacity: [0, 0.6, 0],
                left: ["-100%", "100%", "100%"],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: universeMode ? 2 : 6,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
            
            <span className={`text-sm font-medium relative ${universeMode ? 'text-green-100' : 'text-green-200'}`}>
              {universeMode ? 'Exit Universe Mode' : 'Universe Mode'}
            </span>
            
            <motion.div
              className={`relative w-7 h-7 rounded-full flex items-center justify-center ${
                universeMode 
                  ? 'bg-gradient-to-br from-green-300 to-emerald-500' 
                  : 'bg-gradient-to-br from-green-400/80 to-emerald-600/80'
              }`}
              animate={{ 
                rotate: universeMode ? [0, 360] : 0,
                scale: universeMode ? [1, 1.2, 1] : 1,
                boxShadow: universeMode 
                  ? ['0 0 0px rgba(16, 185, 129, 0)', '0 0 25px rgba(5, 245, 173, 0.8)', '0 0 15px rgba(16, 185, 129, 0.4)'] 
                  : '0 0 10px rgba(16, 185, 129, 0.3)' 
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="currentColor" 
                className="w-4 h-4 text-white"
                animate={{
                  opacity: universeMode ? [0.7, 1, 0.7] : 0.9
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <path d="M9.35 16.88c-.7 0-1.51-.18-2.29-.51l.96-1.34c.85.24 1.78.27 2.43.02.76-.29 1.32-1.05 1.61-1.58.27-.49.3-1.28.08-1.85-.22-.57-.77-1.28-1.53-1.57-.65-.25-1.56-.21-2.43.02l-.96-1.34c.78-.33 1.59-.51 2.29-.51.71 0 1.35.18 1.88.5 1.12.42 2.04 1.27 2.49 2.26.46 1 .39 2.15-.04 3.1-.43.94-1.36 1.8-2.49 2.23-.53.31-1.17.49-1.88.49z"/>
                <path d="M4.5 7.5C4.5 5.01 6.51 3 9 3c1.5 0 2.81.73 3.62 1.85l-1.42 1.42C10.72 5.5 9.93 5 9 5c-1.38 0-2.5 1.12-2.5 2.5S7.62 10 9 10c.93 0 1.72-.5 2.19-1.27l1.42 1.42C11.82 11.27 10.5 12 9 12c-2.49 0-4.5-2.01-4.5-4.5z"/>
                <path d="M15.62 4.38c-.57-.57-1.62-.57-2.19 0L11 6.81c-.38-.05-.76-.06-1.14-.01l3.19-3.19c1.05-1.05 3.05-1.05 4.1 0s1.05 3.05 0 4.1l-3.19 3.19c-.05-.38-.06-.76-.01-1.14l2.42-2.42c.57-.57.57-1.62 0-2.19z"/>
                <path d="M13.19 18.19L9.5 14.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5c-.54 0-1.04-.17-1.45-.47l-.7 1.32c.65.37 1.39.59 2.15.59 2.37 0 4.29-1.92 4.29-4.29 0-2.37-1.92-4.29-4.29-4.29-2.37 0-4.29 1.92-4.29 4.29 0 .76.22 1.5.58 2.15l3.69 3.69c.2.2.51.2.71 0 .19-.2.19-.52 0-.71z"/>
              </motion.svg>
            </motion.div>
            
            {/* Ambient glow when in universe mode */}
            {universeMode && (
              <motion.div
                className="absolute inset-0 rounded-lg z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
                  filter: "blur(10px)"
                }}
              />
            )}
          </motion.button>
          
          {/* Attention-grabbing pulse effect when not in universe mode */}
          {!universeMode && (
            <motion.div
              className="absolute inset-0 -z-10 rounded-lg border-2 border-green-500/30"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
        </motion.div>
        
        <motion.div 
          style={{ 
            opacity: universeMode ? 0 : opacity, 
            y: universeMode ? 50 : y,
            pointerEvents: universeMode ? 'none' : 'auto' 
          }}
          className="relative z-10 w-full transition-all duration-1000"
          animate={{ 
            filter: universeMode ? 'blur(10px)' : 'blur(0px)',
            scale: universeMode ? 0.95 : 1
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[85vh] py-16">
              {/* Left Side: Profile and Introduction */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-slate-950/80 to-indigo-950/80 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-8 shadow-xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="relative h-20 w-20 mr-5">
                      <Image
                        src="/profile.png"
                        alt={personalInfo.name}
                        fill
                        className="rounded-full object-cover border-2 border-indigo-400/50 shadow-lg"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">{personalInfo.name}</h1>
                      <p className="text-indigo-300">{personalInfo.title}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-4">{title}</h2>
                  <p className="text-indigo-200 mb-6 leading-relaxed">
                    {subtitle}
                  </p>
                  
                  {/* Terminal-like typing effect */}
                  <TerminalTyping className="mb-6" />
                  
                  {/* Social Links */}
                  <div className="flex gap-6 mb-6">
                    {personalInfo.socialLinks.github.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-300 hover:text-white hover:shadow-indigo-500/50 hover:shadow-lg transition-all duration-300"
                        aria-label="GitHub Profile"
                        whileHover={{ scale: 1.1, y: -3 }}
                      >
                        <FaGithub size={24} />
                      </motion.a>
                    ))}
                    <motion.a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-white hover:shadow-indigo-500/50 hover:shadow-lg transition-all duration-300"
                      aria-label="LinkedIn Profile"
                      whileHover={{ scale: 1.1, y: -3 }}
                    >
                      <FaLinkedin size={24} />
                    </motion.a>
                    <motion.a
                      href="https://twitter.com/eakwofie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-white hover:shadow-indigo-500/50 hover:shadow-lg transition-all duration-300"
                      aria-label="Twitter Profile"
                      whileHover={{ scale: 1.1, y: -3 }}
                    >
                      <FaTwitter size={24} />
                    </motion.a>
                  </div>
                  
                  {/* CTA Button */}
                  <div>
                    <LinkButton
                      href={ctaLink}
                      variant="secondary"
                      size="lg"
                      className="w-full justify-center py-3 font-semibold bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:via-purple-400 hover:to-indigo-400 border-none shadow-lg shadow-indigo-500/20 hover:shadow-indigo-400/40 transition-all duration-300"
                    >
                      {ctaText}
                    </LinkButton>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Side: Technical Skills and Expertise */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-950/60 to-indigo-950/70 backdrop-blur-sm border border-blue-500/30 rounded-xl p-8 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-6">Technical Expertise</h3>
                  
                  {/* Technology Stack section */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-4">Technology Stack</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { name: 'Python', bg: 'from-blue-700/30 to-blue-900/40' },
                      { name: 'Rust', bg: 'from-orange-700/30 to-orange-900/40' },
                      { name: 'Solidity', bg: 'from-purple-700/30 to-purple-900/40' },
                      { name: 'TypeScript', bg: 'from-blue-600/30 to-blue-800/40' },
                      { name: 'CSS', bg: 'from-blue-500/30 to-blue-700/40' },
                      { name: 'HTML', bg: 'from-orange-600/30 to-orange-800/40' }
                    ].map((tech) => (
                      <motion.div
                        key={tech.name}
                        className={`bg-gradient-to-br ${tech.bg} border border-blue-500/40 rounded-lg p-3 text-center shadow-md`}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                      >
                        <span className="text-blue-100 text-sm font-medium">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Technical specializations */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-4">Technical Specializations</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { name: 'Machine Learning', bg: 'bg-purple-800/40 border-purple-500/40' },
                      { name: 'DevOps', bg: 'bg-red-800/40 border-red-500/40' },
                      { name: 'Automation Engineering', bg: 'bg-blue-800/40 border-blue-500/40' },
                      { name: 'High-Performance Systems', bg: 'bg-indigo-800/40 border-indigo-500/40' },
                      { name: 'UX/UI Design', bg: 'bg-pink-800/40 border-pink-500/40' }
                    ].map((skill) => (
                      <motion.div
                        key={skill.name}
                        className={`px-3 py-1 ${skill.bg} rounded-full shadow-md`}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.3)' }}
                      >
                        <span className="text-indigo-100 text-sm font-medium">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Professional expertise */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-4">Professional Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { name: 'Cross-functional teamwork', bg: 'from-indigo-700/40 to-indigo-900/40' },
                      { name: 'Project management', bg: 'from-purple-700/40 to-purple-900/40' },
                      { name: 'Technical communication', bg: 'from-blue-700/40 to-blue-900/40' },
                      { name: 'Research translation', bg: 'from-violet-700/40 to-violet-900/40' },
                      { name: 'System architecture', bg: 'from-indigo-700/40 to-blue-900/40' },
                      { name: 'Performance optimization', bg: 'from-green-700/40 to-green-900/40' }
                    ].map((skill) => (
                      <motion.span
                        key={skill.name}
                        className={`px-3 py-1 bg-gradient-to-r ${skill.bg} border border-indigo-600/40 rounded-full text-indigo-100 text-xs font-medium shadow-md`}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.3)' }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Experience highlight */}
                  <div className="bg-gradient-to-br from-slate-950/70 to-indigo-950/80 rounded-lg p-4 border border-indigo-700/50 shadow-lg">
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-indigo-200 mb-2">Current Position</h3>
                    <p className="text-indigo-100 font-medium">{personalInfo.experience[0].title}</p>
                    <p className="text-indigo-300 text-sm">{personalInfo.experience[0].company} • {personalInfo.experience[0].period}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-indigo-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </Section>
  );
} 
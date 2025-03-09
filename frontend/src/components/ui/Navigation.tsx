'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
}

export function Navigation({ items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-indigo-900/10' 
          : 'bg-slate-900/70 backdrop-blur-sm'
      }`}
      style={{
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)', // For Safari
      }}
    >
      {/* Cyberpunk accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/0 via-cyan-500 to-indigo-500/0"></div>
      
      {/* Enhanced space background with stars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Regular animated stars */}
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
        
        {/* Twinkling stars - strategically positioned */}
        <div className="absolute inset-0">
          {/* Top left quadrant */}
          <div className="twinkle-star star-large" style={{ top: '15%', left: '5%' }}></div>
          <div className="twinkle-star" style={{ top: '25%', left: '15%', animationDelay: '0.7s' }}></div>
          <div className="twinkle-star star-medium" style={{ top: '10%', left: '25%', animationDelay: '1.5s' }}></div>
          
          {/* Top right quadrant */}
          <div className="twinkle-star star-medium" style={{ top: '8%', left: '65%', animationDelay: '0.3s' }}></div>
          <div className="twinkle-star star-large" style={{ top: '20%', left: '78%', animationDelay: '2.1s' }}></div>
          <div className="twinkle-star" style={{ top: '32%', left: '92%', animationDelay: '1.2s' }}></div>
          
          {/* Bottom left quadrant */}
          <div className="twinkle-star star-medium" style={{ top: '60%', left: '12%', animationDelay: '0.9s' }}></div>
          <div className="twinkle-star" style={{ top: '75%', left: '22%', animationDelay: '2.5s' }}></div>
          
          {/* Bottom right quadrant */}
          <div className="twinkle-star star-large" style={{ top: '55%', left: '75%', animationDelay: '1.8s' }}></div>
          <div className="twinkle-star" style={{ top: '70%', left: '88%', animationDelay: '0.2s' }}></div>
          
          {/* Center area */}
          <div className="twinkle-star star-medium" style={{ top: '35%', left: '40%', animationDelay: '1.4s' }}></div>
          <div className="twinkle-star star-large" style={{ top: '50%', left: '50%', animationDelay: '0.8s' }}></div>
          <div className="twinkle-star" style={{ top: '42%', left: '62%', animationDelay: '2.2s' }}></div>
        </div>
        
        {/* Shooting stars */}
        <div className="absolute inset-0">
          <div className="shooting-star shooting-star-large"></div>
          <div className="shooting-star shooting-star-medium shooting-star-delay-1"></div>
          <div className="shooting-star shooting-star-large shooting-star-delay-2"></div>
          <div className="shooting-star shooting-star-medium shooting-star-delay-3"></div>
        </div>
        
        {/* Star field glow effects */}
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent" style={{ width: '100%', height: '100%', top: '10%', left: '30%' }}></div>
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" style={{ width: '100%', height: '100%', top: '20%', left: '60%' }}></div>
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/8 via-transparent to-transparent" style={{ width: '100%', height: '100%', top: '50%', left: '20%' }}></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold relative group">
              {/* Cyberpunk Signature */}
              <div className="relative">
                {/* Glitch effect layer 1 */}
                <span className="absolute -left-[2px] -top-[2px] opacity-70 text-pink-500 blur-[0.3px] animate-pulse-slow cyber-glitch" data-text="EAKWOFIE">EAKWOFIE</span>
                
                {/* Glitch effect layer 2 */}
                <span className="absolute -left-[1px] top-[1px] opacity-70 text-cyan-400 blur-[0.3px] animate-pulse-slower cyber-glitch" data-text="EAKWOFIE">EAKWOFIE</span>
                
                {/* Main text with gradient */}
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 font-mono tracking-wide">
                EAK<span className="text-cyan-400">WOFIE</span>
                </span>
                
                {/* Digital circuit lines */}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-indigo-500/0 via-cyan-500 to-indigo-500/0"></span>
                <span className="absolute left-0 -bottom-3 w-1/3 h-[1px] bg-cyan-500/50"></span>
                <span className="absolute right-0 -bottom-2 w-1/4 h-[1px] bg-indigo-500/50"></span>
                
                {/* Decorative elements */}
                <span className="absolute -top-1 -left-2 w-1 h-1 bg-cyan-400 rounded-full"></span>
                <span className="absolute -bottom-2 -right-1 w-1 h-1 bg-indigo-400 rounded-full"></span>
                
                {/* Animated glow */}
                <span className="absolute inset-0 -z-10 bg-cyan-500/5 blur-xl animate-glow-pulse rounded-lg"></span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group px-3 py-2 mx-1 rounded-md text-sm font-medium transition-all duration-300 overflow-hidden ${
                  pathname === item.href
                    ? 'text-cyan-400' 
                    : 'text-slate-300 hover:text-cyan-300'
                }`}
              >
                {/* Background glow on active/hover */}
                <span className={`absolute inset-0 rounded-md transition-all duration-300 ${
                  pathname === item.href 
                    ? 'bg-cyan-900/20' 
                    : 'bg-transparent group-hover:bg-slate-800/50'
                }`}></span>
                
                {/* Border line on active */}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0"></span>
                )}
                
                {/* Text with interactive highlight */}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-cyan-300 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="sm:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium relative overflow-hidden ${
                    pathname === item.href
                      ? 'text-cyan-400 bg-slate-800/70 border-l-2 border-cyan-500' 
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Add this to your global CSS to create the animated stars effect
/*
.stars-sm, .stars-md, .stars-lg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0.3;
}

.stars-sm {
  background-image: radial-gradient(1px 1px at 25px 5px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2.5px 2.5px at 110px 80px, white, rgba(255, 255, 255, 0));
  animation: starsAnimation 10s infinite linear;
}

.stars-md {
  background-image: radial-gradient(1px 1px at 75px 125px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1px 1px at 100px 75px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1.5px 1.5px at 199px 100px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2px 2px at 20px 50px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2.5px 2.5px at 100px 5px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2.5px 2.5px at 200px 5px, white, rgba(255, 255, 255, 0));
  animation: starsAnimation 15s infinite linear;
}

.stars-lg {
  background-image: radial-gradient(1px 1px at 150px 50px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1px 1px at 250px 100px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(1.5px 1.5px at 100px 150px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2px 2px at 200px 200px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2.5px 2.5px at 50px 50px, white, rgba(255, 255, 255, 0)),
                    radial-gradient(2.5px 2.5px at 200px 250px, white, rgba(255, 255, 255, 0));
  animation: starsAnimation 20s infinite linear;
}

@keyframes starsAnimation {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-500px);
  }
}
*/ 
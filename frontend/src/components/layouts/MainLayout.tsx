'use client';

import { ReactNode, useEffect } from 'react';
import { Navigation } from '../ui/Navigation';
import { Footer } from '../ui/Footer';
import { FiGithub, FiLinkedin, FiMail, FiBook, FiUsers, FiAward } from 'react-icons/fi';
import { personalInfo } from '@/data/projects';

interface MainLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const footerSections = [
  {
    title: 'Navigation',
    links: navigationItems,
  },
  {
    title: 'Expertise',
    links: [
      { label: 'Health & Nutrition Tech', href: '/services#health-tech' },
      { label: 'Sustainable Food Systems', href: '/services#sustainable-systems' },
      { label: 'Research Software', href: '/services#research-software' },
      { label: 'AI/ML Solutions', href: '/services#ai-solutions' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'DISH Research Platform', href: '/projects/1' },
      { label: 'Life Expectancy Predictor', href: '/projects/2' },
      { label: 'Pathfinders Gifts', href: '/projects/3' },
      { label: 'Pea Protein Analysis', href: '/projects/4' },
    ],
  },
];

// Updated social media links with icons from personal info
const socialLinks = [
  {
    platform: 'GitHub',
    href: personalInfo.socialLinks.github[0],
    icon: <FiGithub size={24} />,
  },
  {
    platform: 'LinkedIn',
    href: personalInfo.socialLinks.linkedin,
    icon: <FiLinkedin size={24} />,
  },
  {
    platform: 'Contact',
    href: '/contact',
    icon: <FiMail size={24} />,
  },
];

export function MainLayout({ children }: MainLayoutProps) {
  // Add a class to the body to ensure proper stacking context
  useEffect(() => {
    // Add a class to the body for proper stacking context and overflow control
    document.body.classList.add('bg-slate-950', 'min-h-screen');
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent content shifting when scrollbar appears
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    
    return () => {
      document.body.classList.remove('bg-slate-950', 'min-h-screen');
      document.documentElement.style.scrollBehavior = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const copyrightName = personalInfo.name.split(' ')[0] + ' ' + personalInfo.name.split(' ')[1];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        {/* Star field */}
        <div className="absolute inset-0 bg-space-pattern opacity-20 pointer-events-none"></div>
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-10%] w-[120%] h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform rotate-[25deg] origin-left opacity-30"></div>
          <div className="absolute bottom-[30%] right-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform rotate-[-15deg] origin-right opacity-30"></div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation items={navigationItems} />
      
      {/* Main Content - with padding-top to account for fixed header */}
      <main className="flex-grow z-10 pt-16">
        {children}
      </main>
      
      {/* Footer */}
      <Footer 
        sections={footerSections}
        socialLinks={socialLinks}
        copyright={`© ${currentYear} ${copyrightName}. All rights reserved.`}
      />
    </div>
  );
} 
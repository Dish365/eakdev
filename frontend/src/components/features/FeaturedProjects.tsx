'use client';

import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { FeaturedProject } from './FeaturedProject';
import dynamic from 'next/dynamic';

// Dynamically import the 3D visualizer with SSR disabled
const ProjectEcosystemVisualizer = dynamic(
  () => import('./SkillsVisualizer').then(mod => mod.ProjectEcosystemVisualizer),
  { ssr: false }
);

// Normalize project features to ensure consistent structure
const normalizeProject = (project: any) => {
  // If features is an array, convert it to expected object format
  if (Array.isArray(project.features)) {
    return {
      ...project,
      features: { technical: project.features }
    };
  }
  return project;
};

export function FeaturedProjects() {
  // Get featured projects and sort by displayOrder
  const featuredProjects = projects
    .filter(project => project.featured)
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999))
    .slice(0, 2); // Only show top 2 featured projects
  
  return (
    <Section variant="default" spacing="lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500 relative inline-block">
              Engineering
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-indigo-500/0 via-blue-500 to-indigo-500/0"></span>
            </span>
          </h2>
          <motion.p 
            className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Leveraging cutting-edge technology to build high-performance systems that solve complex problems in sustainable food systems and research.
          </motion.p>
        </motion.div>
        
        {/* 3D Skills Visualizer */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            <span className="relative">
              Technical Ecosystem
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></span>
            </span>
          </h3>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-4 text-sm">
            Interactive visualization of my project portfolio and technology stack.
            <span className="hidden sm:inline"> See how different technologies interconnect across various domains.</span>
          </p>
          
          {/* Legend with subtle styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
            <div className="bg-slate-200/70 rounded-lg px-3 py-2 text-center">
              <span className="inline-block w-3 h-3 rounded-lg bg-purple-500 mr-2"></span>
              <span className="text-xs text-slate-700 font-medium">Domain Expertise</span>
            </div>
            <div className="bg-slate-200/70 rounded-lg px-3 py-2 text-center">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
              <span className="text-xs text-slate-700 font-medium">Projects</span>
            </div>
            <div className="bg-slate-200/70 rounded-lg px-3 py-2 text-center">
              <span className="inline-block w-3 h-3 rounded-md bg-blue-500 mr-2"></span>
              <span className="text-xs text-slate-700 font-medium">Technologies</span>
            </div>
          </div>
          
          {/* Visualizer with subtle border */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <ProjectEcosystemVisualizer />
          </div>
          
          <p className="text-blue-600 text-center mt-4 text-xs">
            <span className="mr-1">⚡</span> 
            Click on any node to explore connections between projects, technologies, and domains
          </p>
        </motion.div>
        
        {/* Featured Projects */}
        <div className="space-y-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 text-center">
            <span className="relative">
              Featured Projects
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></span>
            </span>
          </h3>
          
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="mb-16">
              <FeaturedProject project={normalizeProject(project)} />
            </div>
          ))}
          
          {/* View all projects button */}
          <div className="text-center">
            <motion.a
              href="/projects"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-slate-100 font-medium rounded-lg transition-all duration-300 border border-indigo-300/50 shadow-md relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                View All Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>
          </div>
        </div>
        
        {/* Engineering approach section */}
        <motion.div 
          className="mt-24 bg-slate-100 border border-slate-200 rounded-xl p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            <span className="relative">
              Engineering Approach
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></span>
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5 relative group shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4 mx-auto relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center relative z-10">Research Integration</h4>
              <p className="text-slate-600 text-sm text-center relative z-10">
                Translating complex scientific concepts into practical software solutions with rigorous methodology.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-5 relative group shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4 mx-auto relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center relative z-10">High Performance</h4>
              <p className="text-slate-600 text-sm text-center relative z-10">
                Building optimized systems for speed and scalability using modern cloud architectures.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-5 relative group shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 mx-auto relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center relative z-10">Modular Architecture</h4>
              <p className="text-slate-600 text-sm text-center relative z-10">
                Creating maintainable systems through thoughtful architecture and component-based development.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 
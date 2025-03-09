'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/features/ProjectCard';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import { FiFilter, FiSearch, FiX, FiGrid } from 'react-icons/fi';
import { VscTerminalBash } from 'react-icons/vsc';

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique technologies across projects
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => 
        project.technologies?.map(tech => tech.toLowerCase()) || []
      )
    )
  ).sort();
  
  // Cast projects to proper type
  const typedProjects = projects as unknown as Project[];
  
  // Filter projects based on search and tech filters
  const filteredProjects = typedProjects
    .filter(project => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Technology filter
      const matchesTech = selectedTech.length === 0 || 
        selectedTech.every(tech => 
          project.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
        );
        
      return matchesSearch && matchesTech;
    })
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));

  // Client-side only effects
  useEffect(() => {
    // Simulated loading effect for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle technology selection
  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-r-2 border-l-2 border-blue-300 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-b-2 border-blue-400 animate-reverse-spin"></div>
            <div className="absolute inset-3 rounded-full border-r-2 border-l-2 border-blue-300 animate-spin-slow"></div>
          </div>
          <p className="mt-4 text-lg text-gray-700 font-mono">Initializing<span className="animate-blink">_</span></p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0 pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center mb-2">
            <span className="text-blue-500 mr-2">
              <VscTerminalBash size={24} />
            </span>
            <h1 className="text-3xl font-bold text-gray-900 font-mono">Projects</h1>
          </div>
          <p className="mt-2 text-gray-600 max-w-3xl pl-8">
            Browse through my portfolio of projects across different domains, including full-stack development, research, AI/ML, and DevOps.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Section variant="default" className="py-6 bg-gray-50 border-b border-gray-200 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Search input */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 text-gray-800 placeholder:text-gray-500 font-mono
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-500">
                <FiSearch size={18} />
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            
            {/* Filter toggle button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all font-mono ${
                showFilters || selectedTech.length > 0
                  ? 'bg-blue-600 text-white shadow-blue-glow'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <FiFilter size={18} />
              <span className="relative">
                <span>filter --tech</span>
                {showFilters && <span className="absolute -bottom-px left-0 right-0 h-px bg-white/50"></span>}
              </span>
              {selectedTech.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-xs text-blue-600 font-medium ml-1">
                  {selectedTech.length}
                </span>
              )}
            </button>
            
            {/* Clear filters button */}
            {(searchTerm || selectedTech.length > 0) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 font-mono"
                aria-label="Clear all filters"
              >
                <FiX size={18} />
                <span>clear</span>
              </button>
            )}
          </div>
          
          {/* Technology filter tags */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-4 border border-gray-200 rounded-md bg-white relative">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400 opacity-60"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400 opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400 opacity-60"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400 opacity-60"></div>
                  
                  <h2 className="text-sm font-medium text-gray-700 mb-3 font-mono flex items-center">
                    <span className="text-blue-500 mr-2">&gt;</span>
                    Filter by technology
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {allTechnologies.map((tech) => (
                      <button
                        type="button"
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1 rounded-md text-sm transition-all font-mono ${
                          selectedTech.includes(tech)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        aria-label={selectedTech.includes(tech) ? `Remove ${tech} filter` : `Add ${tech} filter`}
                      >
                        {tech}
                        {selectedTech.includes(tech) && (
                          <span className="ml-1 text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
      
      {/* Projects Grid */}
      <Section variant="default" className="py-12 relative">
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="mx-auto text-gray-400 mb-4 w-16 h-16">
                <FiSearch size={64} />
              </div>
              <h3 className="text-xl text-gray-800 font-medium mb-2 font-mono">No Matching Projects</h3>
              <p className="text-gray-600 mb-6">We couldn't find any projects matching your search criteria.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors font-mono"
                aria-label="Reset filters"
              >
                reset
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 font-mono">
                  <span className="text-blue-500">
                    <FiGrid size={18} />
                  </span>
                  <span className="relative">
                    Projects ({filteredProjects.length})
                    <span className="absolute -bottom-px left-0 right-0 h-px bg-blue-500/30"></span>
                  </span>
                </h2>
                {(searchTerm || selectedTech.length > 0) && (
                  <p className="text-sm text-gray-600 font-mono">
                    Showing {filteredProjects.length} of {typedProjects.length} projects
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <ProjectCard project={project} featured={project.featured} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Add some custom CSS for cypherpunk effects */}
      <style jsx global>{`
        .shadow-blue-glow {
          box-shadow: 0 0 15px -3px rgba(59, 130, 246, 0.3);
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-spin-slow {
          animation: spin 5s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 4s linear infinite;
        }
        
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </main>
  );
}
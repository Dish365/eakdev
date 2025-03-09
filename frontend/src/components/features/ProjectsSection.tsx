'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section } from '../ui/Section';
import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { Category, Project } from '@/types/project';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { OptimizedImage } from '../ui/OptimizedImage';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isLoading, setIsLoading] = useState(true);
  const categories: Category[] = ['All', 'Full Stack', 'Research', 'AI/ML', 'DevOps'];

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Cast projects to the expected type with unknown intermediate step
  const typedProjects = projects as unknown as Project[];
  
  // Filter projects based on featured flag and category
  const filteredProjects = typedProjects
    .filter(project => {
      // Only show featured projects
      if (!project.featured) return false;
      
      // Filter by category if not "All"
      if (selectedCategory === 'All') {
        return true;
      }
      return project.categories.includes(selectedCategory);
    })
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-16">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 h-64 lg:h-96 bg-gray-200"></div>
            <div className="p-8 w-full lg:w-1/2 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Custom Featured Project Card Component
  const FeaturedProjectCard = ({ project, index }: { project: Project, index: number }) => {
    const isEven = index % 2 === 0;
    
    return (
      <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        variants={itemVariants}
      >
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          {/* Project Image */}
          <div className="w-full lg:w-1/2 relative h-64 lg:h-auto">
            <OptimizedImage
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              width={800}
              height={600}
              priority={true}
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              Featured
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24" />
          </div>
          
          {/* Project Content */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.categories.map((category, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
            <p className="text-lg text-gray-600 mb-6">{project.description}</p>
            
            {/* Technologies - Scrollable */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Key Feature Highlight */}
            {project.features && Object.entries(project.features)[0] && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlight</h4>
                {(() => {
                  const [key, value] = Object.entries(project.features)[0];
                  const colorScheme = {
                    bg: 'bg-indigo-50',
                    text: 'text-indigo-800',
                    border: 'border-indigo-200'
                  };
                  
                  return (
                    <div className={`${colorScheme.bg} p-4 rounded-lg border ${colorScheme.border}`}>
                      <h5 className="font-semibold text-gray-900 mb-2 capitalize">{key.replace(/_/g, ' ')}</h5>
                      {Array.isArray(value) && (
                        <ul className="space-y-1">
                          {value.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                          {Array.isArray(value) && value.length > 2 && (
                            <li className="text-xs italic text-gray-500">+{value.length - 2} more features</li>
                          )}
                        </ul>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            
            {/* Links */}
            <div className="mt-auto flex gap-3">
              <Link 
                href={`/projects/${project.id}`}
                className="flex-grow"
              >
                <Button variant="secondary" className="w-full">
                  View Details
                </Button>
              </Link>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow"
                >
                  <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                    <span>Live Demo</span>
                    <FaExternalLinkAlt size={12} />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Showcasing key innovations in protein analysis, motivational gifts discovery, and research platforms.
          </p>
          <Link href="/projects">
            <Button 
              variant="primary" 
              size="lg" 
              className="group bg-indigo-600 hover:bg-indigo-700"
            >
              <span>View All Projects</span>
              <svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white rounded-xl shadow-sm border">
            {categories.map((category, index) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "primary" : "ghost"}
                size="sm"
                className={`transition-all duration-200 ${
                  selectedCategory === category ? 'shadow-md' : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects List - Vertical Layout */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div 
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20 bg-white rounded-xl shadow-sm border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg 
              className="w-16 h-16 text-gray-400 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a2 2 0 100-4 2 2 0 000 4z" 
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try selecting a different category or check back later.</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory('All')}
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </Section>
  );
} 
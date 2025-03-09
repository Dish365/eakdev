'use client';

import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { VscTerminalBash } from 'react-icons/vsc';
import { Project } from '@/types/project';
import { Card } from '../ui/Card';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden h-full flex flex-col bg-white border border-gray-200 shadow-md rounded-lg relative ${featured ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
        {/* Subtle decorative corner lines */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400 opacity-60"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400 opacity-60"></div>
        
        {/* Project Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <OptimizedImage
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            width={800}
            height={450}
            priority={featured}
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-mono shadow-sm">
              FEATURED
            </div>
          )}
          {/* Subtle scan line overlay */}
          <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>
          {/* Tech pattern */}
          <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Terminal-style header */}
          <div className="flex items-center mb-3 text-xs text-gray-500 font-mono">
            <span className="mr-1">
              <VscTerminalBash />
            </span>
            <span>project/{project.id}</span>
          </div>
          
          {/* Categories */}
          <div className="mb-3 flex flex-wrap gap-2">
            {project.categories.map((category, index) => (
              <span key={index} className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                {category}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 font-mono flex items-start">
            <span className="text-blue-500 mr-2 flex-shrink-0">&gt;</span>
            <span>{project.title}</span>
          </h3>
          <p className="text-base text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-auto">
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <h4 className="text-sm font-medium text-gray-700 font-mono">stack</h4>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 5).map((tech, index) => (
                <span
                  key={index}
                  className="whitespace-nowrap px-2 py-1 rounded text-xs font-mono bg-gray-100 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="whitespace-nowrap px-2 py-1 rounded text-xs font-mono bg-gray-100 text-gray-600">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Link 
              href={`/projects/${project.id}`}
              className="flex-grow"
              aria-label={`View details of ${project.title}`}
            >
              <Button variant="secondary" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 font-mono">
                <span>cat README.md</span>
              </Button>
            </Link>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow"
                aria-label={`View live demo of ${project.title}`}
              >
                <Button variant="primary" className="w-full bg-blue-600 border-blue-700 text-white hover:bg-blue-700 focus:ring-blue-500 flex items-center justify-center gap-2 shadow-blue-glow">
                  <span>Live Demo</span>
                  <FaExternalLinkAlt size={12} aria-hidden="true" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
      
      {/* CSS for cypherpunk elements */}
      <style jsx global>{`
        .shadow-blue-glow {
          box-shadow: 0 0 15px -3px rgba(59, 130, 246, 0.3);
        }
        
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23000000' fill-opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-208a5 5 0 1 1-2 0V0h2v12.1zM48 48a5 5 0 1 1-2 0V0h2v48zm-16 48a5 5 0 1 1-2 0V48h2v48zm-16 0a5 5 0 1 1-2 0V48h2v48zm-16 0a5 5 0 1 1-2 0V48h2v48z'/%3E%3C/svg%3E");
        }
        
        .bg-scanline {
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.05) 1px,
            rgba(0, 0, 0, 0.05) 2px
          );
        }
      `}</style>
    </motion.div>
  );
} 
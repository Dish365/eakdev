'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiGithub, FiLink, FiExternalLink, FiCode, FiServer, FiDatabase } from 'react-icons/fi';
import { VscTerminalBash } from 'react-icons/vsc';
import { Project } from '@/types/project';
import { Section } from '@/components/ui/Section';
import { ProjectImage } from '@/components/ui/ProjectImage';

interface ProjectDetailClientProps {
  project: Project;
  previousProject?: {
    title: string;
    href: string;
  };
  nextProject?: {
    title: string;
    href: string;
  };
}

export default function ProjectDetailClient({ 
  project, 
  previousProject, 
  nextProject 
}: ProjectDetailClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Client-side only effects
  useEffect(() => {
    // Simulated loading effect for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to get feature color scheme
  const getFeatureColorScheme = (featureKey: string) => {
    const colorSchemes: { [key: string]: { bg: string; text: string; border: string; heading: string; icon: string; glowColor: string } } = {
      technical: { 
        bg: 'bg-blue-100', 
        text: 'text-gray-700', 
        border: 'border-blue-300',
        heading: 'text-blue-800',
        icon: 'text-blue-600',
        glowColor: 'before:from-blue-400 before:to-blue-200 hover:before:opacity-60'
      },
      economic: { 
        bg: 'bg-green-100', 
        text: 'text-gray-700', 
        border: 'border-green-300',
        heading: 'text-green-800',
        icon: 'text-green-600',
        glowColor: 'before:from-green-400 before:to-green-200 hover:before:opacity-60'
      },
      environmental: { 
        bg: 'bg-teal-100', 
        text: 'text-gray-700', 
        border: 'border-teal-300',
        heading: 'text-teal-800',
        icon: 'text-teal-600',
        glowColor: 'before:from-teal-400 before:to-teal-200 hover:before:opacity-60'
      },
      assessment: { 
        bg: 'bg-purple-100', 
        text: 'text-gray-700', 
        border: 'border-purple-300',
        heading: 'text-purple-800',
        icon: 'text-purple-600',
        glowColor: 'before:from-purple-400 before:to-purple-200 hover:before:opacity-60'
      },
      user_experience: { 
        bg: 'bg-indigo-100', 
        text: 'text-gray-700', 
        border: 'border-indigo-300',
        heading: 'text-indigo-800',
        icon: 'text-indigo-600',
        glowColor: 'before:from-indigo-400 before:to-indigo-200 hover:before:opacity-60'
      },
      system: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-700', 
        border: 'border-gray-300',
        heading: 'text-gray-800',
        icon: 'text-gray-600',
        glowColor: 'before:from-gray-400 before:to-gray-200 hover:before:opacity-60'
      },
      data_processing: { 
        bg: 'bg-cyan-100', 
        text: 'text-gray-700', 
        border: 'border-cyan-300',
        heading: 'text-cyan-800',
        icon: 'text-cyan-600',
        glowColor: 'before:from-cyan-400 before:to-cyan-200 hover:before:opacity-60'
      },
      default: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-700', 
        border: 'border-gray-300',
        heading: 'text-gray-800',
        icon: 'text-gray-600',
        glowColor: 'before:from-gray-400 before:to-gray-200 hover:before:opacity-60'
      }
    };
    return colorSchemes[featureKey] || colorSchemes.default;
  };

  // Helper function to render feature content
  const renderFeatureContent = (content: any): JSX.Element | JSX.Element[] | null => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start"
            >
              <span className="inline-block w-1.5 h-1.5 bg-current rounded-full mt-2 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (typeof content === 'object') {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([subKey, subValue]) => (
            <div key={subKey}>
              <h6 className="font-medium capitalize mb-2">{subKey.replace(/_/g, ' ')}</h6>
              {renderFeatureContent(subValue)}
            </div>
          ))}
        </div>
      );
    }
    return null;
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
      {/* Subtle grid patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0 pointer-events-none"></div>
      
      {/* Navigation bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
              aria-label="Return to projects list"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
                <FiArrowLeft size={16} aria-hidden="true" />
              </span>
              <span className="font-mono">cd ../projects</span>
            </Link>
            
            <div className="flex space-x-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center shadow-blue-glow"
                  aria-label={`View demo for ${project.title}`}
                >
                  <span className="mr-2"><FiLink size={16} aria-hidden="true" /></span>
                  <span>View Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Section variant="default" className="pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-6 border-l-2 border-blue-500 pl-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories.map((category, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-mono">
              <span className="text-blue-500 mr-2">&gt;</span>{project.title}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Project Image */}
            <div className="lg:col-span-3 rounded-lg overflow-hidden border border-gray-200 shadow-lg relative before:absolute before:inset-0 before:rounded-lg before:shadow-xl before:opacity-0 hover:before:opacity-30 before:transition-opacity before:pointer-events-none before:shadow-blue-400/20">
              <div className="aspect-video bg-gray-100 relative">
                <ProjectImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Tech pattern overlay */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-5 mix-blend-overlay pointer-events-none"></div>
                {/* Subtle scan line */}
                <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none"></div>
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-2">
              {/* Technologies */}
              <div className="mb-8 relative">
                <div className="absolute -left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
                <div className="flex items-center mb-3">
                  <span className="text-blue-500 mr-2">
                    <VscTerminalBash size={18} />
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 font-mono">
                    Technologies
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-mono shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Info */}
              {project.architecture && (
                <div className="mb-6 relative">
                  <div className="absolute -left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 opacity-50"></div>
                  <div className="flex items-center mb-3">
                    <span className="text-blue-500 mr-2">
                      <FiServer size={18} />
                    </span>
                    <h2 className="text-xl font-semibold text-gray-900 font-mono">
                      System Specs
                    </h2>
                  </div>
                  <div className="bg-gray-50 rounded-md border border-gray-200 p-4 font-mono">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <span className="text-blue-500 mr-2">&gt;</span>Frontend:
                        </h3>
                        <p className="text-gray-800 ml-5">
                          {Array.isArray(project.architecture.frontend) 
                            ? project.architecture.frontend.join(', ')
                            : project.architecture.frontend}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <span className="text-blue-500 mr-2">&gt;</span>Backend:
                        </h3>
                        <p className="text-gray-800 ml-5">
                          {project.architecture.backend.join(', ')}
                        </p>
                      </div>
                      {project.architecture.cloud && (
                        <div>
                          <h3 className="font-medium text-gray-700 flex items-center">
                            <span className="text-blue-500 mr-2">&gt;</span>Infrastructure:
                          </h3>
                          <p className="text-gray-800 ml-5">
                            {project.architecture.cloud.provider} - {project.architecture.cloud.deployment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      {project.features && (
        <Section variant="default" className="py-12 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
          {/* Diagonal accent lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
            <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/10 to-indigo-500/0"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 font-mono flex items-center">
              <span className="text-blue-500 mr-2">&gt;</span>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(project.features).map(([key, value]) => {
                const colorScheme = getFeatureColorScheme(key);
                return (
                  <div 
                    key={key} 
                    className={`${colorScheme.bg} p-6 rounded-lg border ${colorScheme.border} shadow-sm relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br ${colorScheme.glowColor} before:opacity-0 before:transition-opacity before:pointer-events-none hover:scale-[1.02] transition-transform duration-300`}
                  >
                    <h3 className={`text-lg font-semibold ${colorScheme.heading} mb-4 capitalize font-mono flex items-center`}>
                      <span className="text-blue-500 mr-2">&gt;</span>
                      {key.replace(/_/g, ' ')}
                    </h3>
                    <div className={colorScheme.text}>
                      {renderFeatureContent(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* About Section */}
      <Section variant="default" className="py-12 border-t border-gray-200 relative">
        {/* Tech pattern background */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 font-mono flex items-center">
            <span className="text-blue-500 mr-2">&gt;</span>
            Project Details
          </h2>
          <div className="prose prose-blue max-w-none mb-8 bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4 text-xs text-blue-500 font-mono border-b border-gray-200 pb-2">
              <span className="mr-2">$</span>
              <span className="text-gray-700">cat README.md</span>
              <span className="animate-blink ml-1">_</span>
            </div>
            <p className="text-gray-700">
              This project demonstrates advanced capabilities in {project.categories.join(', ')} domains, 
              showcasing innovative solutions to complex technical challenges.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4 font-mono flex items-center">
              <span className="text-blue-500 mr-2">#</span>
              Key Achievements
            </h3>
            <ul className="space-y-2">
              {project.id === '4' ? (
                <>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Achieved protein purity up to 63.1% through optimized RF treatment
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Implemented Monte Carlo simulation with 10,000 iterations for risk analysis
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Developed comprehensive environmental impact metrics (GWP, HCT, FRS)
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Created real-time process monitoring and optimization system
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Successfully delivered a complete end-to-end solution
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Implemented advanced data processing algorithms
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Created an intuitive and responsive user interface
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    Deployed a scalable cloud architecture
                  </li>
                </>
              )}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4 font-mono flex items-center">
              <span className="text-blue-500 mr-2">#</span>
              Technical Implementation
            </h3>
            <p className="text-gray-700">
              The system utilizes a modern tech stack with <span className="font-medium">{Array.isArray(project.architecture.frontend) 
                ? project.architecture.frontend[0]
                : project.architecture.frontend}</span> for the frontend and <span className="font-medium">{project.architecture.backend[0]}</span> 
              for the backend, ensuring high performance and scalability. 
              Advanced data processing is handled through specialized libraries and custom algorithms.
            </p>
          </div>
        </div>
      </Section>

      {/* Project Navigation */}
      <Section variant="default" className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {previousProject ? (
              <Link 
                href={previousProject.href} 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group font-mono"
                aria-label={`Previous project: ${previousProject.title}`}
              >
                <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
                  <FiArrowLeft size={18} aria-hidden="true" />
                </span>
                <span>{previousProject.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            
            <Link 
              href="/projects"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-mono"
              aria-label="View all projects"
            >
              ls -all
            </Link>
            
            {nextProject ? (
              <Link 
                href={nextProject.href} 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group font-mono"
                aria-label={`Next project: ${nextProject.title}`}
              >
                <span>{nextProject.title}</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  <FiArrowRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Section>

      {/* Add some custom CSS for subtle cypherpunk animations */}
      <style jsx global>{`
        .shadow-blue-glow {
          box-shadow: 0 0 15px -3px rgba(59, 130, 246, 0.3);
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23000000' fill-opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-208a5 5 0 1 1-2 0V0h2v12.1zM48 48a5 5 0 1 1-2 0V0h2v48zm-16 48a5 5 0 1 1-2 0V48h2v48zm-16 0a5 5 0 1 1-2 0V48h2v48zm-16 0a5 5 0 1 1-2 0V48h2v48zM4.068 143.838l-.001-.005-.004.005zm-.001-64.001l-.001-.005-.004.005zm-.001 64.001l-.001-.004-.005.004zm-64.008-64.001l-.061.005-.005-.005zm384.014 64l-.061.005-.005-.005zM-4.106 15.845l-.063-.005-.005.005zm384.015 64l-.063-.005-.005.005zM-4.106 143.838l-.063-.004-.005.004zm192.008-128l-.063-.004-.004.004zm192.007 0l-.063-.004-.004.004zM-4.106 79.838l-.063-.005-.005.005zm192.008 0l-.063-.005-.005.005zm192.007 0l-.063-.005-.005.005zM0 143.839a95.957 95.957 0 0 1 1.137-14.961l1.902.19a94.022 94.022 0 0 0-1.113 14.771H0zm48 0a95.957 95.957 0 0 1-1.137-14.961l-1.902.19a94.022 94.022 0 0 0 1.113 14.771H48zm-48-64a95.957 95.957 0 0 1 1.137-14.961l1.902.19A94.022 94.022 0 0 0 1.926 79.84H0z'/%3E%3C/svg%3E");
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
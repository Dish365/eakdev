'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { LinkButton } from '../ui/Button';
import { Section } from '../ui/Section';
import { ProjectImage } from '../ui/ProjectImage';
import { ArchitectureSection, FeatureSection } from '@/types/project';

interface ProjectLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  features?: Record<string, string[] | Record<string, any>>;
  architecture?: ArchitectureSection;
  nextProject?: {
    title: string;
    href: string;
  };
  previousProject?: {
    title: string;
    href: string;
  };
}

export function ProjectLayout({
  children,
  title,
  description,
  technologies,
  imageUrl,
  demoUrl,
  features,
  architecture,
  nextProject,
  previousProject,
}: ProjectLayoutProps) {
  // Helper function to get feature color scheme
  const getFeatureColorScheme = (featureKey: string) => {
    const colorSchemes: { [key: string]: { bg: string; text: string; heading: string } } = {
      technical: { bg: 'bg-blue-50', text: 'text-blue-800', heading: 'text-blue-900' },
      economic: { bg: 'bg-green-50', text: 'text-green-800', heading: 'text-green-900' },
      environmental: { bg: 'bg-amber-50', text: 'text-amber-800', heading: 'text-amber-900' },
      assessment: { bg: 'bg-purple-50', text: 'text-purple-800', heading: 'text-purple-900' },
      user_experience: { bg: 'bg-indigo-50', text: 'text-indigo-800', heading: 'text-indigo-900' },
      system: { bg: 'bg-gray-50', text: 'text-gray-800', heading: 'text-gray-900' },
      data_processing: { bg: 'bg-cyan-50', text: 'text-cyan-800', heading: 'text-cyan-900' },
      default: { bg: 'bg-gray-50', text: 'text-gray-800', heading: 'text-gray-900' }
    };
    return colorSchemes[featureKey] || colorSchemes.default;
  };

  // Helper function to render feature content
  const renderFeatureContent = (content: any): JSX.Element | JSX.Element[] | null => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-2" />
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
              <h6 className="font-medium capitalize mb-2">{subKey.replace('_', ' ')}</h6>
              {renderFeatureContent(subValue)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <Section variant="primary" spacing="lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg mb-6">{description}</p>
              
              {/* Technologies */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {demoUrl && (
                  <LinkButton
                    variant="primary"
                    href={demoUrl}
                  >
                    View Demo
                  </LinkButton>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <ProjectImage
                src={imageUrl}
                alt={title}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Features Sections */}
      {features && (
        <Section variant="default" spacing="lg">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(features).map(([key, value]) => {
                const colorScheme = getFeatureColorScheme(key);
                return (
                  <div key={key} className={`${colorScheme.bg} p-6 rounded-lg shadow-lg`}>
                    <h5 className={`font-semibold ${colorScheme.heading} mb-3 capitalize`}>
                      {key.replace('_', ' ')}
                    </h5>
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

      {/* Content Section */}
      <Section variant="default" spacing="lg">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </Section>

      {/* Architecture Section */}
      {architecture && (
        <Section variant="alternate" spacing="lg">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">System Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Frontend & Backend */}
              <div className="space-y-6">
                {architecture.frontend && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Frontend Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(architecture.frontend) 
                        ? architecture.frontend.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                              {tech}
                            </span>
                          ))
                        : <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                            {architecture.frontend}
                          </span>
                      }
                    </div>
                  </div>
                )}
                {architecture.backend && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Backend Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {architecture.backend.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cloud Infrastructure */}
              {architecture.cloud && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Cloud Infrastructure</h3>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-medium mb-2">Provider: {architecture.cloud.provider}</p>
                    <div className="flex flex-wrap gap-2">
                      {architecture.cloud.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">Deployment: {architecture.cloud.deployment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Project Navigation */}
      <Section variant="default" spacing="lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-8 border-t border-gray-200">
            {previousProject ? (
              <Link 
                href={previousProject.href} 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {previousProject.title}
              </Link>
            ) : (
              <div></div>
            )}
            
            <Link 
              href="/projects"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              All Projects
            </Link>
            
            {nextProject ? (
              <Link 
                href={nextProject.href} 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                {nextProject.title}
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Section>
    </article>
  );
} 
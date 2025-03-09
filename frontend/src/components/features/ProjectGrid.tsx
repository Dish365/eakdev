'use client';

import { Card } from '../ui/Card';
import { LinkButton } from '../ui/Button';
import { ProjectImage } from '../ui/ProjectImage';

interface ProjectFeature {
  [key: string]: string[] | { [key: string]: any };
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  features?: ProjectFeature;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  // Helper function to get feature color scheme
  const getFeatureColorScheme = (featureKey: string) => {
    const colorSchemes: { [key: string]: { bg: string; text: string } } = {
      technical: { bg: 'bg-blue-50', text: 'text-blue-800' },
      economic: { bg: 'bg-green-50', text: 'text-green-800' },
      environmental: { bg: 'bg-amber-50', text: 'text-amber-800' },
      default: { bg: 'bg-gray-50', text: 'text-gray-800' }
    };
    return colorSchemes[featureKey] || colorSchemes.default;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          variant="hover"
          className="flex flex-col h-full"
        >
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <ProjectImage
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Project Content */}
          <div className="flex flex-col flex-grow p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Preview */}
            {project.features && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h4>
                <div className="space-y-2">
                  {Object.entries(project.features).map(([key, value]) => {
                    const colorScheme = getFeatureColorScheme(key);
                    return (
                      <div key={key} className={`${colorScheme.bg} p-3 rounded-lg`}>
                        <h5 className="font-medium capitalize mb-1">{key.replace('_', ' ')}</h5>
                        <ul className={`text-sm ${colorScheme.text} space-y-1`}>
                          {Array.isArray(value) 
                            ? value.slice(0, 2).map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))
                            : Object.keys(value).slice(0, 2).map((subKey) => (
                                <li key={subKey}>{subKey.replace('_', ' ')}</li>
                              ))
                          }
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Project Links */}
            <div className="flex gap-4 mt-auto">
              {project.demoUrl && (
                <LinkButton
                  variant="primary"
                  href={project.demoUrl}
                >
                  View Demo
                </LinkButton>
              )}
              {project.githubUrl && (
                <LinkButton
                  variant="outline"
                  href={project.githubUrl}
                >
                  View Code
                </LinkButton>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 
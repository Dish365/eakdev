import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import ProjectDetailClient from './ProjectDetailClient';

// This is a server component
export default function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // Cast projects to proper type
  const typedProjects = projects as unknown as Project[];
  
  // Sort projects by displayOrder for consistent navigation
  const sortedProjects = [...typedProjects].sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  
  const project = sortedProjects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  // Find adjacent projects for navigation
  const currentIndex = sortedProjects.findIndex(p => p.id === params.id);
  const previousProject = currentIndex > 0 ? {
    title: sortedProjects[currentIndex - 1].title,
    href: `/projects/${sortedProjects[currentIndex - 1].id}`,
  } : undefined;
  
  const nextProject = currentIndex < sortedProjects.length - 1 ? {
    title: sortedProjects[currentIndex + 1].title,
    href: `/projects/${sortedProjects[currentIndex + 1].id}`,
  } : undefined;

  return (
    <ProjectDetailClient 
      project={project}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  );
}

// Generate static paths for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
} 
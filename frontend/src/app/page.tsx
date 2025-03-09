import { Hero } from '@/components/features/Hero';
import { FeaturedProjects } from '@/components/features/FeaturedProjects';
import { personalInfo } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <Hero
        title={personalInfo.title}
        subtitle={personalInfo.summary}
        ctaText="View My Work"
        ctaLink="/projects"
      />
      <FeaturedProjects />
    </>
  );
} 
export type Category = 'All' | 'Full Stack' | 'Research' | 'AI/ML' | 'DevOps';

export type FeatureType = 'technical' | 'economic' | 'environmental' | 'data_processing' | 'user_experience' | 'assessment' | 'system';

export interface FeatureSection {
  [key: string]: string[] | Record<string, string[]>;
}

export interface CloudConfig {
  provider: string;
  services: string[];
  deployment: string;
}

export interface ArchitectureSection {
  frontend: string[] | string;
  backend: string[];
  cloud: CloudConfig;
  testing?: {
    backend?: string[];
    frontend?: string[];
  };
  data_processing?: Record<string, string[]>;
  analysis_modules?: Record<string, Record<string, string[] | Record<string, string[]>>>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  categories: Category[];
  features: Record<FeatureType | string, string[] | Record<string, any>>;
  architecture: ArchitectureSection;
  featured?: boolean;
  displayOrder?: number;
} 
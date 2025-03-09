'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, personalInfo } from '@/data/projects';

// Define types for our data structure
interface Skill {
  id: string;
  name: string;
  category: string;
  usage: number;
  projects: {
    id: string;
    title: string;
    imageUrl: string;
    demoUrl?: string;
  }[];
  color: string;
}

type CategoryType = 'all' | 'frontend' | 'backend' | 'devops' | 'data' | 'cloud' | 'other';

export function SkillsVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Define category metadata
  const categories: Record<Exclude<CategoryType, 'all'>, { label: string, color: string, icon: string }> = {
    frontend: { 
      label: 'Frontend', 
      color: '#00ddff', 
      icon: '⚛️' 
    },
    backend: { 
      label: 'Backend', 
      color: '#ff00aa', 
      icon: '🖥️' 
    },
    devops: { 
      label: 'DevOps', 
      color: '#ff9900', 
      icon: '🔄' 
    },
    data: { 
      label: 'Data & ML', 
      color: '#7700ff', 
      icon: '📊' 
    },
    cloud: { 
      label: 'Cloud', 
      color: '#00ffaa', 
      icon: '☁️' 
    },
    other: { 
      label: 'Other', 
      color: '#ffdd00', 
      icon: '🔧' 
    }
  };

  // Normalize technology names by stripping version numbers and standardizing common tech
  const normalizeTechName = (tech: string): string => {
    // Convert to lowercase for comparison
    const techLower = tech.toLowerCase();
    
    // Handle special cases with specific mappings
    const specialCases: Record<string, string> = {
      // React ecosystem
      'react': 'React',
      'react 18': 'React',
      'react 18.2.0': 'React',
      'react 18.3': 'React',
      'react 18.3.1': 'React', 
      'react 19': 'React',
      'react 19.0.0': 'React',
      'react window': 'React Window',
      'react helmet': 'React Helmet',
      'react query': 'React Query',
      'react hook form': 'React Hook Form',
      'react hook form 7': 'React Hook Form',

      // Next.js
      'next.js': 'Next.js',
      'next.js 14': 'Next.js',
      'next.js 14.1': 'Next.js',
      'next.js 14.1.0': 'Next.js',
      'next.js 15': 'Next.js',
      'next.js 15.1.7': 'Next.js',
      'nextjs': 'Next.js',

      // UI libraries
      'material ui': 'Material UI',
      'material ui 6': 'Material UI',
      'material ui 6.0.0': 'Material UI',
      'radix ui': 'Radix UI',
      'radix ui components': 'Radix UI',
      'shadcn ui': 'Shadcn UI',
      'embla carousel': 'Embla Carousel',
      'emotion styled components': 'Emotion',

      // CSS
      'tailwind': 'TailwindCSS',
      'tailwindcss': 'TailwindCSS',
      'tailwind css': 'TailwindCSS',
      'tailwindcss 3.4': 'TailwindCSS',
      'tailwindcss 3.4.1': 'TailwindCSS',
      'css': 'CSS',
      'html': 'HTML',

      // Router & data fetching
      'react router': 'React Router',
      'react router 6': 'React Router',
      'react router 6.26.2': 'React Router',
      'axios': 'Axios',
      'axios 1.7': 'Axios',
      'axios 1.7.5': 'Axios',
      'axios 1.7.9': 'Axios',
      'recharts': 'Recharts',
      'recharts 2': 'Recharts',
      'recharts 2.12.7': 'Recharts',

      // Backend frameworks
      'django': 'Django',
      'django 4.2': 'Django',
      'django 4.2.0': 'Django',
      'django 5.1': 'Django',
      'django 5.1.1': 'Django',
      'django rest framework': 'Django REST Framework',
      'django rest framework 3': 'Django REST Framework',
      'django rest framework 3.14.0': 'Django REST Framework',
      'django rest framework 3.15.2': 'Django REST Framework',
      'fastapi': 'FastAPI',
      'fastapi 0.68.0': 'FastAPI',
      'gunicorn': 'Gunicorn',
      'gunicorn 20.1.0': 'Gunicorn',
      'gunicorn 23.0.0': 'Gunicorn',

      // Databases
      'postgresql': 'PostgreSQL',
      'postgresql with psycopg2': 'PostgreSQL',
      'postgresql with psycopg2-binary': 'PostgreSQL',
      'mongodb': 'MongoDB',
      'redis': 'Redis',
      'redis 4.0.0': 'Redis',
      'elasticsearch': 'Elasticsearch',

      // Languages
      'typescript': 'TypeScript',
      'typescript 5.3': 'TypeScript',
      'javascript': 'JavaScript',
      'python': 'Python',
      'rust': 'Rust',
      'solidity': 'Solidity',

      // Data science
      'tensorflow': 'TensorFlow',
      'tensorflow/keras ml models': 'TensorFlow',
      'scikit-learn': 'Scikit-learn',
      'scikit': 'Scikit-learn',
      'pandas': 'Pandas',
      'pandas 2.2.2': 'Pandas',
      'numpy': 'NumPy',
      'numpy 2.1.1': 'NumPy',
      'scipy': 'SciPy',
      'celery': 'Celery',
      'openai': 'OpenAI',
      'openai 1.46.1': 'OpenAI',

      // DevOps and cloud
      'docker': 'Docker',
      'kubernetes': 'Kubernetes',
      'aws': 'AWS',
      'vercel': 'Vercel',
      'github': 'GitHub',
      'azure': 'Azure',
      'gcp': 'Google Cloud',
      'cloudfront': 'CloudFront',
      'route53': 'Route53',
      's3': 'S3',
      'ec2': 'EC2',
      'rds': 'RDS',
      'elasticache': 'ElastiCache',
      'cloudwatch': 'CloudWatch',
      
      // Testing
      'pytest': 'Pytest',
      'pytest 8.3.4': 'Pytest',
      'eslint': 'ESLint',
      
      // CMS and content
      'sanity cms': 'Sanity CMS',
      'resend': 'Resend',
      
      // Form validation
      'zod': 'Zod',
      'zod schema validation': 'Zod',
      'pydantic': 'Pydantic',
      
      // Animation and UI
      'framer motion': 'Framer Motion',
      'sonner': 'Sonner',
      
      // WebSockets and real-time
      'websockets': 'WebSockets',
      'websockets 12.0': 'WebSockets',
      
      // Authentication
      'jwt': 'JWT',
      'jwt authentication': 'JWT',
    };
    
    // Check if it's a special case
    for (const [pattern, replacement] of Object.entries(specialCases)) {
      if (techLower === pattern || techLower.startsWith(pattern + ' ')) {
        return replacement;
      }
    }
    
    // General case: strip version numbers and clean up
    // This regex matches patterns like "Technology 1.2.3" or "Technology v1.2.3"
    const cleanedName = tech.replace(/\s+v?[0-9]+(\.[0-9]+)*(-[a-z0-9]+)?$/i, '');
    
    // Capitalize first letter of each word
    return cleanedName.replace(/\w\S*/g, txt => 
      txt.charAt(0).toUpperCase() + txt.substring(1)
    );
  };

  // Categorize technology into appropriate group
  const categorizeSkill = (skill: string): Exclude<CategoryType, 'all'> => {
    const skillLower = skill.toLowerCase();
    
    if (['react', 'vue', 'angular', 'html', 'css', 'tailwind', 'next', 'typescript', 'javascript', 'ui', 'ux', 'design', 'redux', 'router', 'material', 'radix', 'emotion', 'styled'].some(t => skillLower.includes(t))) {
      return 'frontend';
    } else if (['python', 'django', 'node', 'express', 'fastapi', 'api', 'rust', 'flask', 'rest', 'golang', 'java', 'c#', 'c++', 'php'].some(t => skillLower.includes(t))) {
      return 'backend';
    } else if (['docker', 'kubernetes', 'github', 'cicd', 'ci/cd', 'devops', 'nginx', 'gunicorn', 'deployment'].some(t => skillLower.includes(t))) {
      return 'devops';
    } else if (['postgres', 'mysql', 'mongodb', 'redis', 'sql', 'database', 'numpy', 'pandas', 'tensorflow', 'scikit', 'ml', 'ai', 'machine', 'learning', 'analytics'].some(t => skillLower.includes(t))) {
      return 'data';
    } else if (['aws', 'cloud', 'ec2', 's3', 'lambda', 'azure', 'gcp', 'route53', 'cloudfront', 'rds'].some(t => skillLower.includes(t))) {
      return 'cloud';
    }
    
    return 'other'; // Default category
  };

  // Extract and process skills from all projects
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a map to track all unique technologies
    const skillsMap = new Map<string, Skill>();
    
    // Process all projects to extract technologies
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        // Normalize the technology name
        const normalizedName = normalizeTechName(tech);
        // Use the normalized name as the key
        const skillKey = normalizedName;
        
        const category = categorizeSkill(tech);
        const existingSkill = skillsMap.get(skillKey);
        
        // Get projects using this technology (using original tech name for matching)
        const projectsUsingSkill = projects
          .filter(p => p.technologies.some(t => 
            normalizeTechName(t) === normalizedName
          ))
          .map(p => ({
            id: p.id,
            title: p.title,
            imageUrl: p.imageUrl || '',
            demoUrl: p.demoUrl
          }));
        
        // Calculate usage (how many projects use this technology)
        const usage = projectsUsingSkill.length;
        
        if (existingSkill) {
          // Update existing skill
          skillsMap.set(skillKey, {
            ...existingSkill,
            usage
          });
        } else {
          // Create new skill entry
          skillsMap.set(skillKey, {
            id: skillKey,
            name: normalizedName,
            category,
            usage,
            projects: projectsUsingSkill,
            color: categories[category].color
          });
        }
      });
    });
    
    // Add personal skills that might not be in projects
    if (personalInfo?.skills?.programming) {
      personalInfo.skills.programming.forEach(skill => {
        const normalizedName = normalizeTechName(skill);
        const skillKey = normalizedName;
        
        if (!skillsMap.has(skillKey)) {
          const category = categorizeSkill(skill);
          skillsMap.set(skillKey, {
            id: skillKey,
            name: normalizedName,
            category,
            usage: 1,
            projects: [],
            color: categories[category].color
          });
        }
      });
    }
    
    // Convert to array and sort by usage
    let skillsArray = Array.from(skillsMap.values());
    skillsArray.sort((a, b) => b.usage - a.usage);
    
    setSkills(skillsArray);
  }, []);

  // Toggle skill selection
  const handleSkillClick = (skill: Skill) => {
    if (activeSkill?.id === skill.id) {
      setActiveSkill(null);
    } else {
      setActiveSkill(skill);
    }
  };

  // Filter skills based on selected category
  const filteredSkills = skills.filter(skill => 
    selectedCategory === 'all' || skill.category === selectedCategory
  );

  // Get skills to display based on expanded state
  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 16);
  const hasMoreSkills = filteredSkills.length > 16;

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-950 via-indigo-950/80 to-slate-950 border border-indigo-500/30 shadow-inner"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Animated neon lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[120%] h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform rotate-[5deg] origin-left"></div>
        <div className="absolute bottom-[30%] right-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent transform rotate-[-10deg] origin-right"></div>
      </div>
      
      {/* Category filter tabs */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-slate-950/70 border-b border-indigo-500/30 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-lg font-bold">Technical Skills</h3>
          <motion.button
            className="text-green-400 text-sm hover:text-green-300 focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </motion.button>
        </div>
        
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
          <button
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all flex items-center justify-center ${
              selectedCategory === 'all'
                ? 'bg-indigo-700/60 text-white border border-indigo-400/50'
                : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <span className="inline-block sm:hidden">🔍</span>
            <span className="hidden sm:inline">All Skills</span>
          </button>
          
          {Object.entries(categories).map(([key, { label, color, icon }]) => (
            <button
              key={key}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap flex items-center gap-1 transition-all ${
                selectedCategory === key
                  ? 'bg-opacity-20 text-white border'
                  : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50'
              }`}
              style={{
                backgroundColor: selectedCategory === key ? `${color}20` : '',
                borderColor: selectedCategory === key ? `${color}50` : ''
              }}
              onClick={() => setSelectedCategory(key as CategoryType)}
            >
              <span className="flex-shrink-0">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Skills display */}
      <div className="p-4 sm:p-6 relative min-h-[350px]">
        {/* Show message if no skills match filter */}
        {filteredSkills.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-indigo-300">
            No skills found in this category
          </div>
        )}
        
        {/* Interactive skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 relative z-10">
          <AnimatePresence>
            {displayedSkills.map((skill) => (
              <motion.div
                key={skill.id}
                className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                  activeSkill && activeSkill.id !== skill.id 
                    ? 'opacity-60' 
                    : 'opacity-100'
                }`}
                style={{
                  backgroundColor: `${skill.color}10`,
                  borderLeft: `3px solid ${skill.color}`,
                  boxShadow: activeSkill?.id === skill.id 
                    ? `0 0 15px ${skill.color}80, inset 0 0 5px ${skill.color}50` 
                    : 'none',
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: `0 0 10px ${skill.color}40` 
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSkillClick(skill)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: Math.random() * 0.2
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-white text-sm font-medium truncate">{skill.name}</span>
                </div>
                <div className="text-xs text-indigo-200 mt-1 flex items-center">
                  <span className="mr-2">{skill.usage} {skill.usage === 1 ? 'project' : 'projects'}</span>
                  <div 
                    className="flex-grow h-1 bg-slate-800 rounded-full overflow-hidden"
                    style={{ maxWidth: '60%' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: skill.color,
                        width: `${Math.min(100, skill.usage * 20)}%`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Show more button for mobile */}
        {hasMoreSkills && !isExpanded && (
          <div className="mt-4 text-center sm:hidden">
            <button
              className="px-4 py-2 bg-indigo-800/40 text-indigo-200 rounded-lg border border-indigo-700/50 text-sm"
              onClick={() => setIsExpanded(true)}
            >
              Show {filteredSkills.length - 16} more skills
            </button>
          </div>
        )}
      </div>
      
      {/* Detail panel for selected skill */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            className="border-t border-indigo-500/30 bg-indigo-950/80 backdrop-blur-md p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-5 h-5 rounded-full" 
                style={{ backgroundColor: activeSkill.color }}
              />
              <h4 className="text-xl font-bold text-white">
                {activeSkill.name}
                <span className="text-sm font-normal ml-2 text-indigo-200">
                  {categories[activeSkill.category as Exclude<CategoryType, 'all'>]?.label || activeSkill.category}
                </span>
              </h4>
            </div>
            
            <div className="text-sm text-indigo-200 mb-3">
              Used in {activeSkill.projects.length} project{activeSkill.projects.length !== 1 ? 's' : ''}
            </div>
            
            {/* Project thumbnails */}
            {activeSkill.projects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {activeSkill.projects.slice(0, 3).map(project => (
                  <motion.a
                    key={project.id}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg group cursor-pointer"
                    style={{ 
                      backgroundColor: `${activeSkill.color}15`,
                      border: `1px solid ${activeSkill.color}30`,
                      textDecoration: 'none'
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: `0 0 15px ${activeSkill.color}30`,
                      backgroundColor: `${activeSkill.color}25` 
                    }}
                  >
                    {project.imageUrl && (
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 border border-slate-700/50">
                        <div 
                          className="w-full h-full bg-cover bg-center" 
                          style={{ backgroundImage: `url(${project.imageUrl})` }}
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="text-white font-medium truncate group-hover:text-cyan-100 transition-colors">
                        {project.title}
                      </div>
                      {project.demoUrl && (
                        <div className="text-xs text-indigo-300 group-hover:text-cyan-200 transition-colors">
                          View Project
                        </div>
                      )}
                    </div>
                    {project.demoUrl && (
                      <div className="ml-auto text-indigo-400 group-hover:text-cyan-300 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    )}
                  </motion.a>
                ))}
                
                {activeSkill.projects.length > 3 && (
                  <motion.div
                    className="p-3 flex items-center justify-center rounded-lg bg-slate-800/40 border border-slate-700/50"
                    whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                  >
                    <span className="text-indigo-300 text-sm">
                      +{activeSkill.projects.length - 3} more projects
                    </span>
                  </motion.div>
                )}
              </div>
            )}
            
            {/* No projects message */}
            {activeSkill.projects.length === 0 && (
              <div className="text-indigo-300 text-sm italic">
                This skill is in my proficiency stack but not featured in the showcased projects.
              </div>
            )}
            
            <button
              className="mt-4 px-3 py-1 bg-slate-800/60 text-indigo-300 rounded text-sm border border-slate-700/50 hover:bg-slate-700/60"
              onClick={() => setActiveSkill(null)}
            >
              Close details
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// For backward compatibility with existing imports
export const ProjectEcosystemVisualizer = SkillsVisualizer;
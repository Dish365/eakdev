'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { LinkButton } from '../ui/Button';
import { FiExternalLink, FiChevronDown, FiChevronRight, FiInfo, FiCode, FiServer, FiFeather, FiGithub, FiLink, FiCpu, FiDatabase, FiActivity, FiLayers } from 'react-icons/fi';

interface FeaturedProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    demoUrl: string;
    githubUrl?: string;
    technologies: string[];
    categories: string[];
    features?: {
      technical?: string[];
      data_processing?: string[];
      system?: string[];
      economic?: string[];
      environmental?: string[];
      assessment?: string[];
      design?: string[];
      content?: string[];
      user_experience?: string[];
      [key: string]: string[] | undefined;
    };
    architecture?: {
      frontend?: string[] | any;
      backend?: string[] | any;
      cloud?: any;
      analysis_modules?: any;
      ml_features?: string[];
      data_points?: string[];
      testing?: any;
      development?: any;
      [key: string]: any;
    };
  };
}

// Feature category display names mapping
const featureCategoryLabels: Record<string, string> = {
  technical: 'Technical Features',
  data_processing: 'Data Processing',
  system: 'System Features',
  economic: 'Economic Analysis',
  environmental: 'Environmental Impact',
  assessment: 'Assessment Tools',
  design: 'Design Elements',
  content: 'Content Features',
  user_experience: 'User Experience'
};

// Feature category icons with color mapping
const getIconByCategory = (category: string) => {
  switch (category) {
    case 'technical':
      return <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors"><FiCpu size={18} /></span>;
    case 'data_processing':
      return <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors"><FiDatabase size={18} /></span>;
    case 'system':
      return <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors"><FiServer size={18} /></span>;
    case 'economic':
      return <span className="text-amber-400 group-hover:text-amber-300 transition-colors"><FiActivity size={18} /></span>;
    case 'environmental':
      return <span className="text-green-400 group-hover:text-green-300 transition-colors"><FiFeather size={18} /></span>;
    case 'assessment':
      return <span className="text-blue-400 group-hover:text-blue-300 transition-colors"><FiInfo size={18} /></span>;
    case 'design':
      return <span className="text-pink-400 group-hover:text-pink-300 transition-colors"><FiLayers size={18} /></span>;
    case 'content':
      return <span className="text-orange-400 group-hover:text-orange-300 transition-colors"><FiFeather size={18} /></span>;
    case 'user_experience':
      return <span className="text-purple-400 group-hover:text-purple-300 transition-colors"><FiFeather size={18} /></span>;
    default:
      return <span className="text-blue-400 group-hover:text-blue-300 transition-colors"><FiInfo size={18} /></span>;
  }
};

// Animation variants for features
const featureVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.05,
      duration: 0.3
    }
  })
};

// Animation variants for tech badges
const techBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      type: "spring",
      stiffness: 200
    }
  })
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'arch'>('overview');
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);
  const [expandedArchSections, setExpandedArchSections] = useState<string[]>([]);
  const projectRef = useRef(null);
  const isInView = useInView(projectRef, { once: true, margin: "-50px" });
  
  // Toggle expanded feature category
  const toggleFeatureCategory = (category: string) => {
    setExpandedFeatures(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Toggle expanded architecture section
  const toggleArchSection = (section: string) => {
    setExpandedArchSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };
  
  // Extract categories with features
  const featureCategories = project.features 
    ? Object.entries(project.features)
        .filter(([_, features]) => features && features.length > 0)
    : [];
  
  // Get primary feature category for initial display
  const primaryFeatureCategory = featureCategories.length > 0 ? featureCategories[0][0] : null;
    
  return (
    <motion.div 
      ref={projectRef}
      className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-indigo-900/20 hover:shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cyberpunk accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 z-10"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 z-10"></div>
      
      <div className="p-6 sm:p-8">
        {/* Project header */}
        <div className="mb-5 border-b border-slate-700/50 pb-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">{project.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {project.categories.map((category, index) => (
                <motion.span 
                  key={category} 
                  className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-slate-100 text-xs font-medium rounded-full backdrop-blur-sm shadow-lg shadow-blue-900/20 border border-indigo-500/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed mt-3 mb-4 text-[15px]">{project.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <LinkButton 
              href={project.demoUrl} 
              variant="primary" 
              size="sm"
              className="py-2 px-4 rounded-md flex items-center gap-2 shadow-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white border border-indigo-500/50 hover:shadow-indigo-900/30 hover:shadow-lg"
            >
              <FiExternalLink /> View Demo
            </LinkButton>
            
            {project.githubUrl && (
              <LinkButton 
                href={project.githubUrl} 
                variant="secondary" 
                size="sm"
                className="py-2 px-4 rounded-md flex items-center gap-2 shadow-md bg-slate-700/90 hover:bg-slate-600/90 text-slate-200 border border-slate-600/50"
              >
                <FiGithub /> View Code
              </LinkButton>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex mb-5 border-b border-slate-700/70">
          {['overview', 'tech', 'arch'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm transition-colors relative
                ${activeTab === tab 
                  ? 'text-cyan-400 border-b-2 border-cyan-500' 
                  : 'text-slate-400 hover:text-slate-300'}`}
              onClick={() => setActiveTab(tab as 'overview' | 'tech' | 'arch')}
            >
              {activeTab === tab && (
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0"></span>
              )}
              {tab === 'overview' ? 'Overview' : tab === 'tech' ? 'Technologies' : 'Architecture'}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {featureCategories.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-cyan-400 font-semibold mb-3 text-sm flex items-center gap-2">
                      <span className="text-cyan-400"><FiInfo /></span> Key Features
                    </h4>
                    
                    {featureCategories.map(([category, features]) => {
                      const isExpanded = expandedFeatures.includes(category);
                      const displayedFeatures = isExpanded 
                        ? features || []
                        : (features?.slice(0, 3) || []);
                      const hasMoreFeatures = features && features.length > 3;
                      
                      return (
                        <motion.div 
                          key={category} 
                          className="border border-slate-700/70 rounded-lg p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300 group"
                          whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(16, 185, 210, 0.10)' }}
                          transition={{ duration: 0.2 }}
                        >
                          <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleFeatureCategory(category)}
                          >
                            <div className="flex items-center gap-2.5">
                              {getIconByCategory(category)}
                              <h5 className="text-slate-200 font-medium text-[15px] group-hover:text-white transition-colors">
                                {featureCategoryLabels[category] || category}
                              </h5>
                            </div>
                            {hasMoreFeatures && (
                              <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors p-1 bg-slate-700/70 rounded-full">
                                {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                              </span>
                            )}
                          </div>
                          
                          <motion.div 
                            className="mt-3"
                            initial={{ height: 'auto' }}
                            animate={{ height: 'auto' }}
                          >
                            <AnimatePresence>
                              <ul className="text-slate-300 text-[14px] space-y-2">
                                {displayedFeatures.map((feature, index) => (
                                  <motion.li 
                                    key={index} 
                                    className="flex items-start"
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={featureVariants}
                                  >
                                    <span className="text-cyan-400 mr-2 mt-1 min-w-[8px]">•</span>
                                    <span className="leading-snug">{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </AnimatePresence>
                            
                            {hasMoreFeatures && !isExpanded && (
                              <motion.button
                                className="text-xs text-cyan-400 hover:text-cyan-300 mt-3 flex items-center gap-1 py-1 px-2 bg-slate-700/50 rounded-md transition-colors border border-slate-600/50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFeatureCategory(category);
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                Show all {features?.length} features <FiChevronDown />
                              </motion.button>
                            )}
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Technologies Tab */}
            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden h-full"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      custom={index}
                      variants={techBadgeVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-slate-800/80 border border-slate-700/70 rounded-lg p-3 text-center hover:border-cyan-500/30 transition-all duration-300 cursor-default relative group overflow-hidden"
                      whileHover={{ 
                        y: -3, 
                        boxShadow: '0 6px 12px -2px rgba(8, 145, 178, 0.2)', 
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="text-slate-200 text-sm font-medium relative z-10">{tech}</span>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Architecture Tab */}
            {activeTab === 'arch' && project.architecture && (
              <motion.div
                key="arch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {/* Core Architecture Sections */}
                {['frontend', 'backend', 'cloud'].map((section, sectionIndex) => {
                  if (!project.architecture?.[section]) return null;
                  
                  const isExpanded = expandedArchSections.includes(section);
                  const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
                  const sectionData = project.architecture[section];
                  const isArray = Array.isArray(sectionData);
                  
                  // Handle cloud section specially
                  if (section === 'cloud') {
                    return (
                      <motion.div 
                        key={section} 
                        className="border border-slate-700/70 rounded-lg p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300 relative group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                        whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(16, 185, 210, 0.10)' }}
                      >
                        <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 transform rotate-45 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
                        
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleArchSection(section)}
                        >
                          <h5 className="text-slate-200 font-medium text-[15px] flex items-center gap-2">
                            <span className="text-cyan-400"><FiServer /></span> Cloud/Deployment
                          </h5>
                          <span className="text-cyan-400 p-1 bg-slate-700/70 rounded-full">
                            {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                          </span>
                        </div>
                        
                        <motion.div 
                          className="mt-3 text-slate-300 text-[14px] space-y-2.5"
                          initial={{ height: 'auto' }}
                          animate={{ height: 'auto' }}
                        >
                          <div className="flex justify-between items-center py-1 px-3 bg-slate-700/40 rounded-md">
                            <span className="font-medium text-cyan-300">Provider:</span> 
                            <span className="bg-slate-700/70 px-2.5 py-0.5 rounded-full border border-slate-600/50">{sectionData.provider}</span>
                          </div>
                          
                          {sectionData.services && (
                            <div className="flex flex-col py-1 px-3 bg-slate-700/40 rounded-md">
                              <span className="font-medium text-cyan-300 mb-2">Services:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {Array.isArray(sectionData.services) 
                                  ? sectionData.services.map((service: string, idx: number) => (
                                      <span key={idx} className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50">
                                        {service}
                                      </span>
                                    ))
                                  : sectionData.services
                                }
                              </div>
                            </div>
                          )}
                          
                          {sectionData.deployment && (
                            <div className="flex justify-between items-center py-1 px-3 bg-slate-700/40 rounded-md">
                              <span className="font-medium text-cyan-300">Deployment:</span>
                              <span className="bg-slate-700/70 px-2.5 py-0.5 rounded-full border border-slate-600/50">{sectionData.deployment}</span>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    );
                  }
                  
                  // Regular array sections
                  return (
                    <motion.div 
                      key={section} 
                      className="border border-slate-700/70 rounded-lg p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300 relative group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                      whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(16, 185, 210, 0.10)' }}
                    >
                      <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-indigo-500 to-blue-600 transform rotate-45 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
                      
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleArchSection(section)}
                      >
                        <h5 className="text-slate-200 font-medium text-[15px] flex items-center gap-2">
                          {section === 'frontend' ? (
                            <><span className="text-cyan-400"><FiLink /></span> {sectionTitle}</>
                          ) : (
                            <><span className="text-indigo-400"><FiServer /></span> {sectionTitle}</>
                          )}
                        </h5>
                        <span className="text-cyan-400 p-1 bg-slate-700/70 rounded-full">
                          {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="mt-3"
                        initial={{ height: 'auto' }}
                        animate={{ height: 'auto' }}
                      >
                        <div className="text-slate-300 text-[14px] flex flex-wrap gap-1.5 p-2">
                          {isArray ? (
                            isExpanded ? (
                              sectionData.map((tech: string, idx: number) => (
                                <motion.span 
                                  key={idx} 
                                  className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50 hover:border-cyan-500/30 transition-colors"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.03 }}
                                >
                                  {tech}
                                </motion.span>
                              ))
                            ) : (
                              <>
                                {sectionData.slice(0, 6).map((tech: string, idx: number) => (
                                  <span key={idx} className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50 hover:border-cyan-500/30 transition-colors">
                                    {tech}
                                  </span>
                                ))}
                                {sectionData.length > 6 && (
                                  <span className="px-2.5 py-1 bg-slate-900/40 rounded-full text-xs border border-slate-700/30 text-cyan-400">
                                    +{sectionData.length - 6} more
                                  </span>
                                )}
                              </>
                            )
                          ) : (
                            <span className="px-2.5 py-1 bg-slate-700/70 rounded-full border border-slate-600/50">{sectionData}</span>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
                
                {/* Additional Architecture Sections */}
                {Object.entries(project.architecture)
                  .filter(([key]) => !['frontend', 'backend', 'cloud'].includes(key))
                  .map(([key, value], sectionIndex) => {
                    if (!value || (Array.isArray(value) && value.length === 0)) return null;
                    
                    const isExpanded = expandedArchSections.includes(key);
                    const formattedKey = key.split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
                    
                    return (
                      <motion.div 
                        key={key} 
                        className="border border-slate-700/70 rounded-lg p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300 relative group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (sectionIndex + 3) * 0.1 }}
                        whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(16, 185, 210, 0.10)' }}
                      >
                        <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-br from-indigo-500 to-blue-600 transform rotate-45 translate-x-1/2 -translate-y-1/2 opacity-70"></div>
                        
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => toggleArchSection(key)}
                        >
                          <h5 className="text-slate-200 font-medium text-[15px] flex items-center gap-2">
                            <span className="text-indigo-400"><FiInfo /></span> {formattedKey}
                          </h5>
                          <span className="text-cyan-400 p-1 bg-slate-700/70 rounded-full">
                            {isExpanded ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                          </span>
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              className="mt-3 text-slate-300 text-[14px]"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {Array.isArray(value) ? (
                                <div className="flex flex-wrap gap-1.5 p-2">
                                  {value.map((item, idx) => (
                                    <motion.span 
                                      key={idx} 
                                      className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50 hover:border-cyan-500/30 transition-colors"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: idx * 0.03 }}
                                    >
                                      {item}
                                    </motion.span>
                                  ))}
                                </div>
                              ) : typeof value === 'object' ? (
                                <div className="space-y-3 p-2">
                                  {Object.entries(value).map(([subKey, subValue]) => (
                                    <div key={subKey} className="bg-slate-700/40 rounded-md p-3">
                                      <h6 className="text-cyan-300 font-medium mb-2 border-b border-slate-600/30 pb-1">
                                        {subKey.split('_')
                                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                          .join(' ')}
                                      </h6>
                                      <div className="pl-2">
                                        {Array.isArray(subValue) ? (
                                          <div className="flex flex-wrap gap-1.5">
                                            {(subValue as string[]).map((item, idx) => (
                                              <span key={idx} className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50 hover:border-cyan-500/30 transition-colors">
                                                {item}
                                              </span>
                                            ))}
                                          </div>
                                        ) : typeof subValue === 'object' ? (
                                          <pre className="text-xs bg-slate-700/50 p-3 rounded overflow-x-auto border border-slate-600/30">
                                            {JSON.stringify(subValue, null, 2)}
                                          </pre>
                                        ) : (
                                          <span className="px-2.5 py-1 bg-slate-700/70 rounded-full text-xs border border-slate-600/50">
                                            {String(subValue)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-2">
                                  <span className="px-2.5 py-1 bg-slate-700/70 rounded-full border border-slate-600/50">
                                    {String(value)}
                                  </span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Glow accent */}
      <div className="absolute bottom-6 right-6 w-3 h-3 bg-cyan-500 rounded-full opacity-50 blur-sm"></div>
      <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
    </motion.div>
  );
} 


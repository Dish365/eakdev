export const projects = [
  {
    id: '1',
    title: 'DISH Research Platform',
    description: 'A comprehensive suite of nutrition and environmental impact assessment tools for research. The platform provides multiple calculators and tools to help researchers make informed decisions about nutrition and its impact on health and the environment.',
    technologies: [
      'React 18',
      'Material UI 6',
      'Django 5.1',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Recharts',
      'React Router',
      'Axios',
      'NumPy',
      'Pandas',
      'OpenAI'
    ],
    imageUrl: '/projects/dish-research.png',
    demoUrl: 'https://research.ecodish365.com/',
    categories: ['Full Stack', 'Research', 'DevOps'],
    featured: true,
    displayOrder: 2,
    features: {
      technical: [
        'Health Star Rating (HSR) Calculator with real-time computation',
        'Food Consumption Score (FCS) Calculator with data validation',
        'Health and Environmental Nutritional Index (HENI) with AI-powered analysis',
        'Environmental Impact Calculator with advanced metrics',
        'Net Health Impact Calculator with predictive modeling',
        'Canadian Nutrient File Database Manager with fuzzy search'
      ],
      data_processing: [
        'Advanced data processing with NumPy and Pandas',
        'Real-time data validation and transformation',
        'Fuzzy matching for food item identification',
        'Multi-language support with deep-translator',
        'Automated data pipeline with watchdog'
      ],
      system: [
        'REST API with Django 5.1',
        'PostgreSQL database integration',
        'CORS support for cross-origin requests',
        'Gunicorn production server',
        'Real-time websocket updates'
      ]
    },
    architecture: {
      frontend: [
        'React 18.3.1',
        'Material UI 6.0.0',
        'React Router 6.26.2',
        'Recharts 2.12.7',
        'Axios 1.7.5',
        'React Window',
        'React Helmet',
        'Emotion Styled Components'
      ],
      backend: [
        'Django 5.1.1',
        'Django REST Framework 3.15.2',
        'PostgreSQL with psycopg2-binary',
        'NumPy 2.1.1',
        'Pandas 2.2.2',
        'OpenAI 1.46.1',
        'Gunicorn 23.0.0',
        'WebSockets 12.0'
      ],
      cloud: {
        provider: 'AWS',
        services: ['EC2', 'RDS', 'S3', 'CloudFront', 'Route53'],
        deployment: 'Docker containers with CI/CD pipeline'
      },
      data_processing: {
        core: [
          'NumPy for numerical computations',
          'Pandas for data manipulation',
          'FuzzyWuzzy for string matching',
          'Deep-translator for multi-language support'
        ],
        automation: [
          'Watchdog for automated file monitoring',
          'Pika for message queue integration',
          'Backtrader for data analysis'
        ],
        security: [
          'PyCryptodome for encryption',
          'JWT authentication',
          'CORS headers'
        ]
      }
    }
  },
  {
    id: '2',
    title: 'Life Expectancy & Water Share Predictor',
    description: 'An advanced machine learning platform for predicting and simulating life expectancy and agricultural water share based on food system indicators. Features interactive scenario building with both linear and exponential simulation capabilities for sustainable food system planning.',
    technologies: [
      'Next.js 15',
      'React 18',
      'TypeScript',
      'TailwindCSS',
      'Django 5.1',
      'TensorFlow',
      'Bidirectional LSTM',
      'Recharts',
      'React Hook Form',
      'Zod',
      'Radix UI',
      'Framer Motion'
    ],
    imageUrl: '/projects/fsroas.jpg',
    demoUrl: 'https://fsroas.com/',
    categories: ['Full Stack', 'AI/ML', 'Research', 'UX/UI'],
    featured: true,
    displayOrder: 3,
    features: {
      simulation: [
        'Interactive life expectancy simulation based on food system changes',
        'Agricultural water share prediction and scenario planning',
        'Linear and exponential simulation capabilities',
        'Customizable time intervals and baseline years',
        'Key feature impact visualization with comparative analysis'
      ],
      frontend: [
        'Modern UI with Radix components and TailwindCSS',
        'Interactive data visualization with Recharts',
        'Form validation with React Hook Form and Zod',
        'Responsive design for all device sizes',
        'Motion effects with Framer Motion'
      ],
      backend: [
        'Bidirectional LSTM models for time-series predictions',
        'Customized TensorFlow models with correlation coefficient metrics',
        'Comprehensive API endpoints for predictions and simulations',
        'Data preprocessing with feature scaling and sequence handling',
        'High-performance Django REST API with optimized model loading'
      ]
    },
    architecture: {
      frontend: [
        'Next.js 15.0.3 with TypeScript',
        'React 18.2 with React Hook Form',
        'TailwindCSS for styling',
        'Radix UI component library',
        'Recharts for data visualization',
        'Zod for schema validation'
      ],
      backend: [
        'Django 5.1.3 with DRF',
        'TensorFlow with custom LSTM architecture',
        'Correlation coefficient as custom metric',
        'Joblib for model serialization',
        'Gunicorn production server with Nginx',
        'Secure HTTPS with modern SSL configuration'
      ],
      deployment: {
        server: 'Nginx with HTTP/2 and TLS 1.3',
        security: [
          'HSTS implementation',
          'Content security policy',
          'XSS protection headers',
          'CORS configuration'
        ],
        environment: 'Docker containerization with environment isolation'
      },
      ml_architecture: {
        models: [
          'Life expectancy prediction model (Bidirectional LSTM)',
          'Agricultural water share prediction model (Bidirectional LSTM)',
          'Feature scaling with standardization',
          'Sequence processing for time-series data'
        ],
        features: [
          'Food production index',
          'Land productivity index',
          'Food system components (cereals, fruits, vegetables, etc.)',
          'Energy use metrics',
          'Renewable energy adoption'
        ]
      }
    }
  },
  {
    id: '3',
    title: 'Pathfinders Gifts',
    description: 'A comprehensive motivational gift discovery platform built with Next.js, Django, and FastAPI. Features include personalized gift assessments, career alignment tools, and ministry development resources. The system uses advanced algorithms to analyze motivational gifts based on Romans 12:6-8.',
    technologies: [
      'Next.js 14.1',
      'Django 4.2',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'TailwindCSS 3.4',
      'TypeScript',
      'Radix UI',
      'Zod'
    ],
    imageUrl: '/projects/pathfinders-gifts.png',
    demoUrl: 'https://pathfindersgifts.com/',
    categories: ['Full Stack', 'AI/ML', 'DevOps'],
    featured: true,
    displayOrder: 3,
    features: {
      assessment: [
        'Motivational gift analysis based on Romans 12:6-8',
        'Real-time assessment progress tracking',
        'Personalized gift descriptions and insights',
        'Ministry role recommendations',
        'Career alignment suggestions'
      ],
      technical: [
        'Type-safe API with Pydantic models',
        'Advanced gift calculation algorithms',
        'Protected routes with middleware',
        'Form validation with Zod and React Hook Form',
        'Comprehensive test coverage with pytest'
      ],
      user_experience: [
        'Modern UI with Radix components',
        'Dark mode support',
        'Toast notifications with Sonner',
        'Responsive design with TailwindCSS',
        'Client-side form validation'
      ]
    },
    architecture: {
      frontend: [
        'Next.js 14.1.0',
        'React 18.2.0',
        'TypeScript 5.3',
        'TailwindCSS 3.4.1',
        'Radix UI Components',
        'React Hook Form 7.54.2',
        'Zod Schema Validation',
        'Axios 1.7.9'
      ],
      backend: [
        'Django 4.2.0',
        'FastAPI 0.68.0',
        'PostgreSQL with psycopg2 2.9.1',
        'Redis 4.0.0',
        'Gunicorn 20.1.0',
        'Django REST Framework 3.14.0',
        'Pytest 8.3.4 with Coverage'
      ],
      cloud: {
        provider: 'AWS',
        services: ['EC2', 'RDS', 'ElastiCache', 'CloudFront', 'ACM'],
        deployment: 'Nginx reverse proxy with Gunicorn'
      },
      testing: {
        backend: [
          'Pytest with Django integration',
          'Async test support',
          'Mock testing',
          'Coverage reporting',
          'API endpoint testing'
        ],
        frontend: [
          'TypeScript type checking',
          'ESLint configuration',
          'Next.js middleware testing',
          'Form validation testing'
        ]
      }
    }
  },
  {
    id: '4',
    title: 'Pea Protein Analysis System',
    description: 'Advanced pea protein extraction analysis platform integrating technical process optimization, economic feasibility assessment, and environmental impact evaluation.',
    technologies: [
      'Python',
      'Rust',
      'Django',
      'React',
      'TensorFlow',
      'Scikit-learn',
      'AWS',
      'Docker'
    ],
    imageUrl: '/projects/pea-protein-process.png',
    demoUrl: 'https://proteinprocess.io',
    categories: ['Full Stack', 'Research', 'AI/ML', 'DevOps'],
    featured: true,
    displayOrder: 1,
    features: {
      technical: [
        'Protein recovery optimization',
        'Particle size distribution analysis',
        'Separation efficiency monitoring',
        'RF treatment process validation',
        'Process performance tracking and optimization'
      ],
      economic: [
        'Monte Carlo simulation ',
        'Profitability modeling and optimization',
        'Sensitivity analysis',
        'Equipment efficiency optimization',
        'Cost structure and break-even analysis',
        'Working capital and financial modeling'
      ],
      environmental: [
        'Environmental impact assessment',
        'Resource allocation optimization',
        'Energy consumption tracking',
        'Water usage optimization',
        'Process efficiency analysis'
      ]
    },
    architecture: {
      frontend: [
        'Next.js 14.1',
        'React 18.3',
        'TypeScript',
        'TailwindCSS',
        'Shadcn UI',
        'Framer Motion',
        'Recharts',
        'React Query',
        'React Hook Form',
        'Zod',
        'Radix UI'
      ],
      backend: [
        'Django 5.1',
        'FastAPI',
        'Celery',
        'Redis',
        'PostgreSQL',
        'Django REST Framework',
        'JWT Authentication',
        'Pytest',
        'Pandas',
        'NumPy',
        'SciPy'
      ],
      cloud: {
        provider: 'AWS',
        services: ['EC2', 'S3', 'RDS', 'CloudWatch'],
        deployment: 'Docker containers with auto-scaling'
      },
      analysis_modules: {
        technical: {
          protein_analysis: {
            metrics: ['Recovery rate', 'Protein loss', 'Concentration factor'],
            validation: ['Process efficiency', 'Yield gap assessment'],
            monitoring: ['Real-time performance tracking', 'Quality control']
          },
          separation: {
            metrics: ['Separation factor', 'Protein enrichment', 'Component recovery'],
            parameters: ['Moisture impact', 'Cumulative efficiency'],
            optimization: ['Process parameters', 'Yield optimization']
          },
          particle: {
            analysis: ['Size distribution', 'Surface area calculations'],
            monitoring: ['Moisture content', 'Statistical analysis'],
            validation: ['Quality metrics', 'Process validation']
          }
        },
        economic: {
          simulation: ['Monte Carlo engine', 'Risk assessment'],
          analysis: ['Cost modeling', 'Break-even calculation'],
          optimization: ['Resource allocation', 'Efficiency modeling']
        },
        environmental: {
          impact: ['GWP calculation', 'HCT assessment', 'FRS evaluation'],
          resources: ['Energy tracking', 'Water optimization'],
          efficiency: ['Process optimization', 'Resource utilization']
        }
      }
    }
  },
  {
    id: '5',
    title: 'Personal Website - ectsyawo.com',
    description: 'A minimalist, content-focused personal website designed to establish thought leadership in food systems and secure speaking engagements. Built with Next.js, Sanity CMS, and modern web technologies.',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel',
      'Radix UI',
      'Embla Carousel',
      'Resend'
    ],
    imageUrl: '/projects/ectsyawo-personal-website.png',
    demoUrl: 'https://ectsyawo.com',
    categories: ['Full Stack', 'DevOps'],
    featured: false,
    displayOrder: 4,
    features: {
      design: [
        'Minimalist aesthetic with black, white, and sage green accent color',
        'Professional yet approachable brand voice',
        'Strategic white space and clear visual hierarchy',
        'Mobile-first responsive design approach',
        'Fast loading times with optimized assets'
      ],
      content: [
        'Structured content management with Sanity CMS',
        'Thought leadership insights section',
        'Speaking services and booking system',
        'Research timeline and academic portfolio',
        'Testimonials and social proof integration'
      ],
      technical: [
        'SEO optimization with meta tags and structured data',
        'Analytics integration for visitor tracking',
        'Email integration with pre-filled subjects',
        'Sitemap generation and robots.txt configuration',
        'SSL certification and security best practices'
      ]
    },
    architecture: {
      frontend: [
        'Next.js 15.1.7',
        'React 19.0.0',
        'TypeScript',
        'Tailwind CSS',
        'Radix UI Components',
        'Embla Carousel',
        'Shadcn UI'
      ],
      backend: [
        'Sanity CMS',
        'Next.js API Routes',
        'Resend Email Service',
        'Vercel Serverless Functions'
      ],
      cloud: {
        provider: 'Vercel',
        services: ['Hosting', 'Analytics', 'Speed Insights', 'Serverless Functions'],
        deployment: 'Continuous deployment with GitHub integration'
      },
      development: {
        phases: [
          'Phase 1: Core Website (Home, Speaking)',
          'Phase 2: Content Integration (Insights, Research)',
          'Phase 3: Advanced Features (Booking, Newsletter)'
        ],
        maintenance: [
          'Weekly content updates',
          'Monthly analytics review',
          'Quarterly performance audit',
          'Annual design review'
        ]
      }
    }
  }
];

export const personalInfo = {
  name: 'Emmanuel Amankrah KWOFIE',
  title: 'Full Stack Developer & Cloud Architect',
  email: 'amankrahkwofie354@gmail.com',
  summary: 'Research-to-software engineer specializing in converting scientific concepts into high-performance systems. Expert in building automation solutions, responsive UX/UI, and cloud-native applications for research and analytics. Focused on sustainable food systems through cutting-edge web technologies and efficient algorithms.',
  socialLinks: {
    github: ['https://github.com/Amankrah', 'https://github.com/Dish365'],
    linkedin: 'https://www.linkedin.com/in/eakwofie/',
  },
  skills: {
    programming: ['Python', 'Rust', 'Solidity', 'TypeScript', 'CSS', 'HTML'],
    professional: [
      'Cross-functional teamwork',
      'Project management',
      'Technical communication',
      'Research translation',
      'System architecture',
      'Performance optimization',
    ],
    technical: [
      'Machine Learning',
      'DevOps',
      'Automation Engineering', 
      'High-Performance Systems',
      'UX/UI Design',
    ],
  },
  experience: [
    {
      title: 'Software Engineer',
      company: 'SASEL Lab McGill',
      period: 'Jun. 2024 – present',
      responsibilities: [
        'Implementing full-stack development for robust, user-friendly applications',
        'Developing custom software solutions for specific use cases and stakeholders',
        'Translating complex research into practical impactful software tools',
      ],
    },
  ],
}; 
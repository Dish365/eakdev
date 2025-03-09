'use client';

import { Section } from '../ui/Section';
import { FaCode, FaCloud, FaChartLine, FaFlask, FaBrain, FaServer, FaLeaf, FaHeartbeat, FaAppleAlt, FaCogs } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  technologies: string[];
  useCases?: string[];
}

const services: Service[] = [
  {
    id: 'health-tech',
    title: 'Health & Nutrition AI Systems',
    description: 'Specialized AI solutions that transform nutrition science into actionable digital tools. From predictive health models to nutritional assessment platforms, I build systems that make nutritional science accessible and impactful.',
    icon: FaHeartbeat,
    technologies: ['TensorFlow', 'LSTM Neural Networks', 'React', 'Next.js', 'Django', 'FastAPI'],
    useCases: [
      'Nutritional assessment tools with AI-powered recommendations',
      'Health outcome prediction based on dietary patterns',
      'Personalized nutrition planning systems',
      'Clinical decision support for nutritional interventions'
    ]
  },
  {
    id: 'sustainable-systems',
    title: 'Sustainable Food System Analytics',
    description: 'Custom software that measures, analyzes, and optimizes food systems for sustainability. By combining environmental metrics with powerful visualizations, I help researchers and organizations make data-driven decisions for a more sustainable food future.',
    icon: FaLeaf,
    technologies: ['Python', 'Machine Learning', 'Interactive Visualization', 'Time-series Analysis', 'React', 'Django'],
    useCases: [
      'Environmental impact assessment of food production methods',
      'Scenario planning for sustainable food systems',
      'Food production efficiency optimization tools',
      'Supply chain sustainability analytics dashboards'
    ]
  },
  {
    id: 'research-software',
    title: 'Research-to-Production AI Pipelines',
    description: 'End-to-end AI implementation services that transform academic research into production-ready systems. I specialize in bridging the gap between cutting-edge nutrition/health research and practical software applications.',
    icon: FaBrain,
    technologies: ['TensorFlow', 'PyTorch', 'MLOps', 'Cloud Deployment', 'API Development', 'Data Processing'],
    useCases: [
      'Converting research models into user-friendly applications',
      'Deploying machine learning models at scale',
      'Building automated research data pipelines',
      'Creating interactive research visualization tools'
    ]
  },
  {
    id: 'sports-fitness',
    title: 'Sports & Fitness Tech Solutions',
    description: 'Custom software solutions for sports science, physiotherapy, and fitness applications. Leveraging my background in sports science, I create digital tools that enhance athletic performance, improve recovery, and optimize training.',
    icon: FaAppleAlt,
    technologies: ['Mobile Development', 'Wearable Integration', 'Data Analytics', 'Machine Learning', 'React Native'],
    useCases: [
      'Athletic performance tracking and analysis systems',
      'Recovery monitoring and optimization platforms',
      'Training program personalization tools',
      'Biomechanical analysis applications'
    ]
  },
  {
    id: 'scientific-software',
    title: 'Scientific Software Systems',
    description: 'Specialized software tools for scientific research in nutrition, health, and environmental domains. I build custom applications that streamline research workflows, enhance data analysis, and improve collaboration.',
    icon: FaFlask,
    technologies: ['Python', 'R', 'Statistical Analysis', 'Data Visualization', 'Research Methods'],
    useCases: [
      'Custom research data collection platforms',
      'Advanced statistical analysis tools',
      'Research collaboration platforms',
      'Automated literature review and meta-analysis systems'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'Food System Simulation & Modeling',
    description: 'Advanced simulation tools that model complex food systems and predict outcomes across health, environmental, and economic dimensions. I specialize in creating interactive systems that enable scenario testing and evidence-based decision making.',
    icon: FaCogs,
    technologies: ['System Dynamics', 'Monte Carlo Simulation', 'Interactive Visualization', 'Time-series Forecasting'],
    useCases: [
      'Food system resilience modeling and testing',
      'Multi-dimensional impact assessment tools',
      'Policy intervention simulation platforms',
      'Regional food system optimization tools'
    ]
  }
];

export function ServicesSection() {
  return (
    <Section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming nutrition science, health research, and environmental data into powerful digital solutions at the intersection of AI and sustainable food systems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                id={service.id}
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full scroll-mt-20"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-6">
                  <Icon size={24} color="white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                
                {service.useCases && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Use Cases:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-20 bg-gray-50 p-10 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose My Specialized Approach?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg text-gray-900 mb-3">Unique Expertise Combination</h4>
              <p className="text-gray-600">
                My background spans nutrition science, sports physiology, AI engineering, and full-stack development—a rare combination that allows me to understand both the science and the technology needed to build impactful solutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg text-gray-900 mb-3">Research-Driven Development</h4>
              <p className="text-gray-600">
                I specialize in translating complex research into accessible applications, bridging the gap between academic findings and practical tools that create real-world impact.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg text-gray-900 mb-3">End-to-End Implementation</h4>
              <p className="text-gray-600">
                From initial concept and data analysis to user experience design and deployment, I provide complete solutions that turn nutrition and sustainability goals into functioning digital systems.
              </p>
            </div>
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-8">
            Looking for specialized solutions at the intersection of nutrition, health, and technology?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </Section>
  );
} 
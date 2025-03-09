'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/features/ContactForm';
import { FaEnvelope, FaLinkedin, FaGithub, FaFlask, FaLeaf, FaHeartbeat, FaCode, FaBrain, FaLock } from 'react-icons/fa';
import { personalInfo } from '@/data/projects';

interface ProjectType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export default function ContactPage() {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  
  const projectTypes: ProjectType[] = [
    {
      id: 'health-tech',
      label: 'Health & Nutrition Tech',
      description: 'Projects related to nutrition science, health analysis, or fitness applications',
      icon: <div className="text-red-500"><FaHeartbeat size={24} /></div>
    },
    {
      id: 'sustainable-systems',
      label: 'Sustainable Food Systems',
      description: 'Projects related to sustainability analysis, environmental impact, or food system modeling',
      icon: <div className="text-green-500"><FaLeaf size={24} /></div>
    },
    {
      id: 'research-software',
      label: 'Research Software',
      description: 'Converting academic research or scientific concepts into software applications',
      icon: <div className="text-purple-500"><FaFlask size={24} /></div>
    },
    {
      id: 'ai-solutions',
      label: 'AI/ML Solutions',
      description: 'Machine learning, predictive modeling, or data analysis systems',
      icon: <div className="text-blue-500"><FaBrain size={24} /></div>
    },
    {
      id: 'custom-development',
      label: 'Custom Development',
      description: 'Other custom software development needs',
      icon: <div className="text-gray-700"><FaCode size={24} /></div>
    }
  ];

  const contactInfo = [
    {
      title: 'LinkedIn',
      value: 'Connect Professionally',
      icon: <FaLinkedin size={24} />,
      href: personalInfo.socialLinks.linkedin
    },
    {
      title: 'GitHub',
      value: 'View My Code',
      icon: <FaGithub size={24} />,
      href: personalInfo.socialLinks.github[0]
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      // Add the selected project type to the form data
      const enhancedData = {
        ...data,
        projectType: selectedProjectType,
        // The email address is used here internally but not exposed to users
        recipientEmail: personalInfo.email
      };
      
      // This would typically send the form data to your API
      console.log('Form submitted:', enhancedData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message or redirect
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <main>
      <Section variant="default" spacing="lg" className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking for specialized solutions at the intersection of health, nutrition, and sustainable technology? 
              I'm here to bring your vision to life.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-lg mx-auto">
            {contactInfo.map((info) => (
              <a 
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                key={info.title}
                className="block group"
              >
                <Card variant="hover" className="text-center h-full transition-transform group-hover:scale-105">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          {/* Project Type Selection */}
          <div className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">What type of project are you interested in?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`cursor-pointer border rounded-lg p-4 transition-all 
                    ${selectedProjectType === type.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  onClick={() => setSelectedProjectType(type.id)}
                >
                  <div className="flex items-center mb-2">
                    {type.icon}
                    <h3 className="font-medium ml-2">{type.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card variant="default" className="max-w-2xl mx-auto">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-semibold">Send a Message</h2>
                <div className="ml-2 text-blue-600 flex items-center">
                  <FaLock size={16} />
                  <span className="text-sm ml-1 text-blue-600">Secure Contact</span>
                </div>
              </div>
              <p className="text-gray-600">
                Your message will be delivered directly to my inbox. I'll get back to you within 1-2 business days.
              </p>
            </div>
            <ContactForm onSubmit={handleSubmit} />
          </Card>

          {/* Collaboration Process */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-8 text-center">How We'll Work Together</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <span className="text-lg font-semibold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Initial Consultation</h3>
                <p className="text-sm text-gray-600">We'll discuss your needs, goals, and explore how my expertise can help</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <span className="text-lg font-semibold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Project Planning</h3>
                <p className="text-sm text-gray-600">I'll create a detailed proposal with scope, timeline, and deliverables</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <span className="text-lg font-semibold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Development</h3>
                <p className="text-sm text-gray-600">Transparent development process with regular updates and milestones</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <span className="text-lg font-semibold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Delivery & Support</h3>
                <p className="text-sm text-gray-600">Thorough handover with documentation and ongoing support options</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
} 
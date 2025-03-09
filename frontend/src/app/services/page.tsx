import { Section } from '@/components/ui/Section';
import { ServicesSection } from '@/components/features/ServicesSection';
import { FaFlask, FaLeaf, FaHeartbeat } from 'react-icons/fa';

export default function ServicesPage() {
  return (
    <main>
      <Section variant="default" spacing="lg" className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Health Tech & Sustainable Food Systems</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Specialized software solutions at the intersection of nutrition science, health technology, 
            and environmental sustainability.
          </p>
          
          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500">
              <div className="flex justify-center mb-4 text-blue-500">
                <FaFlask size={36} />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Research to Software</h2>
              <p className="text-gray-600 text-center">
                Transforming complex scientific research into intuitive, powerful software applications
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-green-500">
              <div className="flex justify-center mb-4 text-green-500">
                <FaLeaf size={36} />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Sustainable Systems</h2>
              <p className="text-gray-600 text-center">
                Building tools that measure, analyze, and optimize food systems for sustainability
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-red-500">
              <div className="flex justify-center mb-4 text-red-500">
                <FaHeartbeat size={36} />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Health Innovation</h2>
              <p className="text-gray-600 text-center">
                Creating digital solutions that enhance health, nutrition, and athletic performance
              </p>
            </div>
          </div>
          
          <ServicesSection />
        </div>
      </Section>
    </main>
  );
} 
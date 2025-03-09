import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    },
    {
      category: 'Backend',
      items: ['Rust', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
    },
    {
      category: 'DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
  ];

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovators',
      period: '2021 - Present',
      description: 'Leading the development of high-performance web applications and microservices.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      period: '2018 - 2021',
      description: 'Developed and maintained multiple client projects using modern web technologies.',
    },
    {
      title: 'Software Developer',
      company: 'StartUp Inc',
      period: '2016 - 2018',
      description: 'Worked on various frontend and backend projects for early-stage startups.',
    },
  ];

  return (
    <main>
      {/* Bio Section */}
      <Section variant="default" spacing="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <div className="mb-8">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6">
            I'm a passionate Full Stack Developer with over 6 years of experience
            in building modern web applications. I specialize in high-performance
            solutions using Rust and React, with a focus on scalable architecture
            and exceptional user experience.
          </p>
          <p className="text-lg text-gray-600">
            When I'm not coding, you can find me contributing to open-source
            projects, writing technical articles, or exploring new technologies.
          </p>
        </div>
      </Section>

      {/* Skills Section */}
      <Section variant="alternate" spacing="lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillSet) => (
              <Card key={skillSet.category} variant="hover">
                <h3 className="text-xl font-semibold mb-4">{skillSet.category}</h3>
                <ul className="space-y-2">
                  {skillSet.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section variant="default" spacing="lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((experience) => (
              <Card key={experience.title} variant="hover">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-gray-600">{experience.company}</p>
                  </div>
                  <div className="text-gray-500">{experience.period}</div>
                </div>
                <p className="text-gray-600">{experience.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
} 
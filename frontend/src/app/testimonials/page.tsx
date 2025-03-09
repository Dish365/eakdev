interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'John Smith',
      role: 'CTO',
      company: 'Tech Innovators Inc.',
      content: 'Working with this developer was an excellent experience. Their expertise in Rust and React helped us build a highly performant application that exceeded our expectations.',
      image: '/testimonials/john.jpg',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Digital Solutions Ltd.',
      content: 'The attention to detail and commitment to code quality was impressive. Our project was delivered on time and with excellent documentation.',
      image: '/testimonials/sarah.jpg',
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Founder',
      company: 'StartupX',
      content: "The developer's knowledge of cloud architecture helped us scale our application efficiently. They provided valuable insights throughout the development process.",
      image: '/testimonials/michael.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Testimonials Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear what clients have to say about their experience working with me.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-sm p-8 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-blue-100">
              <svg
                className="h-16 w-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="relative">
              <p className="text-gray-600 mb-6 italic">{`"${testimonial.content}"`}</p>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600" />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Company Logos */}
      <div className="mt-20 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Companies I've Worked With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company) => (
            <div
              key={company}
              className="h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400"
            >
              {company} Logo
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
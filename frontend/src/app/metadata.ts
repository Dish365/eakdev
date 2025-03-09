import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'EAK Development - Full Stack Development Services',
    template: '%s | EAK Development'
  },
  description: 'Professional full-stack development services specializing in modern web applications, cloud solutions, and enterprise software.',
  keywords: ['web development', 'full stack', 'software engineering', 'cloud solutions', 'React', 'Next.js', 'Rust'],
  authors: [{ name: 'EAK Development' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eakdev.com',
    title: 'EAK Development - Full Stack Development Services',
    description: 'Professional full-stack development services specializing in modern web applications.',
    siteName: 'EAK Development'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EAK Development - Full Stack Development Services',
    description: 'Professional full-stack development services specializing in modern web applications.',
    creator: '@eakdev'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
}; 
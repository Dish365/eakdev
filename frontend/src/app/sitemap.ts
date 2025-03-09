import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // You would typically fetch this data from your API/database
  const routes = [
    '',
    '/about',
    '/projects',
    '/contact',
    '/services',
  ]

  return [
    ...routes.map((route) => ({
      url: `https://eakdev.com${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  ]
} 
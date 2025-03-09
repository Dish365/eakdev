import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${request.nextUrl.origin}/sitemap.xml
`.trim()

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 
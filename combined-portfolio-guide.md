# Developer Portfolio Website Build Guide - Using Production Template

## Phase 1: Project Setup Using Template1 Structure

### 1.1. Initial Project Structure
```prompt
Using the structure from template1.md, help me set up a new project with these specific folders and files:

Backend (/backend):
1. Set up the exact folder structure:
   - src/api/ (for portfolio data endpoints)
   - src/config/ (for site configuration)
   - src/db/ (for portfolio database models)
   - src/error/ (for error handling)
   - src/middleware/ (for performance and caching)
   - src/models/ (for portfolio content models)
   - src/services/ (for content management)
   - src/telemetry/ (for monitoring)
   - src/utils/ (for helper functions)

Frontend (/frontend):
1. Set up the Next.js structure as specified:
   - src/app/ (for portfolio pages)
   - src/components/ui/ (for reusable UI components)
   - src/components/features/ (for portfolio sections)
   - src/hooks/ (for custom React hooks)
   - src/lib/ (for utilities)
   - src/styles/ (for global styles)
   - src/types/ (for TypeScript definitions)

Please provide the complete setup commands and initial configuration files.
```

### 1.2. Essential Website Sections Setup
```prompt
Following the developer-website-guide.md, help me create the initial components and routes for:

1. Homepage (Above the Fold):
   - Create pages/layout.tsx with hero section
   - Implement professional intro component
   - Add CTA button component

2. About Section:
   - Create about page component
   - Set up skills and experience components
   - Implement education section

3. Services Section:
   - Create services grid component
   - Implement tech stack showcase
   - Add methodology section

4. Portfolio Section:
   - Create project grid component
   - Implement project detail page
   - Add image gallery component

5. Testimonials Section:
   - Create testimonials carousel
   - Implement client feedback component
   - Add company showcase

6. Contact Section:
   - Create contact form component
   - Implement social links
   - Add availability status

Please provide the complete component code following the template structure.
```

### 1.3. Database and Content Structure
```prompt
Help me set up the database structure for portfolio content using the template1.md backend structure:

1. Create migrations for:
   - Projects table
   - Testimonials table
   - Contact submissions table
   - Services table
   - Skills table

2. Implement models for:
   - Portfolio projects
   - Testimonials
   - Contact form
   - Services
   - Skills

3. Set up Redis caching for:
   - Portfolio data
   - Page content
   - Contact form rate limiting

Please provide the complete SQL migrations and Rust models.
```

## Phase 2: Backend Implementation

### 2.1. API Implementation (Following Template1)
```prompt
Help me implement these API endpoints using the template1.md structure:

1. Portfolio Data APIs:
   - GET /api/projects
   - GET /api/projects/:id
   - GET /api/testimonials
   - GET /api/services
   - POST /api/contact

2. Implement the following services:
   - ProjectService
   - TestimonialService
   - ContactService
   - ContentService

3. Set up error handling for:
   - Invalid requests
   - Rate limiting
   - Server errors

Please provide the complete Rust implementation following the template structure.
```

### 2.2. Performance Optimization
```prompt
Following both templates, implement:

1. Caching Layer:
   - Redis caching implementation
   - Static asset caching
   - API response caching

2. Image Optimization:
   - Image processing middleware
   - Lazy loading implementation
   - CDN configuration

3. Performance Monitoring:
   - Telemetry setup
   - Metrics collection
   - Performance logging

Please provide the complete implementation code.
```

## Phase 3: Frontend Implementation

### 3.1. Component Development
```prompt
Following template1.md's frontend structure, help me create:

1. UI Components (/components/ui):
   - Button.tsx
   - Card.tsx
   - Section.tsx
   - Navigation.tsx
   - Footer.tsx

2. Feature Components (/components/features):
   - Hero.tsx
   - ProjectGrid.tsx
   - TestimonialSlider.tsx
   - ServicesList.tsx
   - ContactForm.tsx

3. Layout Components:
   - MainLayout.tsx
   - ProjectLayout.tsx
   - BlogLayout.tsx (if needed)

Please provide the complete React/TypeScript code with Tailwind CSS styling.
```

### 3.2. Page Implementation
```prompt
Create the following pages using Next.js app router:

1. Main Pages:
   - app/page.tsx (Homepage)
   - app/about/page.tsx
   - app/projects/page.tsx
   - app/projects/[id]/page.tsx
   - app/contact/page.tsx

2. Static Generation:
   - Project pages
   - Service pages
   - Blog pages (if included)

3. Dynamic Features:
   - Contact form handling
   - Project filtering
   - Image galleries

Please provide the complete Next.js implementation.
```

## Phase 4: Technical Requirements Implementation

### 4.1. SEO & Performance
```prompt
Implement the technical requirements from developer-website-guide.md:

1. SEO Setup:
   - Meta tags implementation
   - Schema markup
   - Sitemap generation
   - Robots.txt configuration

2. Performance:
   - Lazy loading
   - Image optimization
   - Code splitting
   - Bundle optimization

3. Analytics:
   - Google Analytics setup
   - Performance monitoring
   - User behavior tracking

Please provide the complete implementation code.
```

### 4.2. Mobile & Accessibility
```prompt
Implement responsive design and accessibility features:

1. Mobile Optimization:
   - Responsive layouts
   - Touch-friendly elements
   - Mobile performance

2. Accessibility:
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

3. Cross-browser Testing:
   - Browser compatibility
   - Responsive testing
   - Performance testing

Please provide the complete implementation code.
```

## Phase 5: Deployment Configuration

### 5.1. AWS Setup (Using Template1 Configuration)
```prompt
Help me set up AWS infrastructure using the template1.md Terraform configs:

1. Base Infrastructure:
   - VPC setup
   - EKS cluster
   - RDS instance
   - ElastiCache
   - S3 bucket

2. CDN Setup:
   - CloudFront configuration
   - SSL certificate
   - Cache policies

3. Domain Configuration:
   - Route53 setup
   - DNS configuration
   - SSL setup

Please provide the complete Terraform configuration.
```

### 5.2. CI/CD Pipeline
```prompt
Help me set up the CI/CD pipeline using template1's GitHub Actions:

1. Build Pipeline:
   - Frontend build
   - Backend build
   - Docker image creation

2. Test Pipeline:
   - Unit tests
   - Integration tests
   - E2E tests

3. Deployment Pipeline:
   - AWS deployment
   - Database migrations
   - Cache invalidation

Please provide the complete GitHub Actions configuration.
```

## Usage Guidelines

1. Follow the template1.md structure strictly
2. Implement features from developer-website-guide.md
3. Focus on performance and SEO
4. Maintain clean code organization
5. Follow best practices for both Rust and Next.js

## Development Workflow

1. Set up local development environment
2. Implement features incrementally
3. Test thoroughly at each step
4. Optimize for performance
5. Deploy and monitor

## Best Practices

1. Follow Rust and Next.js conventions
2. Maintain type safety throughout
3. Optimize for performance from the start
4. Implement proper error handling
5. Maintain comprehensive documentation

Remember: This guide combines the robust architecture of template1.md with the portfolio requirements from developer-website-guide.md to create a professional, high-performance developer portfolio website.
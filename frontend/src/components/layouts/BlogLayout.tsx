import { ReactNode } from 'react';
import { Section } from '../ui/Section';
import { OptimizedImage } from '../ui/OptimizedImage';

interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
}

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  author: BlogAuthor;
  coverImage?: string;
  tags: string[];
}

interface BlogLayoutProps extends BlogPost {
  children: ReactNode;
  nextPost?: {
    title: string;
    href: string;
  };
  previousPost?: {
    title: string;
    href: string;
  };
}

export function BlogLayout({
  children,
  title,
  description,
  date,
  readingTime,
  author,
  coverImage,
  tags,
  nextPost,
  previousPost,
}: BlogLayoutProps) {
  return (
    <article className="min-h-screen" itemScope itemType="http://schema.org/BlogPosting">
      {/* Header */}
      <Section variant="default" spacing="lg">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          {/* Tags */}
          <div 
            className="flex flex-wrap justify-center gap-2 mb-6"
            role="list"
            aria-label="Article tags"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                role="listitem"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            itemProp="headline"
          >
            {title}
          </h1>
          <p 
            className="text-lg sm:text-xl text-gray-600 mb-8"
            itemProp="description"
          >
            {description}
          </p>

          {/* Meta Information */}
          <div 
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600"
            aria-label="Article metadata"
          >
            <time dateTime={new Date(date).toISOString()} itemProp="datePublished">
              {date}
            </time>
            <span aria-hidden="true">•</span>
            <span>{readingTime} read</span>
          </div>

          {/* Author */}
          <div 
            className="flex items-center justify-center mt-6"
            itemProp="author"
            itemScope
            itemType="http://schema.org/Person"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12">
              <OptimizedImage
                src={author.avatar}
                alt={`${author.name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="ml-3 text-left">
              <div 
                className="font-medium text-gray-900"
                itemProp="name"
              >
                {author.name}
              </div>
              <div 
                className="text-sm sm:text-base text-gray-600"
                itemProp="jobTitle"
              >
                {author.role}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-48 sm:h-64 md:h-96 mb-8 sm:mb-12">
          <OptimizedImage
            src={coverImage}
            alt={`Cover image for ${title}`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <Section variant="default" spacing="lg">
        <div 
          className="max-w-3xl mx-auto prose prose-sm sm:prose-base lg:prose-lg px-4 sm:px-6"
          itemProp="articleBody"
        >
          {children}
        </div>
      </Section>

      {/* Post Navigation */}
      {(previousPost || nextPost) && (
        <Section variant="alternate" spacing="lg">
          <nav 
            className="max-w-3xl mx-auto border-t border-gray-200 px-4 sm:px-6"
            aria-label="Blog post navigation"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 sm:py-8 gap-4 sm:gap-0">
              {previousPost ? (
                <div>
                  <div className="text-sm text-gray-500" id="previous-post-label">
                    Previous Post
                  </div>
                  <a
                    href={previousPost.href}
                    className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 focus:outline-none focus:underline"
                    aria-labelledby="previous-post-label"
                  >
                    {previousPost.title}
                  </a>
                </div>
              ) : (
                <div />
              )}

              {nextPost ? (
                <div className="sm:text-right">
                  <div className="text-sm text-gray-500" id="next-post-label">
                    Next Post
                  </div>
                  <a
                    href={nextPost.href}
                    className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 focus:outline-none focus:underline"
                    aria-labelledby="next-post-label"
                  >
                    {nextPost.title}
                  </a>
                </div>
              ) : (
                <div />
              )}
            </div>
          </nav>
        </Section>
      )}

      {/* Share Buttons */}
      <Section variant="default" spacing="lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center space-x-4 mb-12">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Share on Twitter"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Share on LinkedIn"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-8">Comments</h2>
            <div className="text-center text-gray-600">
              Comments are currently disabled.
            </div>
          </div>
        </div>
      </Section>
    </article>
  );
} 
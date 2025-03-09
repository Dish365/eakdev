'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/Card';
import { OptimizedImage } from '../ui/OptimizedImage';

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  imageUrl?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export function TestimonialSlider({
  testimonials,
  autoPlayInterval = 5000,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }, [testimonials.length]);

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Testimonials slider"
    >
      {/* Testimonial Cards */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-full flex-shrink-0"
              role="tabpanel"
              aria-labelledby={`testimonial-${index}`}
              hidden={currentIndex !== index}
            >
              <Card className="mx-auto max-w-2xl">
                <div className="p-4 sm:p-8">
                  {/* Quote Icon */}
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Testimonial Content */}
                  <blockquote className="text-base sm:text-lg text-gray-700 mb-6">
                    <p>{testimonial.content}</p>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center">
                    {testimonial.imageUrl && (
                      <div className="mr-4 flex-shrink-0">
                        <OptimizedImage
                          src={testimonial.imageUrl}
                          alt={`${testimonial.author}'s profile picture`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm sm:text-base text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:p-3 touch-manipulation"
        aria-label="Previous testimonial"
      >
        <svg
          className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:p-3 touch-manipulation"
        aria-label="Next testimonial"
      >
        <svg
          className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div 
        className="flex justify-center mt-4 space-x-2"
        role="tablist"
        aria-label="Testimonials navigation"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            role="tab"
            id={`testimonial-${index}`}
            aria-selected="true"
            aria-label={`Go to testimonial ${index + 1}`}
            tabIndex={index === currentIndex ? 0 : -1}
          />
        ))}
      </div>
    </div>
  );
} 
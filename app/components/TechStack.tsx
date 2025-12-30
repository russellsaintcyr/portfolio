'use client';

import { useState } from 'react';
import { FaCubes } from 'react-icons/fa';

export default function TechStack() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-12 mb-8 border-t border-gray-200 dark:border-gray-700 pt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        aria-expanded={isExpanded}
        aria-label="Toggle tech stack information"
      >
        <FaCubes className="w-4 h-4 font-bold" />
        <span className="font-bold">Tech Stack</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-4 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Framework & Language:</span>{' '}
            Next.js 16 (App Router) with hybrid rendering (Server-Side Rendering + Client Components), React 19, TypeScript
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Styling:</span>{' '}
            Tailwind CSS with dark mode support, responsive layouts targeting mobile through desktop
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Data-Driven Architecture:</span>{' '}
            JSON configuration for playlists, stats, and metadata; Redis for dynamic content (descriptions and lyrics); extensible design supporting multiple streaming services
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Security:</span>{' '}
            DOMPurify for XSS prevention, timing-safe token validation
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Data Visualization:</span>{' '}
            Recharts for interactive charts and statistics
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Rich Text Editing:</span>{' '}
            React Quill for content management
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Analytics:</span>{' '}
            PostHog for event tracking, Google Analytics integration
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">UI Components:</span>{' '}
            Swiper carousel, custom responsive design
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Performance:</span>{' '}
            Optimized Redis calls, server-side rendering
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Testing:</span>{' '}
            Vitest for unit testing, Playwright for end-to-end testing
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Deployment & Server Actions:</span>{' '}
            Vercel for hosting and server actions
          </div>
        </div>
      )}
    </div>
  );
}


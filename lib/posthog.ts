'use client';

import posthog from 'posthog-js';

export function captureEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      // Check if PostHog is initialized
      if (posthog && typeof posthog.capture === 'function') {
        console.log('PostHog capture event:', eventName, properties);
        posthog.capture(eventName, properties);
      }
    } catch (error) {
      // Silently fail if PostHog is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn('PostHog capture failed:', error);
      }
    }
  }
}


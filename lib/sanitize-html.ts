import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks while preserving safe formatting
 * Uses DOMPurify with a configuration that allows common HTML tags but strips dangerous content
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Configure DOMPurify to allow common HTML tags while preventing XSS
  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'blockquote',
      'span', 'div', 'img'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'src', 'alt'],
    ALLOW_DATA_ATTR: false,
    // Prevent javascript: URLs and other dangerous protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Remove dangerous attributes like onclick, onerror, etc.
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    // Keep relative URLs safe
    KEEP_CONTENT: true,
    // Return DOM nodes for better performance (but we'll convert to string)
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
  };

  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitizes HTML for embed content (like Spotify/YouTube embeds)
 * More permissive to allow iframe tags but still safe
 */
export function sanitizeEmbed(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // For embeds, we need to allow iframe tags but still sanitize attributes
  const config = {
    ALLOWED_TAGS: ['iframe'],
    ALLOWED_ATTR: [
      'src', 'width', 'height', 'frameborder', 'allowfullscreen',
      'allow', 'loading', 'style', 'data-testid'
    ],
    ALLOW_DATA_ATTR: true,
    // Only allow https: URLs for iframe src
    ALLOWED_URI_REGEXP: /^https:/i,
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
    KEEP_CONTENT: false, // iframes are self-contained
  };

  return DOMPurify.sanitize(html, config);
}


'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Top40EditorProps {
  initialContent: string;
  year: number;
  onPreview: (content: string) => void;
  onSave: (content: string) => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export default function Top40Editor({
  initialContent,
  year,
  onPreview,
  onSave,
  onCancel,
  isSaving = false,
}: Top40EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [hasChanges, setHasChanges] = useState(false);
  const localStorageKey = `top40-${year}-description`;

  // Replace &nbsp; entities with regular spaces and remove mark tags and inline background styles
  const cleanHtml = (html: string): string => {
    let cleaned = html
      .replace(/&nbsp;/g, ' ')
      .replace(/<mark[^>]*>/gi, '')
      .replace(/<\/mark>/gi, '');
    
    // Remove background-related styles from style attributes
    cleaned = cleaned.replace(/style="([^"]*)"/gi, (match, styles) => {
      const cleanedStyles = styles
        .split(';')
        .filter((style: string) => {
          const trimmed = style.trim();
          return !trimmed.includes('background') && !trimmed.includes('background-color');
        })
        .join(';')
        .trim();
      return cleanedStyles ? `style="${cleanedStyles}"` : '';
    });
    
    return cleaned;
  };

  useEffect(() => {
    // Always use the latest initialContent when the editor opens
    // Clear localStorage to ensure we start fresh with the latest remote content
    // localStorage will be used again for unsaved changes during this editing session
    localStorage.removeItem(localStorageKey);
    setContent(cleanHtml(initialContent));
    setHasChanges(false);
  }, [initialContent, localStorageKey]);

  const handleChange = (value: string) => {
    setContent(value);
    setHasChanges(true);
  };

  const handlePreview = () => {
    const cleanedContent = cleanHtml(content);
    localStorage.setItem(localStorageKey, cleanedContent);
    onPreview(cleanedContent);
    setHasChanges(false);
  };

  const handleSave = () => {
    const cleanedContent = cleanHtml(content);
    localStorage.setItem(localStorageKey, cleanedContent);
    onSave(cleanedContent);
    setHasChanges(false);
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mb-8">
      <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-xs text-orange-600 dark:text-orange-400">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreview}
            className="px-4 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            type="button"
          >
            Preview
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-1.5 text-sm font-medium bg-gray-600 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              type="button"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            type="button"
          >
            {isSaving && (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          className="min-h-[300px]"
        />
      </div>
    </div>
  );
}

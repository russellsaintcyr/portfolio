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

  useEffect(() => {
    // Load from localStorage if available (for unsaved edits during editing session)
    // Otherwise use the initial content from JSON file
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setContent(saved);
    } else {
      setContent(initialContent);
    }
  }, [localStorageKey, initialContent]);

  const handleChange = (value: string) => {
    setContent(value);
    setHasChanges(true);
  };

  const handlePreview = () => {
    localStorage.setItem(localStorageKey, content);
    onPreview(content);
    setHasChanges(false);
  };

  const handleSave = () => {
    localStorage.setItem(localStorageKey, content);
    onSave(content);
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
            className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            type="button"
          >
            Preview
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-1.5 text-sm font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
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

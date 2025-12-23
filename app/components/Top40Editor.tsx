'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Top40EditorProps {
  initialContent: string;
  year: number;
  onSave: (content: string) => void;
  onExport: (content: string) => void;
  onCopy: (content: string) => void;
  onCancel?: () => void;
}

export default function Top40Editor({
  initialContent,
  year,
  onSave,
  onExport,
  onCopy,
  onCancel,
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

  const handleSave = () => {
    localStorage.setItem(localStorageKey, content);
    onSave(content);
    setHasChanges(false);
  };

  const handleExport = () => {
    onExport(content);
  };

  const handleCopy = () => {
    onCopy(content);
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
            onClick={handleSave}
            className="px-4 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            type="button"
          >
            Save to Browser
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
            onClick={handleExport}
            className="px-4 py-1.5 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            type="button"
          >
            Export JSON
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            type="button"
          >
            Copy JSON
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

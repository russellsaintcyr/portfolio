'use client';

import { useState, useEffect } from 'react';

interface Lyric {
  artist: string;
  song: string;
  text: string;
}

interface LyricsEditorProps {
  initialLyrics: Lyric[];
  year: number;
  onPreview: (lyrics: Lyric[]) => void;
  onSave: (lyrics: Lyric[]) => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export default function LyricsEditor({ initialLyrics, year, onPreview, onSave, onCancel, isSaving = false }: LyricsEditorProps) {
  const [lyrics, setLyrics] = useState<Lyric[]>(initialLyrics);
  const [hasChanges, setHasChanges] = useState(false);
  const localStorageKey = `top40-${year}-lyrics`;

  useEffect(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLyrics(parsed);
      } catch (e) {
        console.error('Failed to parse saved lyrics:', e);
      }
    }
  }, [localStorageKey]);

  const handleAdd = () => {
    setLyrics([...lyrics, { artist: '', song: '', text: '' }]);
    setHasChanges(true);
  };

  const handleDelete = (index: number) => {
    setLyrics(lyrics.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleChange = (index: number, field: keyof Lyric, value: string) => {
    const updated = [...lyrics];
    updated[index] = { ...updated[index], [field]: value };
    setLyrics(updated);
    setHasChanges(true);
  };

  const handlePreview = () => {
    // Convert newlines to <br> tags when saving
    const lyricsWithBreaks = lyrics.map(lyric => ({
      ...lyric,
      text: lyric.text.replace(/\n/g, '<br>')
    }));
    localStorage.setItem(localStorageKey, JSON.stringify(lyricsWithBreaks));
    onPreview(lyricsWithBreaks);
    setHasChanges(false);
  };

  const handleSave = () => {
    // Convert newlines to <br> tags when saving
    const lyricsWithBreaks = lyrics.map(lyric => ({
      ...lyric,
      text: lyric.text.replace(/\n/g, '<br>')
    }));
    localStorage.setItem(localStorageKey, JSON.stringify(lyricsWithBreaks));
    onSave(lyricsWithBreaks);
    setHasChanges(false);
  };

  const handleCancel = () => {
    // Reload from localStorage or initial props
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLyrics(parsed);
      } catch (e) {
        setLyrics(initialLyrics);
      }
    } else {
      setLyrics(initialLyrics);
    }
    setHasChanges(false);
    if (onCancel) {
      onCancel();
    }
  };

  // Convert <br> tags back to newlines for textarea display
  const getTextareaValue = (text: string) => {
    return text.replace(/<br\s*\/?>/gi, '\n');
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-900 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lyrics Editor
        </h3>
        <div className="flex gap-2">
          {hasChanges && (
            <span className="text-xs text-orange-600 dark:text-orange-400 self-center">
              Unsaved changes
            </span>
          )}
          <button
            onClick={handleAdd}
            className="px-3 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            type="button"
          >
            Add Lyric
          </button>
          <button
            onClick={handlePreview}
            className="px-3 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            type="button"
          >
            Preview
          </button>
          {onCancel && (
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm font-medium bg-gray-600 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              type="button"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

      <div className="space-y-4">
        {lyrics.map((lyric, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Lyric {index + 1}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="px-2 py-1 text-xs font-medium bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                type="button"
              >
                Delete
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Artist
                </label>
                <input
                  type="text"
                  value={lyric.artist}
                  onChange={(e) => handleChange(index, 'artist', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Song
                </label>
                <input
                  type="text"
                  value={lyric.song}
                  onChange={(e) => handleChange(index, 'song', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Song title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lyrics
                </label>
                <textarea
                  value={getTextareaValue(lyric.text)}
                  onChange={(e) => handleChange(index, 'text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[100px]"
                  placeholder="Lyrics text (press Enter for line breaks)"
                  rows={5}
                />
              </div>
            </div>
          </div>
        ))}
        {lyrics.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No lyrics yet. Click "Add Lyric" to get started.
          </p>
        )}
      </div>
    </div>
  );
}


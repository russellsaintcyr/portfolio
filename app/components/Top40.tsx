'use client';

import { useEffect, useState } from 'react';
import Top40Editor from './Top40Editor';
import LyricsEditor from './LyricsEditor';
import LyricsCarousel from './LyricsCarousel';

interface Lyric {
  artist: string;
  song: string;
  text: string;
}

interface Top40Data {
  year: number;
  coverImage?: string;
  description: string;
  lyrics?: Lyric[];
  playlists?: {
    spotify?: {
      embed?: string;
    };
    youtube?: {
      embed?: string;
    };
  };
}

interface Top40Props {
  data: Top40Data;
  originalData: Top40Data;
}

export default function Top40({ data, originalData }: Top40Props) {
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [description, setDescription] = useState(data.description);
  const [lyrics, setLyrics] = useState<Lyric[]>(data.lyrics || []);
  const [descriptionKey] = useState(`top40-${data.year}-description`);
  const [lyricsKey] = useState(`top40-${data.year}-lyrics`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setIsLocalhost(hostname === 'localhost' || hostname === '127.0.0.1');

      // Always use JSON file data on initial load
      // localStorage is only used as temporary buffer during active editing
      setDescription(data.description);
      setLyrics(data.lyrics || []);
    }
  }, [data.description, data.lyrics]);

  const handleDescriptionSave = (content: string) => {
    localStorage.setItem(descriptionKey, content);
    setDescription(content);
    setIsEditingDescription(false);
  };

  const handleLyricsSave = (updatedLyrics: Lyric[]) => {
    localStorage.setItem(lyricsKey, JSON.stringify(updatedLyrics));
    setLyrics(updatedLyrics);
    setIsEditingLyrics(false);
  };

  const handleDescriptionExport = (htmlContent: string) => {
    // Get latest lyrics from localStorage
    const savedLyrics = localStorage.getItem(lyricsKey);
    let mergedLyrics = lyrics;
    if (savedLyrics) {
      try {
        mergedLyrics = JSON.parse(savedLyrics);
      } catch (e) {
        console.error('Failed to parse saved lyrics for export:', e);
      }
    }

    const mergedData = {
      ...originalData,
      description: htmlContent,
      lyrics: mergedLyrics,
    };

    const blob = new Blob([JSON.stringify(mergedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.year}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDescriptionCopy = async (htmlContent: string) => {
    // Get latest lyrics from localStorage
    const savedLyrics = localStorage.getItem(lyricsKey);
    let mergedLyrics = lyrics;
    if (savedLyrics) {
      try {
        mergedLyrics = JSON.parse(savedLyrics);
      } catch (e) {
        console.error('Failed to parse saved lyrics for copy:', e);
      }
    }

    const mergedData = {
      ...originalData,
      description: htmlContent,
      lyrics: mergedLyrics,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(mergedData, null, 2));
      alert('JSON copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Top 40 of {data.year}
        </h1>

        {data.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: data.coverImage }} />
          </div>
        )}

        <div className="mb-8">
          {isLocalhost && !isEditingDescription && (
            <button
              onClick={() => setIsEditingDescription(true)}
              className="mb-4 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Edit Description
            </button>
          )}

          {isLocalhost && isEditingDescription ? (
            <Top40Editor
              initialContent={description}
              year={data.year}
              onSave={handleDescriptionSave}
              onExport={handleDescriptionExport}
              onCopy={handleDescriptionCopy}
              onCancel={() => setIsEditingDescription(false)}
            />
          ) : (
            <div
              className="text-gray-900 dark:text-gray-100 [&_*]:max-w-full [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-2 [&_strong]:font-bold [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {isLocalhost && (
          <div className="mb-8">
            {!isEditingLyrics && (
              <button
                onClick={() => setIsEditingLyrics(true)}
                className="mb-4 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Edit Lyrics
              </button>
            )}
            {isEditingLyrics && (
              <div>
                <button
                  onClick={() => setIsEditingLyrics(false)}
                  className="mb-4 px-4 py-2 text-sm font-medium bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close Lyrics Editor
                </button>
                <LyricsEditor
                  initialLyrics={lyrics}
                  year={data.year}
                  onSave={handleLyricsSave}
                  onCancel={() => setIsEditingLyrics(false)}
                />
              </div>
            )}
          </div>
        )}

        {lyrics && lyrics.length > 0 && (
          <div className="mb-8">
            <LyricsCarousel lyrics={lyrics} />
          </div>
        )}

        {data.playlists && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Playlists
            </h2>
            {data.playlists.spotify?.embed && data.playlists.spotify.embed.trim() !== '' && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Spotify
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.playlists.spotify.embed,
                  }}
                />
              </div>
            )}

            {data.playlists.youtube?.embed && data.playlists.youtube.embed.trim() !== '' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  YouTube
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.playlists.youtube.embed,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

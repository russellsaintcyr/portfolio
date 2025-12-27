'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';
import Top40Editor from './Top40Editor';
import LyricsEditor from './LyricsEditor';
import LyricsCarousel from './LyricsCarousel';
import StatsDisplay from './StatsDisplay';
import Toast from './Toast';

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
      url?: string;
    };
    youtubeMusic?: {
      embed?: string;
    };
    youtubeVideo?: {
      url?: string;
    };
  };
  stats?: import('@/lib/top40-stats').Top40Stats;
}

interface Top40Props {
  data: Top40Data;
  originalData: Top40Data;
  canEdit?: boolean;
  prevYear?: number | null;
  nextYear?: number | null;
  tokenParam?: string;
}

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

export default function Top40({ data, originalData, canEdit: serverCanEdit = false, prevYear = null, nextYear = null, tokenParam = '' }: Top40Props) {
  const [canEdit, setCanEdit] = useState(serverCanEdit);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingLyrics, setIsEditingLyrics] = useState(false);
  const [description, setDescription] = useState(cleanHtml(data.description));
  const [lyrics, setLyrics] = useState<Lyric[]>(data.lyrics || []);
  const [descriptionKey] = useState(`top40-${data.year}-description`);
  const [lyricsKey] = useState(`top40-${data.year}-lyrics`);
  const [isSavingDescription, setIsSavingDescription] = useState(false);
  const [isSavingLyrics, setIsSavingLyrics] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<'spotify' | 'youtubeMusic' | 'youtubeVideo' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If server already validated the token, trust it
      if (serverCanEdit) {
        setCanEdit(true);
        return;
      }
      
      // Otherwise, check for token in URL query string and validate client-side
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      
      if (token) {
        // Validate token with API
        fetch(`/api/auth/edit-token?token=${encodeURIComponent(token)}`)
          .then((response) => response.json())
          .then((result) => {
            setCanEdit(result.valid === true);
          })
          .catch(() => {
            setCanEdit(false);
          });
      } else {
        // No token, use server-side canEdit value
        setCanEdit(serverCanEdit);
      }

      // Always use JSON file data on initial load
      // localStorage is only used as temporary buffer during active editing
      setDescription(cleanHtml(data.description));
      setLyrics(data.lyrics || []);

      // Check if data exists in Redis
      fetch(`/api/top40/${data.year}`)
        .then((response) => {
          const dataSource = response.headers.get('X-Data-Source');
          if (response.ok) {
            return response.json().then((data) => ({ data, dataSource }));
          }
          return null;
        })
        .then((result) => {
          if (result) {
            if (result.dataSource === 'redis') {
              console.log(`✅ Top40 ${data.year} data loaded from Redis`);
            } else {
              console.log(`⚠️ Top40 ${data.year} data source: ${result.dataSource}`);
            }
          } else {
            console.log(`⚠️ Top40 ${data.year} data not found in Redis`);
          }
        })
        .catch((error) => {
          console.log(`⚠️ Top40 ${data.year} Redis check failed:`, error);
        });
    }
  }, [data.description, data.lyrics, data.year, serverCanEdit]);

  // Auto-select Spotify by default if available
  useEffect(() => {
    if (data.playlists && selectedPlaylist === null) {
      const hasSpotify = data.playlists.spotify?.embed && data.playlists.spotify.embed.trim() !== '';
      
      // Always select Spotify by default if available
      if (hasSpotify) {
        setSelectedPlaylist('spotify');
      }
    }
  }, [data.playlists, selectedPlaylist]);

  // Helper function to check if YouTube Video has a URL
  const hasYouTubeVideo = () => {
    return (data.playlists?.youtubeVideo?.url && data.playlists.youtubeVideo.url.trim() !== '') ||
           (data.playlists?.youtube?.url && data.playlists.youtube.url.trim() !== '');
  };

  // Helper function to get YouTube Video URL
  const getYouTubeVideoUrl = () => {
    return data.playlists?.youtubeVideo?.url || data.playlists?.youtube?.url || '';
  };

  const handleDescriptionPreview = (content: string) => {
    localStorage.setItem(descriptionKey, content);
    setDescription(content);
    setIsEditingDescription(false);
  };

  const handleDescriptionSave = async (content: string) => {
    setIsSavingDescription(true);
    localStorage.setItem(descriptionKey, content);
    setDescription(content);
    
    // Save to Redis via API (exclude playlists - they come from index.json)
    try {
      const mergedData = {
        year: originalData.year,
        description: content,
        lyrics: lyrics,
        // Don't include coverImage or playlists - they come from index.json
      };
      // Get token from URL
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      const url = token 
        ? `/api/top40/${data.year}?token=${encodeURIComponent(token)}`
        : `/api/top40/${data.year}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedData),
      });
      if (response.ok) {
        console.log('Saved to Redis successfully');
        setIsEditingDescription(false);
        setToast({ message: 'Saved to Redis successfully!', type: 'success' });
      } else {
        setToast({ message: 'Failed to save to Redis', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to save to Redis:', error);
      setToast({ message: 'Failed to save to Redis', type: 'error' });
    } finally {
      setIsSavingDescription(false);
    }
  };

  const handleLyricsPreview = (updatedLyrics: Lyric[]) => {
    localStorage.setItem(lyricsKey, JSON.stringify(updatedLyrics));
    setLyrics(updatedLyrics);
    setIsEditingLyrics(false);
  };

  const handleLyricsSave = async (updatedLyrics: Lyric[]) => {
    setIsSavingLyrics(true);
    localStorage.setItem(lyricsKey, JSON.stringify(updatedLyrics));
    setLyrics(updatedLyrics);
    
    // Save to Redis via API (exclude playlists - they come from index.json)
    try {
      const mergedData = {
        year: originalData.year,
        description: description,
        lyrics: updatedLyrics,
        // Don't include coverImage or playlists - they come from index.json
      };
      // Get token from URL
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      const url = token 
        ? `/api/top40/${data.year}?token=${encodeURIComponent(token)}`
        : `/api/top40/${data.year}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedData),
      });
      if (response.ok) {
        console.log('Saved to Redis successfully');
        setIsEditingLyrics(false);
        setToast({ message: 'Saved to Redis successfully!', type: 'success' });
      } else {
        setToast({ message: 'Failed to save to Redis', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to save to Redis:', error);
      setToast({ message: 'Failed to save to Redis', type: 'error' });
    } finally {
      setIsSavingLyrics(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          My Top Songs of {data.year}
        </h1>

        {data.coverImage && (
          <div className="mb-8 flex justify-center items-center px-4 py-4">
            <div className="max-w-[500px] w-full top40-cover-image" dangerouslySetInnerHTML={{ __html: data.coverImage }} />
          </div>
        )}

        {(description.trim() || canEdit) && (
          <div className="mb-8">
            {canEdit && !isEditingDescription && (
              <button
                onClick={() => {
                  // Clear localStorage when opening editor to ensure fresh start
                  localStorage.removeItem(descriptionKey);
                  setIsEditingDescription(true);
                }}
                className="mb-4 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Edit Description
              </button>
            )}

            {canEdit && isEditingDescription ? (
              <Top40Editor
                initialContent={description}
                year={data.year}
                onPreview={handleDescriptionPreview}
                onSave={handleDescriptionSave}
                onCancel={() => {
                  // Clear localStorage when canceling to ensure next edit starts fresh
                  localStorage.removeItem(descriptionKey);
                  setIsEditingDescription(false);
                }}
              />
            ) : description.trim() ? (
              <div
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 text-gray-900 dark:text-gray-100 [&_*]:max-w-full [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:mb-2 [&_strong]:font-bold [&_a]:text-primary [&_a]:underline [&_mark]:bg-transparent [&_mark]:text-inherit [&_mark]:p-0"
                dangerouslySetInnerHTML={{ __html: cleanHtml(description) }}
              />
            ) : null}
          </div>
        )}

        {data.playlists && (
          <div className="mt-12">
            {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Playlists
            </h2> */}
            <div className="flex justify-center gap-6 mb-6">
              {data.playlists.spotify?.embed && data.playlists.spotify.embed.trim() !== '' && (
                <button
                  onClick={() => setSelectedPlaylist(selectedPlaylist === 'spotify' ? null : 'spotify')}
                  className={`p-3 rounded-full transition-all group ${
                    selectedPlaylist === 'spotify'
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  aria-label="Spotify"
                >
                  <FaSpotify size={32} className={selectedPlaylist !== 'spotify' ? 'group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors' : ''} />
                </button>
              )}
              {data.playlists.youtubeMusic?.embed && data.playlists.youtubeMusic.embed.trim() !== '' && (
                <button
                  onClick={() => setSelectedPlaylist(selectedPlaylist === 'youtubeMusic' ? null : 'youtubeMusic')}
                  className={`p-3 rounded-full transition-all group ${
                    selectedPlaylist === 'youtubeMusic'
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  aria-label="YouTube Music"
                >
                  <SiYoutubemusic size={32} className={selectedPlaylist !== 'youtubeMusic' ? 'group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors' : ''} />
                </button>
              )}
              {hasYouTubeVideo() && (
                <button
                  onClick={() => setSelectedPlaylist(selectedPlaylist === 'youtubeVideo' ? null : 'youtubeVideo')}
                  className={`p-3 rounded-full transition-all group ${
                    selectedPlaylist === 'youtubeVideo'
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  aria-label="YouTube Video"
                >
                  <FaYoutube size={32} className={selectedPlaylist !== 'youtubeVideo' ? 'group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors' : ''} />
                </button>
              )}
            </div>
            {selectedPlaylist === 'spotify' && data.playlists.spotify?.embed && (
              <div className="mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.playlists.spotify.embed,
                  }}
                />
              </div>
            )}
            {selectedPlaylist === 'youtubeMusic' && data.playlists.youtubeMusic?.embed && (
              <div className="mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.playlists.youtubeMusic.embed,
                  }}
                />
              </div>
            )}
            {selectedPlaylist === 'youtubeVideo' && hasYouTubeVideo() && (
              <div className="mb-4 text-center">
                <a
                  href={getYouTubeVideoUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  <FaYoutube size={20} />
                  <span>Open YouTube Playlist</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}

        {canEdit && (
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
                  className="mb-4 px-4 py-2 text-sm font-medium bg-gray-600 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  Close Lyrics Editor
                </button>
                <LyricsEditor
                  initialLyrics={lyrics}
                  year={data.year}
                  onPreview={handleLyricsPreview}
                  onSave={handleLyricsSave}
                  onCancel={() => setIsEditingLyrics(false)}
                  isSaving={isSavingLyrics}
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

        {/* Stats Section */}
        {data.stats && <StatsDisplay stats={data.stats} />}

        {/* Year Navigation */}
        {(prevYear || nextYear) && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            {prevYear ? (
              <Link
                href={`/top40/${prevYear}${tokenParam}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <span className="text-xl">←</span>
                <span className="font-medium">{prevYear}</span>
              </Link>
            ) : (
              <div></div>
            )}
            <Link
              href="/top40"
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="font-medium">All Top 40</span>
            </Link>
            {nextYear ? (
              <Link
                href={`/top40/${nextYear}${tokenParam}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <span className="font-medium">{nextYear}</span>
                <span className="text-xl">→</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

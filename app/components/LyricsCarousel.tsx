interface Lyric {
  artist: string;
  song: string;
  text: string;
}

interface LyricsCarouselProps {
  lyrics: Lyric[];
}

export default function LyricsCarousel({ lyrics }: LyricsCarouselProps) {
  if (!lyrics || lyrics.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Special Lyrics
      </h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {lyrics.map((lyric, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              style={{ scrollSnapAlign: 'start' }}
            >
              {lyric.song && lyric.artist && (
                <div className="mb-3">
                  <div className="font-semibold text-lg text-gray-900 dark:text-white">
                    {lyric.song}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {lyric.artist}
                  </div>
                </div>
              )}
              <div
                className="text-gray-700 dark:text-gray-300 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: lyric.text }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        className="pb-12"
      >
        {lyrics.map((lyric, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
              <div
                className="text-gray-700 dark:text-gray-300 whitespace-pre-line italic mb-4"
                dangerouslySetInnerHTML={{ __html: lyric.text }}
              />
              {lyric.artist && (
                <div className="text-gray-600 dark:text-gray-400">
                  by {lyric.artist}
                </div>
              )}
              {lyric.song && (
                <div className="text-gray-600 dark:text-gray-400">
                  from {lyric.song}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


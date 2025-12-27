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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Chosen Lyrics
      </h2>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={lyrics.length > 1}
          navigation={{
            enabled: true,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: false,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          className="lyrics-carousel"
        >
          {lyrics.map((lyric, idx) => (
            <SwiperSlide key={idx}>
              <div className="h-[320px] md:h-[250px] p-6 pb-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center relative overflow-y-auto">
                <div
                  className="text-gray-700 dark:text-gray-300 whitespace-pre-line italic mb-4"
                  dangerouslySetInnerHTML={{ __html: lyric.text }}
                />
                {lyric.artist && lyric.song && (
                  <div className="text-gray-600 dark:text-gray-400">
                    by {lyric.artist}, from {lyric.song}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


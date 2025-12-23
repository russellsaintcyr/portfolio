import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

interface Top40Data {
  year: number;
  coverImage?: string;
  description: string;
  lyrics?: Array<{ artist: string; song: string; text: string }>;
  playlists?: {
    spotify?: { embed?: string };
    youtube?: { embed?: string };
  };
}

function getTop40Data(year: number): Top40Data | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'app',
      'data',
      'top40',
      `${year}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Top40Data;
  } catch (error) {
    return null;
  }
}

function extractImageSrc(htmlString: string): string | null {
  if (!htmlString) return null;
  const match = htmlString.match(/src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

export default function Top40Index() {
  const years = Array.from({ length: 6 }, (_, i) => 2025 - i); // 2025 to 2020
  const enabledYear = 2025;

  // Load data for all years
  const yearsData = years.map((year) => {
    const data = getTop40Data(year);
    const coverImageSrc = data?.coverImage ? extractImageSrc(data.coverImage) : null;
    return {
      year,
      coverImageSrc,
      isEnabled: year === enabledYear,
    };
  });

  return (
    <div className="font-display text-gray-800 dark:text-gray-200">
      <div className="relative w-full overflow-x-hidden">
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Top 40
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Explore my favorite songs from each year.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {yearsData.map(({ year, coverImageSrc, isEnabled }) => {
                  const baseClassName = `block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
                    isEnabled
                      ? 'hover:border-primary dark:hover:border-primary transition-colors'
                      : 'cursor-not-allowed opacity-50'
                  }`;

                  const content = (
                    <>
                      {coverImageSrc ? (
                        <div className="relative w-full aspect-square">
                          <Image
                            src={coverImageSrc}
                            alt={`Top 40 ${year} Cover`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                          <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                            {year}
                          </span>
                        </div>
                      )}
                      <div className="p-3 text-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {year}
                        </span>
                      </div>
                    </>
                  );

                  if (isEnabled) {
                    return (
                      <Link
                        key={year}
                        href={`/top40/${year}`}
                        className={baseClassName}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <div key={year} className={baseClassName}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}


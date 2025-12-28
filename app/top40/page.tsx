import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import type { Metadata } from 'next';

interface YearConfig {
  year: number;
  coverImage: string | null;
  enabled: boolean;
}

interface Top40IndexConfig {
  years: YearConfig[];
}

export const metadata: Metadata = {
  title: 'Top 40 - Russell Saint Cyr',
  description: 'Explore my favorite songs from each year.',
};

function getIndexConfig(): Top40IndexConfig | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'app',
      'data',
      'top40',
      'index.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Top40IndexConfig;
  } catch (error) {
    console.error('Failed to load index config:', error);
    return null;
  }
}

export default function Top40Index() {
  const config = getIndexConfig();
  const yearsData = config?.years || [];

  return (
    <div className="font-display text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 min-h-screen">
      <div className="relative w-full overflow-x-hidden">
        <Header />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My Annual Top 40
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Explore my favorite songs from the past two decades.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {yearsData.map(({ year, coverImage, enabled }) => {
                  const baseClassName = `block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
                    enabled
                      ? 'hover:border-primary dark:hover:border-primary transition-colors'
                      : 'cursor-not-allowed opacity-50'
                  }`;

                  const content = (
                    <>
                      {coverImage ? (
                        <div className="relative w-full aspect-square">
                          <Image
                            src={coverImage}
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

                  if (enabled) {
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


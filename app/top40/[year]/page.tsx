import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Top40 from '../../components/Top40';

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

async function getTop40Data(year: number): Promise<Top40Data | null> {
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

// Force dynamic rendering to pick up JSON file changes in real-time
// Remove this in production if you want static generation
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const years = Array.from({ length: 6 }, (_, i) => 2025 - i); // 2025 to 2020
  return years.map((year) => ({
    year: year.toString(),
  }));
}

export default async function Top40YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);

  // Validate year is between 2020-2025
  if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2025) {
    notFound();
  }

  const data = await getTop40Data(yearNum);

  if (!data) {
    notFound();
  }

  return (
    <div className="font-display text-gray-800 dark:text-gray-200">
      <div className="relative w-full">
        <Header />
        <main className="min-h-screen">
          <Top40 data={data} originalData={data} />
        </main>
        <Footer />
      </div>
    </div>
  );
}


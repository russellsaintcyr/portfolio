import fs from 'fs';
import path from 'path';

interface YearConfig {
  year: number;
  coverImage: string | null;
  enabled: boolean;
  playlists?: {
    spotify?: {
      embed?: string;
      url?: string;
    };
    youtube?: {
      embed?: string;
      url?: string;
    };
    youtubeMusic?: {
      embed?: string;
      url?: string;
    };
    youtubeVideo?: {
      url?: string;
    };
    apple?: {
      url?: string;
    };
  } | null;
}

interface Top40IndexConfig {
  years: YearConfig[];
}

export function getIndexConfig(): Top40IndexConfig | null {
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

export function getYearMetadata(year: number): YearConfig | null {
  const config = getIndexConfig();
  if (!config) return null;
  
  return config.years.find((y) => y.year === year) || null;
}

export function getAdjacentYears(currentYear: number): { prev: number | null; next: number | null } {
  const config = getIndexConfig();
  if (!config) return { prev: null, next: null };
  
  // Get all enabled years, sorted
  const enabledYears = config.years
    .filter((y) => y.enabled)
    .map((y) => y.year)
    .sort((a, b) => a - b);
  
  const currentIndex = enabledYears.indexOf(currentYear);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex > 0 ? enabledYears[currentIndex - 1] : null,
    next: currentIndex < enabledYears.length - 1 ? enabledYears[currentIndex + 1] : null,
  };
}




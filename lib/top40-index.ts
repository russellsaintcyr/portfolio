import fs from 'fs';
import path from 'path';

interface YearConfig {
  year: number;
  coverImage: string | null;
  enabled: boolean;
  playlists?: {
    spotify?: {
      embed?: string;
    };
    youtube?: {
      embed?: string;
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




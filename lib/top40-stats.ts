import fs from 'fs';
import path from 'path';

export interface YearOfRelease {
  year: number;
  count: number;
}

export interface ArtistByCountry {
  country: string;
  count: number;
  flag?: string;
  artists: string[];
}

export interface ArtistByRegion {
  region: string;
  count: number;
  artists: string[];
}

export interface ArtistByGenre {
  genre: string;
  count: number;
  artists: string[];
}

export interface Top40Stats {
  yearOfRelease?: YearOfRelease[];
  artistsByCountry?: ArtistByCountry[];
  artistsByRegion?: ArtistByRegion[];
  artistsByGenre?: ArtistByGenre[];
}

export function getYearStats(year: number): Top40Stats | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'app',
      'data',
      'top40',
      year.toString(),
      'stats.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Top40Stats;
  } catch (error) {
    console.error(`Failed to load stats for year ${year}:`, error);
    return null;
  }
}


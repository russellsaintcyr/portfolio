import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Top40 from '../../components/Top40';
import { getYearMetadata, getAdjacentYears } from '@/lib/top40-index';
import { getYearStats } from '@/lib/top40-stats';
import type { Metadata } from 'next';

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
      embed?: string; // Spotify embed code for the playlist
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
  };
  stats?: import('@/lib/top40-stats').Top40Stats;
}

async function getTop40Data(year: number): Promise<Top40Data | null> {
  try {
    // Get metadata from index.json (coverImage, playlists)
    const metadata = getYearMetadata(year);
    
    // If year is not in index.json or not enabled, return null (404)
    if (!metadata || !metadata.enabled) {
      return null;
    }
    
    // Replace &nbsp; entities with regular spaces
    const cleanHtml = (html: string): string => {
      return html.replace(/&nbsp;/g, ' ');
    };

    // Get content from Redis (description, lyrics) only if the JSON indicates it exists
    // Default to false if properties are not present
    const hasDescription = metadata.hasDescription ?? false;
    const hasLyrics = metadata.hasLyrics ?? false;
    
    let contentData: Partial<Top40Data> | null = null;
    
    // Only check Redis if the JSON indicates there's content to retrieve
    if (hasDescription || hasLyrics) {
      try {
        const { getRedisClient } = await import('@/lib/redis');
        const redis = await getRedisClient();
        const key = `top40:${year}`;
        const dataStr = await redis.get(key);
        if (dataStr) {
          contentData = JSON.parse(dataStr) as Partial<Top40Data>;
          // Clean &nbsp; from description
          if (contentData.description) {
            contentData.description = cleanHtml(contentData.description);
          }
          // Clean &nbsp; from lyrics text
          if (contentData.lyrics) {
            contentData.lyrics = contentData.lyrics.map(lyric => ({
              ...lyric,
              text: cleanHtml(lyric.text)
            }));
          }
        }
      } catch (redisError) {
        console.error('Redis read error:', redisError);
        // If Redis fails, we'll still allow the page to render with empty content
        // as long as the year is enabled in index.json
      }
    }
    
    // Get stats from JSON file
    const stats = getYearStats(year);
    
    // Merge metadata (from index.json) with content (from Redis)
    // Metadata takes precedence for coverImage and playlists
    // If no Redis data exists, use empty defaults
    const mergedData: Top40Data = {
      year,
      coverImage: metadata?.coverImage 
        ? `<img src="${metadata.coverImage}" alt="Top 40 ${year} Cover" />`
        : undefined,
      description: contentData?.description || '',
      lyrics: contentData?.lyrics || [],
      playlists: metadata?.playlists || undefined,
      stats: stats || undefined,
    };
    
    return mergedData;
  } catch (error) {
    console.error('Error fetching Top40 data:', error);
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const yearNum = parseInt(year, 10);
  
  // Get data for richer metadata
  const data = await getTop40Data(yearNum);
  const metadata = getYearMetadata(yearNum);
  
  // Create description from page content if available
  let description = `My favorite songs from ${yearNum}.`;
  if (data?.description) {
    // Extract first paragraph from HTML
    let firstParagraph = '';
    
    // Try to find first <p> tag
    const pMatch = data.description.match(/<p[^>]*>(.*?)<\/p>/i);
    if (pMatch && pMatch[1]) {
      firstParagraph = pMatch[1];
    } else {
      // If no <p> tag, get text before first heading or block element
      const beforeHeading = data.description.split(/<h[1-6][^>]*>/i)[0];
      if (beforeHeading) {
        firstParagraph = beforeHeading;
      } else {
        // Fallback: just take the beginning of the content
        firstParagraph = data.description;
      }
    }
    
    // Strip HTML tags and clean up
    const textOnly = firstParagraph
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    
    if (textOnly.length > 0) {
      // Truncate to 160 characters, breaking at word boundary
      const truncated = textOnly.length > 160 
        ? textOnly.substring(0, 160).replace(/\s+\S*$/, '') + '...'
        : textOnly;
      description = truncated;
    }
  }
  
  // Get cover image URL for Open Graph
  const coverImageUrl = metadata?.coverImage 
    ? new URL(metadata.coverImage, process.env.NEXT_PUBLIC_SITE_URL || 'https://russellsaintcyr.com').toString()
    : undefined;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://russellsaintcyr.com';
  const pageUrl = `${siteUrl}/top40/${yearNum}`;
  
  return {
    title: `My Top Songs of ${yearNum} - Russell Saint Cyr`,
    description,
    openGraph: {
      title: `My Top Songs of ${yearNum}`,
      description,
      url: pageUrl,
      siteName: 'Russell Saint Cyr',
      images: coverImageUrl ? [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: `Top 40 ${yearNum} Cover`,
        },
      ] : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `My Top Songs of ${yearNum}`,
      description,
      images: coverImageUrl ? [coverImageUrl] : undefined,
    },
  };
}

function validateEditToken(token: string | null): boolean {
  const validToken = process.env.EDIT_TOKEN;
  if (!validToken || !token) {
    return false;
  }
  // Constant-time comparison to prevent timing attacks
  return token === validToken;
}

export default async function Top40YearPage({
  params,
  searchParams,
}: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { year } = await params;
  const resolvedSearchParams = await searchParams;
  const token = Array.isArray(resolvedSearchParams.token)
    ? resolvedSearchParams.token[0]
    : resolvedSearchParams.token || null;
  
  const canEdit = validateEditToken(token);
  const yearNum = parseInt(year, 10);

  // Validate year is a valid number
  if (isNaN(yearNum)) {
    notFound();
  }

  const data = await getTop40Data(yearNum);

  if (!data) {
    notFound();
  }

  const { prev, next } = getAdjacentYears(yearNum);
  const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
  const metadata = getYearMetadata(yearNum);
  const coverImageUrl = metadata?.coverImage || null;

  return (
    <div 
      className="font-display text-gray-800 dark:text-gray-200 min-h-screen relative"
      style={coverImageUrl ? {
        backgroundImage: `url(${coverImageUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        backgroundAttachment: 'fixed',
      } : {}}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      />
      <div className="dark:bg-gray-900/70 absolute inset-0" />
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen">
          <Top40 
            data={data} 
            originalData={data} 
            canEdit={canEdit}
            prevYear={prev}
            nextYear={next}
            tokenParam={tokenParam}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}


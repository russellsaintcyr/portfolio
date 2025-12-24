import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

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

// GET - Read data from Redis
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params;
    const yearNum = parseInt(year, 10);

    if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2026) {
      return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
    }

    const key = `top40:${yearNum}`;

    // Replace &nbsp; entities with regular spaces
    const cleanHtml = (html: string): string => {
      return html.replace(/&nbsp;/g, ' ');
    };

    // Get from Redis
    try {
      const redis = await getRedisClient();
      const dataStr = await redis.get(key);
      if (dataStr) {
        const data = JSON.parse(dataStr) as Top40Data;
        // Clean &nbsp; from description
        if (data.description) {
          data.description = cleanHtml(data.description);
        }
        // Clean &nbsp; from lyrics text
        if (data.lyrics) {
          data.lyrics = data.lyrics.map(lyric => ({
            ...lyric,
            text: cleanHtml(lyric.text)
          }));
        }
        console.log(`✅ GET /api/top40/${yearNum}: Data loaded from Redis`);
        return NextResponse.json(data, {
          headers: {
            'X-Data-Source': 'redis',
          },
        });
      }
      
      // No data in Redis
      return NextResponse.json(
        { error: 'Data not found in Redis' },
        { status: 404 }
      );
    } catch (redisError) {
      console.error('Redis read error:', redisError);
      return NextResponse.json(
        { error: 'Failed to read from Redis' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in GET /api/top40/[year]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Save data to KV
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params;
    const yearNum = parseInt(year, 10);

    if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2026) {
      return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
    }

    const body = await request.json();
    const data = body as Top40Data;

    // Validate data structure
    if (!data.year || data.year !== yearNum) {
      return NextResponse.json(
        { error: 'Year mismatch' },
        { status: 400 }
      );
    }

    // Replace &nbsp; entities with regular spaces before saving
    const cleanHtml = (html: string): string => {
      return html.replace(/&nbsp;/g, ' ');
    };

    // Clean &nbsp; from description
    if (data.description) {
      data.description = cleanHtml(data.description);
    }
    // Clean &nbsp; from lyrics text
    if (data.lyrics) {
      data.lyrics = data.lyrics.map(lyric => ({
        ...lyric,
        text: cleanHtml(lyric.text)
      }));
    }

    const key = `top40:${yearNum}`;

    // Save to Redis
    try {
      const redis = await getRedisClient();
      await redis.set(key, JSON.stringify(data));
      return NextResponse.json({ success: true, data });
    } catch (redisError) {
      console.error('Redis write error:', redisError);
      return NextResponse.json(
        { error: 'Failed to save to Redis' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in PUT /api/top40/[year]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


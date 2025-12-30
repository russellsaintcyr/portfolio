import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getRedisClient } from '@/lib/redis';
import { sanitizeHtml } from '@/lib/sanitize-html';

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

    // Get from Redis
    try {
      const redis = await getRedisClient();
      const dataStr = await redis.get(key);
      if (dataStr) {
        const data = JSON.parse(dataStr) as Top40Data;
        // Sanitize HTML from description (defense in depth)
        if (data.description) {
          data.description = sanitizeHtml(data.description);
        }
        // Sanitize HTML from lyrics text (defense in depth)
        if (data.lyrics) {
          data.lyrics = data.lyrics.map(lyric => ({
            ...lyric,
            text: sanitizeHtml(lyric.text)
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

function validateEditToken(token: string | null): boolean {
  const validToken = process.env.EDIT_TOKEN;
  if (!validToken || !token) {
    return false;
  }
  
  // Ensure buffers are same length (required for timingSafeEqual)
  const tokenBuffer = Buffer.from(token);
  const validTokenBuffer = Buffer.from(validToken);
  
  if (tokenBuffer.length !== validTokenBuffer.length) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(tokenBuffer, validTokenBuffer);
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

    // Validate edit token
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token') || request.headers.get('x-edit-token');
    
    if (!validateEditToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing edit token' },
        { status: 401 }
      );
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

    // Sanitize HTML before saving to Redis (defense in depth)
    if (data.description) {
      data.description = sanitizeHtml(data.description);
    }
    // Sanitize HTML from lyrics text before saving
    if (data.lyrics) {
      data.lyrics = data.lyrics.map(lyric => ({
        ...lyric,
        text: sanitizeHtml(lyric.text)
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


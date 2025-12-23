import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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

// GET - Read data from KV, fallback to JSON file
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

    // Try to get from Redis first
    try {
      const redis = await getRedisClient();
      const dataStr = await redis.get(key);
      if (dataStr) {
        const data = JSON.parse(dataStr) as Top40Data;
        console.log(`✅ GET /api/top40/${yearNum}: Data loaded from Redis`);
        return NextResponse.json(data, {
          headers: {
            'X-Data-Source': 'redis',
          },
        });
      }
    } catch (redisError) {
      console.error('Redis read error (falling back to file):', redisError);
    }

    // Fallback to JSON file
    try {
      const filePath = path.join(
        process.cwd(),
        'app',
        'data',
        'top40',
        `${yearNum}.json`
      );
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents) as Top40Data;
      console.log(`⚠️ GET /api/top40/${yearNum}: Data loaded from file fallback`);
      return NextResponse.json(data, {
        headers: {
          'X-Data-Source': 'file',
        },
      });
    } catch (fileError) {
      return NextResponse.json(
        { error: 'Data not found' },
        { status: 404 }
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


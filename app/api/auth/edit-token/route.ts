import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Validates the edit token using constant-time comparison to prevent timing attacks
 */
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
  
  return crypto.timingSafeEqual(tokenBuffer, validTokenBuffer);
}

/**
 * Validates the edit token from query parameters against the environment variable
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  const validToken = process.env.EDIT_TOKEN;

  if (!validToken) {
    return NextResponse.json(
      { valid: false, error: 'Edit token not configured' },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  // Use constant-time comparison to prevent timing attacks
  const isValid = validateEditToken(token);

  return NextResponse.json({ valid: isValid }, { status: 200 });
}


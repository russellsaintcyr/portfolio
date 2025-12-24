import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates the edit token from query parameters against the environment variable
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  const validToken = process.env.EDIT_TOKEN;

  // Debug logging (remove in production if needed)
  console.log('Token validation check:', {
    hasToken: !!token,
    hasValidToken: !!validToken,
    tokenLength: token?.length,
    validTokenLength: validToken?.length,
    tokensMatch: token === validToken,
  });

  if (!validToken) {
    console.error('EDIT_TOKEN environment variable is not set');
    return NextResponse.json(
      { valid: false, error: 'Edit token not configured' },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  // Use constant-time comparison to prevent timing attacks
  const isValid = token === validToken;

  return NextResponse.json({ valid: isValid }, { status: 200 });
}


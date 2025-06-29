import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  try {
    const { guess } = await req.json();
    if (!guess || typeof guess !== 'string') {
      return NextResponse.json({ error: 'Invalid guess' }, { status: 400 });
    }
    await sql`INSERT INTO guesses (guess) VALUES (${guess})`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to insert guess' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import { icons } from '@/config/tabler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '0') || Infinity;

  return NextResponse.json({
    limit,
    icons: Object.values(icons).slice(0, limit),
  });
}

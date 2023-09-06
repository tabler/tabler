import { icons } from '@/config/tabler';
import { IconsType } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '0') || Infinity;
  const category = (searchParams.get('category') || 'all').toLowerCase();

  return NextResponse.json({
    limit,
    icons: Object.values(icons)
      .filter((icon) => category === 'all' || icon.category.toLowerCase() === category)
      .slice(0, limit) as IconsType,
  });
}

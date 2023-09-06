import { icons } from '@/config/tabler';
import { IconsType } from '@/types';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = +(searchParams.get('limit') || Infinity);
    const category = (searchParams.get('category') || 'all').toLowerCase();

    return NextResponse.json({
      limit,
      icons: Object.values(icons)
        .filter((icon) => category === 'all' || icon.category.toLowerCase() === category)
        .slice(0, limit) as IconsType,
    });
  } catch (error) {
    console.log('Error inside GET route', error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response('Internal server error', { status: 500 });
  }
}

import { icons } from '@/config/tabler';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    [
      ...new Set(
        Object.values(icons)
          .map((icon) => icon.category)
          .filter((category) => category !== ''),
      ),
    ].sort(),
  );
}

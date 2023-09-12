import { icons } from '@/config/tabler';
import { IconType } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const icon = Object.values(icons).find((i) => i.name == params.slug);

  if (!icon) {
    console.log('Icon not found', params.slug);
    return new Response(`Icon ${params.slug} not found`, { status: 404 });
  }

  return NextResponse.json(icon as IconType);
}

'use client';

import { color } from '@/config/site';
import NextTopLoader from 'nextjs-toploader';

export default function ProgressBar() {
  return <NextTopLoader color={color} height={2} />;
}

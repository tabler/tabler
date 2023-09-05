import { IconsType } from '@/types';
import process from 'process';

export const getIcons = async (
  category: string = 'all',
  limit: number = Infinity,
): Promise<{ limit: number; icons: IconsType }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/icons?limit=${limit}&category=${category}`, {
    method: 'GET',
  });
  return response.json();
};

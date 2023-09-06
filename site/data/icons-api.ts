import { IconsType } from '@/types';

export const getIcons = async (
  category: string = 'all',
  limit: number = Infinity,
): Promise<{ limit: number; icons: IconsType }> => {
  const response = await fetch(`api/icons?limit=${limit}&category=${category}`, {
    method: 'GET',
  });
  return response.json();
};

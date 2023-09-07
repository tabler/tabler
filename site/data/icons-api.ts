import { IconsType } from '@/types';

export const getIcons = async (
  category: string = 'all',
  limit: number | undefined = undefined,
): Promise<{ limit: number; icons: IconsType }> => {
  let url = `api/icons?category=${category}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch('api/icons/categories', { method: 'GET' });
  return response.json();
};

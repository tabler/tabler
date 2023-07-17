import { formatDistanceToNowStrict, format as fnsFormat } from 'date-fns';

export const format = (date: string | Date, format: string) => {
  return fnsFormat(new Date(date), format);
};

export const dateTemplate = (date: string | Date) => {
  return format(date, 'MMMM d, yyyy');
};

export function distanceToNow(date: string | Date) {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });
}

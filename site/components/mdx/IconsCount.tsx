import { iconsCount, iconsCountRounded } from '@/config/site';

export default function IconsCount({ rounded = false }) {
  if (rounded) {
    return iconsCountRounded;
  }

  return iconsCount;
}

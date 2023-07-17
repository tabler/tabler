import ResponsiveImage from '@/components/ResponsiveImage';
import clsx from 'clsx';

export default function GuideImage({ src, width, height, description, float }) {
  return (
    <figure className={clsx('guide-image', { [`guide-image-${float}`]: float })}>
      <ResponsiveImage
        src={src}
        width={width}
        height={height}
        alt={description}
        className="rounded bg-white shadow-card"
      />
      {description && <figcaption>{description}</figcaption>}
    </figure>
  );
}

import clsx from 'clsx';
import Image from 'next/image';

export default function ResponsiveImage(props) {
  if (props.url) {
    return (
      <img
        src={props.url}
        className={clsx('img-fluid', props.className)}
        width={props.width}
        height={props.height}
        loading="lazy"
        alt={props.alt || ''}
      />
    );
  }

  const src2x = props.src;

  return (
    <Image
      className={clsx(props.className)}
      src={src2x}
      alt={props.alt || ''}
      width={props.width}
      height={props.height}
      quality={85}
      srcSet={[props.width, props.width * 2]}
      {...props}
    />
  );
}

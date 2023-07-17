import clsx from 'clsx';

import Icon from '@/components/Icon';

export default function Shape({
  icon,
  placeholder,
  color,
  size,
  rounded,
  className,
}: {
  icon?: string
  placeholder?: string | number
  color?: string
  size?: string
  rounded?: boolean
  className?: string
}) {
  return (
    <div
      className={clsx(
        'shape',
        {
          [`shape-${color}`]: color,
          [`shape-${size}`]: size,
          'shape-rounded': rounded,
        },
        className
      )}
    >
      {icon && <Icon name={icon} />}
      {placeholder && placeholder}
    </div>
  );
}

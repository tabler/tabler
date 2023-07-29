import clsx from 'clsx';
import Icon from '@/components/Icon';
import { useEffect, useState } from 'react';

export default function GoToTop() {
  const [goToTopVisible, setGoToTopVisible] = useState(false);

  const pop = () => {
    setGoToTopVisible(window.pageYOffset > window.innerHeight / 2);
  };

  const scrollToTop = e => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    e.preventDefault();
    return false;
  };

  useEffect(() => {
    window.addEventListener('scroll', pop);

    return () => window.removeEventListener('scroll', pop);
  }, []);

  return (
    <button
      className={clsx('go-to-top', goToTopVisible && 'go-to-top-visible')}
      aria-label="Go to top"
      onClick={scrollToTop}
    >
      <Icon name="chevron-up" />
    </button>
  );
}

'use client';

import clsx from 'clsx';
import { useRef, useEffect } from 'react';

export default function Ad({ className, horizontal }: { className?: string; horizontal?: boolean }) {
  const ad = useRef<any>(null);

  useEffect(() => {
    if (ad.current) {
      ad.current.innerHTML = '';

      const script = document.createElement('script');
      script.async = true;
      script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDCKQE&placement=tabler-iconsio';
      script.id = '_carbonads_js';
      ad.current.appendChild(script);
    }
  }, []);

  return <div ref={ad} className={clsx('carbon', className, horizontal && 'carbon-horizontal')}></div>;
};

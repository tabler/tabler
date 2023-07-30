'use client';

import { useRef, useEffect } from 'react';

export const Ad = () => {
  const ad = useRef<any>(null);

  useEffect(() => {
    if (ad.current) {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDCKQE&placement=tabler-iconsio';
      script.id = '_carbonads_js';
      ad.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={ad} className="ads"></div>
  );
};

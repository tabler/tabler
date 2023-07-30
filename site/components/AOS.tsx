'use client';

import { useEffect } from 'react';

import AOS from 'aos';

export default function AOSComponent({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return <>{children}</>;
}

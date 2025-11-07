'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [pathname]);
}

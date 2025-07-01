'use client'; // se estiver usando Next.js 14+

import { useEffect, useRef, useState } from 'react';

export const useWindowWidth = () => {
  const getWidth = () =>
    typeof window !== 'undefined' ? window.innerWidth : 0;

  const [width, setWidth] = useState(getWidth);
  const prevWidth = useRef(width);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newWidth = getWidth();
      if (newWidth !== prevWidth.current) {
        prevWidth.current = newWidth;
        setWidth(newWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

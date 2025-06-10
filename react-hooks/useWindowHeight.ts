'use client'; // if you're using Next 14+

import { useEffect, useRef, useState } from 'react';

export const useWindowHeight = () => {
  const getHeight = () =>
    typeof window !== 'undefined' ? window.innerHeight : 0;

  const [height, setHeight] = useState(getHeight);
  const prevHeight = useRef(height);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newHeight = getHeight();
      if (newHeight !== prevHeight.current) {
        prevHeight.current = newHeight;
        setHeight(newHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};

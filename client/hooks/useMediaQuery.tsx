import { useState, useEffect } from 'react';

// Base MediaQuery Hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;

/**
 * Mobile
 */
export const useMobileDown = () => {
  return useMediaQuery('(max-width: 580px)');
};

/**
 * Tablet
 */
export const useTabletDown = () => {
  return useMediaQuery('(max-width: 768px)');
};

export const useTabletUp = () => {
  return useMediaQuery('(min-width: 768px)');
};

/**
 * Desktop
 */
export const useDesktopDown = () => {
  return useMediaQuery('(max-width: 1024px)');
};

export const usDesktoptUp = () => {
  return useMediaQuery('(min-width: 1024px)');
};

import { useState, useEffect } from 'react';

function getWindowData() {
  if (typeof document !== 'undefined') {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const isTablet = width >= 428 && width <= 1200;
    const isDesktop = 429 <= width;
    const isMobile = width < 768;

    return {
      isTablet,
      isDesktop,
      isMobile,
      width,
      height
    };
  }
  return {};
}

export default function useWindowDimensions() {
  const [windowData, setWindowData] = useState(getWindowData());

  useEffect(() => {
    function handleResize() {
      setWindowData(getWindowData());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowData;
}

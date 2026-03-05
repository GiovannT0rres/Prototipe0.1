import { useState, useEffect } from 'react';

export function useVisualViewport() {
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    
    // Initial call
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  return viewportHeight;
}

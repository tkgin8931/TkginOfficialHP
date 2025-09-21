// hooks/useMediaQuery.tsx
import { useEffect, useState } from 'react';

const useMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const updateTarget = () => {
      setTargetReached(window.innerWidth > width);
    };
    updateTarget();
    window.addEventListener('resize', updateTarget);
    return () => window.removeEventListener('resize', updateTarget);
  }, [width]);

  return targetReached;
};

export default useMediaQuery;

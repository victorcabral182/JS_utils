import { useCallback, useEffect, useState } from 'react';

const useTabIsActive = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleVisibilityChange = useCallback(() => {
    setIsActive(document.visibilityState === 'visible');
  }, []);

  const handleFocus = useCallback(() => {
    setIsActive(document.visibilityState === 'visible');
  }, []);

  const handleBlur = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleVisibilityChange, handleFocus, handleBlur]);

  return isActive;
};

export default useTabIsActive;

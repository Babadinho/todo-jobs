import { useEffect, useState } from 'react';

const useScript = (src: string) => {
  const [status, setStatus] = useState({ loaded: false, error: false });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => {
      setStatus({ loaded: true, error: false });
    };

    script.onerror = () => {
      setStatus({ loaded: true, error: true });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return status;
};

export default useScript;

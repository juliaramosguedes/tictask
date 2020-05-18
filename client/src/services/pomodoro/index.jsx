import { useState, useEffect } from 'react';

export const useGetTimer = (seconds) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!timeLeft) {
      setLoading(false);
      return;
    }

    const intervalId = setInterval(() => {
      if (loading) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, loading]);

  return {
    data: new Date(timeLeft * 1000).toLocaleTimeString().slice(-5),
    loading,
    setLoading,
    setData: setTimeLeft,
  };
};

import { useState, useEffect } from 'react';
import { Duration } from 'luxon';

export const useGetTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const sw = navigator.serviceWorker;

  useEffect(() => {
    if (sw) {
      window.addEventListener('load', () => {
        sw.register('/sw.js')
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener('message', ({ data }) => {
              setTimeLeft(data);
            });
          })
          .catch((error) => {
            console.log('[SW] Service Worker register error: ', error);
          });
      });
    }
  }, [setTimeLeft, sw]);

  useEffect(() => {
    setFinished(false);

    if (!timeLeft && running) {
      setRunning(false);
      setFinished(true);
      return;
    }
  }, [timeLeft, running]);

  const setTimeToServiceWorker = (data) => {
    if (sw?.controller) {
      sw.controller.postMessage(data);
    }

    setTimeLeft(data.time);
  };

  return {
    timeLeft: Duration.fromMillis(timeLeft * 1000).toFormat('mm:ss'),
    running,
    setRunning,
    finished,
    setTimeToServiceWorker,
  };
};

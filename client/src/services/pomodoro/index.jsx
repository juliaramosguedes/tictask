import { useState, useEffect } from 'react';
import { Duration } from 'luxon';
import * as workerTimers from 'worker-timers';
import { INTERVAL } from '../../constants';

export const useGetTimer = () => {
  const [timeLeft, setTimeLeft] = useState(INTERVAL.POMODORO.TIME * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setFinished(false);

    if (!timeLeft && running) {
      setRunning(false);
      setFinished(true);
      return;
    }

    const intervalId = workerTimers.setInterval(() => {
      if (running) {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }
    }, 1000);

    return () => workerTimers.clearInterval(intervalId);
  }, [timeLeft, running]);

  return {
    timeLeft: Duration.fromMillis(timeLeft * 1000).toFormat('mm:ss'),
    running,
    setRunning,
    finished,
    setTimeLeft,
  };
};

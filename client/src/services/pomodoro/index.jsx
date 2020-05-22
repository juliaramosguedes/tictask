import { useState, useEffect } from 'react';
import * as workerTimers from 'worker-timers';
import { Duration } from 'luxon';
import { INTERVAL } from '../../constants';

export const useGetTimer = () => {
  const [timeLeft, setTimeLeft] = useState(INTERVAL.POMODORO.TIME * 60);
  const [timeLimit, setTimeLimit] = useState(INTERVAL.POMODORO.TIME * 60);
  const [rawTimeFraction, setRawTimeFraction] = useState(1);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const onSetTime = (time) => {
    setTimeLeft(time);
    setTimeLimit(time);
    setRawTimeFraction(time > 0 ? 1 : 0);
  };

  useEffect(() => {
    setFinished(false);

    if (!timeLeft && running) {
      setRunning(false);
      setFinished(true);
      return;
    }

    const intervalId = workerTimers.setInterval(() => {
      if (running) {
        setRawTimeFraction(
          (timeLeft - 1) / timeLimit -
            (1 / timeLimit) * (1 - (timeLeft - 1) / timeLimit)
        );
        setTimeLeft((timeLeft) => timeLeft - 1);
      }
    }, 1000);

    return () => workerTimers.clearInterval(intervalId);
  }, [timeLeft, timeLimit, running]);

  return {
    timeLeft: Duration.fromMillis(timeLeft * 1000).toFormat('mm:ss'),
    running,
    setRunning,
    finished,
    onSetTime,
    rawTimeFraction,
  };
};

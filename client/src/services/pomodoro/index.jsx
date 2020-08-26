import { useState, useEffect, useCallback } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import { INTERVAL } from '../../constants';

export const useGetTimer = () => {
  const [timeLeft, setTimeLeft] = useState(INTERVAL.POMODORO.TIME * 60);
  const [timeLimit, setTimeLimit] = useState(INTERVAL.POMODORO.TIME * 60);
  const [rawTimeFraction, setRawTimeFraction] = useState(1);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [playAudio, setPlayAudio] = useState(true);
  const [updateTime, setUpdateTime] = useState({
    active: false,
    hidden: false,
  });

  const onSetTime = useCallback((time, updateTimeLimit = true) => {
    setTimeLeft(time);
    localStorage.setItem('initialTime', DateTime.local());
    if (updateTimeLimit) {
      setRawTimeFraction(time > 0 ? 1 : 0);
      setTimeLimit(time);
    }
  }, []);

  const initiateTimer = useCallback(
    (interval) => {
      setRunning(true);
      onSetTime(interval * 60);
      setPlayAudio(true);
    },
    [setRunning, onSetTime, setPlayAudio]
  );

  const onResetTimer = useCallback(() => {
    setRunning(false);
    onSetTime(0);
    setPlayAudio(false);
    localStorage.setItem('timeLeft', 0);
  }, [setRunning, onSetTime]);

  useEffect(() => {
    setFinished(false);

    if (!timeLeft && running) {
      setRunning(false);
      setFinished(true);
      return;
    }

    const intervalId = setInterval(() => {
      if (running) {
        setRawTimeFraction(
          (timeLeft - 1) / timeLimit -
            (1 / timeLimit) * (1 - (timeLeft - 1) / timeLimit)
        );
        setTimeLeft((timeLeft) => timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, timeLimit, running]);

  useEffect(() => {
    let storageTime = localStorage.getItem('initialTime');
    storageTime = DateTime.fromISO(storageTime);
    const interval = Interval.fromDateTimes(storageTime, DateTime.local());
    const storageDifference = Math.floor(
      interval.toDuration('seconds').toObject().seconds
    );
    const systemDifference = timeLimit - timeLeft;

    if (
      updateTime.hidden &&
      !updateTime.active &&
      document.visibilityState === 'visible'
    )
      setUpdateTime((updateTime) => ({ ...updateTime, active: true }));

    if (!updateTime.hidden && document.visibilityState === 'hidden')
      setUpdateTime((updateTime) => ({ active: false, hidden: true }));

    if (
      running &&
      updateTime.active &&
      updateTime.hidden &&
      storageDifference !== systemDifference
    ) {
      setUpdateTime((updateTime) => ({ active: false, hidden: false }));

      if (storageDifference > timeLeft) {
        setPlayAudio(false);
        onSetTime(0);
      } else {
        onSetTime(timeLimit - storageDifference, false);
      }
    }
  }, [onSetTime, running, timeLeft, timeLimit, updateTime]);

  return {
    timeLeft: Duration.fromMillis(timeLeft * 1000).toFormat('mm:ss'),
    running,
    finished,
    onSetTime,
    rawTimeFraction,
    playAudio,
    initiateTimer,
    onResetTimer,
  };
};

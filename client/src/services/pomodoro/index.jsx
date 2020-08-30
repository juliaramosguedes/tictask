import { useState, useEffect, useCallback } from 'react';
import { DateTime, Duration, Interval } from 'luxon';
import { INTERVAL } from '../../constants';

export const useGetTimer = () => {
  const [running, setRunning] = useState(() => {
    let running = localStorage.getItem('running');
    running = JSON.parse(running);
    return running;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    let activeTimer = localStorage.getItem('activeTimer');
    activeTimer = activeTimer || INTERVAL.POMODORO.KEY;
    let storageTime = localStorage.getItem('initialTime');
    let duration = localStorage.getItem('duration');
    duration = JSON.parse(duration);
    duration = duration || {
      POMODORO: INTERVAL.POMODORO.TIME,
      SHORTBREAK: INTERVAL.SHORTBREAK.TIME,
      LONGBREAK: INTERVAL.LONGBREAK.TIME,
    };

    if (!activeTimer) return INTERVAL.POMODORO.TIME * 60;

    if (!storageTime) return duration[activeTimer] * 60;

    storageTime = DateTime.fromISO(storageTime);
    const interval = Interval.fromDateTimes(storageTime, DateTime.local());
    const storageDifference = Math.floor(
      interval.toDuration('seconds').toObject().seconds
    );

    if (storageDifference / 60 >= duration[activeTimer]) {
      setRunning(false);
      return duration[activeTimer] * 60;
    }

    return (duration[activeTimer] - storageDifference / 60) * 60;
  });
  const [timeLimit, setTimeLimit] = useState(() => {
    let activeTimer = localStorage.getItem('activeTimer');
    activeTimer = activeTimer || INTERVAL.POMODORO.KEY;
    let duration = localStorage.getItem('duration');
    duration = JSON.parse(duration);
    duration = duration || {
      POMODORO: INTERVAL.POMODORO.TIME,
      SHORTBREAK: INTERVAL.SHORTBREAK.TIME,
      LONGBREAK: INTERVAL.LONGBREAK.TIME,
    };

    return !activeTimer
      ? INTERVAL.POMODORO.TIME * 60
      : duration[activeTimer] * 60;
  });
  const [rawTimeFraction, setRawTimeFraction] = useState(1);
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
      localStorage.setItem('running', JSON.stringify(true));
    },
    [setRunning, onSetTime, setPlayAudio]
  );

  const onResetTimer = useCallback(() => {
    setRunning(false);
    localStorage.setItem('running', JSON.stringify(false));
    onSetTime(0);
    setPlayAudio(false);
    document.title = `Tic Task`;
  }, [setRunning, onSetTime]);

  useEffect(() => {
    setFinished(false);

    if (!timeLeft && running) {
      localStorage.setItem('running', JSON.stringify(false));
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
        document.title = `${Duration.fromMillis((timeLeft - 1) * 1000).toFormat(
          'mm:ss'
        )} - Tic Task`;
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
        document.title = `Tic Task`;
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

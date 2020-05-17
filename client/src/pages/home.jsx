import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

const useGetTimer = (seconds) => {
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

export default () => {
  const secondsInAMinute = 60;
  const pomodoroInterval = 1;
  const shortBreakInterval = 1;
  const longBreakInterval = 30;

  const {
    data: timeLeft,
    loading,
    setLoading,
    setData: setTimeLeft,
  } = useGetTimer(0);

  const [counter, setCounter] = useState(3);
  const [breakInterval, setBreakInterval] = useState(shortBreakInterval);
  const [activeTimer, setActiveTimer] = useState(null);

  useEffect(() => {
    if (counter % 4 === 0) {
      setBreakInterval(longBreakInterval);
    } else {
      setBreakInterval(shortBreakInterval);
    }
  }, [counter]);

  useEffect(() => {
    if (!loading) {
      setActiveTimer(null);
    }
  }, [loading]);

  const resetTimer = (interval) => {
    setLoading(true);
    setTimeLeft(interval * secondsInAMinute);
  };

  const initiatePomodoro = () => {
    resetTimer(pomodoroInterval);
    setCounter(counter + 1);
    setActiveTimer('pomodoro');
  };

  const initiateBreak = () => {
    resetTimer(breakInterval);
    setActiveTimer('break');
  };

  const stopTimer = () => {
    setLoading(false);
    setTimeLeft(0);
    setActiveTimer(null);
  };

  return (
    <div>
      <h1>{timeLeft}</h1>
      {loading ? (
        <button onClick={stopTimer}>Interromper</button>
      ) : (
        <button onClick={initiatePomodoro}>Iniciar</button>
      )}
      <button onClick={initiateBreak}>Intervalo</button>
    </div>
  );
};

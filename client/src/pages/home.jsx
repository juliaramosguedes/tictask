import React, { useState, useEffect } from 'react';
import { useGetTimer } from '../services';
import {
  Button,
  ColorSemanticAlert,
  ColorSemanticError,
  Container,
  Separator,
  Subtitle,
  Title,
} from '../ui';
import { INTERVAL } from '../constants';

export default () => {
  const secondsInAMinute = 60;

  const {
    data: timeLeft,
    loading,
    setLoading,
    setData: setTimeLeft,
  } = useGetTimer(0);

  const [counter, setCounter] = useState(3);
  const [breakInterval, setBreakInterval] = useState(INTERVAL.SHORTBREAK);
  const [activeTimer, setActiveTimer] = useState(null);

  useEffect(() => {
    if (counter % 4 === 0) {
      setBreakInterval(INTERVAL.LONGBREAK);
    } else {
      setBreakInterval(INTERVAL.SHORTBREAK);
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
    resetTimer(INTERVAL.POMODORO);
    setCounter(counter + 1);
    setActiveTimer('Pomodoro');
  };

  const initiateBreak = () => {
    resetTimer(breakInterval);
    setActiveTimer('Intervalo');
  };

  const stopTimer = () => {
    setLoading(false);
    setTimeLeft(0);
    setActiveTimer(null);
  };

  return (
    <Container>
      <Separator transparent height="33vh" />
      <Title size={12} center>
        {timeLeft}
      </Title>
      {loading ? (
        <>
          <Subtitle size={12} center>
            {activeTimer}
          </Subtitle>
          <Container display="flex">
            <Button.Main
              onClick={stopTimer}
              width="150px"
              color={ColorSemanticError}
            >
              <p>Interromper</p>
            </Button.Main>
          </Container>
        </>
      ) : (
        <>
          <Separator transparent height="49px" />
          <Container display="flex">
            <Button.Main onClick={initiatePomodoro} width="120px">
              <p>Iniciar</p>
            </Button.Main>
            <Separator transparent width="16px" />
            <Button.Main
              onClick={initiateBreak}
              color={ColorSemanticAlert}
              width="120px"
              border
              transparent
            >
              <p>Intervalo</p>
            </Button.Main>
          </Container>
        </>
      )}
    </Container>
  );
};

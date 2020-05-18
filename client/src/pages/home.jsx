import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { useGetTimer } from '../services';
import {
  Button,
  ColorSemanticAlert,
  ColorSemanticError,
  Container,
  Separator,
  Title,
} from '../ui';
import { INTERVAL } from '../constants';

const ButtonsContainer = (props) => (
  <Container
    {...props}
    className={cx(
      'home-container',
      css`
        display: flex;
        justify-content: center;
      `,
      props.className
    )}
  />
);

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
    <Container>
      <Title size={4} center>
        {timeLeft}
      </Title>
      <ButtonsContainer>
        {loading ? (
          <Button.Main
            onClick={stopTimer}
            width="150px"
            color={ColorSemanticError}
          >
            <p>Interromper</p>
          </Button.Main>
        ) : (
          <>
            <Button.Main onClick={initiatePomodoro} width="150px">
              <p>Iniciar</p>
            </Button.Main>
            <Separator transparent width="16px" />
            <Button.Main
              onClick={initiateBreak}
              color={ColorSemanticAlert}
              width="150px"
              border
              transparent
            >
              <p>Intervalo</p>
            </Button.Main>
          </>
        )}
      </ButtonsContainer>
    </Container>
  );
};

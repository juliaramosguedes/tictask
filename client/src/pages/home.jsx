import React, { useState, useEffect } from 'react';
import { useGetTimer } from '../services';
import {
  Button,
  ColorSemanticError,
  Container,
  GradientInterval,
  GradientPomodoro,
  Separator,
  Subtitle,
  Title,
} from '../ui';
import { INTERVAL } from '../constants';
import { useBreakpoint } from '../hooks';
import audio from '../assets/Bell 03.mp3';

export default () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  const {
    timeLeft,
    running,
    finished,
    setRunning,
    setTimeLeft,
  } = useGetTimer();

  const [counter, setCounter] = useState(0);
  const [activeTimer, setActiveTimer] = useState(null);
  const [playAudio, setPlayAudio] = useState(true);

  useEffect(() => {
    if (finished && playAudio) {
      setActiveTimer(() => {
        if (activeTimer === INTERVAL.POMODORO.KEY) {
          return INTERVAL.SHORTBREAK.KEY;
        } else {
          return INTERVAL.POMODORO.KEY;
        }
      });
      playRing();
    }
  }, [finished, playAudio, activeTimer]);

  const resetTimer = (interval) => {
    setRunning(true);
    setTimeLeft(interval * 60);
    setPlayAudio(true);
  };

  const initiatePomodoro = () => {
    resetTimer(INTERVAL.POMODORO.TIME);
    setCounter(counter + 1);
    setActiveTimer(INTERVAL.POMODORO.KEY);
  };

  const initiateBreak = () => {
    if (counter > 0 && counter % 4 === 0) {
      setActiveTimer(INTERVAL.LONGBREAK.KEY);
      resetTimer(INTERVAL.LONGBREAK.TIME);
    } else {
      setActiveTimer(INTERVAL.SHORTBREAK.KEY);
      resetTimer(INTERVAL.SHORTBREAK.TIME);
    }
  };

  const restartTimer = () => {
    setRunning(false);
    setTimeLeft(0);
    setActiveTimer(null);
    setPlayAudio(false);
    setCounter(0);
  };

  const playRing = () => {
    const audio = document.getElementById('ring');
    audio.play();
  };

  return (
    <Container
      color={
        running && activeTimer === INTERVAL.POMODORO.KEY
          ? GradientPomodoro
          : running &&
            (activeTimer === INTERVAL.SHORTBREAK.KEY ||
              activeTimer === INTERVAL.LONGBREAK.KEY)
          ? GradientInterval
          : 'tranparent'
      }
      height="100vh"
    >
      <Separator transparent height={isDesktop ? '30vh' : '20vh'} />
      <Title size={isDesktop ? 12 : 9} center white={running}>
        {timeLeft}
      </Title>
      <Subtitle size={isDesktop ? 12 : 9} center white={running}>
        {activeTimer
          ? running
            ? INTERVAL[activeTimer].PHRASE
            : INTERVAL[activeTimer].NAME
          : 'Vamos começar?'}
      </Subtitle>
      {running ? (
        <Container display="flex">
          <Button.Main
            onClick={restartTimer}
            width="150px"
            color={ColorSemanticError}
          >
            <p>Recomeçar</p>
          </Button.Main>
        </Container>
      ) : (
        <Container display="flex">
          <Button.Main
            onClick={initiatePomodoro}
            width="120px"
            gradient={GradientPomodoro}
          >
            <p>Iniciar</p>
          </Button.Main>
          <Separator transparent width="16px" />
          <Button.Main
            onClick={initiateBreak}
            gradient={GradientInterval}
            width="120px"
          >
            <p>Intervalo</p>
          </Button.Main>
        </Container>
      )}
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

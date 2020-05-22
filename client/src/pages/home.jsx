import React, { useState, useEffect } from 'react';
import { useGetTimer } from '../services';
import {
  Button,
  Clock,
  ColorBrandBase,
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
    onSetTime,
    rawTimeFraction,
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

  const initiateTimer = (interval) => {
    setRunning(true);
    onSetTime(interval * 60);
    setPlayAudio(true);
  };

  const initiatePomodoro = () => {
    initiateTimer(INTERVAL.POMODORO.TIME);
    setCounter(counter + 1);
    setActiveTimer(INTERVAL.POMODORO.KEY);
  };

  const initiateBreak = () => {
    if (counter > 0 && counter % 4 === 0) {
      setActiveTimer(INTERVAL.LONGBREAK.KEY);
      initiateTimer(INTERVAL.LONGBREAK.TIME);
    } else {
      setActiveTimer(INTERVAL.SHORTBREAK.KEY);
      initiateTimer(INTERVAL.SHORTBREAK.TIME);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    onSetTime(0);
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
      <Separator transparent height={isDesktop ? '20vh' : '10vh'} />
      <Subtitle size={6} center white={running}>
        {activeTimer
          ? running
            ? INTERVAL[activeTimer].PHRASE
            : INTERVAL[activeTimer].NAME
          : 'Vamos começar?'}
      </Subtitle>
      <Separator transparent height="32px" />
      <Clock rawTimeFraction={rawTimeFraction} white={running}>
        <Title size={10} center white={running}>
          {timeLeft}
        </Title>
      </Clock>
      <Separator transparent height="24px" />
      {running ? (
        <Container display="flex">
          <Button.Main
            onClick={resetTimer}
            transparent
            color="white"
            border
            small={!isDesktop}
            circle
          >
            <p>PARAR</p>
          </Button.Main>
        </Container>
      ) : (
        <Container display="flex">
          {activeTimer === INTERVAL.SHORTBREAK.KEY ||
          activeTimer === INTERVAL.LONGBREAK.KEY ? (
            <Button.Main
              onClick={initiateBreak}
              transparent
              color={ColorBrandBase}
              border
              small={!isDesktop}
              circle
            >
              <p>RELAXAR</p>
            </Button.Main>
          ) : (
            <Button.Main
              onClick={initiatePomodoro}
              transparent
              color={ColorBrandBase}
              border
              small={!isDesktop}
              circle
            >
              <p>INICIAR</p>
            </Button.Main>
          )}
        </Container>
      )}
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

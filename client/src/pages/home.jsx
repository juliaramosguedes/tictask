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
import audio from '../assets/Bell 03.mp3';

export default () => {
  const {
    timeLeft,
    running,
    finished,
    setRunning,
    setTimeLeft,
  } = useGetTimer();

  const [counter, setCounter] = useState(0);
  const [breakInterval, setBreakInterval] = useState(INTERVAL.SHORTBREAK);
  const [activeTimer, setActiveTimer] = useState(null);
  const [playAudio, setPlayAudio] = useState(true);

  useEffect(() => {
    if (counter > 0 && counter % 4 === 0) {
      setBreakInterval(INTERVAL.LONGBREAK);
    } else {
      setBreakInterval(INTERVAL.SHORTBREAK);
    }
  }, [counter]);

  useEffect(() => {
    if (finished && playAudio) {
      setActiveTimer(null);
      playRing();
    }
  }, [finished, playAudio]);

  const resetTimer = (interval) => {
    setRunning(true);
    setTimeLeft(interval * 60);
    setPlayAudio(true);
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

  const restartTimer = () => {
    setRunning(false);
    setTimeLeft(0);
    setActiveTimer(null);
    setPlayAudio(false);
    setBreakInterval(INTERVAL.SHORTBREAK);
    setCounter(0);
  };

  const playRing = () => {
    const audio = document.getElementById('ring');
    audio.play();
  };

  return (
    <Container
      color={
        activeTimer === 'Pomodoro'
          ? GradientPomodoro
          : activeTimer === 'Intervalo'
          ? GradientInterval
          : 'tranparent'
      }
      height="100vh"
    >
      <Separator transparent height="33vh" />
      <Title size={12} center white={activeTimer}>
        {timeLeft}
      </Title>
      {running ? (
        <>
          <Subtitle size={12} center white={activeTimer}>
            {activeTimer}
          </Subtitle>
          <Container display="flex">
            <Button.Main
              onClick={restartTimer}
              width="150px"
              color={ColorSemanticError}
            >
              <p>Recomeçar</p>
            </Button.Main>
          </Container>
        </>
      ) : (
        <>
          <Subtitle size={12} center white={activeTimer}>
            {breakInterval === INTERVAL.LONGBREAK
              ? 'Faça um intervalo maior dessa vez.'
              : 'Mãos à massa!'}
          </Subtitle>
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
        </>
      )}
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

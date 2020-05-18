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
import audio from '../assets/Bell 03.mp3';

export default () => {
  const {
    timeLeft,
    running,
    finished,
    setRunning,
    setTimeLeft,
  } = useGetTimer();

  const [counter, setCounter] = useState(3);
  const [breakInterval, setBreakInterval] = useState(INTERVAL.SHORTBREAK);
  const [activeTimer, setActiveTimer] = useState(null);
  const [playAudio, setPlayAudio] = useState(true);

  useEffect(() => {
    if (counter % 4 === 0) {
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

  const stopTimer = () => {
    setRunning(false);
    setTimeLeft(0);
    setActiveTimer(null);
    setPlayAudio(false);
  };

  const playRing = () => {
    const audio = document.getElementById('ring');
    audio.play();
  };

  return (
    <Container>
      <Separator transparent height="33vh" />
      <Title size={12} center>
        {timeLeft}
      </Title>
      {running ? (
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
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

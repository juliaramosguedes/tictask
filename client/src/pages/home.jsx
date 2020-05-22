import React, { useState, useEffect, useCallback } from 'react';
import { useGetTimer } from '../services';
import {
  Button,
  Clock,
  ColorToggle,
  ColorBrandBase,
  ColorNeutralYellow,
  Container,
  Separator,
  Subtitle,
  Switch,
  Text,
  Title,
} from '../ui';
import { INTERVAL, BACKGROUND_COLOR } from '../constants';
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
  const [activeTimer, setActiveTimer] = useState(INTERVAL.POMODORO.KEY);
  const [playAudio, setPlayAudio] = useState(true);
  const [automatic, setAutomatic] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    BACKGROUND_COLOR.BRAND.KEY
  );

  const initiateTimer = useCallback(
    (interval) => {
      setRunning(true);
      onSetTime(interval * 60);
      setPlayAudio(true);
    },
    [setRunning, onSetTime, setPlayAudio]
  );

  const onInitiatePomodoro = useCallback(() => {
    initiateTimer(INTERVAL.POMODORO.TIME);
    setCounter(counter + 1);
    setActiveTimer(INTERVAL.POMODORO.KEY);
  }, [counter, initiateTimer]);

  const onInitiateBreak = useCallback(() => {
    if (counter > 0 && counter % 4 === 0) {
      setActiveTimer(INTERVAL.LONGBREAK.KEY);
      initiateTimer(INTERVAL.LONGBREAK.TIME);
    } else {
      setActiveTimer(INTERVAL.SHORTBREAK.KEY);
      initiateTimer(INTERVAL.SHORTBREAK.TIME);
    }
  }, [counter, initiateTimer]);

  const onResetTimer = () => {
    setRunning(false);
    onSetTime(0);
    setActiveTimer(null);
    setPlayAudio(false);
    setCounter(0);
  };

  const playRing = () => {
    const audio = document.getElementById('ring');
    audio.volume = 0.5;
    audio.play();
  };

  const onToggleAutomatic = () => setAutomatic(!automatic);
  const onToggleColor = () =>
    setBackgroundColor(() => {
      if (backgroundColor === BACKGROUND_COLOR.BRAND.KEY)
        return BACKGROUND_COLOR.WHITE.KEY;
      if (backgroundColor === BACKGROUND_COLOR.WHITE.KEY)
        return BACKGROUND_COLOR.DARK.KEY;
      if (backgroundColor === BACKGROUND_COLOR.DARK.KEY)
        return BACKGROUND_COLOR.BRAND.KEY;
    });

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

      if (automatic) {
        if (activeTimer === INTERVAL.POMODORO.KEY) {
          onInitiateBreak();
        } else {
          onInitiatePomodoro();
        }
      }
    }
  }, [
    finished,
    playAudio,
    activeTimer,
    automatic,
    onInitiateBreak,
    onInitiatePomodoro,
  ]);

  return (
    <Container
      color={
        activeTimer === INTERVAL.POMODORO.KEY
          ? BACKGROUND_COLOR[backgroundColor].POMODORO
          : BACKGROUND_COLOR[backgroundColor].INTERVAL
      }
      height="100vh"
      display="flex"
      direction="column"
    >
      <Subtitle
        size={6}
        center
        white={backgroundColor !== BACKGROUND_COLOR.WHITE.KEY}
      >
        {activeTimer
          ? running
            ? INTERVAL[activeTimer].PHRASE
            : INTERVAL[activeTimer].NAME
          : 'Vamos começar?'}
      </Subtitle>
      <Separator transparent height="48px" />
      <Clock
        rawTimeFraction={rawTimeFraction}
        white={backgroundColor === BACKGROUND_COLOR.BRAND.KEY}
      >
        <Title
          size={10}
          center
          white={backgroundColor !== BACKGROUND_COLOR.WHITE.KEY}
        >
          {timeLeft}
        </Title>
      </Clock>
      <Separator transparent height="24px" />
      {running ? (
        <Container display="flex">
          <Button.Main
            onClick={onResetTimer}
            transparent
            color={
              backgroundColor === BACKGROUND_COLOR.WHITE.KEY
                ? ColorBrandBase
                : 'white'
            }
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
              onClick={onInitiateBreak}
              transparent
              color={
                backgroundColor === BACKGROUND_COLOR.WHITE.KEY
                  ? ColorBrandBase
                  : 'white'
              }
              border
              small={!isDesktop}
              circle
            >
              <p>RELAXAR</p>
            </Button.Main>
          ) : (
            <Button.Main
              onClick={onInitiatePomodoro}
              transparent
              color={
                backgroundColor === BACKGROUND_COLOR.WHITE.KEY
                  ? ColorBrandBase
                  : 'white'
              }
              border
              small={!isDesktop}
              circle
            >
              <p>INICIAR</p>
            </Button.Main>
          )}
        </Container>
      )}
      <Separator transparent height="12px" />
      <Switch
        onToggleAutomatic={onToggleAutomatic}
        color={
          backgroundColor === BACKGROUND_COLOR.BRAND.KEY
            ? ColorNeutralYellow
            : ColorBrandBase
        }
      >
        <Text
          width="auto"
          color={
            backgroundColor === BACKGROUND_COLOR.WHITE.KEY
              ? ColorBrandBase
              : 'white'
          }
          size={isDesktop ? 2 : 1}
        >
          Modo automático
        </Text>
      </Switch>
      <ColorToggle onClick={onToggleColor} />
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

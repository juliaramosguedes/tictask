import React, { useState, useEffect, useCallback } from 'react';
import { useGetTimer } from '../services';
import {
  Button,
  Clock,
  ColorToggle,
  Container,
  Separator,
  Subtitle,
  Switch,
  Text,
  Title,
} from '../ui';
import { INTERVAL, THEME } from '../constants';
import { useBreakpoint } from '../hooks';
import { Footer } from '../components';
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
  const [backgroundColor, setBackgroundColor] = useState(THEME.BRAND.KEY);

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
      if (backgroundColor === THEME.BRAND.KEY) return THEME.WHITE.KEY;
      if (backgroundColor === THEME.WHITE.KEY) return THEME.DARK.KEY;
      if (backgroundColor === THEME.DARK.KEY) return THEME.BRAND.KEY;
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
        THEME[backgroundColor][INTERVAL[activeTimer].TYPE].BACKGROUND_COLOR
      }
      height="100vh"
      padding={isDesktop ? '40px 0 66px' : '16px 0 68px'}
    >
      <Subtitle
        size={6}
        center
        color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
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
        color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].CLOCK}
      >
        <Title
          size={10}
          center
          color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
        >
          {timeLeft}
        </Title>
      </Clock>
      <Separator transparent height="36px" />
      {running ? (
        <Container display="flex">
          <Button.Main
            onClick={onResetTimer}
            transparent
            color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
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
              color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
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
              color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
              border
              small={!isDesktop}
              circle
            >
              <p>INICIAR</p>
            </Button.Main>
          )}
        </Container>
      )}
      <Separator transparent height="24px" />
      <Switch
        onToggleAutomatic={onToggleAutomatic}
        color={
          THEME[backgroundColor][INTERVAL[activeTimer].TYPE].AUTOMATIC_BUTTON
            .BACKGROUND_COLOR
        }
      >
        <Text
          width="auto"
          color={
            THEME[backgroundColor][INTERVAL[activeTimer].TYPE].AUTOMATIC_BUTTON
              .COLOR
          }
          size={isDesktop ? 2 : 1}
        >
          Modo automático
        </Text>
      </Switch>
      <ColorToggle onClick={onToggleColor} />
      <Footer
        color={THEME[backgroundColor][INTERVAL[activeTimer].TYPE].COLOR}
      />
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

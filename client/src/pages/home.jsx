import React, { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
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
import { Footer, History } from '../components';
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

  const [counter, setCounter] = useState(() => {
    let counter = localStorage.getItem('counter');
    let date = localStorage.getItem('date');
    date = JSON.parse(date);
    const currentDate = DateTime.local().toFormat('yyyy-MM-dd');

    if (counter && date === currentDate) {
      counter = JSON.parse(counter);
      return counter;
    } else {
      return {
        POMODORO: 0,
        SHORTBREAK: 0,
        LONGBREAK: 0,
      };
    }
  });
  const [activeTimer, setActiveTimer] = useState(INTERVAL.POMODORO.KEY);
  const [playAudio, setPlayAudio] = useState(true);
  const [automatic, setAutomatic] = useState(false);
  const [theme, setTheme] = useState(THEME.BRAND.KEY);

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
    setActiveTimer(INTERVAL.POMODORO.KEY);
  }, [initiateTimer]);

  const onInitiateBreak = useCallback(() => {
    if (counter.pomodoro > 0 && counter.pomodoro % 4 === 0) {
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
    setPlayAudio(false);
  };

  const playRing = () => {
    const audio = document.getElementById('ring');
    audio.volume = 0.5;
    audio.play();
  };

  const onToggleAutomatic = () => setAutomatic(!automatic);
  const onToggleColor = () =>
    setTheme(() => {
      if (theme === THEME.BRAND.KEY) return THEME.WHITE.KEY;
      if (theme === THEME.WHITE.KEY) return THEME.DARK.KEY;
      if (theme === THEME.DARK.KEY) return THEME.BRAND.KEY;
    });

  useEffect(() => {
    if (finished && playAudio) {
      setCounter((counter) => ({
        ...counter,
        [activeTimer]: counter[activeTimer] + 1,
      }));
      localStorage.setItem(
        'counter',
        JSON.stringify({
          ...counter,
          [activeTimer]: counter[activeTimer] + 1,
        })
      );
      localStorage.setItem(
        'date',
        JSON.stringify(DateTime.local().toFormat('yyyy-MM-dd'))
      );
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
    counter,
    finished,
    playAudio,
    activeTimer,
    automatic,
    onInitiateBreak,
    onInitiatePomodoro,
  ]);

  return (
    <Container
      color={THEME[theme][INTERVAL[activeTimer].TYPE].BACKGROUND_COLOR}
      height="100vh"
      padding={isDesktop ? '40px 0 66px' : '16px 0 68px'}
    >
      <Subtitle
        size={6}
        center
        color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
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
        color={THEME[theme][INTERVAL[activeTimer].TYPE].CLOCK}
      >
        <Title
          size={10}
          center
          color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
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
            color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
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
              color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
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
              color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
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
          THEME[theme][INTERVAL[activeTimer].TYPE].AUTOMATIC_BUTTON
            .BACKGROUND_COLOR
        }
      >
        <Text
          width="auto"
          color={
            THEME[theme][INTERVAL[activeTimer].TYPE].AUTOMATIC_BUTTON.COLOR
          }
          size={2}
        >
          Modo automático
        </Text>
      </Switch>
      <Separator transparent size={10} />
      <History
        color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
        counter={counter}
      />
      <ColorToggle onClick={onToggleColor} />
      <Footer color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR} />
      <audio id="ring" src={audio}></audio>
    </Container>
  );
};

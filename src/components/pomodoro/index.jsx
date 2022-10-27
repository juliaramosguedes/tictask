import React, { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
import { useGetTimer } from '../../services';
import {
  Button,
  Clock,
  Container,
  Separator,
  Subtitle,
  Switch,
  Text,
} from '../../ui';
import { INTERVAL, THEME } from '../../constants';
import { useBreakpoint } from '../../hooks';
import { default as History } from '../history';
import { default as EditDuration } from '../edit-duration';
import audio from '../../assets/Bell 03.mp3';

export default ({
  pomodoroRef,
  pomodoroScroller,
  settingsRef,
  settingsScroller,
  activeTimer,
  setActiveTimer,
  theme,
}) => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  const {
    timeLeft,
    running,
    finished,
    onSetTime,
    rawTimeFraction,
    playAudio,
    initiateTimer,
    onResetTimer,
  } = useGetTimer();

  const [history, setHistory] = useState(() => {
    let history = localStorage.getItem('history');
    let date = localStorage.getItem('date');
    date = JSON.parse(date);
    const currentDate = DateTime.local().toFormat('yyyy-MM-dd');

    if (history && date === currentDate) {
      history = JSON.parse(history);
      return history;
    } else {
      return {
        POMODORO: [0],
        SHORTBREAK: [0],
        LONGBREAK: [0],
      };
    }
  });
  const [duration, setDuration] = useState(() => {
    let duration = localStorage.getItem('duration');

    if (duration) {
      duration = JSON.parse(duration);
      return duration;
    } else {
      return {
        POMODORO: INTERVAL.POMODORO.TIME,
        SHORTBREAK: INTERVAL.SHORTBREAK.TIME,
        LONGBREAK: INTERVAL.LONGBREAK.TIME,
      };
    }
  });
  const [automatic, setAutomatic] = useState(false);

  const onEditDuration = useCallback(
    (times) => {
      setDuration(times);
      onSetTime(times[activeTimer] * 60);
      localStorage.setItem('duration', JSON.stringify(times));
    },
    [onSetTime, activeTimer]
  );

  const onInitiatePomodoro = useCallback(() => {
    initiateTimer(duration.POMODORO);
    setActiveTimer(INTERVAL.POMODORO.KEY);
    localStorage.setItem('activeTimer', INTERVAL.POMODORO.KEY);
  }, [initiateTimer, duration, setActiveTimer]);

  const onInitiateBreak = useCallback(() => {
    if (history.POMODORO.length > 0 && history.POMODORO.length % 4 === 0) {
      setActiveTimer(INTERVAL.LONGBREAK.KEY);
      initiateTimer(duration.LONGBREAK);
      localStorage.setItem('activeTimer', INTERVAL.LONGBREAK.KEY);
    } else {
      setActiveTimer(INTERVAL.SHORTBREAK.KEY);
      initiateTimer(duration.SHORTBREAK);
      localStorage.setItem('activeTimer', INTERVAL.SHORTBREAK.KEY);
    }
  }, [history, initiateTimer, duration, setActiveTimer]);

  const playRing = useCallback(() => {
    const audio = document.getElementById('ring');
    audio.volume = 0.5;
    audio.play();
  }, []);

  const onToggleAutomatic = useCallback(() => setAutomatic(!automatic), [
    automatic,
  ]);

  useEffect(() => {
    if (finished) {
      const updatedHistory = {
        ...history,
        [activeTimer]: [...history[activeTimer], duration[activeTimer]],
      };

      setHistory((history) => updatedHistory);
      localStorage.setItem('history', JSON.stringify(updatedHistory));
      localStorage.setItem(
        'date',
        JSON.stringify(DateTime.local().toFormat('yyyy-MM-dd'))
      );

      setActiveTimer((activeTimer) =>
        activeTimer === INTERVAL.POMODORO.KEY
          ? INTERVAL.SHORTBREAK.KEY
          : INTERVAL.POMODORO.KEY
      );
      localStorage.setItem(
        'activeTimer',
        activeTimer === INTERVAL.POMODORO.KEY
          ? INTERVAL.SHORTBREAK.KEY
          : INTERVAL.POMODORO.KEY
      );

      if (playAudio) {
        playRing();
      }

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
    playRing,
    activeTimer,
    setActiveTimer,
    automatic,
    onInitiateBreak,
    onInitiatePomodoro,
    history,
    duration,
  ]);

  return (
    <>
      <Container
        color={THEME[theme][INTERVAL[activeTimer].TYPE].BACKGROUND_COLOR}
        height="100vh"
        padding={isDesktop ? '40px 40px 66px' : '16px 16px 68px'}
        ref={pomodoroRef}
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
          clockColor={THEME[theme][INTERVAL[activeTimer].TYPE].CLOCK}
          timeColor={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
          timeLeft={timeLeft}
        />
        <Separator transparent height="36px" />
        <Container display="flex" direction="column">
          {running ? (
            <Button.Main
              onClick={onResetTimer}
              transparent
              color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
              border
              small={!isDesktop}
              circle
              aria-label="Button Stop App"
            >
              <p>PARAR</p>
            </Button.Main>
          ) : (
            <>
              {activeTimer === INTERVAL.SHORTBREAK.KEY ||
              activeTimer === INTERVAL.LONGBREAK.KEY ? (
                <Button.Main
                  onClick={onInitiateBreak}
                  transparent
                  color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
                  border
                  small={!isDesktop}
                  circle
                  aria-label="Button Initiate Break Time"
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
                  aria-label="Button Initiate Pomodoro"
                >
                  <p>INICIAR</p>
                </Button.Main>
              )}
            </>
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
              Play automático
            </Text>
          </Switch>
          <Separator transparent size={2} />
          <EditDuration
            color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
            secondaryColor={
              THEME[theme][INTERVAL[activeTimer].TYPE].AUTOMATIC_BUTTON.COLOR
            }
            onEditDuration={onEditDuration}
            pomodoroScroller={pomodoroScroller}
            settingsRef={settingsRef}
            settingsScroller={settingsScroller}
            duration={duration}
          />
          <Separator transparent size={10} />
          <History
            color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
            history={history}
          />
          <audio id="ring" src={audio}></audio>
        </Container>
      </Container>
    </>
  );
};

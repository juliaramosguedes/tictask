import React, { useState, useCallback, useEffect } from 'react';
import { DateTime } from 'luxon';
// import { findLast, defaultTo } from 'lodash';
import { INTERVAL, THEME } from '../constants';
import { useScroller, useBreakpoint } from '../hooks';
import { Pomodoro, Info, LoadingPomodoro } from '../components';
import { Button, Container } from '../ui';

const scrollerSettings = {
  isInViewportSettings: {
    modBottom: '-200%',
  },
};

export default () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  const {
    ref: pomodoroRef,
    scroller: pomodoroScroller,
    // isInViewport: isPomodoroInViewport,
  } = useScroller(scrollerSettings);
  const {
    ref: infoRef,
    scroller: infoScroller,
    // isInViewport: isInfoInViewport,
  } = useScroller(scrollerSettings);
  const {
    ref: settingsRef,
    scroller: settingsScroller,
    // isInViewport: isSettingsInViewport,
  } = useScroller(scrollerSettings);

  // const visibleSection = defaultTo(
  //   findLast(
  //     [
  //       ['pomodoro', isPomodoroInViewport],
  //       ['info', isInfoInViewport],
  //     ],
  //     '1'
  //   ),
  //   []
  // )[0];

  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(THEME.BRAND.KEY);
  const [activeTimer, setActiveTimer] = useState(() => {
    let activeTimer = localStorage.getItem('activeTimer');
    return activeTimer || INTERVAL.POMODORO.KEY;
  });
  const [showInfo, setShowInfo] = useState(() => {
    let lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
      return false;
    } else {
      localStorage.setItem(
        'lastVisit',
        JSON.stringify(DateTime.local().toFormat('yyyy-MM-dd'))
      );
      return true;
    }
  });

  const onCallToActionClick = useCallback(() => {
    pomodoroScroller();
    setTimeout(() => {
      setShowInfo(false);
    }, 700);
  }, [pomodoroScroller]);

  const onInfoClick = useCallback(() => {
    setShowInfo(true);
    infoScroller();
  }, [infoScroller]);

  const onToggleColor = useCallback(() => {
    if (showInfo) {
      onCallToActionClick();
      setTimeout(() => {
        setTheme(() => {
          if (theme === THEME.BRAND.KEY) return THEME.WHITE.KEY;
          if (theme === THEME.WHITE.KEY) return THEME.DARK.KEY;
          if (theme === THEME.DARK.KEY) return THEME.BRAND.KEY;
        });
      }, 700);
    } else {
      setTheme(() => {
        if (theme === THEME.BRAND.KEY) return THEME.WHITE.KEY;
        if (theme === THEME.WHITE.KEY) return THEME.DARK.KEY;
        if (theme === THEME.DARK.KEY) return THEME.BRAND.KEY;
      });
    }
  }, [theme, onCallToActionClick, showInfo]);

  useEffect(() => {
    if (showInfo && !loading) infoScroller();
  }, [showInfo, loading, infoScroller]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Container
          height="100vh"
          padding={isDesktop ? '40px 40px 66px' : '16px 16px 68px'}
        >
          <LoadingPomodoro />
        </Container>
      ) : (
        <>
          <Pomodoro
            pomodoroRef={pomodoroRef}
            activeTimer={activeTimer}
            setActiveTimer={setActiveTimer}
            theme={theme}
            pomodoroScroller={pomodoroScroller}
            settingsRef={settingsRef}
            settingsScroller={settingsScroller}
          />
          <Info
            showInfo={showInfo}
            onCallToActionClick={onCallToActionClick}
            infoRef={infoRef}
          />
          <Button.Info
            color={THEME[theme][INTERVAL[activeTimer].TYPE].COLOR}
            onClick={onInfoClick}
          />
          <Button.ColorToggle onClick={onToggleColor} />
        </>
      )}
    </>
  );
};

import React, { useState, useCallback, useEffect } from 'react';
import { DateTime } from 'luxon';
import { INTERVAL, THEME } from '../constants';
import { useScroller } from '../hooks';
import { Pomodoro, Info } from '../components';
import { Button } from '../ui';

const scrollerSettings = {
  isInViewportSettings: {
    modBottom: '-200%',
  },
};

export default () => {
  const { ref: pomodoroRef, scroller: pomodoroScroller } = useScroller(
    scrollerSettings
  );
  const { ref: infoRef, scroller: infoScroller } = useScroller(
    scrollerSettings
  );

  const [theme, setTheme] = useState(THEME.BRAND.KEY);
  const [activeTimer, setActiveTimer] = useState(INTERVAL.POMODORO.KEY);
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
    if (showInfo) infoScroller();
  }, [showInfo, infoScroller]);

  return (
    <>
      <Pomodoro
        pomodoroRef={pomodoroRef}
        activeTimer={activeTimer}
        setActiveTimer={setActiveTimer}
        theme={theme}
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
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { INTERVAL, THEME } from '../constants';
import { useScroller } from '../hooks';
import { Pomodoro, Info } from '../components';
import { Button } from '../ui';

const scrollerSettings = {
  isInViewportSettings: {
    modBottom: '0%',
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
  const [showInfo, setShowInfo] = useState(true);

  const onToggleColor = useCallback(
    () =>
      setTheme(() => {
        if (theme === THEME.BRAND.KEY) return THEME.WHITE.KEY;
        if (theme === THEME.WHITE.KEY) return THEME.DARK.KEY;
        if (theme === THEME.DARK.KEY) return THEME.BRAND.KEY;
      }),
    [theme]
  );

  const onCallToActionClick = useCallback(() => {
    pomodoroScroller();
    setShowInfo(false);
  }, [pomodoroScroller]);

  const onInfoClick = useCallback(() => {
    setShowInfo(true);
  }, []);

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

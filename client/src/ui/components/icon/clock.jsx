import React from 'react';

export default (props) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    role="img"
    aria-labelledby="iconClockTitle iconClockDesc"
    className="base-timer__svg"
    {...props}
  >
    <title id="iconClockTitle">Relógio</title>
    <desc id="iconClockDesc">Ícone exibindo um relógio.</desc>
    <g className="base-timer__circle">
      <circle className="base-timer__path-elapsed" cx="50" cy="50" r="43" />
      <path
        id="base-timer-path-remaining"
        strokeDasharray="283"
        className="base-timer__path-remaining"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      />
    </g>
  </svg>
);

import React from 'react';

const SvgAlertCircleBold = (props) => (
  <svg
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="none"
    aria-labelledby="iconAlertCircleBoldTitle iconAlertCircleBoldDesc"
    {...props}
  >
    <title id="iconAlertCircleBoldTitle">Alerta</title>
    <desc id="iconAlertCircleBoldDesc">
      Icone exibindo um ponto de exclamação indicando um alerta.
    </desc>
    <path
      d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334zm0-9.334V8m0 2.667h.007"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgAlertCircleBold;

import React from 'react';

const SvgInfoCircleBold = (props) => (
  <svg
    viewBox="0 0 14 14"
    width={14}
    height={14}
    fill="none"
    aria-labelledby="iconInfoCircleBoldTitle iconInfoCircleBoldDesc"
    {...props}
  >
    <title id="iconInfoCircleBoldTitle">Info</title>
    <desc id="iconInfoCircleBoldDesc">
      Icone exibindo a letra i indicando uma informação.
    </desc>
    <path
      d="M7 12.833A5.833 5.833 0 107 1.167a5.833 5.833 0 000 11.666zm0-3.5V7m0-2.333h.006"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgInfoCircleBold;

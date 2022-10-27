import React from 'react';

export default (props) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    role="img"
    aria-labelledby="iconColorToggleTitle iconColorToggleDesc"
    className="base-timer__svg"
    {...props}
  >
    <title id="iconColorToggleTitle">Disco colorido</title>
    <desc id="iconColorToggleDesc">
      Ícone exibindo um disco dividido em fatias coloridas.
    </desc>
    <g filter="url(#filter0_d)">
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.9986 24.9796L0.999845 24.9793C1.00514 18.3596 3.69585 12.3643 8.04223 8.02321L24.9986 24.9796Z"
          fill="#F0134D"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.024 41.9556C3.68537 37.6127 1.00099 31.6172 1.00089 24.9993L1.00218 24.9802L24.9993 24.9803L8.024 41.9556Z"
          fill="#F86624"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.0013 49.0011C18.373 49.0008 12.3686 46.3075 8.02539 41.9585L25.0014 24.9824L25.0013 49.0011Z"
          fill="#F8C805"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.0005 49.0005L25.0006 24.9818L26.62 26.5997L41.9772 41.9569C37.6325 46.307 31.6279 48.9999 25.0005 49.0005Z"
          fill="#DBE6E8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.9994 1.00072L25.0001 24.9796L24.9993 24.9803L8.04297 8.02393C12.3872 3.68504 18.3822 0.999896 24.9994 1.00072Z"
          fill="#10C998"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.0008 1.00064C31.6188 1.00074 37.6149 3.68439 41.9579 8.02303L25.0015 24.9795L25.0008 1.00064Z"
          fill="#9DAEB0"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M41.9587 8.02376C46.3033 12.3626 48.995 18.3595 49.0001 24.9796L25.0029 24.9795L41.9587 8.02376Z"
          fill="#0E131F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.9979 24.9803L48.9991 25.0004C48.999 31.6167 46.3148 37.6126 41.9759 41.9568L25 24.981L48.9979 24.9803Z"
          fill="#F6F7F8"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="52"
        height="52"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <clipPath id="clip0">
        <rect x="1" y="1" width="48" height="48" fill="#ffffff" />
      </clipPath>
    </defs>
  </svg>
);

import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { default as Title } from '../title';
import { SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  children,
  timeLeft,
  clockColor,
  timeColor,
  rawTimeFraction,
  ...props
}) => (
  <div
    {...props}
    className={cx(
      'clock',
      css`
        position: relative;
        width: 170px;
        height: 170px;
        margin: 0 auto;
        border-radius: 50%;
        border: none;
        z-index: 1;
        background-image: linear-gradient(
          -90deg,
          rgba(256, 256, 256, 0.2) 0%,
          rgba(256, 256, 256, 0.5) 50%,
          rgba(256, 256, 256, 0.2) 100%
        );
        background-size: 400% 400%;
        animation: shimmer 1.5s ease-in-out 1;
        animation-delay: 1s;

        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -135% 0%;
          }
        }
        .base-timer__svg {
          transform: scaleX(-1);
          width: 200px;
          height: 200px;
          top: -15px;
          left: -15px;
          position: absolute;
          z-index: 2;
        }

        .base-timer__circle {
          fill: none;
          stroke: none;
          z-index: 2;
        }

        .base-timer__path-elapsed {
          stroke-width: 1px;
          stroke: ${clockColor};
          z-index: 2;
        }

        .base-timer__path-remaining {
          stroke-width: 3px;
          stroke-linecap: square;
          transform: rotate(90deg);
          transform-origin: center;
          transition: 1s linear all;
          fill-rule: nonzero;
          stroke: ${clockColor};
          stroke-dasharray: ${rawTimeFraction * 280} 280;
          z-index: 2;
        }

        .base-timer__label {
          position: absolute;
          width: 200px;
          height: 200px;
          top: -10px;
          left: -15px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          width: 230px;
          height: 230px;

          .base-timer__svg {
            width: 270px;
            height: 270px;
            top: -20px;
            left: -20px;
          }

          .base-timer__label {
            width: 270px;
            height: 270px;
            top: -10px;
            left: -20px;
          }
        }
      `,
      props.className
    )}
  >
    <Icon.Clock />
    <span id="base-timer-label" className="base-timer__label">
      <Title size={10} center color={timeColor}>
        {timeLeft}
      </Title>
    </span>
  </div>
);

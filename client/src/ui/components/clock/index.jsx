import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  children,
  timeLeft,
  white = false,
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
        background-color: rgba(256, 256, 256, 0.1);
        border-radius: 50%;
        border: none;
        z-index: 1;

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
          stroke: ${white ? 'white' : ColorBrandBase};
          z-index: 2;
        }

        .base-timer__path-remaining {
          stroke-width: 3px;
          stroke-linecap: square;
          transform: rotate(90deg);
          transform-origin: center;
          transition: 1s linear all;
          fill-rule: nonzero;
          stroke: ${white ? 'white' : ColorBrandBase};
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
            transform: scaleX(-1);
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
      {children}
    </span>
  </div>
);

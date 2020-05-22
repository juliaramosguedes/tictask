import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { ColorBrandBase } from '../../tokens';

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
        width: 300px;
        height: 300px;
        margin: 0 auto;

        .base-timer__svg {
          transform: scaleX(-1);
          width: 300px;
          height: 300px;
        }

        .base-timer__circle {
          fill: none;
          stroke: none;
        }

        .base-timer__path-elapsed {
          stroke-width: 1px;
          stroke: ${white ? 'white' : ColorBrandBase};
        }

        .base-timer__path-remaining {
          stroke-width: 5px;
          stroke-linecap: square;
          transform: rotate(90deg);
          transform-origin: center;
          transition: 1s linear all;
          fill-rule: nonzero;
          stroke: ${white ? 'white' : ColorBrandBase};
          stroke-dasharray: ${rawTimeFraction * 283} 283;
        }

        .base-timer__label {
          position: absolute;
          width: 300px;
          height: 300px;
          top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
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

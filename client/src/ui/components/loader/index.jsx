import React from 'react';
import { css, cx } from 'emotion';
import { getColor } from '../../../utils';
import { ColorBrandBase } from '../../tokens';

export default ({
  size = 32,
  color = ColorBrandBase,
  fluid = false,
  fullscreen = false,
  ...props
}) => (
  <div
    {...props}
    className={cx(
      'loader',
      css`
        display: inline-block;
        margin: 0;
        text-align: center;
        width: 100%;

        & > div {
          animation: loader 1s linear infinite;
          border: ${`${size * 0.0625}px`} solid ${getColor(color)};
          border-left-color: transparent;
          border-radius: 50%;
          display: inline-block;
          height: ${`${size}px`};
          position: relative;
          width: ${`${size}px`};
          z-index: 1000;

          @keyframes loader {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      `,
      fullscreen &&
        css`
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          text-align: left;
          top: 0;

          & > div {
            left: calc(50% - ${`${size / 2}px`});
            top: calc(50% - ${`${size / 2}px`});
          }
        `,
      props.className
    )}
  >
    <div />
  </div>
);

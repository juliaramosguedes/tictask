import React from 'react';
import { css, cx } from 'emotion';

export default (props) => (
  <div
    {...props}
    className={cx(
      'skeleton',
      css`
        background-image: linear-gradient(
          -90deg,
          #e7edf1 0%,
          #f8f8f8 50%,
          #e7edf1 100%
        );
        background-size: 400% 400%;
        animation: shimmer 1.2s ease-in-out infinite;
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -135% 0%;
          }
        }
        &.white {
          background-image: linear-gradient(
            -90deg,
            #ffffff 0%,
            #e7edf1 50%,
            #ffffff 100%
          );
        }
      `,
      props.className
    )}
  />
);

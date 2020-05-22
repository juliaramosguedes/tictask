import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase } from '../../index';

export default ({
  border = false,
  children,
  color = ColorBrandBase,
  padding = '16px 16px',
  borderRadius = '50%',
  small = false,
  transparent = false,
  gradient = '',
  width = 'auto',
  ...props
}) => (
  <button
    {...props}
    className={cx(
      'main-button',
      css`
        background-color: ${transparent ? 'transparent' : color};
        background-image: ${gradient};
        border: ${border ? '1px solid ' + color : 'none'};
        margin: 0;
        padding: ${padding};
        width: 100px;
        height: 100px;
        border-radius: ${borderRadius};
        cursor: pointer;

        p {
          color: ${transparent ? color : 'white'};
          font-size: ${small ? 12 : 16}px;
          font-weight: bold;
          margin: 0;
          text-align: center;
        }

        svg {
          width: ${small ? 16 : 24}px;
          margin: 0 8px 0 0;

          path {
            stroke: ${transparent ? ColorBrandBase : 'white'};
          }
        }
      `,
      props.className
    )}
  >
    {children}
  </button>
);

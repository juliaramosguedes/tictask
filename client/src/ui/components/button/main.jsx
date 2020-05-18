import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../index';

export default ({
  border = false,
  children,
  color = ColorBrandBase,
  padding = '8px 16px',
  borderRadius = '8px',
  small = false,
  transparent = false,
  width = 'auto',
  ...props
}) => (
  <button
    {...props}
    className={cx(
      'button',
      css`
        background-color: ${transparent ? 'transparent' : color};
        border: ${border ? '1px solid ' + color : 'none'};
        margin: 0;
        padding: ${padding};
        width: ${width};
        border-radius: ${borderRadius};

        p {
          color: ${transparent ? color : 'white'};
          font-size: ${small ? 12 : 16}px;
          font-weight: bold;
        }

        svg {
          width: ${small ? 16 : 24}px;
          margin: 0 8px 0 0;

          path {
            stroke: ${transparent ? ColorBrandBase : 'white'};
          }
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          padding: ${padding ? padding : '8px 32px'};
        }
      `,
      props.className
    )}
  >
    {children}
  </button>
);

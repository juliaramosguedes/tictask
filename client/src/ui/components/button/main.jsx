import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  border = false,
  children,
  color = ColorBrandBase,
  padding = '8px 8px',
  borderRadius = '8px',
  small = false,
  transparent = false,
  gradient = '',
  circle = false,
  width = 'auto',
  bold = false,
  ...props
}) => (
  <button
    {...props}
    className={cx(
      'main-button',
      circle && 'circle',
      css`
        background-color: ${transparent ? 'transparent' : color};
        background-image: ${gradient};
        border: ${border ? '1px solid ' + color : 'none'};
        margin: 0;
        padding: ${padding};
        border-radius: ${borderRadius};
        cursor: pointer;

        &.circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        p {
          color: ${transparent ? color : 'white'};
          font-size: ${small ? 12 : 16}px;
          font-weight: ${bold ? 'bold' : 'normal'};
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

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          &.circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }
      `,
      props.className
    )}
  >
    {children}
  </button>
);

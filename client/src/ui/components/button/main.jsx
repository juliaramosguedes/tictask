import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  border,
  children,
  color = ColorBrandBase,
  borderColor = color,
  padding = '8px 8px',
  borderRadius = '4px',
  small,
  transparent,
  gradient = '',
  circle,
  width = 'auto',
  bold,
  textColor = '#ffffff',
  flex,
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
        border: ${border ? '1px solid ' + borderColor : 'none'};
        margin: 0;
        padding: ${padding};
        width: ${width};
        border-radius: ${borderRadius};
        ${flex &&
        `display: flex;
        align-items: center;`}

        transition: background-color 0.5s;
        transition: font-weight 1s;

        &:hover {
          ${border
            ? 'background-color: rgba(1, 1, 1, 0.1)'
            : `p {
            font-weight: bold;
          }`};
        }

        &.circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        p {
          color: ${transparent ? color : textColor};
          font-size: ${small ? 12 : 14}px;
          font-weight: ${bold ? 'bold' : 'normal'};
          margin: 0;
          text-align: center;
        }

        svg {
          width: ${small ? 16 : 24}px;
          height: ${small ? 16 : 24}px;
          margin: 0 8px 0 0;

          path {
            stroke: ${transparent ? ColorBrandBase : '#ffffff'};
          }
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          &.circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }

          p {
            font-size: ${small ? 12 : 16}px;
          }
        }
      `,
      props.className
    )}
  >
    {children}
  </button>
);

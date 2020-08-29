import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  size = 1,
  bold,
  noMargin,
  color = ColorBrandBase,
  width = '100%',
  center,
  white,
  display = 'block',
  maxWidth = '100%',
  messages,
  ...props
}) => (
  <ul
    {...props}
    className={cx(
      'text',
      css`
        font-size: ${10 + size * 2}px;
        font-weight: ${bold ? 'bold' : 'normal'};
        color: ${white ? '#ffffff' : color};
        margin-bottom: ${noMargin ? 0 : '8px'};
        width: ${width};
        max-width: ${maxWidth};
        text-align: ${center ? 'center' : 'left'};
        display: ${display};
        justify-content: center;
        align-items: center;

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          font-size: ${12 + size * 2}px;
        }
      `,
      props.className
    )}
  >
    {messages &&
      messages.map((message, index) => (
        <li key={`list-${index}`}>{message}</li>
      ))}
  </ul>
);

import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  size = 1,
  bold,
  color = ColorBrandBase,
  center,
  white,
  ...props
}) => (
  <span
    {...props}
    className={cx(
      'text',
      css`
        font-size: ${10 + size * 2}px;
        font-weight: ${bold ? 'bold' : 'normal'};
        color: ${white ? 'white' : color};

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          font-size: ${12 + size * 2}px;
        }
      `,
      props.className
    )}
  />
);

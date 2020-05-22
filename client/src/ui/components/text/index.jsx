import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase } from '../../tokens';

export default ({
  size = 1,
  bold = false,
  noMargin = false,
  color = ColorBrandBase,
  width = '100%',
  center = false,
  white = false,
  ...props
}) => (
  <p
    {...props}
    className={cx(
      'text',
      css`
        font-size: ${10 + size * 2}px;
        font-weight: ${bold ? 'bold' : 'normal'};
        color: ${white ? 'white' : color};
        margin-bottom: ${noMargin ? 0 : '8px'};
        width: ${width};
        text-align: ${center ? 'center' : 'left'};
      `,
      props.className
    )}
  />
);

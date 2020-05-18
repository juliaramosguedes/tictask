import React from 'react';
import { css, cx } from 'emotion';
import { ColorNeutralDark } from '../../index';

export default ({
  size = 1,
  bold = false,
  noMargin = false,
  color = ColorNeutralDark,
  width = '100%',
  alignment = 'left',
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
        text-align: ${alignment};
      `,
      props.className
    )}
  />
);

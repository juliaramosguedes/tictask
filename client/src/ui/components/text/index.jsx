import React from 'react';
import { css, cx } from 'emotion';
import { ColorNeutralLightDark, ColorNeutralDark } from '../../index';

export default ({
  size = 1,
  bold = false,
  noMargin = false,
  color = ColorNeutralDark,
  width = '100%',
  alignment = 'left',
  light = false,
  ...props
}) => (
  <p
    {...props}
    className={cx(
      'title',
      css`
        font-size: ${10 + size * 2}px;
        font-weight: ${bold ? 'bold' : 'normal'};
        color: ${light ? ColorNeutralLightDark : color};
        margin-bottom: ${noMargin ? 0 : '8px'};
        width: ${width};
        text-align: ${alignment};
      `,
      props.className
    )}
  />
);

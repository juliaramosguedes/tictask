import React from 'react';
import { css, cx } from 'emotion';
import { ColorNeutralDarker } from '../../index';

export default ({
  size = 2,
  weight = 900,
  noMargin = false,
  color = ColorNeutralDarker,
  center = false,
  width = '100%',
  ...props
}) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h1
    {...props}
    className={cx(
      'title',
      css`
        font-size: ${12 + size * 4}px;
        font-weight: ${weight};
        color: ${color};
        margin-bottom: ${noMargin ? 0 : '16px'};
        width: ${width};
        text-align: ${center ? 'center' : 'start'};
      `,
      props.className
    )}
  />
);

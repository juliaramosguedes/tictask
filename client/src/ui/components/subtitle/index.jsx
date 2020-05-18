import React from 'react';
import { css, cx } from 'emotion';
import { ColorNeutralDarker } from '../../index';

export default ({
  size = 2,
  weight = 'normal',
  noMargin = false,
  color = ColorNeutralDarker,
  width = '100%',
  center = false,
  ...props
}) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h2
    {...props}
    className={cx(
      'subtitle',
      css`
        font-size: ${12 + size * 2}px;
        font-weight: ${weight};
        color: ${color};
        margin: ${noMargin ? 0 : '0 0 8px'};
        width: ${width};
        text-align: ${center ? 'center' : 'start'};
      `,
      props.className
    )}
  />
);

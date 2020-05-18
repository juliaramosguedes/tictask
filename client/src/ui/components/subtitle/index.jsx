import React from 'react';
import { css, cx } from 'emotion';
import { ColorNeutralDarker } from '../../index';

export default ({
  size = 2,
  weight = 'normal',
  noMargin = false,
  color = ColorNeutralDarker,
  width = '100%',
  ...props
}) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h2
    {...props}
    className={cx(
      'courses-title',
      css`
        font-size: ${12 + size * 2}px;
        font-weight: ${weight};
        color: ${color};
        margin-bottom: ${noMargin ? 0 : '8px'};
        width: ${width};
      `,
      props.className
    )}
  />
);

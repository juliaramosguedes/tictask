import React from 'react';
import { css, cx } from 'emotion';
import { ColorBrandBase, SizeMinWidthScreenDesktop } from '../../tokens';

export default ({
  size = 2,
  weight = 'normal',
  noMargin = false,
  color = ColorBrandBase,
  width = '100%',
  white = false,
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
        color: ${white ? 'white' : color};
        margin: ${noMargin ? 0 : '0 0 8px'};
        width: ${width};
        text-align: ${center ? 'center' : 'start'};

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          font-size: ${12 + size * 3}px;
        }
      `,
      props.className
    )}
  />
);

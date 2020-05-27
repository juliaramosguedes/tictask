import React from 'react';
import { css, cx } from 'emotion';

export default ({
  margin = '0',
  padding,
  display = 'block',
  justifyContent = 'center',
  direction = 'row',
  maxWidth = '100%',
  height = 'auto',
  color = 'transparent',
  position = 'relative',
  ...props
}) => (
  <div
    {...props}
    className={cx(
      'container',
      css`
        margin: ${margin};
        padding: ${padding};
        display: ${display};
        justify-content: ${justifyContent};
        flex-direction: ${direction};
        max-width: ${maxWidth};
        min-height: ${height};
        background-image: ${color};
        position: ${position};
      `,
      props.className
    )}
  />
);

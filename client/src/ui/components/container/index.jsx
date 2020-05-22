import React from 'react';
import { css, cx } from 'emotion';

export default ({
  margin = '0',
  padding = '16px',
  display = 'block',
  justifyContent = 'center',
  direction = 'row',
  maxWidth = '100%',
  height = 'auto',
  color = 'transparent',
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
        height: ${height};
        background-image: ${color};
      `,
      props.className
    )}
  />
);

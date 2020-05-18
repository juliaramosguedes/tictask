import React from 'react';
import { css, cx } from 'emotion';

export default ({
  margin = '0 auto',
  padding = '16px',
  display = 'block',
  justifyContent = 'center',
  maxWidth = '100%',
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
        max-width: ${maxWidth};
      `,
      props.className
    )}
  />
);

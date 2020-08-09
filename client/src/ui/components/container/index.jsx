import React, { forwardRef } from 'react';
import { css, cx } from 'emotion';

export default forwardRef(
  (
    {
      margin = '0',
      padding = '0',
      display = 'block',
      justifyContent = 'center',
      direction = 'row',
      maxWidth = '100%',
      height = 'auto',
      color = 'transparent',
      position = 'relative',
      ...props
    },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
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
          align-items: center;
        `,
        props.className
      )}
    />
  )
);

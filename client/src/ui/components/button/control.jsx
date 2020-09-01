import React from 'react';
import { css, cx } from 'emotion';

export default ({ color, ...props }) => (
  <button
    {...props}
    aria-label="Button Show Information"
    className={cx(
      'button-show-information',
      css`
        border: 0;
        background-color: transparent;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
      `,
      props.className
    )}
  />
);

import React from 'react';
import { css, cx } from 'emotion';

const FieldError = ({ inline, color, ...props }) => (
  <div
    {...props}
    className={cx(
      'field-error',
      css`
        color: ${color};
        font-size: 12px;
        margin-top: 6px;
      `,
      props.className
    )}
  />
);

export default FieldError;

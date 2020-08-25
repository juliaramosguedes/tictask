import React from 'react';
import { css, cx } from 'emotion';
import { hexToRGB } from '../../../utils';

const FieldError = ({ inline, color, ...props }) => (
  <div
    {...props}
    className={cx(
      'field-error',
      css`
        color: ${hexToRGB(color, 0.8)};
        font-size: 12px;
      `,
      props.className
    )}
  />
);

export default FieldError;

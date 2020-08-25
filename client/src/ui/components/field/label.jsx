import React from 'react';
import { css, cx } from 'emotion';

const FieldLabel = ({ color, ...props }) => (
  <label
    {...props}
    className={cx(
      'field-label',
      css`
        color: ${color};
        margin-bottom: 4px;
        text-align: center;
        width: 100%;
      `,
      props.className
    )}
  />
);

export default FieldLabel;

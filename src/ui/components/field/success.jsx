import React from 'react';
import { css, cx } from 'emotion';
import { ColorSemanticSuccess } from '../../tokens';

const FieldSuccess = ({ inline, ...props }) => (
  <div
    {...props}
    className={cx(
      'field-success',
      css`
        color: ${ColorSemanticSuccess};
        font-size: 12px;
      `
    )}
  />
);

export default FieldSuccess;

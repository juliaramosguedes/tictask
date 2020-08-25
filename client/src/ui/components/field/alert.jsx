import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { ColorAccentBase, ColorNeutralDarker } from '../../tokens';

const AlertIcon = () => (
  <Icon.SvgAlertCircleBold
    className={cx(
      'alert-icon',
      css`
        height: auto;
        margin-right: 4px;
        margin-top: -3px;
        width: 16px;

        path {
          stroke: ${ColorAccentBase};
        }
      `
    )}
  />
);

const FieldAlert = ({ children, ...props }) => (
  <p
    {...props}
    className={cx(
      'field-alert',
      css`
        color: ${ColorNeutralDarker};
        font-size: 12px;
        margin-bottom: 0;
        margin-top: 16px;
      `
    )}
  >
    <AlertIcon />
    {children}
  </p>
);

export default FieldAlert;

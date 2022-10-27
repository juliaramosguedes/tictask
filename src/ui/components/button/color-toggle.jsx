import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { SizeMinWidthScreenDesktop } from '../../tokens';

export default (props) => (
  <button
    {...props}
    aria-label="Button Toggle Theme"
    className={cx(
      'button-toggle-theme',
      css`
        position: fixed;
        bottom: 16px;
        right: 16px;
        border: 0;
        background-color: transparent;

        svg {
          width: 42px;
          height: 42px;
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          bottom: 24px;
          right: 24px;

          svg {
            width: 52px;
            height: 52px;
          }
        }
      `,
      props.className
    )}
  >
    <Icon.ColorToggle />
  </button>
);

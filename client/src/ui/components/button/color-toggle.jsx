import React from 'react';
import { css, cx } from 'emotion';
import { default as Icon } from '../icon';
import { SizeMinWidthScreenDesktop } from '../../tokens';

export default (props) => (
  <button
    {...props}
    className={cx(
      'button-toggle-color',
      css`
        position: fixed;
        bottom: 16px;
        right: 16px;
        border: 0;
        background-color: transparent;

        svg {
          width: 36px;
          height: 36px;
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

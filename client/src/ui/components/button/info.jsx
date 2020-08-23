import React from 'react';
import { css, cx } from 'emotion';
import { TiInfoLarge } from 'react-icons/ti';
import { SizeMinWidthScreenDesktop } from '../../tokens';

export default ({ color, ...props }) => (
  <button
    {...props}
    aria-label="Button Show Information"
    className={cx(
      'button-show-information',
      css`
        position: absolute;
        top: 17px;
        right: 17px;
        border: 0;
        background-color: transparent;

        svg {
          width: 34px;
          height: 34px;
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          top: 26px;
          right: 26px;

          svg {
            width: 40px;
            height: 40px;
          }
        }
      `,
      props.className
    )}
  >
    <TiInfoLarge color={color} />
  </button>
);

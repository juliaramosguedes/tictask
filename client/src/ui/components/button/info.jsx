import React from 'react';
import { css, cx } from 'emotion';
import { TiInfoLarge } from 'react-icons/ti';
import { SizeMinWidthScreenDesktop } from '../../tokens';

export default ({ color, ...props }) => (
  <button
    {...props}
    className={cx(
      'button-toggle-color',
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
            width: 49px;
            height: 49px;
          }
        }
      `,
      props.className
    )}
  >
    <TiInfoLarge color={color} />
  </button>
);

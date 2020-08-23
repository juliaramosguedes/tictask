import React from 'react';
import { css, cx } from 'emotion';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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
          width: 36px;
          height: 36px;
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          top: 26px;
          right: 26px;
        }
      `,
      props.className
    )}
  >
    <AiOutlineInfoCircle color={color} />
  </button>
);

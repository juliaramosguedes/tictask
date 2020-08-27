import React from 'react';
import { css, cx } from 'emotion';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default ({ icon: Icon, color, left, right, ...props }) => (
  <button
    {...props}
    className={cx(
      'input-number-button',
      css`
        border: 0;
        margin: 0;
        padding: 12px;
        width: 55px;
        background-color: transparent;
        transition: stroke-width 0.5s;

        &:hover {
          svg {
            width: 24px;
            height: 24px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
          margin-bottom: 2px;
        }
      `,
      props.className
    )}
  >
    {left && <FiMinus color={color} />}
    {right && <FiPlus color={color} />}
  </button>
);

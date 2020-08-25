import React from 'react';
import { css, cx } from 'emotion';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

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
            stroke-width: 2;
          }
        }

        svg {
          width: 18px;
          height: 18px;
          margin-bottom: 2px;
        }
      `,
      props.className
    )}
  >
    {left && <AiOutlineMinus color={color} />}
    {right && <AiOutlinePlus color={color} />}
  </button>
);

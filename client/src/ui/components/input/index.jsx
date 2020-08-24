import React from 'react';
import { css, cx } from 'emotion';

export default ({ children, color, id, type, label, ...props }) => (
  <div
    className={cx(
      'input',
      css`
        display: flex;
        flex-direction: column;
        align-items: center;
        color: ${color};

        label {
          position: relative;
          display: inline-block;
          font-size: 16px;
        }

        input {
          max-width: 155px;
          border-radius: 4px;
          height: 39px;
          border: 1px solid ${color};
          background: rgba(0, 0, 0, 0.15);
          color: ${color};
          box-sizing: border-box;
          display: inline-block;
          font-size: 16px;
          outline: 0;
          padding: 12px;
          width: 100%;
          text-align: center;
        }

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      `,
      props.className
    )}
  >
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} {...props} />
  </div>
);

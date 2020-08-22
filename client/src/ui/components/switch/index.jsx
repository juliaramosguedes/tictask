import React from 'react';
import { css, cx } from 'emotion';

export default ({ children, color, onToggleAutomatic, ...props }) => (
  <div
    {...props}
    className={cx(
      'switch',
      css`
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;

        p {
          margin: 0 0 0 8px;
        }

        label {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 19px;
          margin: auto 0;
        }

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(153, 153, 153, 0.45);
          box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25);
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: '';
          height: 21px;
          width: 21px;
          left: -1px;
          bottom: -1px;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          background-color: #ffffff;
          border: 0.5px solid rgba(35, 31, 32, 0.1);
          box-sizing: border-box;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25),
            inset -1px -1px 1px rgba(0, 0, 0, 0.15);
        }

        input:checked + .slider {
          background-color: ${color};
        }

        input:focus + .slider {
          box-shadow: 0 0 1px ${color};
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(21px);
          -ms-transform: translateX(21px);
          transform: translateX(21px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `,
      props.className
    )}
  >
    <label>
      <input type="checkbox" onClick={onToggleAutomatic} />
      <span className="slider round" />
    </label>
    {children}
  </div>
);

import React from 'react';
import { css, cx } from 'emotion';
import { ColorDarkBackground } from '../../index';

export default ({ SvgIcon, onClick, text, size, ...props }) => (
  <div
    {...props}
    className={cx(
      'tooltip',
      css`
        position: relative;

        &:hover {
          .tooltiptext {
            visibility: visible;
          }
        }

        .tooltiptext {
          background-color: ${ColorDarkBackground};
          border-radius: 6px;
          padding: 2px 8px;
          visibility: hidden;
          position: absolute;
          bottom: 150%;
          left: 0%;
          margin-left: ${size * -33.33}px;
          z-index: 10;
          width: ${size * 73.33}px;
          color: #fff;
          font-size: 14px;
          font-weight: normal;
          text-align: center;
        }

        .tooltiptext:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 47%;
          border-width: 5px;
          border-style: solid;
          border-color: black transparent transparent transparent;
        }
      `,
      props.className
    )}
  >
    {SvgIcon && <SvgIcon onClick={onClick} />}
    <p className="tooltiptext">{text}</p>
  </div>
);

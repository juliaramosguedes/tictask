import React from 'react';
import { css, cx } from 'emotion';
import { SizeMaxWidthScreenDesktop } from '../../tokens';

const FieldBox = ({ inline, ...props }) => (
  <div
    {...props}
    className={cx(
      'fieldbox',
      inline ? 'inline' : 'block',
      css`
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        width: 100%;

        &:last-child {
          margin-bottom: 0;
        }

        &.inline {
          @media (min-width: ${SizeMaxWidthScreenDesktop}) {
            flex: 1;
            margin: 0 8px;

            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }

        &.block + &.inline {
          margin-left: 0;
        }

        &.inline + &.block {
          margin-top: 24px;
        }
      `,
      props.className
    )}
  />
);

export default FieldBox;

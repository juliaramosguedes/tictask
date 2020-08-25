import React, { forwardRef } from 'react';
import { css, cx, injectGlobal } from 'emotion';
import {
  ColorBrandBase,
  ColorTextPlaceholder,
  ColorSemanticError,
  DarkBoxShadow,
} from '../../tokens';

injectGlobal`
::placeholder {
  color: ${ColorTextPlaceholder};
}
`;

const Input = ({ hasError, isLoading, placeholder, color, ...props }, ref) => (
  <input
    ref={ref}
    placeholder={placeholder}
    {...props}
    {...(isLoading ? { value: 'Carregando...', disabled: true } : {})}
    className={cx(
      'input',
      hasError && 'has-error',
      css`
        background: rgba(0, 0, 0, 0.15);
        box-shadow: ${DarkBoxShadow};
        border: 1px solid #fff;
        box-sizing: border-box;
        color: ${color};
        display: inline-block;
        font-size: 16px;
        outline: 0;
        padding: 12px;
        width: 100%;
        text-align: center;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }

        &[disabled] {
          background-color: rgba(0, 0, 0, 0.3);
          opacity: 0.5;
        }

        &:focus {
          border-color: ${ColorBrandBase};
        }

        &.has-error {
          &,
          &:focus {
            border-color: ${ColorSemanticError};
          }
        }
      `,
      props.className
    )}
  />
);

export default forwardRef(Input);

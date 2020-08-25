import React, { forwardRef } from 'react';
import { css, cx } from 'emotion';
import { default as Button } from '../button';
import { default as Input } from './input';

const InputNumber = (
  {
    hasError,
    isLoading,
    placeholder,
    color,
    onPlusClick,
    onMinusClick,
    ...props
  },
  ref
) => (
  <>
    <Button.InputNumber color={color} left onClick={onMinusClick} />
    <Input
      ref={ref}
      placeholder={placeholder}
      {...props}
      className={cx(
        'input-number',
        css`
          color: ${color};
          border-bottom: 1px solid ${color};
          width: 55px;
          margin: 0 4px;
        `,
        props.className
      )}
    />
    <Button.InputNumber color={color} right onClick={onPlusClick} />
  </>
);

export default forwardRef(InputNumber);

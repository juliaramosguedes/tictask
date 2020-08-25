import React, { createElement, forwardRef } from 'react';

import Input from '../input';
import FieldLabel from './label';
import FieldError from './error';
import FieldAlert from './alert';
import FieldInfo from './info';
import FieldSuccess from './success';

let fieldCount = 0;

const Field = (
  {
    id,
    name,
    label,
    className,
    inputClassName,
    as = Input,
    error = undefined,
    alert = undefined,
    success = undefined,
    info = undefined,
    color,
    labelProps = { color },
    inputProps = {},
    ...props
  },
  ref
) => {
  id = id || `${name}-${fieldCount++}`;
  name = name || id;

  return (
    <div className={className}>
      {label || info ? (
        <FieldLabel {...labelProps} htmlFor={id}>
          {label}
          {info && <FieldInfo>{info}</FieldInfo>}
        </FieldLabel>
      ) : null}
      {createElement(as, {
        ref,
        ...props,
        ...inputProps,
        className: inputClassName,
        id,
        name,
        color,
        hasError: error,
      })}
      {error && <FieldError color={color}>{error}</FieldError>}
      {alert && <FieldAlert>{alert}</FieldAlert>}
      {success && <FieldSuccess>{success}</FieldSuccess>}
    </div>
  );
};

export default forwardRef(Field);

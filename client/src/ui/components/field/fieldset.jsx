import React, { isValidElement, cloneElement } from 'react';
import { css, cx } from 'emotion';
import { Box } from 'reakit/Box';

const Fieldset = ({
  legend,
  sublegend,
  children,
  as: type,
  borderless = true,
  width = 'auto',
  ...props
}) => (
  <Box
    as={type ? type : legend ? 'fieldset' : 'div'}
    {...props}
    className={cx(
      'fieldset',
      !borderless &&
        css`
          border: 1px solid #fff;
          border-radius: 4px;
          padding: 24px;
        `,
      css`
        color: #fff;
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 32px;
        width: ${width};

        &:last-child {
          margin-bottom: 0;
        }

        & > legend {
          margin-bottom: 16px;
        }

        & > .fieldset-sublegend {
          font-size: 12px;
          font-weight: bold;
        }
      `,
      props.className
    )}
  >
    {isValidElement(legend) ? legend : legend && <legend>{legend}</legend>}
    {isValidElement(sublegend)
      ? cloneElement(sublegend, {
          className: cx('fieldset-sublegend', sublegend.props.className),
        })
      : sublegend && <p className="fieldset-sublegend">{sublegend}</p>}
    {children}
  </Box>
);

export default Fieldset;

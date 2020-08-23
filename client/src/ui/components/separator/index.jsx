import React from 'react';
import { css, cx } from 'emotion';
import { Separator as Base } from 'reakit/Separator';
import { ColorNeutralLighter } from '../../tokens';

export default ({
  size = 0,
  transparent = false,
  color = ColorNeutralLighter,
  width = '100%',
  grow = false,
  height = '1px',
  ...props
}) => (
  <Base
    {...props}
    className={cx(
      'separator',
      css`
        background-color: ${transparent ? 'transparent' : color};
        border: 0;
        flex: ${grow ? 'grow' : 'none'};
        height: ${height};
        margin: ${size > 0 && size * 2 + 'px'} 0;
        width: ${width};
      `,
      props.className
    )}
  />
);

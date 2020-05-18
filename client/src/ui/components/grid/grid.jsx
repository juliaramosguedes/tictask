import { cloneElement } from 'react';
import { css, cx } from 'emotion';
import { flatten, map } from 'lodash';

import { mediaQuery } from '../../../utils';

const generateCss = ({
  columns = 12,
  columnGap = 16,
  rowGap = 24,
  alignItems = 'stretch',
  justifyItems,
}) => {
  return cx(
    css`
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      column-gap: ${columnGap}px;
      row-gap: ${rowGap}px;
      align-items: ${alignItems};
    `,
    justifyItems &&
      css`
        justify-items: ${justifyItems};
      `
  );
};

const generateMediaQueries = (props, match) => {
  return css`
    ${mediaQuery(match)} {
      ${generateCss(props)}
    }
  `;
};

const Grid = ({
  children,
  columns,
  columnGap,
  rowGap,
  alignItems,
  justifyItems,
  matches = {},
  ...props
}) =>
  cloneElement(children, {
    ...props,
    className: cx(
      'grid',
      generateCss({ columns, columnGap, rowGap, alignItems, justifyItems }),
      ...flatten(map(matches, generateMediaQueries)),
      children.props.className,
      props.className
    ),
  });

export default Grid;

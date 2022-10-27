import { cloneElement } from 'react';
import { css, cx } from 'emotion';
import { isArray, isString, isEmpty, flatten, map } from 'lodash';

import { mediaQuery } from '../../../utils';

const fixGridConfig = (config) => {
  if (isArray(config)) {
    return {
      start: config[0],
      end: config[1],
    };
  }
  return config;
};

const generateCss = ({ order, column = {}, row = {} }) => {
  const fixedColumn = fixGridConfig(column);
  const fixedRow = fixGridConfig(row);

  return [
    fixedColumn.start &&
      css`
        grid-column-start: ${fixedColumn.start};
      `,
    fixedColumn.end &&
      css`
        grid-column-end: ${fixedColumn.end};
      `,
    isString(fixedColumn) &&
      !isEmpty(fixedColumn) &&
      css`
        grid-column: ${fixedColumn};
      `,
    fixedRow.start &&
      css`
        grid-row-start: ${fixedRow.start};
      `,
    fixedRow.end &&
      css`
        grid-row-end: ${fixedRow.end};
      `,
    isString(fixedRow) &&
      !isEmpty(fixedRow) &&
      css`
        grid-row: ${fixedRow};
      `,
    order &&
      css`
        order: ${order};
      `,
  ];
};

const generateMediaQueries = (props, match) => {
  return css`
    ${mediaQuery(match)} {
      ${generateCss(props)}
    }
  `;
};

const GridItem = ({ children, order, column, row, matches = {}, ...props }) => {
  return cloneElement(children, {
    ...props,
    className: cx(
      'grid-item',
      ...generateCss({ order, column, row }),
      ...flatten(map(matches, generateMediaQueries)),
      children.props.className,
      props.className
    ),
  });
};

export default GridItem;

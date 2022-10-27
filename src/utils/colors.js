import { pickBy, mapKeys, kebabCase } from 'lodash';

import * as tokens from '../ui';

const colorsTokens = pickBy(tokens, (value, key) => {
  return key.indexOf('Color') === 0;
});

const colors = mapKeys(colorsTokens, (value, key) => {
  return kebabCase(key.replace(/^Color/, ''));
});

export default colors;

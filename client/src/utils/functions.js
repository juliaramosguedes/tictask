import {
  SizeMaxWidthScreenMobile,
  SizeMinWidthScreenTablet,
  SizeMaxWidthScreenTablet,
  SizeMinWidthScreenDesktop,
} from '../ui';

import colors from './colors';

export const mediaQuery = (match) => {
  switch (match) {
    case 'desktop':
      return `@media (min-width: ${SizeMinWidthScreenDesktop})`;
    case 'tablet-min':
      return `@media (min-width: ${SizeMinWidthScreenTablet})`;
    case 'tablet-max':
      return `@media (max-width: ${SizeMaxWidthScreenTablet})`;
    case 'tablet':
      return `@media (min-width: ${SizeMinWidthScreenTablet}) and (max-width: ${SizeMaxWidthScreenTablet})`;
    case 'mobile':
      return `@media (max-width: ${SizeMaxWidthScreenMobile})`;
    default:
      return match;
  }
};

export const getColor = (color) => colors[color] || color;

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};

import React from 'react';
import { css, cx } from 'emotion';
import { FaCoffee, FaHeart } from 'react-icons/fa';
import { SizeMinWidthScreenDesktop, Text } from '../../ui';

export default ({ color = 'white', ...props }) => (
  <footer
    {...props}
    className={cx(
      'footer',
      css`
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translate(-50%, 0);
        max-width: 200px;

        a {
          color: ${color};
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          max-width: 400px;
          bottom: 32px;
        }
      `,
      props.className
    )}
  >
    <Text color={color} center noMargin>
      Desenvolvido com <FaHeart color={color} size={14} /> &{' '}
      <FaCoffee color={color} size={16} /> por{' '}
      <a href="https://www.linkedin.com/in/julia-ramos-guedes/">Julia Ramos</a>{' '}
      e <a href="https://www.linkedin.com/in/dedicio/">Dedicio Coelho</a>.
    </Text>
  </footer>
);

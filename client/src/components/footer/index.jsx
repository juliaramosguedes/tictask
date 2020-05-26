import React from 'react';
import { css, cx } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SizeMinWidthScreenDesktop, Text } from '../../ui';

export default ({ color = 'white', ...props }) => (
  <footer
    {...props}
    className={cx(
      'footer',
      css`
        max-width: 200px;
        margin: 0 auto;

        a {
          color: ${color};
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          max-width: 400px;
        }
      `,
      props.className
    )}
  >
    <Text color={color} center>
      Desenvolvido com <FontAwesomeIcon icon={faHeart} color={color} /> &{' '}
      <FontAwesomeIcon icon={faCoffee} color={color} /> por{' '}
      <a href="https://www.linkedin.com/in/julia-ramos-guedes/">Julia Ramos</a>{' '}
      e <a href="https://www.linkedin.com/in/dedicio/">Dedicio Coelho</a>.
    </Text>
  </footer>
);

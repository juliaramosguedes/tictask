import React from 'react';
import { css, cx } from 'emotion';
import { SizeMinWidthScreenDesktop, Skeleton } from '../../../ui';

export default (props) => (
  <div
    {...props}
    className={cx(
      'clock',
      css`
        display: flex;
        flex-direction: column;
        align-items: center;

        .clock-skeleton {
          z-index: 1;
          width: 185px;
          height: 185px;
          border-radius: 50%;
          margin: 58px auto 10px;
        }

        .button-skeleton {
          z-index: 1;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          margin: 36px auto 24px;
        }

        .row-skeleton {
          height: 12px;
          margin-top: 16px;

          &:nth-child(5) {
            margin-top: 40px;
          }
        }

        @media (min-width: ${SizeMinWidthScreenDesktop}) {
          .clock-skeleton {
            width: 230px;
            height: 230px;
          }
        }
      `,
      props.className
    )}
  >
    <span>
      <Skeleton className="row-skeleton" />
      <Skeleton className="clock-skeleton" />
      <Skeleton className="button-skeleton" />
      <Skeleton className="row-skeleton" />
      <Skeleton className="row-skeleton" />
      <Skeleton className="row-skeleton" />
      <Skeleton className="row-skeleton" />
    </span>
  </div>
);

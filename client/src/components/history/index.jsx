import React from 'react';
import { css, cx } from 'emotion';
import { RiRecordCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import { Container, Subtitle, SizeMinWidthScreenTablet } from '../../ui';
import { default as HistoryStatus } from '../history-status';
import { INTERVAL } from '../../constants';

export default ({ color, counter, ...props }) => (
  <>
    <Subtitle color={color} center noMargin weight="bold">
      Como estamos hoje?
    </Subtitle>
    <Container
      display="flex"
      padding="16px"
      {...props}
      className={cx(
        'container',
        css`
          flex-direction: column;
          align-items: center;

          @media (min-width: ${SizeMinWidthScreenTablet}) {
            flex-direction: row;
          }
        `,
        props.className
      )}
    >
      <HistoryStatus
        color={color}
        time={counter.POMODORO * INTERVAL.POMODORO.TIME}
        icon={RiRecordCircleLine}
        span="foco"
      />
      <BsDot size={24} color={'rgba(0, 0, 0, 0.2)'} />
      <HistoryStatus
        color={color}
        time={
          counter.SHORTBREAK * INTERVAL.SHORTBREAK.TIME +
          counter.LONGBREAK * INTERVAL.LONGBREAK.TIME
        }
        icon={RiIndeterminateCircleLine}
        span="pausa"
      />
    </Container>
  </>
);

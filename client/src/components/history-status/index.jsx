import React from 'react';
import { Duration } from 'luxon';
import { Container, Span, Text, ColorNeutralYellow } from '../../ui';

export default ({ color, time, icon: Icon, span }) => (
  <Container display="flex">
    <Icon size={20} color={color} />
    <Text color={color} center width="auto" size={2} noMargin>
      &nbsp;
      {Duration.fromObject({
        minute: time,
      }).toFormat('hh:mm:ss')}{' '}
      &nbsp;tempo de&nbsp;
      <Span color={ColorNeutralYellow} bold size={2}>
        {span}
      </Span>
    </Text>
  </Container>
);

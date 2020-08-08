import React from 'react';
import { Duration } from 'luxon';
import { Container, Separator, Span, Text, ColorNeutralYellow } from '../../ui';

export default ({ color, time, icon: Icon, span }) => (
  <Container display="flex">
    <Icon size={18} color={color} />
    <Separator width="5px" transparent />
    <Text color={color} center width="auto">
      {Duration.fromObject({
        minute: time,
      }).toFormat('hh:mm:ss')}{' '}
      &nbsp;minutos de&nbsp;
      <Span color={ColorNeutralYellow} bold>
        {span}
      </Span>
    </Text>
  </Container>
);

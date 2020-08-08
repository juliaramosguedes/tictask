import React from 'react';
import { RiRecordCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import {
  Container,
  Separator,
  Span,
  Subtitle,
  Text,
  ColorNeutralYellow,
} from '../../ui';

export default ({ color, pomodoroTime = '00:00', breakTime = '00:00' }) => (
  <>
    <Subtitle color={color} center noMargin weight="bold">
      Como estamos hoje?
    </Subtitle>
    <Container display="flex">
      <Text color={color} center width="auto" display="flex">
        <RiRecordCircleLine size={18} />
        <Separator width="5px" transparent />
        {pomodoroTime} minutos de
        <Separator width="5px" transparent />
        <Span color={ColorNeutralYellow} bold>
          foco
        </Span>
      </Text>
      <BsDot size={24} color={'rgba(0, 0, 0, 0.2)'} />
      <Text color={color} center width="auto" display="flex">
        <RiIndeterminateCircleLine size={18} />
        <Separator width="5px" transparent />
        {breakTime} minutos de
        <Separator width="5px" transparent />
        <Span color={ColorNeutralYellow} bold>
          pausa
        </Span>
      </Text>
    </Container>
  </>
);

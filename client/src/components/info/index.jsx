import React from 'react';
import { Button, Container, List, Text, Title } from '../../ui';
import { useBreakpoint } from '../../hooks';
import { default as Footer } from '../footer';
import { THEME } from '../../constants';

export default ({ showInfo, onCallToActionClick, infoRef, theme }) => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  return (
    <Container
      height="100vh"
      padding={isDesktop ? '40px 40px 66px' : '16px 16px 68px'}
      ref={infoRef}
      display={!showInfo ? 'none' : 'flex'}
      direction="column"
      justifyContent="flex-start"
      backgroundColor={THEME[theme].INFO.BACKGROUND_COLOR}
    >
      <Title center size={4} color={THEME[theme].INFO.COLOR} maxWidth="620px">
        O que é a técnica Pomodoro?
      </Title>
      <Text color={THEME[theme].INFO.COLOR} padding="16px" maxWidth="620px">
        A Técnica Pomodoro é um método para se obter maior produtividade no
        trabalho e estudo e foi desenvolvida pelo italiano Francesco Cirillo. A
        técnica consiste na utilização de um cronômetro para dividir o trabalho
        em períodos de 25 minutos, separados por breves momentos de descanso.
        Cada intervalo representa um ciclo do pomodoro, da palavra italiana
        pomodoro (tomate), como referência ao timer de cozinha usado pelo
        Cirillo. O método é baseado na ideia de que pausas frequentes podem
        aumentar a agilidade mental.
      </Text>
      <Text color={THEME[theme].INFO.COLOR} padding="16px" maxWidth="620px">
        O principal propósito da técnica Pomodoro é manter o foco e a
        concentração máxima pelo prazo de 25 minutos. Com isso, é possível
        alcançar alguns objetivos, entre eles:
      </Text>
      <List
        color={THEME[theme].INFO.COLOR}
        padding="16px"
        maxWidth="620px"
        messages={[
          'aumentar a concentração',
          'melhorar os resultados dos indicadores de produtividade',
          'reduzir as interrupções',
          'diminuir a ansiedade',
          'saber quanto tempo você demora em cada atividade',
        ]}
      />
      <Text color={THEME[theme].INFO.COLOR} padding="16px" maxWidth="620px">
        Experimente!
      </Text>
      <Container display="flex" padding={isDesktop ? '32px 0 0' : '16px 0 0'}>
        <Button.Main
          onClick={onCallToActionClick}
          transparent
          color={THEME[theme].INFO.COLOR}
          border
          small={!isDesktop}
          circle
        >
          <p>INICIAR</p>
        </Button.Main>
      </Container>
      <Footer color={THEME[theme].INFO.COLOR} />
    </Container>
  );
};

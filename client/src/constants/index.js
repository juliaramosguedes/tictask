import { GradientDark, GradientInterval, GradientPomodoro } from '../ui';

export const INTERVAL = {
  POMODORO: {
    TIME: 25,
    NAME: 'POMODORO',
    PHRASE: 'Concentre-se!',
    KEY: 'POMODORO',
  },
  SHORTBREAK: {
    TIME: 5,
    NAME: 'INTERVALO',
    PHRASE: 'Descanse um pouco.',
    KEY: 'SHORTBREAK',
  },
  LONGBREAK: {
    TIME: 15,
    NAME: 'INTERVALO LONGO',
    PHRASE: 'Faça um intervalo maior dessa vez.',
    KEY: 'LONGBREAK',
  },
};

export const BACKGROUND_COLOR = {
  WHITE: {
    POMODORO: 'transparent',
    INTERVAL: 'transparent',
    KEY: 'WHITE',
  },
  DARK: {
    POMODORO: GradientDark,
    INTERVAL: GradientDark,
    KEY: 'DARK',
  },
  BRAND: {
    POMODORO: GradientPomodoro,
    INTERVAL: GradientInterval,
    KEY: 'BRAND',
  },
};

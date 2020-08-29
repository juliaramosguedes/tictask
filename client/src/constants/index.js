import {
  GradientPomodoro,
  GradientDarkPomodoro,
  GradientInterval,
  GradientDarkInterval,
  ColorNeutralYellow,
  ColorBrandBase,
  ColorNeutralGreen,
  ColorLightGreen,
  ColorNeutralLightDark,
} from '../ui';

export const INTERVAL = {
  POMODORO: {
    TIME: 25,
    NAME: 'TIC TASK',
    PHRASE: 'Concentre-se!',
    KEY: 'POMODORO',
    TYPE: 'POMODORO',
  },
  SHORTBREAK: {
    TIME: 5,
    NAME: 'INTERVALO',
    PHRASE: 'Descanse um pouco.',
    KEY: 'SHORTBREAK',
    TYPE: 'BREAK',
  },
  LONGBREAK: {
    TIME: 15,
    NAME: 'INTERVALO LONGO',
    PHRASE: 'Faça um intervalo maior dessa vez.',
    KEY: 'LONGBREAK',
    TYPE: 'BREAK',
  },
};

export const THEME = {
  WHITE: {
    KEY: 'WHITE',
    POMODORO: {
      BACKGROUND_COLOR: 'transparent',
      COLOR: ColorBrandBase,
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorBrandBase,
        COLOR: ColorNeutralLightDark,
      },
      CLOCK: ColorBrandBase,
    },
    BREAK: {
      BACKGROUND_COLOR: 'transparent',
      COLOR: ColorNeutralGreen,
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorNeutralGreen,
        COLOR: ColorNeutralLightDark,
      },
      CLOCK: ColorNeutralGreen,
    },
  },
  DARK: {
    KEY: 'DARK',
    POMODORO: {
      BACKGROUND_COLOR: GradientDarkPomodoro,
      COLOR: '#ffffff',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorBrandBase,
        COLOR: '#ffffff',
      },
      CLOCK: ColorBrandBase,
    },
    BREAK: {
      BACKGROUND_COLOR: GradientDarkInterval,
      COLOR: '#ffffff',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorLightGreen,
        COLOR: '#ffffff',
      },
      CLOCK: ColorLightGreen,
    },
  },
  BRAND: {
    KEY: 'BRAND',
    POMODORO: {
      BACKGROUND_COLOR: GradientPomodoro,
      COLOR: '#ffffff',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorNeutralYellow,
        COLOR: '#ffffff',
      },
      CLOCK: '#ffffff',
    },
    BREAK: {
      BACKGROUND_COLOR: GradientInterval,
      COLOR: '#ffffff',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorNeutralYellow,
        COLOR: '#ffffff',
      },
      CLOCK: '#ffffff',
    },
  },
};

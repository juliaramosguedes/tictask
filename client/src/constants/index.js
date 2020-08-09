import {
  GradientPomodoro,
  GradientDarkPomodoro,
  GradientInterval,
  GradientDarkInterval,
  ColorNeutralYellow,
  ColorDarkBrandBase,
  ColorBrandBase,
  ColorNeutralGreen,
  ColorNeutralGray,
  ColorLightGreen,
  ColorNeutralLightDark,
} from '../ui';

export const INTERVAL = {
  POMODORO: {
    TIME: 25,
    NAME: 'POMODORO',
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
    INFO: {
      BACKGROUND_COLOR: ColorDarkBrandBase,
      COLOR: 'white',
    },
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
    INFO: {
      BACKGROUND_COLOR: ColorNeutralGray,
      COLOR: 'white',
    },
    POMODORO: {
      BACKGROUND_COLOR: GradientDarkPomodoro,
      COLOR: 'white',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorBrandBase,
        COLOR: 'white',
      },
      CLOCK: ColorBrandBase,
    },
    BREAK: {
      BACKGROUND_COLOR: GradientDarkInterval,
      COLOR: 'white',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorLightGreen,
        COLOR: 'white',
      },
      CLOCK: ColorLightGreen,
    },
  },
  BRAND: {
    KEY: 'BRAND',
    INFO: {
      BACKGROUND_COLOR: 'white',
      COLOR: 'black',
    },
    POMODORO: {
      BACKGROUND_COLOR: GradientPomodoro,
      COLOR: 'white',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorNeutralYellow,
        COLOR: 'white',
      },
      CLOCK: 'white',
    },
    BREAK: {
      BACKGROUND_COLOR: GradientInterval,
      COLOR: 'white',
      AUTOMATIC_BUTTON: {
        BACKGROUND_COLOR: ColorNeutralYellow,
        COLOR: 'white',
      },
      CLOCK: 'white',
    },
  },
};

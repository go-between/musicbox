const colors = {
  accent: '#2D3748', // a contrast color for emphasizing UI
  background: '#1A202C', // body background color
  backgroundTint: '#1c2330',
  text: '#E2E8F0', // body color
  muted: '#4A5568', // a gray or subdued color for decorative purposes
  formBorder: '#CBD5E0',
  primary: '#5A67D8', // primary button and link color
  secondary: '#4C51BF', // secondary color - can be used for hover states
  accentHover: 'rgba(45, 55, 72, .3)',
  highlight: 'rgba(90, 103, 216, .1)',
  modes: {
    light: {
      accent: '#718096',
      background: '#F7FAFC',
      text: '#1A202C',
      muted: '#E2E8F0',
      formBorder: '#CBD5E0',
      primary: '#5A67D8',
      secondary: '#4C51BF',
    },
  },
  black: '#232323',
  blue: '#3182CE',
  blueDark: '#2C5282',
  blueLight: '#EBF8FF',
  green: '#38A169',
  greenDark: '#276749',
  greenLight: '#F0FFF4',
  grayLight: '#dfdfdf',
  gray: '#999999',
  grayDark: '#666666',
  gray100: '#F7FAFC',
  gray200: '#EDF2F7',
  gray300: '#E2E8F0',
  gray400: '#CBD5E0',
  gray500: '#A0AEC0',
  gray600: '#718096',
  gray700: '#4A5568',
  gray800: '#2D3748',
  gray900: '#1A202C',
  offBlack: '#484848',
  offWhite: '#f7f7f7',
  indigo100: '#EBF4FF',
  indigo200: '#C3DAFE',
  indigo300: '#A3BFFA',
  indigo400: '#7F9CF5',
  indigo500: '#667EEA',
  indigo600: '#5A67D8',
  indigo700: '#4C51BF',
  indigo800: '#434190',
  indigo900: '#3C366B',
  red: '#E53E3E',
  redDark: '#C53030',
  redLight: '#FFF5F5',
  white: '#ffffff',
  yellow: '#ffc58b',
  yellowLight: '#fceddf',
  yellowDark: '#594430',
}

export default {
  borders: [0, '1px solid', '2px solid'],
  breakpoints: ['960px', '1200px', '1400px'],
  buttons: {
    primary: {
      bg: 'primary',
      boxShadow: 'base',
      color: 'white',
      cursor: 'pointer',
      fontSize: 3,
      fontWeight: '600',
      lineHeight: '1.5',
      px: 3,
      py: 2,
      '&:hover': {
        bg: 'secondary',
      },
    },
    mini: {
      bg: 'primary',
      boxShadow: 'base',
      color: 'white',
      cursor: 'pointer',
      fontSize: 1,
      fontWeight: '600',
      lineHeight: '1.5',
      px: 2,
      py: 1,
      '&:hover': {
        bg: 'secondary',
      },
    },
    transparent: {
      bg: 'transparent',
      border: 'transparent',
    },
  },
  colors,
  colorStyles: {
    danger: {
      backgroundColor: colors.redLight,
      color: colors.redDark,
    },
    info: {
      backgroundColor: colors.blueLight,
      color: colors.blueDark,
    },
    success: {
      backgroundColor: colors.greenLight,
      color: colors.greenDark,
    },
    warning: {
      backgroundColor: colors.yellowLight,
      color: colors.yellowDark,
    },
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 32, 48, 64, 72, 96],
  fonts: {
    body: 'inter, system-ui, sans-serif',
    heading: 'inter, system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
  },
  forms: {
    input: {
      bg: 'background',
      borderRadius: 4,
      borderColor: 'transparent',
      color: 'text',
      p: 2,
      '&:focus': {
        outline: 'none',
      },
      '&::placeholder': {
        color: '#E2E8F0',
        fontSize: 2,
      },
    },
    heading: {
      color: 'text',
      fontWeight: 800,
    },
    select: {
      borderRadius: 6,
      borderColor: 'accent',
      color: 'text',
    },
    textarea: {
      '::-webkit-input-placeholder': {
        color: 'gray500',
        fontSize: 2,
        fontWeight: 'bold',
      },
      ':-ms-input-placeholder': {
        color: 'gray500',
        fontSize: 2,
        fontWeight: 'bold',
      },
      '::-moz-placeholder': {
        color: 'gray500',
        fontSize: 2,
        fontWeight: 'bold',
        opacity: 1,
      },
      ':-moz-placeholder': {
        color: 'gray500',
        fontSize: 2,
        fontWeight: 'bold',
        opacity: 1,
      },
    },
    label: {
      color: 'text',
      fontSize: 1,
      fontWeight: 'bold',
      mb: 2,
      textTransform: 'uppercase',
    },
    radio: {},
    checkbox: {},
  },
  link: {
    cursor: 'pointer',
  },
  lineHeight: '1.5',
  listTypes: ['none', 'disc'],
  shadows: {
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(90, 103, 216, 0.5)',
    none: 'none',
  },
  styles: {},
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  text: {
    headline: {
      fontSize: [7, 8, 9],
      letterSpacing: '-0.045em',
      textIndent: '-0.012em',
      lineHeight: '1em',
    }
  },
  zIndices: {
    zNeg: -1,
    z0: 0,
    z10: 10,
    z20: 20,
    z30: 30,
    z40: 40,
    z50: 50,
    zAuto: 'auto',
  },
}

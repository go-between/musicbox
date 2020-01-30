const colors = {
  accent: '#2D3748', // a contrast color for emphasizing UI
  background: '#1A202C', // body background color
  text: '#EDF2F7', // body color
  muted: '#4A5568', // a gray or subdued color for decorative purposes
  formBorder: '#CBD5E0',
  primary: '#5A67D8', // primary button and link color
  secondary: '#4C51BF', // secondary color - can be used for hover states
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
    // dark: {
    //   text: '#fff',
    //   background: '#000',
    //   primary: '#0cf',
    //   secondary: '#f0e',
    //   gray: '#222',
    //   lightgray: '#111',
    // },
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
  indigo800: '#434190',
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
      p: '12px',
      '&:hover': {
        bg: 'secondary',
      },
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
    heading: 'inherit',
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
      boxShadow: 'base',
      color: 'text',
      p: 2,
      '&:focus': {
        outline: 'none'
      },

    },
    heading: {
      color: 'text',
      fontWeight: 800,
    },
    select: {
      borderRadius: 9999,
    },
    textarea: {},
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
  lineHeight: '1.5',
  listTypes: ['none', 'disc'],
  shadows: {
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    none: 'none',
  },
  styles: {},
  space: [0, 4, 8, 16, 32, 64, 128, 256],
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

const colors = {
  black: '#232323',
  blue: '#3182CE',
  blueDark: '#2C5282',
  blueLight: '#EBF8FF',
  green: '#38A169',
  greenDark: '#276749',
  greenLight: '#F0FFF4',
  hatchGreen: '#63bab0',
  hatchGreenDark: '#04575b',
  hatchGreenLight: '#ebfcfa',
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
  red: '#E53E3E',
  redDark: '#C53030',
  redLight: '#FFF5F5',
  white: '#ffffff',
  yellow: '#ffc58b',
  yellowLight: '#fceddf',
  yellowDark: '#594430',
  accent: '#718096', // a contrast color for emphasizing UI
  background: '#F7FAFC', // body background color
  text: '#2D3748', // body color
  muted: '#E2E8F0', // a gray or subdued color for decorative purposes
  primary: 'rgba(4, 87, 91, 1)', // primary button and link color
  secondary: 'rgba(4, 87, 91, .8)', // secondary color - can be used for hover states
}

export default {
  borders: [0, '1px solid', '2px solid'],
  breakpoints: ['960px', '1200px', '1400px'],
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
    sans:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif;',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
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
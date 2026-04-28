import type { ColorPalette } from './types'

/**
 * Unified dark mode color palette.
 * Merged from web and mobile palettes with mobile's extended colors as the base.
 */
const darkPalette: ColorPalette = {
  text: {
    primary: '#F8FAFC',
    secondary: '#9AA8BC',
    disabled: 'rgba(255, 255, 255, 0.3)',
    contrast: '#000000',
  },
  primary: {
    dark: '#DCE7FF',
    main: '#F8FAFC',
    light: '#9AA8BC',
  },
  secondary: {
    dark: '#0E4ACA',
    main: '#3F7BFF',
    light: '#AFC7FF',
    background: '#14244A',
  },
  border: {
    main: '#475569',
    light: '#273449',
    background: '#0B1020',
  },
  error: {
    dark: '#FFE0E6',
    main: '#FF5F72',
    light: '#4A2125',
    background: '#4A2125',
  },
  error1: {
    main: '#4A2125',
    contrastText: '#FFE0E6',
  },
  success: {
    dark: '#DEFDEA',
    main: '#00B460',
    light: '#3B7A54',
    background: '#173026',
  },
  info: {
    dark: '#D9F4FB',
    main: '#00BFE5',
    light: '#458898',
    background: '#203339',
  },
  warning: {
    dark: '#FFE4CB',
    main: '#FF8C00',
    light: '#A65F34',
    background: '#4A3621',
  },
  warning1: {
    main: '#4A3621',
    text: '#FFE4CB',
    contrastText: '#FF8C00',
  },
  background: {
    default: '#0B1020',
    main: '#0B1020',
    sheet: '#0B1020',
    paper: '#111827',
    light: '#14244A',
    secondary: '#273449',
    skeleton: 'rgba(255, 255, 255, 0.04)',
    disabled: '#7878801F',
  },
  backdrop: {
    main: '#0B1020',
  },
  logo: {
    main: '#F8FAFC',
    background: '#1E293B',
  },
  static: {
    main: '#17181C',
    light: '#536179',
    primary: '#FFFFFF',
    textSecondary: '#B8C1D1',
    textBrand: '#155DFC',
  },
}

export default darkPalette

import type { ColorPalette } from './types'

/**
 * Unified light mode color palette.
 * Merged from web and mobile palettes with mobile's extended colors as the base.
 */
const lightPalette: ColorPalette = {
  text: {
    primary: '#17181C',
    secondary: '#536179',
    disabled: '#B8C1D1',
    contrast: '#FFFFFF',
  },
  primary: {
    dark: '#000000',
    main: '#17181C',
    light: '#344054',
  },
  secondary: {
    dark: '#0E4ACA',
    main: '#155DFC',
    light: '#DCE7FF',
    background: '#EFF4FF',
  },
  border: {
    main: '#CBD5E1',
    light: '#E5EAF1',
    background: '#F7F8FA',
  },
  error: {
    dark: '#8A1C27',
    main: '#FF5F72',
    light: '#F79BA7',
    background: '#FFE0E6',
  },
  error1: {
    main: '#FFE0E6',
    contrastText: '#8A1C27',
  },
  success: {
    dark: '#1C5538',
    main: '#00B460',
    light: '#84D9A0',
    background: '#CBF2DB',
  },
  info: {
    dark: '#15566A',
    main: '#00BFE5',
    light: '#78D2E7',
    background: '#CEF0FD',
  },
  warning: {
    dark: '#6C2D19',
    main: '#FF8C00',
    light: '#F9B37C',
    background: '#FFECC2',
  },
  warning1: {
    main: '#FFECC2',
    text: '#6C2D19',
    contrastText: '#FF8C00',
  },
  background: {
    default: '#FFFFFF',
    main: '#F7F8FA',
    sheet: '#F7F8FA',
    paper: '#FFFFFF',
    light: '#EFF4FF',
    secondary: '#E5EAF1',
    skeleton: 'rgba(0, 0, 0, 0.04)',
    disabled: '#7878801F',
  },
  backdrop: {
    main: '#344054',
  },
  logo: {
    main: '#17181C',
    background: '#EEF2F7',
  },
  static: {
    main: '#17181C',
    light: '#536179',
    primary: '#FFFFFF',
    textSecondary: '#B8C1D1',
    textBrand: '#155DFC',
  },
}

export default lightPalette

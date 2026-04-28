import type { StaticColors } from './types'

/**
 * Static colors that remain constant regardless of light/dark theme mode.
 * Used for consistent brand elements and specific UI components that should
 * not change appearance when theme switches.
 */
const staticColors: StaticColors = {
  main: '#17181C',
  light: '#536179',
  primary: '#FFFFFF',
  textSecondary: '#B8C1D1',
  textBrand: '#155DFC',
}

export default staticColors

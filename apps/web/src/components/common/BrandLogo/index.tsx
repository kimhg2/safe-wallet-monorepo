import classNames from 'classnames'
import { BRAND_LOGO, BRAND_NAME } from '@/config/constants'
import css from './styles.module.css'

type BrandLogoProps = {
  className?: string
  compact?: boolean
}

const DEFAULT_PRIMARY = 'Parataxis'
const DEFAULT_SECONDARY = 'Wallet'

const getBrandParts = (): { primary: string; secondary: string } => {
  const [primary = DEFAULT_PRIMARY, ...rest] = BRAND_NAME.split(' ')
  const secondary = rest.join(' ') || DEFAULT_SECONDARY

  return { primary, secondary }
}

export const BrandLogo = ({ className, compact = false }: BrandLogoProps) => {
  if (BRAND_LOGO) {
    return <img src={BRAND_LOGO} alt={BRAND_NAME} className={classNames(css.imageLogo, className)} />
  }

  if (compact) {
    return (
      <span aria-label={BRAND_NAME} className={classNames(css.mark, className)} role="img">
        <span />
      </span>
    )
  }

  const { primary, secondary } = getBrandParts()

  return (
    <span aria-label={BRAND_NAME} className={classNames(css.wordmark, className)} role="img">
      <span className={css.primary}>{primary}</span>
      <span className={css.secondary}>{secondary}</span>
    </span>
  )
}

export default BrandLogo

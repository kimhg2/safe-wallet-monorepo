import { render, screen } from '@/tests/test-utils'
import BrandLogo from '.'
import { BRAND_NAME } from '@/config/constants'

describe('BrandLogo', () => {
  it('renders the full fallback wordmark', () => {
    render(<BrandLogo />)

    expect(screen.getByRole('img', { name: BRAND_NAME })).toBeInTheDocument()
    expect(screen.getByText('Parataxis')).toBeInTheDocument()
    expect(screen.getByText('Wallet')).toBeInTheDocument()
  })

  it('renders the compact mark', () => {
    render(<BrandLogo compact />)

    expect(screen.getByRole('img', { name: BRAND_NAME })).toBeInTheDocument()
    expect(screen.queryByText('Parataxis')).not.toBeInTheDocument()
  })
})

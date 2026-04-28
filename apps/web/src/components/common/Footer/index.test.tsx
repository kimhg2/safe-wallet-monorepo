import Footer from '.'
import { BRAND_NAME } from '@/config/constants'
import { AppRoutes } from '@/config/routes'
import { useIsOfficialHost } from '@/hooks/useIsOfficialHost'
import { render, screen } from '@/tests/test-utils'

jest.mock('@/hooks/useIsOfficialHost', () => ({
  useIsOfficialHost: jest.fn(),
}))

const mockUseIsOfficialHost = useIsOfficialHost as jest.Mock

describe('Footer', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders Safe legal links on official hosts', () => {
    mockUseIsOfficialHost.mockReturnValue(true)

    render(<Footer forceShow />, {
      routerProps: { pathname: AppRoutes.terms },
    })

    expect(screen.getByText(/Safe Labs GmbH/)).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getByText('Privacy')).toBeInTheDocument()
  })

  it('renders the Parataxis copyright on forked hosts', () => {
    mockUseIsOfficialHost.mockReturnValue(false)

    render(<Footer forceShow versionIcon={false} />, {
      routerProps: { pathname: AppRoutes.terms },
    })

    expect(screen.getByText(new RegExp(BRAND_NAME))).toBeInTheDocument()
    expect(screen.queryByText('Terms')).not.toBeInTheDocument()
  })
})

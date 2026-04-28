import NewSafe from './NewSafe'
import { BRAND_NAME } from '@/config/constants'
import { render, screen } from '@/tests/test-utils'

jest.mock('./WelcomeLogin', () => ({
  __esModule: true,
  default: function WelcomeLoginMock() {
    return <div>Welcome login</div>
  },
}))

jest.mock('../common/Footer', () => ({
  __esModule: true,
  default: function FooterMock() {
    return <footer>Footer</footer>
  },
}))

describe('NewSafe', () => {
  it('renders the Parataxis welcome message and login entry point', () => {
    render(<NewSafe />)

    expect(screen.getByRole('img', { name: BRAND_NAME })).toBeInTheDocument()
    expect(screen.getByText('PARATAXIS WALLET')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Backing the future\. Powered by Ethereum\./ })).toBeInTheDocument()
    expect(
      screen.getByText('Institutional smart account operations for teams that manage Ethereum treasuries.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Welcome login')).toBeInTheDocument()
  })
})

import QRCodeReact from 'qrcode.react'
import QRCode from '.'
import { BRAND_ICON } from '@/config/constants'
import { render, screen } from '@/tests/test-utils'

jest.mock('qrcode.react', () => ({
  __esModule: true,
  default: jest.fn(({ imageSettings, value }) => (
    <div data-testid="qr-code" data-logo-src={imageSettings.src}>
      {value}
    </div>
  )),
}))

const mockQRCodeReact = QRCodeReact as jest.Mock

describe('QRCode', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('uses the configured brand icon as the embedded QR logo', () => {
    render(<QRCode value="safe:wallet" size={120} />)

    expect(screen.getByTestId('qr-code')).toHaveAttribute('data-logo-src', BRAND_ICON)
    expect(mockQRCodeReact).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'safe:wallet',
        size: 120,
        imageSettings: expect.objectContaining({ src: BRAND_ICON }),
      }),
      undefined,
    )
  })

  it('renders a skeleton while the QR value is missing', () => {
    render(<QRCode size={120} />)

    expect(screen.queryByTestId('qr-code')).not.toBeInTheDocument()
    expect(mockQRCodeReact).not.toHaveBeenCalled()
  })
})

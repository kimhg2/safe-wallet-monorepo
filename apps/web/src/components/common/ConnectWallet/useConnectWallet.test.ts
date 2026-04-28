import type { OnboardAPI } from '@web3-onboard/core'
import { act, renderHook } from '@/tests/test-utils'
import useOnboard, { connectWallet, getOnboard } from '@/hooks/wallets/useOnboard'
import useConnectWallet from './useConnectWallet'

jest.mock('@/hooks/wallets/useOnboard', () => ({
  __esModule: true,
  default: jest.fn(),
  connectWallet: jest.fn(),
  getOnboard: jest.fn(),
}))

const mockUseOnboard = useOnboard as jest.MockedFunction<typeof useOnboard>
const mockConnectWallet = connectWallet as jest.MockedFunction<typeof connectWallet>
const mockGetOnboard = getOnboard as jest.MockedFunction<typeof getOnboard>

const createMockOnboard = (): OnboardAPI =>
  ({
    connectWallet: jest.fn(),
  }) as unknown as OnboardAPI

describe('useConnectWallet', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('connects with the onboard instance from the hook', async () => {
    const onboard = createMockOnboard()
    mockUseOnboard.mockReturnValue(onboard)
    mockConnectWallet.mockResolvedValue([])

    const { result } = renderHook(() => useConnectWallet())

    await act(async () => {
      await result.current()
    })

    expect(mockConnectWallet).toHaveBeenCalledWith(onboard)
  })

  it('reads the latest onboard instance at click time if the hook value is stale', async () => {
    const onboard = createMockOnboard()
    mockUseOnboard.mockReturnValue(undefined)
    mockGetOnboard.mockReturnValue(onboard)
    mockConnectWallet.mockResolvedValue([])

    const { result } = renderHook(() => useConnectWallet())

    await act(async () => {
      await result.current()
    })

    expect(mockConnectWallet).toHaveBeenCalledWith(onboard)
  })

  it('resolves without connecting when onboard is not initialized', async () => {
    mockUseOnboard.mockReturnValue(undefined)
    mockGetOnboard.mockReturnValue(undefined)

    const { result } = renderHook(() => useConnectWallet())
    let wallets: Awaited<ReturnType<typeof result.current>>

    await act(async () => {
      wallets = await result.current()
    })

    expect(wallets).toBeUndefined()
    expect(mockConnectWallet).not.toHaveBeenCalled()
  })
})

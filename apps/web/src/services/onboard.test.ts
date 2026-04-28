import Onboard from '@web3-onboard/core'
import type { Chain } from '@safe-global/store/gateway/AUTO_GENERATED/chains'
import { BRAND_DESCRIPTION, BRAND_ICON, BRAND_NAME } from '@/config/constants'
import { getRpcServiceUrl } from '@/hooks/wallets/web3'
import { createOnboard, getOnboardRpcUrl } from './onboard'

jest.mock('@web3-onboard/core', () => ({
  __esModule: true,
  default: jest.fn(() => ({ state: 'onboard' })),
}))

jest.mock('@/hooks/wallets/wallets', () => ({
  getAllWallets: jest.fn(() => ['injected-wallet']),
}))

jest.mock('@/hooks/wallets/web3', () => ({
  getRpcServiceUrl: jest.fn((rpcUri: { value: string }) => rpcUri.value),
}))

const mockOnboard = Onboard as jest.Mock
const mockGetRpcServiceUrl = getRpcServiceUrl as jest.Mock

const createChain = (): Chain => ({
  chainId: '11155111',
  chainName: 'Sepolia',
  description: 'Ethereum testnet',
  l2: false,
  isTestnet: true,
  zk: false,
  nativeCurrency: {
    decimals: 18,
    logoUri: '',
    name: 'Sepolia Ether',
    symbol: 'SEP',
  },
  transactionService: 'https://tx.example',
  blockExplorerUriTemplate: {
    address: 'https://sepolia.etherscan.io/address/{{address}}',
    txHash: 'https://sepolia.etherscan.io/tx/{{txHash}}',
    api: 'https://api-sepolia.etherscan.io/api?module={{module}}&action={{action}}&address={{address}}',
  },
  beaconChainExplorerUriTemplate: {},
  disabledWallets: [],
  balancesProvider: {
    chainName: 'sepolia',
    enabled: true,
  },
  contractAddresses: {
    safeProxyFactoryAddress: '',
    safeSingletonAddress: '',
    multiSendAddress: '',
    multiSendCallOnlyAddress: '',
    fallbackHandlerAddress: '',
    signMessageLibAddress: '',
    createCallAddress: '',
    simulateTxAccessorAddress: '',
  },
  features: [],
  gasPrice: [],
  publicRpcUri: {
    authentication: 'NO_AUTHENTICATION',
    value: 'https://rpc.example',
  },
  rpcUri: {
    authentication: 'NO_AUTHENTICATION',
    value: 'https://rpc.example',
  },
  safeAppsRpcUri: {
    authentication: 'NO_AUTHENTICATION',
    value: 'https://rpc.example',
  },
  shortName: 'sep',
  theme: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
})

describe('createOnboard', () => {
  beforeEach(() => {
    mockOnboard.mockClear()
    mockGetRpcServiceUrl.mockImplementation((rpcUri: { value: string }) => rpcUri.value)
  })

  it('passes Parataxis app metadata and a non-empty RPC URL to web3-onboard', () => {
    const chain = createChain()
    mockGetRpcServiceUrl.mockReturnValueOnce('')

    createOnboard([chain], chain, undefined)

    expect(mockOnboard).toHaveBeenCalledWith(
      expect.objectContaining({
        chains: [
          expect.objectContaining({
            rpcUrl: chain.publicRpcUri.value,
            publicRpcUrl: chain.publicRpcUri.value,
          }),
        ],
        appMetadata: {
          name: BRAND_NAME,
          icon: `${location.origin}${BRAND_ICON}`,
          description: BRAND_DESCRIPTION,
        },
      }),
    )
  })
})

describe('getOnboardRpcUrl', () => {
  beforeEach(() => {
    mockGetRpcServiceUrl.mockImplementation((rpcUri: { value: string }) => rpcUri.value)
  })

  it('prefers custom RPC URLs over configured chain RPC URLs', () => {
    const chain = createChain()

    expect(getOnboardRpcUrl(chain, { [chain.chainId]: 'https://custom-rpc.example' })).toBe(
      'https://custom-rpc.example',
    )
  })

  it('falls back to public RPC URLs when the configured chain RPC URL is unavailable', () => {
    const chain = createChain()
    mockGetRpcServiceUrl.mockReturnValueOnce('')

    expect(getOnboardRpcUrl(chain, undefined)).toBe(chain.publicRpcUri.value)
  })
})

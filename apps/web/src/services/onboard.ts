import Onboard, { type OnboardAPI } from '@web3-onboard/core'
import type { Chain } from '@safe-global/store/gateway/AUTO_GENERATED/chains'
import { getAllWallets } from '@/hooks/wallets/wallets'
import { getRpcServiceUrl } from '@/hooks/wallets/web3'
import { numberToHex } from '@/utils/hex'
import { BRAND_DESCRIPTION, BRAND_ICON, BRAND_NAME } from '@/config/constants'
import type { EnvState } from '@safe-global/store/settingsSlice'

let onboard: OnboardAPI | null = null

export const getOnboardRpcUrl = (cfg: Chain, rpcConfig: EnvState['rpc'] | undefined): string | undefined => {
  return rpcConfig?.[cfg.chainId] || getRpcServiceUrl(cfg.rpcUri) || cfg.publicRpcUri.value || undefined
}

export const createOnboard = (
  chainConfigs: Chain[],
  currentChain: Chain,
  rpcConfig: EnvState['rpc'] | undefined,
): OnboardAPI => {
  if (onboard) return onboard

  const wallets = getAllWallets(currentChain)

  const chains = chainConfigs.map((cfg) => ({
    // We cannot use ethers' toBeHex here as we do not want to pad it to an even number of characters.
    id: numberToHex(parseInt(cfg.chainId)),
    label: cfg.chainName,
    rpcUrl: getOnboardRpcUrl(cfg, rpcConfig),
    token: cfg.nativeCurrency.symbol,
    color: cfg.theme.backgroundColor,
    publicRpcUrl: cfg.publicRpcUri.value || undefined,
    blockExplorerUrl: new URL(cfg.blockExplorerUriTemplate.address).origin,
  }))

  const appIcon = BRAND_ICON.startsWith('http') ? BRAND_ICON : location.origin + BRAND_ICON

  onboard = Onboard({
    wallets,

    chains,

    accountCenter: {
      mobile: { enabled: false },
      desktop: { enabled: false },
    },

    notify: {
      enabled: false,
    },

    appMetadata: {
      name: BRAND_NAME,
      icon: appIcon,
      description: BRAND_DESCRIPTION,
    },

    connect: {
      removeWhereIsMyWalletWarning: true,
      autoConnectLastWallet: false,
    },
  })

  return onboard
}

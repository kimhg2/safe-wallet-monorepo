import { useCallback } from 'react'
import useOnboard, { connectWallet, getOnboard } from '@/hooks/wallets/useOnboard'

const useConnectWallet = () => {
  const onboard = useOnboard()

  return useCallback(() => {
    const onboardApi = onboard || getOnboard()

    if (!onboardApi) {
      return Promise.resolve(undefined)
    }

    return connectWallet(onboardApi)
  }, [onboard])
}

export default useConnectWallet

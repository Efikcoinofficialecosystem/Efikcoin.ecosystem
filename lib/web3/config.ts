import { http, createConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, trustWallet, walletConnectWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet, coinbaseWallet],
    },
  ],
  { projectId, appName: 'Efikcoin Ecosystem' }
)

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors,
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org/'),
  },
})

// Contract ABI (simplified - include full ABI from your deployment)
export const EFIK_ABI = [
  // Add your contract's ABI here
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function getStakingReward(address) view returns (uint256)",
  "function getAllHolders() view returns (address[])",
  "function purchaseGasCredit(uint256 efikAmount) external",
  "function gasCredit(address) view returns (uint256)",
  // ... include all functions from your V3 contract
]

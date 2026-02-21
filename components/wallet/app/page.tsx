// app/page.tsx
'use client'

import { useAccount } from 'wagmi'
import { useEFIKToken, useEFIKPrice, useHolderCount } from '@/lib/web3/hooks/useEFIK'
import { PriceChart } from '@/components/charts/PriceChart'
import { HolderMap } from '@/components/charts/HolderMap'
import { StakingOverview } from '@/components/staking/StakingOverview'
import { ConnectButton } from '@/components/wallet/ConnectButton'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading: balanceLoading } = useEFIKToken(address)
  const { price, priceChange } = useEFIKPrice()
  const { holderCount, verifiedCount } = useHolderCount()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Efikcoin Ecosystem
              </h1>
              <p className="text-xl text-gray-300 mt-4">
                Empowering humanity through decentralized finance
              </p>
            </div>
            <ConnectButton />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <div className="text-gray-400">EFIK Price</div>
              <div className="text-3xl font-bold">${price || '0.00'}</div>
              <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange}% (24h)
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <div className="text-gray-400">Total Holders</div>
              <div className="text-3xl font-bold">{holderCount}</div>
              <div className="text-sm text-amber-400">{verifiedCount} verified</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <div className="text-gray-400">Your Balance</div>
              {isConnected ? (
                <>
                  <div className="text-3xl font-bold">{balance || '0'} EFIK</div>
                  <div className="text-sm text-amber-400">≈ ${(balance * (price || 0)).toFixed(2)}</div>
                </>
              ) : (
                <div className="text-gray-500">Connect wallet to view</div>
              )}
            </div>
          </div>

          {/* Live Price Chart */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Live EFIK Price</h2>
            <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700">
              <PriceChart />
            </div>
          </div>

          {/* Global Holder Map */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">🌍 EFIK Holders Worldwide</h2>
            <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700 h-96">
              <HolderMap />
            </div>
          </div>

          {/* Staking Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">💰 Stake EFIK, Earn Rewards</h2>
            <StakingOverview />
          </div>

          {/* Live Transaction Feed */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">⚡ Live Global Transactions</h2>
            <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700">
              <TransactionFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
          }

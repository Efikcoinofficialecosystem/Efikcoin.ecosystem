// components/staking/StakingOverview.tsx
'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useEFIKToken, useStaking } from '@/lib/web3/hooks/useEFIK'
import { TokenIcon } from '@/components/token/TokenIcon'

export function StakingOverview() {
  const { address, isConnected } = useAccount()
  const { balance } = useEFIKToken(address)
  const { stakedBalance, reward, stake, unstake, isStaking, isUnstaking } = useStaking()
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake')

  const handleSubmit = async () => {
    if (mode === 'stake') {
      await stake(amount)
    } else {
      await unstake(amount)
    }
    setAmount('')
  }

  const apy = 5.0 // 5% APY from contract

  if (!isConnected) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-8 text-center border border-gray-700">
        <p className="text-gray-400">Connect your wallet to start staking</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Staking Stats */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Your Staking Overview</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center gap-3">
              <TokenIcon symbol="EFIK" size={32} />
              <div>
                <div className="text-sm text-gray-400">Available Balance</div>
                <div className="text-xl font-bold">{balance} EFIK</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-xl">
            <div>
              <div className="text-sm text-gray-400">Staked Balance</div>
              <div className="text-xl font-bold">{stakedBalance} EFIK</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Earned Rewards</div>
              <div className="text-xl font-bold text-green-400">{reward} EFIK</div>
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
            <div className="text-amber-400 font-semibold">APY: {apy}%</div>
            <p className="text-sm text-gray-300 mt-1">
              Rewards are calculated automatically and added to your staked balance
            </p>
          </div>
        </div>
      </div>

      {/* Staking Action */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('stake')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              mode === 'stake'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Stake
          </button>
          <button
            onClick={() => setMode('unstake')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              mode === 'unstake'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Unstake
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Amount (EFIK)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => setAmount(mode === 'stake' ? balance : stakedBalance)}
                className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Quick amount buttons [citation:2] */}
          <div className="flex gap-2">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <button
                key={percent}
                onClick={() => {
                  const max = mode === 'stake' ? parseFloat(balance) : parseFloat(stakedBalance)
                  setAmount(((max * parseFloat(percent)) / 100).toString())
                }}
                className="flex-1 py-2 bg-gray-700/50 rounded-lg text-sm hover:bg-gray-600"
              >
                {percent}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0 || isStaking || isUnstaking}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isStaking || isUnstaking ? 'Processing...' : mode === 'stake' ? 'Stake EFIK' : 'Unstake EFIK'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Staking rewards are calculated based on duration and total staked amount
          </p>
        </div>
      </div>
    </div>
  )
}

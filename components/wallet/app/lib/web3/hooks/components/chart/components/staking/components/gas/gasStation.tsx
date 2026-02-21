// components/gas/GasStation.tsx
'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useEFIKToken, useGasStation } from '@/lib/web3/hooks/useEFIK'

export function GasStation() {
  const { address, isConnected } = useAccount()
  const { balance } = useEFIKToken(address)
  const { gasCredit, purchaseGas } = useGasStation()
  const [amount, setAmount] = useState('')

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    await purchaseGas(amount)
    setAmount('')
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-8 text-center border border-gray-700">
        <p className="text-gray-400">Connect wallet to use gas station</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-2">⛽ EFIK Gas Station</h3>
      <p className="text-gray-400 mb-6">
        Burn EFIK to get gas credit for transactions
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Your EFIK Balance</label>
            <div className="text-2xl font-bold">{balance} EFIK</div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Gas Credit Available</label>
            <div className="text-2xl font-bold text-green-400">{gasCredit} units</div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Purchase Gas Credit</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="EFIK amount"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              1 EFIK = 1 gas unit (estimated)
            </p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            Purchase Gas Credit
          </button>
        </div>
      </div>
    </div>
  )
}

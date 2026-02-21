import { useContractRead, useContractWrite } from 'wagmi'
import { EFIK_ABI } from '../config'
import { formatEther, parseEther } from 'viem'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_EFIK_CONTRACT_ADDRESS as `0x${string}`

export function useEFIKToken(address?: `0x${string}`) {
  const { data: balance, refetch: refetchBalance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  return {
    balance: balance ? formatEther(balance as bigint) : '0',
    refetchBalance,
  }
}

export function useStaking() {
  const { writeAsync: stake, isLoading: isStaking } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'stake',
  })

  const { writeAsync: unstake, isLoading: isUnstaking } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'unstake',
  })

  const { data: stakedBalance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'stakedBalance',
    args: [address],
  })

  const { data: reward } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'getStakingReward',
    args: [address],
  })

  return {
    stake: (amount: string) => stake({ args: [parseEther(amount)] }),
    unstake: (amount: string) => unstake({ args: [parseEther(amount)] }),
    stakedBalance: stakedBalance ? formatEther(stakedBalance as bigint) : '0',
    reward: reward ? formatEther(reward as bigint) : '0',
    isStaking,
    isUnstaking,
  }
}

export function useGasStation() {
  const { writeAsync: purchaseGas } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'purchaseGasCredit',
  })

  const { data: gasCredit } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'gasCredit',
    args: [address],
  })

  return {
    purchaseGas: (amount: string) => purchaseGas({ args: [parseEther(amount)] }),
    gasCredit: gasCredit ? formatEther(gasCredit as bigint) : '0',
  }
}

export function useHolderCount() {
  const { data: holders } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'getAllHolders',
  })

  const { data: verifiedCount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: EFIK_ABI,
    functionName: 'getVerifiedHolderCount',
  })

  return {
    holderCount: (holders as any[])?.length || 0,
    verifiedCount: Number(verifiedCount || 0),
    holders: holders as `0x${string}`[] || [],
  }
}

export function useEFIKPrice() {
  // Integrate with CoinGecko API [citation:4]
  const [price, setPrice] = useState('0')
  const [priceChange, setPriceChange] = useState(0)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=efikcoin&vs_currencies=usd&include_24hr_change=true'
        )
        const data = await response.json()
        setPrice(data.efikcoin?.usd || '0')
        setPriceChange(data.efikcoin?.usd_24h_change || 0)
      } catch (error) {
        console.error('Failed to fetch price:', error)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 30000) // Update every 30s [citation:7]

    return () => clearInterval(interval)
  }, [])

  return { price, priceChange }
                                          }

import Image from 'next/image'

export function TokenIcon({ symbol, size = 24 }: { symbol: string; size?: number }) {
  // https://raw.githubusercontent.com/Efikcoinofficialecosystem/Efikcoin-official-ecosystem-EFIK-/main/1770763155521.png
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
      {symbol[0]}
    </div>
  )
}

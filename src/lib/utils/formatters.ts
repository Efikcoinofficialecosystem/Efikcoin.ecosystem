export const formatNumber = (num: number | string, decimals = 2) => {
  const n = typeof num === 'string' ? parseFloat(num) : num
  return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

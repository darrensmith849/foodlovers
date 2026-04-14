import { useUserStore } from '@/stores/useUserStore'

export function formatPrice(cents: number, currencySymbol = 'R'): string {
  return `${currencySymbol}${(cents / 100).toFixed(2)}`
}

export function useFormatPrice() {
  const symbol = useUserStore((s) => s.currencySymbol)
  return (cents: number) => formatPrice(cents, symbol)
}

import type { MarketConfig } from '@foodlovers/types'

export const MARKET_CONFIGS: Record<string, MarketConfig> = {
  ZA: {
    market: 'ZA',
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    locale: 'en-ZA',
  },
  ZW: {
    market: 'ZW',
    currencyCode: 'USD',
    currencySymbol: '$',
    locale: 'en-ZW',
  },
}

export interface IGasSetting {
  GAS_ADJUSTMENT: number
  GAS: number
  GAS_AMOUNT: string
  PRICE_ENDPOINT: string
}

export const gasSettings: Record<string, IGasSetting> = {
  testnet: {
    GAS_ADJUSTMENT: 1.6,
    GAS: 1000000,
    GAS_AMOUNT: '250000uluna',
    PRICE_ENDPOINT: 'https://bombay-lcd.terra.dev/txs/estimate_fee'
  },
  mainnet: {
    GAS_ADJUSTMENT: 1.6,
    GAS: 1000000,
    GAS_AMOUNT: '250000uluna',
    PRICE_ENDPOINT: 'https://fcd.terra.dev/v1/txs/gas_prices'
  }
}

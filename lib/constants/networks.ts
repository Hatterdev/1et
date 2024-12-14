export const SUPPORTED_NETWORKS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  137: 'Polygon Mainnet',
  80001: 'Mumbai Testnet',
} as const;

export type SupportedChainId = keyof typeof SUPPORTED_NETWORKS;
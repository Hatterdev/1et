export const BSC_MAINNET = {
  id: 56,
  name: 'BSC Mainnet',
  network: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
    public: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
  },
  testnet: false,
};

export const BSC_TESTNET = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    public: 'https://data-seed-prebsc-2-s1.binance.org:8545',
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
    },
  },
  testnet: true,
};
import { BSC_MAINNET, BSC_TESTNET } from './chains';

interface Token {
  symbol: string;
  name: string;
  address: {
    [chainId: number]: string;
  };
  decimals: number;
  logoURI: string;
}

export const REWARD_TOKENS: Token[] = [
  {
    symbol: 'BUSD',
    name: 'Binance USD',
    address: {
      [BSC_MAINNET.id]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      [BSC_TESTNET.id]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    },
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/symbol/busd.png'
  },
  {
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    address: {
      [BSC_MAINNET.id]: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      [BSC_TESTNET.id]: '0xFa60D973F7642B748046464e165A65B7323b0DEE',
    },
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/symbol/cake.png'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: {
      [BSC_MAINNET.id]: '0x55d398326f99059fF775485246999027B3197955',
      [BSC_TESTNET.id]: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
    },
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/symbol/usdt.png'
  }
];
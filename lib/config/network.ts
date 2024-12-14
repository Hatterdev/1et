import { BSC_MAINNET, BSC_TESTNET } from '../constants/chains';

export const DEFAULT_CHAIN = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' 
  ? BSC_MAINNET 
  : BSC_TESTNET;

export const SUPPORTED_CHAINS = [BSC_MAINNET.id, BSC_TESTNET.id];

export const getExplorerUrl = (hash: string, type: 'tx' | 'address' | 'block' = 'tx') => {
  const baseUrl = DEFAULT_CHAIN.blockExplorers.default.url;
  return `${baseUrl}/${type}/${hash}`;
};
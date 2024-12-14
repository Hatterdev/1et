import { ethers } from 'ethers';

export const SUPPORTED_NETWORKS = {
  1: 'Ethereum Mainnet',
  // Add other supported networks
};

export const validateNetwork = async (
  provider: ethers.providers.Web3Provider
): Promise<{ isValid: boolean; network: string }> => {
  const network = await provider.getNetwork();
  const isValid = network.chainId in SUPPORTED_NETWORKS;
  
  return {
    isValid,
    network: SUPPORTED_NETWORKS[network.chainId] || 'Unsupported Network'
  };
};

export const switchNetwork = async (
  provider: ethers.providers.Web3Provider,
  targetChainId: number
): Promise<boolean> => {
  try {
    await provider.send('wallet_switchEthereumChain', [
      { chainId: ethers.utils.hexValue(targetChainId) }
    ]);
    return true;
  } catch (error) {
    console.error('Failed to switch network:', error);
    return false;
  }
};
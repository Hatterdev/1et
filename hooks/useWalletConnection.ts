'use client';

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

export function useWalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const toast = useToast();

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: 'MetaMask Required',
        description: 'Please install MetaMask to use this dApp',
        status: 'error',
        duration: 5000,
      });
      return null;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      // Verify network
      if (network.chainId !== 1) { // Replace with your target network
        toast({
          title: 'Wrong Network',
          description: 'Please connect to Ethereum Mainnet',
          status: 'warning',
          duration: 5000,
        });
      }

      return {
        provider,
        account: accounts[0],
        chainId: network.chainId
      };
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

  return { connectWallet, isConnecting };
}
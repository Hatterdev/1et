'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { getContract } from '@/lib/contract';

export function usePoolCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const toast = useToast();

  const createPool = async (
    provider: ethers.providers.Web3Provider,
    rewardToken: string,
    totalRewards: string,
    duration: number
  ) => {
    if (!ethers.utils.isAddress(rewardToken)) {
      toast({
        title: 'Invalid Address',
        description: 'Please enter a valid token address',
        status: 'error',
        duration: 5000,
      });
      return false;
    }

    try {
      setIsCreating(true);
      const contract = getContract(provider);
      
      // Convert rewards to Wei
      const rewardsInWei = ethers.utils.parseEther(totalRewards);
      
      // Convert duration to seconds
      const durationInSeconds = duration * 86400;

      const tx = await contract.createPool(
        rewardToken,
        rewardsInWei,
        durationInSeconds
      );
      
      await tx.wait();
      
      toast({
        title: 'Pool Created',
        description: 'Your staking pool has been created successfully',
        status: 'success',
        duration: 5000,
      });
      
      return true;
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createPool, isCreating };
}
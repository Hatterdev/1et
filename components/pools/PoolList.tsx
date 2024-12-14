'use client';

import { SimpleGrid } from '@chakra-ui/react';
import { PoolCard } from './PoolCard';
import { usePoolData } from '@/hooks/usePoolData';
import { LoadingState } from '../loading/LoadingState';
import { ErrorState } from '../error/ErrorState';

export function PoolList() {
  const { pools, isLoading, error, refreshPools } = usePoolData();

  if (isLoading) {
    return <LoadingState message="Loading staking pools..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refreshPools} />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {pools.map((pool) => (
        <PoolCard
          key={pool.id}
          pool={pool}
          onUpdate={refreshPools}
        />
      ))}
    </SimpleGrid>
  );
}
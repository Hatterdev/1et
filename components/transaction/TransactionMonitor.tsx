'use client';

import { useEffect } from 'react';
import { Box, VStack, Text, Progress } from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { useTransaction } from '@/hooks/useTransaction';

interface TransactionMonitorProps {
  txHash: string;
  onConfirmed?: () => void;
}

export function TransactionMonitor({ txHash, onConfirmed }: TransactionMonitorProps) {
  const { status, monitorTransaction } = useTransaction();

  useEffect(() => {
    if (txHash) {
      monitorTransaction(txHash);
    }
  }, [txHash]);

  if (!status) return null;

  return (
    <Box p={4} bg="gray.800" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Text fontSize="sm" color="gray.400">
          Transaction Status
        </Text>
        
        {status.status === 'pending' && (
          <>
            <Progress size="sm" isIndeterminate colorScheme="green" />
            <Text fontSize="sm">Transaction is being processed...</Text>
          </>
        )}

        {status.status === 'confirmed' && (
          <Box color="green.400" display="flex" alignItems="center">
            <CheckIcon mr={2} />
            <Text>Transaction confirmed!</Text>
          </Box>
        )}

        {status.status === 'failed' && (
          <Box color="red.400" display="flex" alignItems="center">
            <WarningIcon mr={2} />
            <Text>Transaction failed</Text>
          </Box>
        )}

        <Text fontSize="xs" color="gray.500">
          Hash: {txHash.slice(0, 6)}...{txHash.slice(-4)}
        </Text>
      </VStack>
    </Box>
  );
}
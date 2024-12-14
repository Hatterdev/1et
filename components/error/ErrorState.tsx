'use client';

import { VStack, Text, Button } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <VStack spacing={4} py={8}>
      <AlertTriangle size={48} color="red" />
      <Text color="red.400">{message}</Text>
      {onRetry && (
        <Button onClick={onRetry} colorScheme="green">
          Try Again
        </Button>
      )}
    </VStack>
  );
}
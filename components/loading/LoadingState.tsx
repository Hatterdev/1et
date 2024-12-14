'use client';

import { Box, Spinner, Text } from '@chakra-ui/react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <Box textAlign="center" py={8}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
        mb={4}
      />
      <Text>{message}</Text>
    </Box>
  );
}
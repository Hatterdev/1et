'use client';

import {
  Select,
  Image,
  HStack,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { REWARD_TOKENS } from '@/lib/constants/tokens';
import { DEFAULT_CHAIN } from '@/lib/config/network';

interface TokenSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  return (
    <FormControl>
      <FormLabel>Reward Token</FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="gray.900"
      >
        <option value="">Select a token</option>
        {REWARD_TOKENS.map((token) => (
          <option key={token.symbol} value={token.address[DEFAULT_CHAIN.id]}>
            {token.symbol} - {token.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
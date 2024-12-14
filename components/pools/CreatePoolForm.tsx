'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useDisclosure,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TokenSelector } from './TokenSelector';
import { usePoolCreation } from '@/hooks/usePoolCreation';
import { useWeb3 } from '@/hooks/useWeb3';
import { validatePoolParams } from '@/lib/utils/validation';

interface CreatePoolFormProps {
  onPoolCreated: () => void;
}

export function CreatePoolForm({ onPoolCreated }: CreatePoolFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { provider, account } = useWeb3();
  const { createPool, isCreating } = usePoolCreation();
  
  const [formData, setFormData] = useState({
    rewardToken: '',
    totalRewards: '',
    duration: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async () => {
    const validationError = validatePoolParams(
      formData.rewardToken,
      formData.totalRewards,
      parseInt(formData.duration)
    );

    if (validationError) {
      setErrors({ form: validationError });
      return;
    }

    if (!provider || !account) return;

    const success = await createPool(
      provider,
      formData.rewardToken,
      formData.totalRewards,
      parseInt(formData.duration)
    );

    if (success) {
      onClose();
      onPoolCreated();
      setFormData({ rewardToken: '', totalRewards: '', duration: '' });
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">Create New Pool</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Create Staking Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <TokenSelector
                value={formData.rewardToken}
                onChange={(value) => setFormData(prev => ({ ...prev, rewardToken: value }))}
              />

              <FormControl isInvalid={!!errors.totalRewards}>
                <FormLabel>Total Rewards</FormLabel>
                <Input
                  type="number"
                  value={formData.totalRewards}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalRewards: e.target.value }))}
                  placeholder="Amount of reward tokens"
                  bg="gray.900"
                />
                <FormErrorMessage>{errors.totalRewards}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.duration}>
                <FormLabel>Duration (days)</FormLabel>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="1-365 days"
                  min="1"
                  max="365"
                  bg="gray.900"
                />
                <FormErrorMessage>{errors.duration}</FormErrorMessage>
              </FormControl>

              {errors.form && (
                <Text color="red.400" fontSize="sm">
                  {errors.form}
                </Text>
              )}

              <Button
                width="full"
                onClick={handleSubmit}
                isLoading={isCreating}
                isDisabled={isCreating || !account}
                colorScheme="green"
                mt={4}
              >
                Create Pool
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
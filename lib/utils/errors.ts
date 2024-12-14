export class Web3Error extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'Web3Error';
  }
}

export class TransactionError extends Error {
  constructor(message: string, public txHash?: string) {
    super(message);
    this.name = 'TransactionError';
  }
}

export function handleError(error: any): Error {
  if (error instanceof Web3Error || error instanceof TransactionError) {
    return error;
  }

  // MetaMask errors
  if (error.code === 4001) {
    return new Web3Error('Transaction rejected by user', error.code);
  }

  // Network errors
  if (error.message?.includes('network')) {
    return new Web3Error('Network error. Please check your connection', 'NETWORK_ERROR');
  }

  // Contract errors
  if (error.message?.includes('execution reverted')) {
    return new TransactionError('Transaction failed. Please try again');
  }

  return new Error('An unexpected error occurred');
}
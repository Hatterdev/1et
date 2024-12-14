import { renderHook, act } from '@testing-library/react';
import { useWeb3 } from '@/hooks/useWeb3';
import { vi } from 'vitest';

describe('useWeb3', () => {
  beforeEach(() => {
    // Mock ethereum object
    global.window.ethereum = {
      request: vi.fn(),
      on: vi.fn(),
      removeListener: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete global.window.ethereum;
  });

  it('initializes with null values', () => {
    const { result } = renderHook(() => useWeb3());
    
    expect(result.current.provider).toBeNull();
    expect(result.current.account).toBeNull();
    expect(result.current.chainId).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('handles successful wallet connection', async () => {
    const mockAccounts = ['0x1234'];
    const mockChainId = '0x1';

    global.window.ethereum.request
      .mockImplementationOnce(() => Promise.resolve(mockAccounts))
      .mockImplementationOnce(() => Promise.resolve({ chainId: mockChainId }));

    const { result } = renderHook(() => useWeb3());

    await act(async () => {
      await result.current.connectWallet();
    });

    expect(result.current.account).toBe(mockAccounts[0]);
    expect(result.current.chainId).toBe(parseInt(mockChainId));
    expect(result.current.error).toBeNull();
  });

  it('handles connection error', async () => {
    const error = new Error('User rejected');
    global.window.ethereum.request.mockRejectedValue(error);

    const { result } = renderHook(() => useWeb3());

    await act(async () => {
      await result.current.connectWallet();
    });

    expect(result.current.error).toBe('Failed to connect wallet');
    expect(result.current.account).toBeNull();
  });
});
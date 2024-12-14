import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectWallet } from '@/components/ConnectWallet';
import { useWeb3 } from '@/hooks/useWeb3';
import { vi } from 'vitest';

// Mock the useWeb3 hook
vi.mock('@/hooks/useWeb3');

describe('ConnectWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders connect button when not connected', () => {
    vi.mocked(useWeb3).mockReturnValue({
      account: null,
      connectWallet: vi.fn(),
      error: null,
      provider: null,
      chainId: null,
    });

    render(<ConnectWallet />);
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
  });

  it('displays connected address when connected', () => {
    const mockAccount = '0x1234567890123456789012345678901234567890';
    vi.mocked(useWeb3).mockReturnValue({
      account: mockAccount,
      connectWallet: vi.fn(),
      error: null,
      provider: null,
      chainId: null,
    });

    render(<ConnectWallet />);
    expect(screen.getByText(`Connected: ${mockAccount.slice(0, 6)}...${mockAccount.slice(-4)}`)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to connect';
    vi.mocked(useWeb3).mockReturnValue({
      account: null,
      connectWallet: vi.fn(),
      error: errorMessage,
      provider: null,
      chainId: null,
    });

    render(<ConnectWallet />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls connectWallet when button is clicked', () => {
    const connectWallet = vi.fn();
    vi.mocked(useWeb3).mockReturnValue({
      account: null,
      connectWallet,
      error: null,
      provider: null,
      chainId: null,
    });

    render(<ConnectWallet />);
    fireEvent.click(screen.getByRole('button', { name: /connect wallet/i }));
    expect(connectWallet).toHaveBeenCalled();
  });
});
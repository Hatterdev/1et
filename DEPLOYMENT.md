# GIC Staking DApp Deployment Guide

## Prerequisites

1. Node.js 18+ installed
2. Git installed
3. A Netlify account
4. MetaMask wallet with BSC network configured

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gic-staking-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_NETWORK=testnet # or mainnet
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## BSC Network Configuration

### MetaMask Setup

1. Open MetaMask
2. Add BSC Network:
   - **Mainnet**:
     - Network Name: BNB Smart Chain
     - RPC URL: https://bsc-dataseed.binance.org
     - Chain ID: 56
     - Symbol: BNB
     - Explorer: https://bscscan.com

   - **Testnet**:
     - Network Name: BSC Testnet
     - RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545
     - Chain ID: 97
     - Symbol: tBNB
     - Explorer: https://testnet.bscscan.com

## Production Deployment

### Build Configuration

1. Update environment variables for production in Netlify:
   - NEXT_PUBLIC_NETWORK
   - NEXT_PUBLIC_CONTRACT_ADDRESS

2. Build command:
   ```bash
   npm run build
   ```

### Netlify Deployment Steps

1. Push code to GitHub repository

2. Connect to Netlify:
   - Log in to Netlify
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Add environment variables

3. Deploy:
   - Netlify will automatically build and deploy
   - Each push to main branch triggers new deployment

## Post-Deployment Checklist

1. Verify smart contract connection
2. Test wallet connection on BSC
3. Test pool creation
4. Verify token interactions
5. Check transaction confirmations

## Security Considerations

1. Always verify contract addresses
2. Use correct BSC network (mainnet/testnet)
3. Check gas fees before transactions
4. Verify token approvals

## Troubleshooting

Common issues and solutions:

1. Network Connection:
   - Ensure MetaMask is on correct BSC network
   - Check RPC endpoint status

2. Transaction Failures:
   - Verify BNB balance for gas
   - Check token approvals
   - Confirm contract interactions

3. MetaMask Issues:
   - Clear cache and reset account
   - Reconnect wallet
   - Update MetaMask

## Support

For technical support:
- GitHub Issues
- Documentation: [Project Wiki]
- Community: [Discord/Telegram]
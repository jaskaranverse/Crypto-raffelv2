# Crypto Raffle DApp - Setup Instructions

## 🎯 Overview

This crypto raffle application allows users to enter a raffle by paying USDC, with an admin panel to manage settings and withdraw funds.

## 📋 Prerequisites

1. **MetaMask Extension** - Install from [metamask.io](https://metamask.io/download/)
2. **USDC Tokens** - Get testnet USDC for testing (Sepolia network)
3. **Admin Wallet** - Your MetaMask wallet address

## 🔧 Configuration Steps

### Step 1: Configure Your Admin Wallet

1. Open `config.js`
2. Replace `ADMIN_ADDRESS` with your MetaMask wallet address:
   ```javascript
   ADMIN_ADDRESS: '0xYourActualWalletAddressHere',
   ```

### Step 2: Get Testnet USDC (For Testing)

**Option A: Use Sepolia Testnet USDC**
1. Switch MetaMask to Sepolia Testnet
2. Get Sepolia ETH from faucet: https://sepoliafaucet.com/
3. Get testnet USDC from: https://faucet.circle.com/ (or use the mock USDC contract)

**Option B: Deploy Your Own Mock USDC (Recommended for Testing)**
1. Use the provided mock USDC contract address in `config.js`
2. Or deploy your own ERC20 token for testing

### Step 3: Update USDC Contract Address (Optional)

If using a different USDC contract:
1. Open `config.js`
2. Update the `USDC_CONTRACT.address`:
   ```javascript
   USDC_CONTRACT: {
       address: '0xYourUSDCContractAddress',
       decimals: 6,
       symbol: 'USDC'
   }
   ```

## 🚀 Running the Application

### For Users (Raffle Participants)

1. Open `index.html` in a web browser
2. Click "Connect Wallet" in the top right
3. Approve the MetaMask connection
4. Click "Enter Raffle Now" to participate
5. Approve the USDC payment transaction in MetaMask
6. Your entry will be confirmed!

### For Admin (Raffle Manager)

1. Open `admin.html` in a web browser
2. Connect your admin wallet (must match `ADMIN_ADDRESS` in config.js)
3. You can now:
   - View statistics (participants, revenue, etc.)
   - Change raffle settings (entry fee, prize pool, duration)
   - Start new raffles
   - End raffles and draw winners
   - Withdraw collected funds

## 💰 Payment Flow

### Demo Mode (Current Setup)
- Payments are simulated
- No real USDC is transferred
- Perfect for testing the UI and flow

### Production Mode (Real Payments)

To enable real USDC payments:

1. Open `app.js`
2. Find the `enterRaffle()` function
3. **Uncomment** the production code block (around line 220):
   ```javascript
   // Uncomment this section for PRODUCTION:
   const amount = ethers.utils.parseUnits(entryFee.toString(), RAFFLE_CONFIG.USDC_CONTRACT.decimals);
   const balance = await appState.usdcContract.balanceOf(appState.walletAddress);
   // ... rest of the code
   ```
4. **Comment out** or remove the demo simulation code

## 🔐 Security Notes

### Important Security Considerations:

1. **Admin Address Protection**
   - In production, uncomment the admin address check in `admin.js` (line 73-76)
   - This ensures only your wallet can access the admin panel

2. **Smart Contract Security**
   - For production, consider using a proper smart contract instead of direct transfers
   - Implement proper access controls and security measures

3. **Private Keys**
   - Never share your private keys or seed phrase
   - Keep your admin wallet secure

## 📱 Features

### User Features
- ✅ Connect MetaMask wallet
- ✅ View raffle details (prize pool, entry fee, participants)
- ✅ Live countdown timer
- ✅ Enter raffle with USDC payment
- ✅ View transaction history
- ✅ See win probability
- ✅ View winner announcement

### Admin Features
- ✅ Secure admin authentication
- ✅ View real-time statistics
- ✅ Adjust raffle settings (entry fee, prize pool, duration)
- ✅ Start new raffles
- ✅ End raffles and draw winners
- ✅ View all transactions
- ✅ Withdraw collected funds

## 🧪 Testing Checklist

- [ ] Connect wallet successfully
- [ ] View correct raffle information
- [ ] Enter raffle (demo mode)
- [ ] See entry in transaction history
- [ ] Access admin panel with admin wallet
- [ ] Change raffle settings
- [ ] Start new raffle
- [ ] End raffle and draw winner

## 🐛 Troubleshooting

### "MetaMask not installed"
- Install MetaMask extension from metamask.io
- Refresh the page after installation

### "Insufficient USDC balance"
- Get testnet USDC from a faucet
- Or use demo mode for testing

### "Transaction failed"
- Check you have enough ETH for gas fees
- Verify you're on the correct network (Sepolia)
- Check USDC contract address is correct

### "Access Denied" on Admin Panel
- Verify your wallet address matches `ADMIN_ADDRESS` in config.js
- Make sure you're connected with the correct wallet

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all configuration steps are completed
3. Ensure MetaMask is properly connected

## 🎉 Next Steps

1. Test the application in demo mode
2. Configure your admin wallet address
3. Get testnet USDC for testing
4. Enable production mode when ready
5. Deploy to a web server for public access

---

**Note**: This is a demonstration application. For production use, implement proper smart contracts, security audits, and legal compliance.
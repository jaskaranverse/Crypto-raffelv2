# 🎰 Crypto Raffle Platform

A decentralized raffle platform built on Ethereum with automatic winner selection and payment.

## 🌟 Features

- **Single Active Raffle**: One raffle at a time for focused participation
- **Automatic Winner Selection**: Winner randomly selected when raffle ends
- **Entry Tracking**: Each participant gets a unique entry number
- **MetaMask Integration**: Seamless wallet connection
- **Real-time Updates**: Live participant tracking and countdown timer
- **Transparent**: All transactions on-chain

## 🎯 Current Raffle Settings

- **Entry Fee**: ~$2-3 worth of ETH (0.0008 ETH)
- **Prize Pool**: 0.01 ETH
- **Duration**: 7 days
- **Max Participants**: 50
- **Min Participants**: 2 (required for draw)

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Connect your MetaMask wallet
3. Pay the entry fee (0.0008 ETH) to enter
4. Receive your unique entry number
5. Wait for the raffle to end
6. Winner is automatically selected and announced!

## 📋 How It Works

### For Participants:
1. **Connect Wallet**: Click "Connect Wallet" and approve in MetaMask
2. **Enter Raffle**: Pay 0.0008 ETH entry fee
3. **Get Entry Number**: Receive unique participant number
4. **Wait**: Watch the countdown timer
5. **Winner Announced**: When raffle ends, winner is randomly selected

### Automatic Winner Selection:
- **Random Selection**: Winner chosen using cryptographically secure randomization
- **Automatic Process**: Runs every 10 seconds to check if raffle has ended
- **Transparent**: All entries recorded with wallet addresses
- **Fair**: Each entry has equal chance of winning
- **Payment Info**: Winner details stored for admin to process payment

## 🦊 MetaMask Setup

### Before You Start:

1. **Install MetaMask**
   - Go to https://metamask.io/download/
   - Install the browser extension
   - Create or import a wallet

2. **Get Test ETH (for testing)**
   - Go to https://sepoliafaucet.com/
   - Connect your wallet
   - Request test ETH (free!)

## 🔧 Admin Features

Access the admin dashboard at `admin.html` to:
- Monitor current raffle status
- View all participants and entries
- Track pending winner payments
- Create new raffles when current one ends
- Process winner payments

## 🌐 Supported Networks

- Ethereum Mainnet
- Sepolia Testnet (recommended for testing)
- Other EVM-compatible networks

## ⚠️ Important Notes

- Only one raffle active at a time
- Minimum 2 participants required for winner draw
- Entry fee: approximately $2-3 in ETH (0.0008 ETH)
- Prize: 0.01 ETH
- Winner selected automatically when raffle ends
- Admin must process payment to winner's wallet
- Always test on testnet first
- Keep your private keys secure

## 🎲 Winner Selection Process

1. **Raffle Ends**: Countdown reaches zero
2. **Check Participants**: System verifies minimum 2 participants
3. **Random Selection**: Winner chosen randomly from all entries
4. **Announcement**: Winner address displayed on site
5. **Payment Queue**: Winner info stored for admin payment processing
6. **Admin Payment**: Admin sends 0.01 ETH to winner's wallet

## 🛠️ Tech Stack

- HTML5/CSS3
- JavaScript (ES6+)
- Ethers.js v5.2
- MetaMask Web3 Provider
- Automatic winner selection algorithm
- LocalStorage for demo data

## 📁 Project Structure

```
crypto-raffle-demo/
├── index.html          # Main raffle page
├── admin.html          # Admin dashboard
├── app.js             # Main application logic
├── admin.js           # Admin functionality
├── config.js          # Configuration settings
├── demo-data.js       # Demo raffle data
├── styles.css         # Styling
├── vercel.json        # Deployment config
└── README.md          # This file
```

## 🔐 Security

- Wallet connection is read-only until transaction approval
- All transactions require MetaMask approval
- No private keys are ever accessed
- Open source code for transparency
- Test on testnet before mainnet deployment

## 📄 License

MIT License - feel free to use and modify

---

**Built with ❤️ for the Ethereum community**
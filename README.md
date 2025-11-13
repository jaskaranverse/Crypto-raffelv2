# 🎰 Crypto Raffle Platform - Standalone Edition

A fully functional decentralized raffle platform built on Ethereum with automatic winner selection, payment tracking, and a complete admin panel. **No Webflow required** - this is a standalone web application ready to deploy!

## 🌟 Features

- **Multiple Active Raffles**: Support for unlimited concurrent raffles
- **Automatic Winner Selection**: Winners randomly selected when raffles end
- **Entry Tracking**: Each participant gets a unique entry number
- **MetaMask Integration**: Seamless wallet connection
- **Real-time Updates**: Live participant tracking and countdown timers
- **Admin Panel**: Full-featured dashboard for raffle management
- **Supabase Backend**: Cloud database for persistent storage
- **Transparent**: All transactions on-chain
- **Mobile Responsive**: Works on all devices

## 🚀 Quick Start

### For Users (Main Site):

1. Visit the deployed site or open [`index.html`](index.html:1)
2. Click "Connect Wallet" to connect MetaMask
3. Browse active raffles
4. Click "Enter Raffle Now" to participate
5. Approve the transaction in MetaMask
6. Wait for the raffle to end and winner announcement!

### For Admins:

1. Visit [`admin.html`](admin.html:1) (keep this URL private!)
2. Connect with your admin wallet (configured in [`config.js`](config.js:4))
3. Create new raffles with custom settings
4. Monitor participants and transactions
5. Process winner payments when raffles end

## 📋 Setup Instructions

### 1. Configure Supabase (Required)

The platform uses Supabase as the backend database. Follow these steps:

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Set Up Database**
   - In Supabase dashboard, go to **SQL Editor**
   - Open [`supabase-schema.sql`](supabase-schema.sql:1) from this project
   - Copy all the SQL code
   - Paste into Supabase SQL Editor
   - Click **Run**
   - You should see "Success. No rows returned"

3. **Get API Credentials**
   - Go to **Settings** → **API**
   - Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - Copy your **anon public** key (the long string)

4. **Update Configuration**
   - Open [`api-service.js`](api-service.js:2)
   - Replace `SUPABASE_URL` with your Project URL
   - Replace `SUPABASE_KEY` with your anon public key

### 2. Configure Admin Wallet

1. Open [`config.js`](config.js:4)
2. Replace `ADMIN_ADDRESS` with your MetaMask wallet address
3. This wallet will have exclusive access to the admin panel

### 3. Deploy the Site

Choose one of these deployment options:

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

#### Option C: GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch and root folder
4. Save and wait for deployment

#### Option D: Local Testing
```bash
# Use any local server, for example:
python -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`

## 🎯 How It Works

### For Participants:

1. **Connect Wallet**: Click "Connect Wallet" and approve in MetaMask
2. **Browse Raffles**: View all active raffles with details
3. **Enter Raffle**: Click "Enter Raffle Now" and pay entry fee
4. **Track Progress**: See your entries and win chance percentage
5. **Wait for Draw**: Watch the countdown timer
6. **Winner Announced**: Automatic selection when raffle ends

### For Admins:

1. **Create Raffles**: Set prize pool, entry fee, duration, and limits
2. **Monitor Activity**: View live dashboard with stats
3. **Track Participants**: See all entries with wallet addresses
4. **Process Payments**: Send prizes to winners manually
5. **Manage Raffles**: Edit or delete raffles as needed

### Automatic Winner Selection:

- **Random Selection**: Cryptographically secure randomization
- **Automatic Process**: Checks every 10 seconds for ended raffles
- **Minimum Participants**: Requires at least 2 entries to draw
- **Transparent**: All entries recorded with timestamps
- **Fair**: Each entry has equal chance of winning
- **Payment Queue**: Winner details stored for admin processing

## 🦊 MetaMask Setup

### Installation:

1. Go to [metamask.io/download](https://metamask.io/download/)
2. Install the browser extension
3. Create or import a wallet
4. **Keep your seed phrase safe!**

### Get Test ETH (for testing):

1. Switch to Sepolia Testnet in MetaMask
2. Go to [sepoliafaucet.com](https://sepoliafaucet.com/)
3. Connect your wallet
4. Request test ETH (free!)

## 🔧 Admin Panel Features

Access at [`admin.html`](admin.html:1) with your admin wallet:

### Dashboard Tab
- Live statistics (active raffles, participants, revenue)
- Real-time activity feed
- Pending winner payments table

### Participants Tab
- View all participants across all raffles
- Search by wallet address
- Export participant data

### Create Raffle Tab
- Set raffle title and description
- Configure prize pool and entry fee
- Set total spots and max entries per wallet
- Choose duration or specific end time

### Manage Raffles Tab
- View all created raffles
- Edit active raffles
- Delete raffles
- View detailed raffle information

### Settings Tab
- View admin wallet address
- Network information

## 🌐 Supported Networks

- ✅ Ethereum Mainnet
- ✅ Sepolia Testnet (recommended for testing)
- ✅ Goerli Testnet
- ✅ Polygon Mainnet
- ✅ Other EVM-compatible networks

## 💰 Payment Flow

```
User → Pays Entry Fee → Your Wallet Address (set in raffle)
     ↓
System → Selects Winner Automatically
     ↓
Admin → Manually Sends Prize → Winner's Address
```

**Important**: The system does NOT automatically send prizes. You must:
1. Wait for raffle to end
2. Check "Pending Winner Payments" in admin dashboard
3. Copy winner's wallet address
4. Manually send the prize ETH from your wallet
5. Mark as paid in the admin panel

## 📁 Project Structure

```
crypto-raffle-demo/
├── index.html          # Main raffle page (public)
├── admin.html          # Admin dashboard (keep URL private)
├── app.js             # Main application logic
├── admin.js           # Admin panel functionality
├── api-service.js     # Supabase API integration
├── config.js          # Configuration (admin wallet, settings)
├── demo-data.js       # Demo data for testing
├── styles.css         # Complete styling
├── supabase-schema.sql # Database schema
├── vercel.json        # Vercel deployment config
├── backend/           # Optional Node.js backend
│   ├── server.js      # Express API server
│   └── package.json   # Backend dependencies
└── README.md          # This file
```

## 🔐 Security Features

- **Admin Authentication**: Only authorized wallet can access admin panel
- **Wallet Connection**: Read-only until transaction approval
- **Transaction Approval**: All payments require MetaMask confirmation
- **No Private Keys**: Never accessed or stored
- **On-Chain Verification**: All transactions verifiable on blockchain
- **Open Source**: Transparent code for community review
- **Row Level Security**: Supabase database properly configured

## ⚠️ Important Notes

- **Test First**: Always test on Sepolia testnet before mainnet
- **Keep Admin URL Secret**: Don't share your admin panel URL publicly
- **Monitor Regularly**: Check admin dashboard for activity
- **Fast Payouts**: Send prizes quickly after winner selection
- **Set Realistic Prizes**: Don't promise more than you can pay
- **Backup Data**: Export Supabase tables regularly
- **Gas Fees**: Users pay gas fees for entry transactions
- **Manual Payments**: You must manually send prizes to winners

## 🐛 Troubleshooting

### "Error loading raffles"
- Check Supabase URL has no spaces
- Verify API key is correct
- Ensure SQL schema was run successfully
- Check browser console for errors

### "Connect Wallet First"
- Install MetaMask browser extension
- Make sure you're on a supported network
- Refresh the page and try again

### "Insufficient balance"
- You need ETH in your wallet to enter raffles
- Check your wallet balance
- Ensure you're on the correct network

### "Transaction rejected"
- User cancelled the transaction in MetaMask
- Try again or check gas fees

### Admin panel shows "Unauthorized"
- Connect with the correct admin wallet
- Check `ADMIN_ADDRESS` in [`config.js`](config.js:4)
- Addresses must match exactly (case-insensitive)

### Raffles not appearing
- Check Supabase connection
- Verify database tables exist
- Check browser console for API errors
- Ensure raffles have `status: 'active'`

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Web3**: Ethers.js v5.2, MetaMask Provider
- **Database**: Supabase (PostgreSQL)
- **Backend (Optional)**: Node.js, Express, MongoDB
- **Deployment**: Vercel, Netlify, or any static host
- **Blockchain**: Ethereum (EVM-compatible)

## 🚀 Advanced Features

### Custom Raffle Settings
Edit [`config.js`](config.js:1) to customize:
- Default entry fees
- Prize pools
- Duration options
- Network settings
- USDC token support

### Multiple Admin Wallets
Modify admin authentication in [`admin.js`](admin.js:111) to support multiple admins

### Email Notifications
Integrate with services like SendGrid for winner notifications

### Smart Contract Integration
Deploy a smart contract for fully automated prize distribution

## 📊 Database Structure

### Tables:
- **raffles**: Stores raffle information
- **participants**: Tracks who entered each raffle
- **transactions**: Records all payments
- **winners**: Stores selected winners and payment status

### Row Level Security:
- Public can READ all tables
- Public can INSERT into participants and transactions
- Only authenticated users can modify raffles

## 🎨 Customization

### Change Colors
Edit [`styles.css`](styles.css:1) to customize:
- Primary colors
- Gradients
- Button styles
- Card designs

### Modify Layout
Edit [`index.html`](index.html:1) and [`admin.html`](admin.html:1) to change:
- Page structure
- Component placement
- Text content

### Add Features
Extend functionality in:
- [`app.js`](app.js:1) - Main raffle logic
- [`admin.js`](admin.js:1) - Admin features
- [`api-service.js`](api-service.js:1) - API calls

## 📄 License

MIT License - feel free to use and modify for your projects

## 🆘 Support

If you need help:
1. Check the troubleshooting section above
2. Review Supabase logs in dashboard
3. Check browser console (F12) for errors
4. Verify all credentials are correct
5. Test on Sepolia testnet first

## 🎉 You're Ready!

Your crypto raffle platform is now complete and ready to deploy:

1. ✅ Configure Supabase credentials
2. ✅ Set admin wallet address
3. ✅ Deploy to your hosting platform
4. ✅ Test on testnet
5. ✅ Go live and start creating raffles!

---

**Built with ❤️ for the Ethereum community**

**No Webflow Required - Fully Standalone Application**
# 🎰 Crypto Raffle Platform - GitHub-Powered Database!

A fully functional decentralized raffle platform that uses **GitHub as a free database**. All users see the same raffles - no Supabase, no backend, completely free!

## 🌟 Key Features

- **🆓 100% Free**: Uses GitHub as database - no costs!
- **🌐 Shared Data**: All users see the same raffles
- **🔐 No Signup**: Users just connect wallet and enter
- **💰 Direct Payments**: Entry fees go straight to your wallet
- **🎲 Auto Winner Selection**: Automatic random winner when raffle ends
- **📊 Admin Panel**: Full-featured dashboard for management
- **📱 Mobile Responsive**: Works on all devices
- **⚡ Fast**: GitHub CDN for global speed

## ⚡ Quick Start (2 Minutes!)

### 1. Set Your Admin Wallet
Open [`config.js`](config.js:4) and replace with your MetaMask address:
```javascript
ADMIN_ADDRESS: 'YOUR_METAMASK_ADDRESS_HERE',
```

### 2. Deploy to Netlify/Vercel
- Drag folder to [netlify.com](https://app.netlify.com)
- Or use Vercel: `vercel`
- Get your live URL!

### 3. Create Your First Raffle
- Open `your-url.com/admin.html`
- Connect admin wallet
- Create raffle
- Export data and sync to GitHub (see below)

## 🔄 How GitHub Storage Works

### For Users (Automatic):
- Visit your site
- See all raffles (loaded from GitHub)
- Enter raffles (data saved locally + GitHub)
- Everything just works!

### For Admin (Simple Sync):
1. Create raffles in admin panel
2. Go to Settings tab
3. Click "Export Data for GitHub"
4. Upload to GitHub (instructions below)
5. All users now see your raffles!

## 📤 Syncing Data to GitHub

### Step-by-Step:

1. **Create Raffle** in admin panel
2. **Export Data**:
   - Go to Settings tab
   - Click "Export Data for GitHub"
   - Save the `raffles.json` file

3. **Upload to GitHub**:
   - Go to your GitHub repository
   - Navigate to `data/raffles.json`
   - Click "Edit" (pencil icon)
   - Replace content with your exported file
   - Click "Commit changes"

4. **Done!** All users see your raffles instantly!

### Auto-Sync (Optional):
You can automate this with GitHub Actions - see `DEPLOYMENT_GUIDE.md`

## 🎯 How It Works

### Data Flow:
```
Admin Creates Raffle
        ↓
Saved Locally (instant)
        ↓
Export to GitHub (manual)
        ↓
All Users Load from GitHub
        ↓
Users Enter Raffles
        ↓
Entries Saved Locally
        ↓
Export & Sync to GitHub
        ↓
Everyone Sees Same Data!
```

### Storage Locations:
- **GitHub**: Master database (public, shared)
- **localStorage**: Local cache (fast loading)
- **Blockchain**: Payment transactions

## 💰 Payment Flow

```
User Pays Entry Fee
        ↓
Goes Directly to YOUR Wallet
        ↓
Entry Recorded Locally
        ↓
Sync to GitHub
        ↓
Raffle Ends
        ↓
Winner Selected Automatically
        ↓
You Send Prize to Winner
        ↓
Mark as Paid
```

**No middleman, no fees, completely free!**

## 🦊 MetaMask Setup

### For Users:
1. Install [MetaMask](https://metamask.io/download/)
2. Create wallet
3. Get some ETH
4. Connect and enter raffles!

### For Testing:
1. Switch to Sepolia Testnet
2. Get free test ETH from [sepoliafaucet.com](https://sepoliafaucet.com/)
3. Test everything before going live!

## 🔧 Admin Panel Features

Access at `admin.html` (keep URL private!):

### Dashboard Tab
- **Live Stats**: Active raffles, participants, revenue
- **Activity Feed**: Real-time entries
- **Pending Winners**: Winners awaiting payment

### Create Raffle Tab
- Set title, description, prize pool
- Configure entry fee and limits
- Choose duration or specific end time
- Creates instantly!

### Manage Raffles Tab
- View all raffles (active & completed)
- Edit active raffles
- Delete raffles
- View detailed stats

### Participants Tab
- See all entries across all raffles
- Search by wallet address
- View entry numbers and timestamps

### Settings Tab
- View admin wallet
- **Export Data for GitHub** (important!)
- Sync instructions

## 📁 Project Structure

```
crypto-raffle-demo/
├── index.html          # Main raffle page (public)
├── admin.html          # Admin dashboard (keep private!)
├── app.js             # Main raffle logic
├── admin.js           # Admin functionality
├── api-service.js     # GitHub API integration
├── config.js          # Settings (admin wallet)
├── styles.css         # All styling
├── data/
│   └── raffles.json   # Database file (sync to GitHub)
└── README.md          # This file
```

## 🌐 Deployment Options

### Option 1: Netlify (Easiest)
1. Drag folder to [app.netlify.com](https://app.netlify.com)
2. Get instant URL
3. Done!

### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Pages
1. Push to GitHub
2. Enable Pages in settings
3. Done!

## 💾 Data Management

### What's Stored:
- ✅ Raffle details (title, prize, fee, etc.)
- ✅ Participant wallet addresses
- ✅ Entry numbers and timestamps
- ✅ Transaction hashes
- ✅ Winner information

### Where It's Stored:
- **GitHub**: Master database (public)
- **localStorage**: Local cache (per browser)
- **Blockchain**: Transaction records

### Backup Strategy:
- GitHub is your backup!
- Export regularly from admin panel
- Keep local copies of exports
- GitHub history tracks all changes

## 🔐 Security Features

- **Admin Authentication**: Only your wallet can access admin panel
- **Wallet-Only Entry**: No email, no password, no personal data
- **On-Chain Payments**: All transactions verifiable on blockchain
- **No Private Keys**: Never accessed or stored
- **GitHub Public Repo**: Transparent and auditable
- **No Server**: Nothing to hack!

## ⚠️ Important Notes

### Advantages:
✅ **100% Free**: No database costs ever
✅ **Shared Data**: All users see same raffles
✅ **No Signup**: Users just connect wallet
✅ **Fast**: GitHub CDN worldwide
✅ **Transparent**: Public repository
✅ **Reliable**: GitHub's 99.9% uptime

### How to Use:
1. **Create raffles** in admin panel
2. **Export data** from Settings tab
3. **Upload to GitHub** (replace data/raffles.json)
4. **Users see raffles** automatically!

### Best Practices:
1. **Sync Regularly**: Export and upload after creating raffles
2. **Test on Sepolia**: Before mainnet
3. **Keep Admin URL Private**: Don't share admin.html
4. **Process Winners Fast**: Within 24 hours
5. **Start Small**: Small prizes first
6. **Monitor Daily**: Check admin dashboard

## 🎨 Customization

### Change Colors
Edit [`styles.css`](styles.css:1):
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Entry Fee
Edit [`config.js`](config.js:16):
```javascript
entryFee: 0.001, // Change this
```

### Change Prize Pool
Edit [`config.js`](config.js:17):
```javascript
prizePool: 0.01, // Change this
```

## 🐛 Troubleshooting

### "Connect Wallet First"
→ Install MetaMask extension
→ Refresh page

### "Access Denied" (Admin)
→ Check admin address in config.js
→ Use correct wallet

### Raffles not showing
→ Check data/raffles.json exists in GitHub
→ Verify GitHub repo is public
→ Check browser console (F12)

### Data not syncing
→ Export from admin panel
→ Upload to GitHub data/raffles.json
→ Commit changes
→ Wait 1-2 minutes for CDN update

## 📊 How Winner Selection Works

1. **Raffle Ends**: Countdown reaches zero
2. **Auto-Check**: System checks every 10 seconds
3. **Verify Participants**: Must have at least 2 entries
4. **Random Selection**: Cryptographically secure random
5. **Winner Announced**: Displayed on site
6. **Payment Queue**: Added to pending winners
7. **Admin Pays**: You send prize manually
8. **Mark Paid**: Update in admin panel
9. **Sync to GitHub**: Export and upload

## 🎯 Use Cases

Perfect for:
- 🎰 Community raffles
- 🎁 Giveaways
- 🏆 Contests
- 💰 Fundraisers
- 🎮 Gaming tournaments
- 🎨 NFT drops
- 🌟 Promotional events

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Web3**: Ethers.js v5.2
- **Wallet**: MetaMask integration
- **Database**: GitHub (free!)
- **CDN**: GitHub Pages/Netlify/Vercel
- **Blockchain**: Ethereum (EVM-compatible)

## 🌐 Supported Networks

- ✅ Ethereum Mainnet
- ✅ Sepolia Testnet (for testing)
- ✅ Goerli Testnet
- ✅ Polygon Mainnet
- ✅ Any EVM-compatible network

## 📈 Scaling

### Small Raffles (1-50 participants):
- ✅ Works perfectly
- ✅ Instant sync
- ✅ No issues

### Medium Raffles (50-200 participants):
- ✅ Still great
- ✅ Sync after each batch
- ✅ Fast loading

### Large Raffles (200+ participants):
- ✅ Works well
- ⚠️ Sync more frequently
- ✅ GitHub handles it easily

## 🎉 Quick Start Checklist

Before going live:
- [ ] Set admin wallet in config.js
- [ ] Deploy to Netlify/Vercel
- [ ] Test on Sepolia testnet
- [ ] Create test raffle
- [ ] Export and sync to GitHub
- [ ] Enter test raffle
- [ ] Verify winner selection
- [ ] Test payment process
- [ ] Keep admin URL private
- [ ] Share main URL with users

## 💡 Pro Tips

1. **Sync After Creating**: Export and upload immediately
2. **Test First**: Always test on Sepolia
3. **Start Small**: Begin with small prizes
4. **Be Fast**: Process winners within 24 hours
5. **Stay Organized**: Keep GitHub repo clean
6. **Monitor Daily**: Check admin dashboard
7. **Build Trust**: Be transparent with users
8. **Scale Gradually**: Increase prizes slowly

## 📄 License

MIT License - free to use and modify

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Verify GitHub repo is public
3. Check data/raffles.json exists
4. Try refreshing the page
5. Re-export and sync data

---

## 🎊 You're Ready!

Your crypto raffle platform:
- ✅ **Uses GitHub as database** - completely free!
- ✅ **Shared data** - all users see same raffles
- ✅ **No signup** - wallet-only
- ✅ **Direct payments** - to your wallet
- ✅ **Auto winners** - random selection
- ✅ **Easy sync** - export and upload
- ✅ **Fully functional** - all features working

**Just set your admin wallet, deploy, and start creating raffles! 🚀**

---

**Built with ❤️ for the Ethereum community**

**GitHub-Powered • No Database Costs • Shared for All Users! 🎰**
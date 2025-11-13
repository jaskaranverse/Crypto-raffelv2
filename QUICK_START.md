# ⚡ Quick Start Guide - No Database Required!

Get your raffle platform running in **30 SECONDS** - no database, no signup, no configuration!

## 🎯 What You're Building

A complete crypto raffle platform where:
- ✅ Users enter by connecting wallet (no signup!)
- ✅ Entry fees go directly to YOUR wallet
- ✅ Winners selected automatically
- ✅ All data stored in browser (no database!)
- ✅ Works instantly - zero setup!

## 🚀 30-Second Setup

### Step 1: Set Your Admin Wallet (10 seconds)

Open [`config.js`](config.js:4) and replace line 4:
```javascript
ADMIN_ADDRESS: 'YOUR_METAMASK_ADDRESS_HERE',
```

**To get your address:**
1. Open MetaMask
2. Click account name
3. Click "Copy address"
4. Paste in config.js

### Step 2: Open the Site (10 seconds)

**Option A - Local:**
```bash
# Just open index.html in your browser!
# Or use a local server:
python -m http.server 8000
```

**Option B - Deploy:**
Drag your folder to [app.netlify.com](https://app.netlify.com)

### Step 3: Create First Raffle (10 seconds)

1. Open `admin.html`
2. Click "Connect Admin Wallet"
3. Go to "Create Raffle" tab
4. Fill in:
   - Title: "Win 0.01 ETH!"
   - Prize: 0.01
   - Entry Fee: 0.001
   - Duration: 1 day
5. Click "Create Raffle"
6. **Done!** It's live instantly! 🎉

## ✅ That's It!

Your raffle platform is now:
- ✅ Running
- ✅ Accepting entries
- ✅ Storing data in browser
- ✅ Ready for users!

## 🎯 How Users Interact

### User Journey (No Signup!):
```
1. Visit your site
   ↓
2. Click "Connect Wallet"
   ↓
3. See active raffles
   ↓
4. Click "Enter Raffle Now"
   ↓
5. Approve payment in MetaMask
   ↓
6. Get entry number instantly
   ↓
7. Wait for raffle to end
   ↓
8. Winner announced!
```

**No email, no password, no signup - just wallet!**

## 🎛️ Admin Workflow

### Creating Raffles:
```
1. Open admin.html
   ↓
2. Connect admin wallet
   ↓
3. Click "Create Raffle"
   ↓
4. Fill in details
   ↓
5. Click "Create"
   ↓
6. Live instantly!
```

### Processing Winners:
```
1. Raffle ends automatically
   ↓
2. Winner selected randomly
   ↓
3. Check "Pending Winners"
   ↓
4. Copy winner's address
   ↓
5. Send prize from MetaMask
   ↓
6. Click "Mark Paid"
   ↓
7. Done!
```

## 💾 How Data Storage Works

### Where is data stored?
- **Browser localStorage**: All raffle data
- **Your wallet**: Entry fee payments
- **Blockchain**: Transaction records

### What's stored?
- Raffle details (title, prize, fee)
- Participant wallet addresses
- Entry numbers and timestamps
- Winner information

### Important to know:
- ✅ Data survives page refresh
- ✅ Data survives browser restart
- ⚠️ Data is per-browser (not synced)
- ⚠️ Cleared if user clears browser data
- 💡 **Solution**: Export data regularly!

## 📤 Backup Your Data

### Export Data (Recommended Weekly):
1. Open admin panel
2. Go to "Settings" tab
3. Click "Export Data"
4. Save JSON file
5. Keep it safe!

### Import Data:
1. Open admin panel
2. Go to "Settings" tab
3. Click "Import Data"
4. Select your JSON file
5. Data restored!

## 🔧 Common Customizations

### Change Entry Fee:
**File:** [`config.js`](config.js:16)
```javascript
entryFee: 0.001, // Change this
```

### Change Prize Pool:
**File:** [`config.js`](config.js:17)
```javascript
prizePool: 0.01, // Change this
```

### Change Colors:
**File:** [`styles.css`](styles.css:1)
```css
/* Find and replace */
#667eea → Your color
#10B981 → Your color
```

## 🐛 Quick Troubleshooting

### "Connect Wallet First"
→ Install MetaMask
→ Refresh page

### "Access Denied" (Admin)
→ Check admin address in config.js
→ Use correct wallet

### Raffles not showing
→ Refresh page
→ Check browser console (F12)

### Lost data
→ Import from backup
→ Export regularly to prevent this!

## 💡 Pro Tips

1. **Export Weekly**: Backup your data!
2. **Test on Sepolia**: Get free test ETH from [sepoliafaucet.com](https://sepoliafaucet.com/)
3. **Start Small**: Small prizes first
4. **Be Fast**: Process winners within 24 hours
5. **Keep Admin URL Secret**: Don't share admin.html

## 🎯 Testing Checklist

Before going live:
- [ ] Set admin wallet in config.js
- [ ] Test on Sepolia testnet
- [ ] Create test raffle
- [ ] Enter with test wallet
- [ ] Verify winner selection
- [ ] Test payment process
- [ ] Export data backup
- [ ] Deploy to hosting

## 🚀 Deployment Options

### Netlify (Easiest):
1. Drag folder to [app.netlify.com](https://app.netlify.com)
2. Get instant URL
3. Done!

### Vercel:
```bash
npm install -g vercel
vercel
```

### GitHub Pages:
1. Push to GitHub
2. Enable Pages in settings

### Local:
```bash
python -m http.server 8000
```

## 📚 Full Documentation

- **Complete Guide**: [`README.md`](README.md:1)
- **Admin Features**: [`ADMIN_ACCESS.md`](ADMIN_ACCESS.md:1)
- **Deployment**: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md:1)

## 🎉 You're Ready!

Your platform is now:
- ✅ Configured (just admin wallet)
- ✅ Working (no database needed)
- ✅ Ready to deploy
- ✅ Ready for users

**Time to create your first raffle! 🚀**

---

## 📋 Quick Reference

### Key Files:
- `index.html` - Main site (public)
- `admin.html` - Admin panel (private)
- `config.js` - Settings (admin wallet)
- `api-service.js` - localStorage API

### Key Features:
- ✅ No database required
- ✅ No signup needed
- ✅ Instant setup
- ✅ Works offline
- ✅ Direct payments
- ✅ Auto winner selection

### Remember:
- 💾 Export data weekly
- 🧪 Test on Sepolia first
- 🔒 Keep admin URL private
- ⚡ Process winners fast
- 📊 Monitor daily

**All set? Start creating raffles! 🎰**
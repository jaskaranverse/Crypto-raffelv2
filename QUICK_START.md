# ⚡ Quick Start Guide - Crypto Raffle Platform

Get your raffle platform up and running in 10 minutes!

## 🎯 What You're Building

A complete crypto raffle platform where:
- Users can enter raffles by paying ETH
- Winners are automatically selected when raffles end
- You manage everything through an admin panel
- All data stored in Supabase (cloud database)
- Fully standalone - no Webflow needed!

## 🚀 5-Minute Setup

### 1. Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project → Wait for setup
3. Go to **SQL Editor** → New query
4. Copy all code from `supabase-schema.sql` → Paste → Run
5. Go to **Settings** → **API** → Copy:
   - Project URL
   - anon public key

### 2. Configure Your App (2 minutes)

**File 1: `api-service.js`** (lines 2-3)
```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';
const SUPABASE_KEY = 'YOUR_ANON_KEY_HERE';
```

**File 2: `config.js`** (line 4)
```javascript
ADMIN_ADDRESS: 'YOUR_METAMASK_ADDRESS_HERE',
```

### 3. Deploy (1 minute)

**Option A - Vercel (Easiest):**
```bash
npm install -g vercel
vercel
```

**Option B - Netlify:**
Drag your folder to [app.netlify.com](https://app.netlify.com)

**Option C - Local Test:**
```bash
python -m http.server 8000
```
Visit: `http://localhost:8000`

## ✅ Test It Works

### Test Main Site:
1. Open `index.html` (or your deployed URL)
2. Click "Connect Wallet"
3. Should see your wallet address in header ✅

### Test Admin Panel:
1. Open `admin.html`
2. Click "Connect Admin Wallet"
3. Should see admin dashboard ✅

### Create First Raffle:
1. In admin panel → "Create Raffle" tab
2. Fill in:
   - Title: "Test Raffle"
   - Prize: 0.001 ETH
   - Entry Fee: 0.0001 ETH
   - Duration: 1 hour
3. Click "Create Raffle"
4. Go to main site → Should see your raffle! ✅

## 🎯 Key Files Explained

| File | Purpose | You Need To Edit? |
|------|---------|-------------------|
| `index.html` | Main raffle page (public) | ❌ No |
| `admin.html` | Admin dashboard (private) | ❌ No |
| `api-service.js` | Supabase connection | ✅ Yes - Add credentials |
| `config.js` | Admin wallet & settings | ✅ Yes - Add your address |
| `app.js` | Main raffle logic | ❌ No |
| `admin.js` | Admin functionality | ❌ No |
| `styles.css` | All styling | ⚠️ Optional - Customize |

## 📱 How Users Interact

### User Journey:
```
1. Visit your site
   ↓
2. Click "Connect Wallet"
   ↓
3. Browse active raffles
   ↓
4. Click "Enter Raffle Now"
   ↓
5. Approve payment in MetaMask
   ↓
6. Get entry number
   ↓
7. Wait for raffle to end
   ↓
8. Winner announced automatically!
```

## 🎛️ Admin Workflow

### Creating Raffles:
```
1. Open admin.html
   ↓
2. Connect admin wallet
   ↓
3. Go to "Create Raffle" tab
   ↓
4. Fill in details
   ↓
5. Click "Create Raffle"
   ↓
6. Raffle goes live instantly!
```

### Processing Winners:
```
1. Raffle ends automatically
   ↓
2. System selects random winner
   ↓
3. Check "Pending Winners" in dashboard
   ↓
4. Copy winner's address
   ↓
5. Send prize from your wallet
   ↓
6. Click "Mark Paid"
   ↓
7. Done!
```

## 🔧 Common Customizations

### Change Entry Fee:
**File:** `config.js` (line 16)
```javascript
entryFee: 0.0008, // Change this value
```

### Change Prize Pool:
**File:** `config.js` (line 17)
```javascript
prizePool: 0.01, // Change this value
```

### Change Colors:
**File:** `styles.css`
```css
/* Find and replace color values */
#667eea → Your primary color
#10B981 → Your success color
```

### Change Text:
**Files:** `index.html`, `admin.html`
- Just search and replace text directly
- All text is in plain HTML

## 🐛 Quick Troubleshooting

### "Error loading raffles"
→ Check Supabase URL has no spaces
→ Verify API key is correct

### "Connect Wallet First"
→ Install MetaMask extension
→ Refresh page

### "Access Denied" (Admin)
→ Check admin address in `config.js`
→ Make sure you're using correct wallet

### Raffles not showing
→ Check browser console (F12)
→ Verify Supabase connection
→ Ensure SQL schema was run

## 💡 Pro Tips

1. **Test on Sepolia First**
   - Get free test ETH from [sepoliafaucet.com](https://sepoliafaucet.com/)
   - Test everything before mainnet

2. **Keep Admin URL Secret**
   - Don't share `admin.html` URL
   - Consider renaming to something obscure

3. **Start Small**
   - Begin with small prize pools
   - Increase as you gain confidence

4. **Process Winners Fast**
   - Send prizes within 24 hours
   - Builds trust with users

5. **Backup Regularly**
   - Export Supabase data weekly
   - Save configuration files

## 📚 Full Documentation

- **Complete Setup**: See [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md:1)
- **Admin Features**: See [`ADMIN_ACCESS.md`](ADMIN_ACCESS.md:1)
- **Project Overview**: See [`README.md`](README.md:1)
- **Security**: See [`ADMIN_SECURITY.md`](ADMIN_SECURITY.md:1)

## 🎯 Next Steps

After setup:

1. ✅ Test on Sepolia testnet
2. ✅ Create a test raffle
3. ✅ Enter with test wallet
4. ✅ Verify winner selection
5. ✅ Test payment process
6. ✅ Deploy to production
7. ✅ Share with users!

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Review Supabase logs
3. Verify all credentials are correct
4. Test on testnet first
5. Read full documentation

## 🎉 You're Ready!

Your platform is now:
- ✅ Configured with Supabase
- ✅ Admin wallet set up
- ✅ Ready to deploy
- ✅ Ready to create raffles
- ✅ Ready to accept entries

**Time to launch your first raffle! 🚀**

---

## 📋 Checklist

Before going live:

- [ ] Supabase configured
- [ ] Admin wallet set
- [ ] Tested on Sepolia
- [ ] Created test raffle
- [ ] Entered test raffle
- [ ] Verified winner selection
- [ ] Tested payment process
- [ ] Deployed to hosting
- [ ] Admin URL kept private
- [ ] Backup plan in place

**All checked? You're good to go! 🎰**
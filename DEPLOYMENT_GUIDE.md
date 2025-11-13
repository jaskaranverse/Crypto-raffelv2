# 🚀 Free Deployment Guide - Crypto Raffle Website

This guide will show you how to deploy your crypto raffle website **completely FREE** using GitHub Pages.

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ A GitHub account (free) - [Sign up here](https://github.com/join)
- ✅ All your raffle files ready
- ✅ Basic understanding of how to use GitHub

---

## 🎯 Method 1: GitHub Pages (Recommended - 100% Free)

### Step 1: Create a GitHub Repository

1. **Go to GitHub** and log in
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `crypto-raffle` (or any name you like)
   - Description: "Crypto Raffle Website"
   - Make it **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
5. **Click "Create repository"**

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **"Add file"** → **"Upload files"**
2. **Drag and drop** or **select** these files:
   ```
   index.html
   admin.html
   app.js
   admin.js
   config.js
   styles.css
   test-connection.html
   ADMIN_GUIDE.md
   SETUP_INSTRUCTIONS.md
   README.md
   ```
3. **Scroll down** and click **"Commit changes"**

**Option B: Using Git (If you know Git)**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/crypto-raffle.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, click **"Settings"** (top menu)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**
5. Wait 1-2 minutes for deployment

### Step 4: Get Your Live URL

After deployment, you'll see a message:
```
Your site is live at https://YOUR-USERNAME.github.io/crypto-raffle/
```

**Your URLs will be:**
- Main Website: `https://YOUR-USERNAME.github.io/crypto-raffle/`
- Admin Panel: `https://YOUR-USERNAME.github.io/crypto-raffle/admin.html`

---

## 🎨 Method 2: Netlify (Alternative - Also Free)

### Step 1: Sign Up for Netlify

1. Go to [Netlify.com](https://www.netlify.com/)
2. Click **"Sign up"** (free)
3. Sign up with GitHub (easiest)

### Step 2: Deploy Your Site

**Option A: Drag & Drop (Easiest)**

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. **Drag your entire project folder** onto the page
3. Wait for upload to complete
4. You'll get a URL like: `https://random-name-12345.netlify.app`

**Option B: Connect to GitHub**

1. Click **"New site from Git"**
2. Choose **GitHub**
3. Select your repository
4. Click **"Deploy site"**

### Step 3: Custom Domain (Optional)

1. In Netlify dashboard, click **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow instructions to connect your domain

---

## 🌐 Method 3: Vercel (Another Free Option)

### Step 1: Sign Up

1. Go to [Vercel.com](https://vercel.com/)
2. Click **"Sign Up"** (free)
3. Sign up with GitHub

### Step 2: Deploy

1. Click **"New Project"**
2. **Import** your GitHub repository
3. Click **"Deploy"**
4. Your site will be live at: `https://your-project.vercel.app`

---

## ⚙️ Important Configuration

### Before Going Live - Update config.js

Open [`config.js`](config.js:1) and update:

```javascript
// Change this to YOUR wallet address
ADMIN_ADDRESS: '0xYOUR_WALLET_ADDRESS_HERE',
```

**How to get your wallet address:**
1. Open MetaMask
2. Click on your account name at the top
3. Your address will be copied (starts with 0x)
4. Paste it in config.js

---

## 🎯 After Deployment - Next Steps

### 1. Test Your Website

Visit your live URL and test:
- ✅ Main website loads correctly
- ✅ Admin panel loads correctly
- ✅ Wallet connection works
- ✅ Create a test raffle
- ✅ Enter the test raffle

### 2. Create Your First Real Raffle

1. Go to: `https://YOUR-URL/admin.html`
2. Connect your MetaMask wallet
3. Fill in raffle details:
   - Title: "0.5 ETH Grand Prize"
   - Description: "Win big with just 0.001 ETH entry!"
   - Prize Pool: 0.5
   - Entry Fee: 0.001
   - Total Spots: 500
   - Max Per Wallet: 10
   - Duration: 2 days
4. Click "Create Raffle"
5. Check main website - your raffle should appear!

### 3. Share Your Website

Share these links:
- **Main Website**: `https://YOUR-URL/` (for users to enter raffles)
- **Admin Panel**: `https://YOUR-URL/admin.html` (keep this private!)

---

## 📱 Sharing & Marketing

### Share Your Raffle Website:

**Social Media Posts:**
```
🎰 NEW CRYPTO RAFFLE LIVE! 🎰

💰 Prize: 0.5 ETH
🎫 Entry: Only 0.001 ETH
⏰ Ends in 2 days!

Enter now: https://YOUR-URL/

#CryptoRaffle #ETH #Giveaway
```

**Where to Share:**
- Twitter/X
- Discord servers
- Telegram groups
- Reddit (r/CryptoMoonShots, etc.)
- Your social media profiles

---

## 🔒 Security Best Practices

### Protect Your Admin Panel

1. **Never share** your admin panel URL publicly
2. **Only you** should access `admin.html`
3. **Keep your MetaMask** seed phrase safe
4. **Use a dedicated wallet** for receiving raffle payments

### Monitor Your Raffles

1. Check admin panel regularly
2. Monitor participant counts
3. Track payments in MetaMask
4. Verify transactions on Etherscan

---

## 💰 Payment Setup

### How Payments Work:

1. **User enters raffle** → Pays entry fee
2. **ETH goes directly** to your wallet address (from config.js)
3. **No middleman** - instant payment
4. **Track in MetaMask** - see all transactions

### Receiving Payments:

- All entry fees go to the wallet address in your raffle
- Check MetaMask to see incoming payments
- Verify on Etherscan: `https://etherscan.io/address/YOUR_ADDRESS`

---

## 🔄 Updating Your Website

### If you need to make changes:

**GitHub Pages:**
1. Edit files in your GitHub repository
2. Commit changes
3. Wait 1-2 minutes for automatic deployment

**Netlify/Vercel:**
1. Push changes to GitHub
2. Automatic deployment happens instantly

---

## 📊 Monitoring & Analytics

### Track Your Success:

**In Admin Panel:**
- View all raffles
- See participant counts
- Check revenue per raffle

**In MetaMask:**
- See all incoming payments
- Track total revenue
- Verify transactions

**On Etherscan:**
- View all transactions
- Verify payment amounts
- Check transaction history

---

## 🆘 Troubleshooting

### Website Not Loading?
- Wait 2-3 minutes after deployment
- Clear browser cache
- Try incognito/private mode
- Check GitHub Pages settings

### Wallet Not Connecting?
- Install MetaMask extension
- Unlock MetaMask
- Refresh the page
- Try different browser

### Raffle Not Appearing?
- Check if raffle is expired
- Refresh the page
- Check browser console for errors
- Verify localStorage is enabled

### Payments Not Received?
- Check correct wallet address in config.js
- Verify on Etherscan
- Check MetaMask network (Mainnet/Testnet)
- Confirm transaction was successful

---

## 💡 Pro Tips

### Maximize Success:

1. **Start Small**
   - Test with small prize amounts first
   - Use testnet (Sepolia) for testing
   - Switch to mainnet when ready

2. **Build Trust**
   - Be transparent about odds
   - Show transaction history
   - Announce winners publicly
   - Pay out prizes promptly

3. **Grow Your Audience**
   - Share on social media regularly
   - Engage with participants
   - Run multiple raffles
   - Offer variety in prizes

4. **Stay Legal**
   - Check local gambling laws
   - Add terms & conditions
   - Be transparent about fees
   - Keep records of all transactions

---

## 🎉 You're Ready to Launch!

### Quick Launch Checklist:

- [ ] GitHub repository created
- [ ] Files uploaded
- [ ] GitHub Pages enabled
- [ ] Website is live
- [ ] config.js updated with your wallet
- [ ] Tested wallet connection
- [ ] Created first raffle
- [ ] Raffle appears on main site
- [ ] Shared website URL
- [ ] Ready to accept entries!

---

## 📞 Need Help?

### Resources:
- GitHub Pages Docs: https://pages.github.com/
- Netlify Docs: https://docs.netlify.com/
- MetaMask Support: https://support.metamask.io/
- Etherscan: https://etherscan.io/

### Common Issues:
- Check browser console (F12) for errors
- Verify MetaMask is installed and unlocked
- Ensure you're on the correct network
- Clear browser cache if issues persist

---

## 🚀 Launch Your Raffle Now!

**Your website is ready to go live for FREE!**

Choose your deployment method above and follow the steps. In less than 10 minutes, your crypto raffle website will be live and accepting entries!

**Good luck with your raffles! 🎰💰**
# 🚀 Complete Deployment Guide - Crypto Raffle Platform

This guide will walk you through deploying your crypto raffle platform from start to finish.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] MetaMask wallet installed
- [ ] Admin wallet address ready
- [ ] Supabase account created
- [ ] Test ETH for testing (Sepolia testnet)
- [ ] Hosting platform account (Vercel/Netlify/GitHub Pages)

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email
4. Click "New Project"
5. Fill in:
   - **Name**: `crypto-raffle` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

### 1.2 Run Database Schema

1. In Supabase dashboard, click **SQL Editor** in left sidebar
2. Click "New query"
3. Open `supabase-schema.sql` from your project
4. Copy ALL the SQL code
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. You should see: ✅ "Success. No rows returned"

### 1.3 Get API Credentials

1. Click **Settings** (gear icon) in left sidebar
2. Click **API** in settings menu
3. You'll see two important values:

   **Project URL**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   Copy this entire URL

   **anon public key**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Copy this entire key (it's very long!)

4. Keep these safe - you'll need them next

## ⚙️ Step 2: Configure Your Application

### 2.1 Update Supabase Configuration

1. Open `api-service.js` in your code editor
2. Find lines 2-3:
   ```javascript
   const SUPABASE_URL = 'https://mlfjoinf wljransiompk.supabase.co';
   const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```
3. Replace with YOUR credentials:
   ```javascript
   const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';
   const SUPABASE_KEY = 'YOUR_ANON_PUBLIC_KEY_HERE';
   ```
4. **Important**: Make sure there are NO SPACES in the URL!
5. Save the file

### 2.2 Set Admin Wallet Address

1. Open `config.js`
2. Find line 4:
   ```javascript
   ADMIN_ADDRESS: '0x842bab27de95e329eb17733c1f29c082e5dd94c3',
   ```
3. Replace with YOUR MetaMask wallet address:
   ```javascript
   ADMIN_ADDRESS: '0xYOUR_WALLET_ADDRESS_HERE',
   ```
4. To get your address:
   - Open MetaMask
   - Click on your account name at top
   - Click "Copy address"
   - Paste it in config.js
5. Save the file

### 2.3 Customize Raffle Settings (Optional)

In `config.js`, you can customize:

```javascript
RAFFLE_SETTINGS: {
    entryFee: 0.0008,        // Entry fee in ETH
    prizePool: 0.01,         // Prize pool in ETH
    duration: 7 * 24 * 60 * 60 * 1000, // 7 days
    minParticipants: 2,      // Min to draw winner
    maxParticipants: 50,     // Max entries allowed
    autoDrawEnabled: true    // Auto-select winner
}
```

## 🌐 Step 3: Deploy Your Site

Choose ONE of these deployment methods:

---

### Option A: Vercel (Recommended - Easiest)

**Why Vercel?**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy custom domains
- ✅ Instant deployments

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate

3. **Deploy**
   ```bash
   cd /path/to/crypto-raffle-demo
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - What's your project's name? `crypto-raffle` (or your choice)
   - In which directory is your code located? `./`
   - Want to override settings? **N**

5. **Done!** You'll get a URL like:
   ```
   https://crypto-raffle-xxxxx.vercel.app
   ```

6. **For production deployment:**
   ```bash
   vercel --prod
   ```

**Custom Domain (Optional):**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to Settings → Domains
4. Add your custom domain
5. Follow DNS configuration instructions

---

### Option B: Netlify

**Why Netlify?**
- ✅ Free tier available
- ✅ Drag-and-drop deployment
- ✅ Automatic HTTPS
- ✅ Form handling
- ✅ Easy rollbacks

**Method 1: Drag and Drop (Easiest)**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Drag your entire project folder onto the page
4. Wait for deployment (30-60 seconds)
5. Done! You'll get a URL like:
   ```
   https://random-name-12345.netlify.app
   ```

**Method 2: CLI Deployment**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd /path/to/crypto-raffle-demo
   netlify deploy
   ```

4. **Follow prompts:**
   - Create & configure a new site? **Y**
   - Team: Choose your team
   - Site name: `crypto-raffle` (or your choice)
   - Publish directory: `.` (current directory)

5. **For production:**
   ```bash
   netlify deploy --prod
   ```

**Custom Domain:**
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration

---

### Option C: GitHub Pages (Free)

**Why GitHub Pages?**
- ✅ Completely free
- ✅ Integrated with GitHub
- ✅ Automatic HTTPS
- ✅ Version control included

**Steps:**

1. **Create GitHub Repository**
   ```bash
   cd /path/to/crypto-raffle-demo
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create repo on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name: `crypto-raffle`
   - Public or Private: Your choice
   - Don't initialize with README
   - Click "Create repository"

3. **Push code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/crypto-raffle.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click Save

5. **Wait 2-3 minutes**, then visit:
   ```
   https://YOUR_USERNAME.github.io/crypto-raffle/
   ```

**Custom Domain:**
1. In Pages settings, add custom domain
2. Configure DNS with your domain provider:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```

---

### Option D: Local Testing

**For development and testing:**

1. **Using Python:**
   ```bash
   cd /path/to/crypto-raffle-demo
   python -m http.server 8000
   ```
   Visit: `http://localhost:8000`

2. **Using Node.js:**
   ```bash
   npx serve
   ```
   Visit: `http://localhost:3000`

3. **Using PHP:**
   ```bash
   php -S localhost:8000
   ```
   Visit: `http://localhost:8000`

## 🧪 Step 4: Test Your Deployment

### 4.1 Test on Sepolia Testnet

1. **Switch to Sepolia in MetaMask**
   - Open MetaMask
   - Click network dropdown at top
   - Select "Sepolia test network"
   - If not visible, enable "Show test networks" in Settings

2. **Get Test ETH**
   - Go to [sepoliafaucet.com](https://sepoliafaucet.com/)
   - Connect your wallet
   - Request test ETH (free!)
   - Wait 1-2 minutes for confirmation

3. **Test Main Site**
   - Visit your deployed URL
   - Click "Connect Wallet"
   - Approve in MetaMask
   - Verify wallet address shows in header

4. **Create Test Raffle (Admin)**
   - Visit `your-url.com/admin.html`
   - Connect with admin wallet
   - Go to "Create Raffle" tab
   - Fill in test values:
     - Title: "Test Raffle"
     - Prize: 0.001 ETH
     - Entry Fee: 0.0001 ETH
     - Duration: 1 hour
   - Click "Create Raffle"
   - Verify success message

5. **Test Entry**
   - Go back to main site
   - Find your test raffle
   - Click "Enter Raffle Now"
   - Approve transaction in MetaMask
   - Wait for confirmation
   - Verify your entry appears

6. **Test Winner Selection**
   - Wait for raffle to end (or manually update end time in Supabase)
   - System should auto-select winner
   - Check admin panel for winner details

### 4.2 Verify All Features

**Main Site Checklist:**
- [ ] Wallet connects successfully
- [ ] Raffles display correctly
- [ ] Countdown timers work
- [ ] Entry button functions
- [ ] Transactions process
- [ ] Participant list updates
- [ ] Win chance calculates correctly

**Admin Panel Checklist:**
- [ ] Admin authentication works
- [ ] Dashboard shows stats
- [ ] Can create new raffles
- [ ] Can view participants
- [ ] Can see pending winners
- [ ] Can mark winners as paid
- [ ] Can delete raffles

## 🔒 Step 5: Security & Best Practices

### 5.1 Secure Your Admin Panel

1. **Keep URL Secret**
   - Don't share `admin.html` URL publicly
   - Consider renaming to something obscure:
     ```bash
     mv admin.html secret-admin-panel-xyz123.html
     ```

2. **Use Strong Admin Wallet**
   - Use a dedicated wallet for admin functions
   - Keep seed phrase in secure location
   - Consider hardware wallet for mainnet

3. **Monitor Access**
   - Check Supabase logs regularly
   - Review all transactions
   - Set up alerts for suspicious activity

### 5.2 Backup Your Data

1. **Export Supabase Data**
   - Go to Table Editor in Supabase
   - Click each table
   - Click "Export" → "CSV"
   - Save backups regularly

2. **Backup Configuration**
   - Save copies of `config.js` and `api-service.js`
   - Store in secure location
   - Don't commit sensitive data to public repos

### 5.3 Mainnet Preparation

**Before going live on mainnet:**

1. **Test Everything on Testnet**
   - Run multiple test raffles
   - Test with multiple wallets
   - Verify winner selection
   - Test payment process

2. **Update Network Settings**
   - In MetaMask, switch to Ethereum Mainnet
   - Update `config.js` if needed
   - Verify all addresses are correct

3. **Fund Admin Wallet**
   - Ensure you have ETH for prizes
   - Add extra for gas fees
   - Keep reserve for emergencies

4. **Set Realistic Values**
   - Start with small prize pools
   - Set appropriate entry fees
   - Don't promise more than you can pay

## 📊 Step 6: Monitor & Maintain

### Daily Tasks:
- Check admin dashboard for activity
- Process winner payments promptly
- Monitor Supabase usage
- Review transaction logs

### Weekly Tasks:
- Export database backups
- Review participant feedback
- Check for any errors
- Update raffle settings if needed

### Monthly Tasks:
- Review Supabase storage limits
- Check hosting costs
- Update documentation
- Plan new features

## 🆘 Troubleshooting Deployment

### Issue: "Cannot connect to Supabase"
**Solution:**
- Verify URL has no spaces
- Check API key is correct
- Ensure SQL schema was run
- Check Supabase project is active

### Issue: "Admin panel shows unauthorized"
**Solution:**
- Verify admin address in `config.js`
- Ensure address matches MetaMask exactly
- Try disconnecting and reconnecting wallet
- Check browser console for errors

### Issue: "Raffles not appearing"
**Solution:**
- Check Supabase connection
- Verify tables exist in database
- Check browser console for errors
- Ensure raffles have `status: 'active'`

### Issue: "Transactions failing"
**Solution:**
- Check wallet has sufficient ETH
- Verify correct network selected
- Check gas fees aren't too low
- Try increasing gas limit

### Issue: "Site not loading after deployment"
**Solution:**
- Check all file paths are correct
- Verify hosting platform is active
- Check browser console for errors
- Clear browser cache and try again

## 🎉 You're Live!

Congratulations! Your crypto raffle platform is now deployed and ready to use.

### Next Steps:

1. **Share Your Site**
   - Share main URL with users
   - Keep admin URL private
   - Promote on social media

2. **Create Your First Raffle**
   - Start with small prize pool
   - Set reasonable entry fee
   - Monitor closely

3. **Engage Your Community**
   - Respond to questions
   - Process payments quickly
   - Build trust with transparency

4. **Scale Up**
   - Increase prize pools gradually
   - Add more features
   - Expand to other networks

## 📞 Support Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **MetaMask Support**: [metamask.io/support](https://metamask.io/support)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Ethers.js Docs**: [docs.ethers.io](https://docs.ethers.io)

---

**Good luck with your crypto raffle platform! 🚀**
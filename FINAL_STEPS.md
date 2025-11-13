# 🚀 Final Steps to Push Your Code to GitHub

## ⚠️ First: Fix Xcode License (Mac Users Only)

You need to accept the Xcode license agreement first. Run this in your terminal:

```bash
sudo xcodebuild -license
```

- Press **Space** to scroll through the license
- Type **"agree"** at the end
- Enter your Mac password when prompted

---

## 📤 Now Push Your Code to GitHub

### Step 1: Check if Repository Exists on GitHub

Go to: **https://github.com/jaskaranverse/crypto-raffle**

**If it doesn't exist:**
1. Go to **https://github.com/new**
2. Repository name: `crypto-raffle`
3. Make it **Public**
4. **Don't** check "Add README"
5. Click **"Create repository"**

### Step 2: Connect Your Code to GitHub

Open your terminal in the project folder and run these commands **one by one**:

```bash
# Connect to your GitHub repository
git remote add origin https://github.com/jaskaranverse/crypto-raffle.git

# Set main branch
git branch -M main

# Push your code
git push -u origin main
```

### Step 3: Authenticate

When you run `git push`, you'll need to authenticate:

**Option A: Use GitHub CLI (Easiest)**
```bash
# Install GitHub CLI if you don't have it
brew install gh

# Login
gh auth login

# Then push
git push -u origin main
```

**Option B: Use Personal Access Token**
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. Name: "Crypto Raffle"
4. Check: **"repo"** (all permissions)
5. Click **"Generate token"**
6. **Copy the token** (save it somewhere!)
7. When pushing, use:
   - Username: `jaskaranverse`
   - Password: **[paste your token]**

---

## 🌐 Enable GitHub Pages

After your code is on GitHub:

1. Go to: **https://github.com/jaskaranverse/crypto-raffle**
2. Click **"Settings"** (top menu)
3. Click **"Pages"** (left sidebar)
4. Under **"Source"**:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**
6. Wait 1-2 minutes

---

## 🎉 Your Live URLs

After GitHub Pages deploys:

**Main Website (Share this with users):**
```
https://jaskaranverse.github.io/crypto-raffle/
```

**Admin Panel (Keep this private!):**
```
https://jaskaranverse.github.io/crypto-raffle/admin.html
```

---

## ⚙️ Before Going Live - Update Your Wallet

1. Open `config.js`
2. Change this line:
```javascript
ADMIN_ADDRESS: '0x842bab27de95e329eb17733c1f29c082e5dd94c3',
```
To your actual wallet address:
```javascript
ADMIN_ADDRESS: '0xYOUR_WALLET_ADDRESS_HERE',
```

3. Save the file
4. Push the update:
```bash
git add config.js
git commit -m "Update wallet address"
git push
```

---

## 🆘 Troubleshooting

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/jaskaranverse/crypto-raffle.git
```

### "Permission denied"
You need to authenticate (see Step 3 above).

### "Repository not found"
Make sure you created the repository on GitHub first.

### Xcode license still showing
Run this and follow the prompts:
```bash
sudo xcodebuild -license accept
```

---

## ✅ Quick Command Summary

Run these commands in order:

```bash
# 1. Accept Xcode license (if needed)
sudo xcodebuild -license

# 2. Connect to GitHub
git remote add origin https://github.com/jaskaranverse/crypto-raffle.git

# 3. Set main branch
git branch -M main

# 4. Push to GitHub
git push -u origin main
```

---

## 🎯 What Happens Next?

1. ✅ Your code will be on GitHub
2. ✅ GitHub Pages will build your site (1-2 minutes)
3. ✅ Your raffle platform will be live!
4. ✅ You can create raffles and share the URL

---

## 📱 After It's Live

1. **Test everything:**
   - Visit your main site
   - Connect MetaMask
   - Go to admin panel
   - Create a test raffle
   - Enter the raffle

2. **Update your wallet address** in config.js

3. **Share your site:**
   - Post on social media
   - Share in Discord/Telegram
   - Tell your friends!

---

## 💡 Need Help?

If you get stuck:
1. Check what error message you see
2. Make sure you accepted the Xcode license
3. Verify the repository exists on GitHub
4. Try authenticating with GitHub CLI

**Your site URL will be:**
```
https://jaskaranverse.github.io/crypto-raffle/
```

🚀 **You're almost there! Just run those commands and you'll be live!**
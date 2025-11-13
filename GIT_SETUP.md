# 🚀 Push Your Crypto Raffle to GitHub

Follow these steps to upload your code to GitHub and deploy it for free!

---

## 📋 Step 1: Initialize Git Repository

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Crypto Raffle Platform with multi-raffle support"
```

---

## 🔗 Step 2: Connect to GitHub

### Option A: If you already created a repository on GitHub

```bash
# Replace YOUR-USERNAME and YOUR-REPO-NAME with your actual GitHub details
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option B: If you haven't created a repository yet

1. **Go to GitHub.com** and log in
2. **Click the "+" icon** (top right) → "New repository"
3. **Fill in:**
   - Repository name: `crypto-raffle` (or your choice)
   - Description: "Multi-raffle crypto platform with MetaMask integration"
   - Make it **Public** (required for free GitHub Pages)
   - **Don't** check "Initialize with README" (we already have one)
4. **Click "Create repository"**
5. **Copy the commands** GitHub shows you, they'll look like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/crypto-raffle.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Click **"Pages"** (left sidebar)
4. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**
6. Wait 1-2 minutes

Your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

## ⚙️ Step 4: Update Your Wallet Address

Before going live, update your wallet address:

1. Open `config.js`
2. Replace the wallet address:

```javascript
ADMIN_ADDRESS: '0x842bab27de95e329eb17733c1f29c082e5dd94c3', // Change this!
```

3. Save the file
4. Commit and push:

```bash
git add config.js
git commit -m "Update wallet address"
git push
```

---

## 🎯 Step 5: Test Your Live Site

After GitHub Pages deploys (1-2 minutes):

1. **Visit your main site:**
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

2. **Visit your admin panel:**
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/admin.html
   ```

3. **Test the flow:**
   - Connect MetaMask
   - Create a test raffle
   - Check if it appears on main site
   - Try entering the raffle

---

## 🔄 Making Updates Later

Whenever you make changes:

```bash
# Add changed files
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push

# GitHub Pages will auto-deploy in 1-2 minutes
```

---

## 🆘 Troubleshooting

### "Permission denied" error?
You need to authenticate with GitHub. Use one of these methods:

**Method 1: Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy the token
5. When pushing, use token as password

**Method 2: SSH Key**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Then use SSH URL instead:
git remote set-url origin git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git
```

### "Repository not found" error?
- Check the repository name is correct
- Make sure the repository exists on GitHub
- Verify you're using the correct username

### Changes not showing on website?
- Wait 2-3 minutes after pushing
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Actions tab for deployment status

---

## 📱 Share Your Live Site

Once deployed, share these URLs:

**For Users (Public):**
```
🎰 Enter Raffles: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

**For You (Private - Don't Share!):**
```
🔐 Admin Panel: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/admin.html
```

---

## ✅ Quick Checklist

- [ ] Git initialized
- [ ] Files committed
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Wallet address updated in config.js
- [ ] Site is live and working
- [ ] Tested wallet connection
- [ ] Created test raffle
- [ ] Ready to share!

---

## 🎉 You're Live!

Your crypto raffle platform is now:
- ✅ Hosted for FREE on GitHub Pages
- ✅ Accessible worldwide
- ✅ Automatically updated when you push changes
- ✅ Ready to accept real entries!

**Next Steps:**
1. Create your first real raffle
2. Share your website URL
3. Start accepting entries!

---

## 💡 Pro Tips

### Keep Your Code Updated
```bash
# Pull latest changes (if working from multiple computers)
git pull

# Make changes to files

# Push updates
git add .
git commit -m "Your update description"
git push
```

### Create Branches for Testing
```bash
# Create test branch
git checkout -b test-feature

# Make changes and test

# If good, merge to main
git checkout main
git merge test-feature
git push
```

### View Deployment Status
- Go to your repository on GitHub
- Click "Actions" tab
- See deployment progress

---

**Need help? Check the full deployment guide in DEPLOYMENT_GUIDE.md**

🚀 **Happy Deploying!**
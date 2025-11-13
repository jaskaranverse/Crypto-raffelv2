# 🚀 Moving to GitHub Codespaces - Complete Guide

## 📋 Prerequisites
- ✅ GitHub account
- ✅ VS Code with GitHub Codespaces extension installed
- ✅ Your code is ready in `/Users/Swapblok/Desktop/crypto-raffle-demo`

---

## 🎯 Step-by-Step Instructions

### Step 1: Initialize Git Repository (If Not Done)
```bash
cd /Users/Swapblok/Desktop/crypto-raffle-demo
git init
git add .
git commit -m "Initial commit: Crypto Raffle Demo"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `crypto-raffle-demo`
3. Description: "Crypto Raffle Demo with MetaMask Integration"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have one)
6. Click **"Create repository"**

### Step 3: Push to GitHub
After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/crypto-raffle-demo.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 4: Open in Codespaces
1. Go to your repository on GitHub
2. Click the green **"Code"** button
3. Click the **"Codespaces"** tab
4. Click **"Create codespace on main"**
5. Wait 1-2 minutes for setup ⏳

### Step 5: Verify Everything Works
Once Codespaces opens:

1. **Check files are there:**
   ```bash
   ls -la
   ```

2. **Open the app:**
   - Right-click `index.html`
   - Select "Open with Live Server"
   - OR use the Ports tab to forward port 5500

3. **Test MetaMask connection:**
   - The app should open in a new tab
   - Click "Connect Wallet"
   - Approve in MetaMask

---

## 🔧 Codespaces Configuration

### Create `.devcontainer/devcontainer.json`
This file configures your Codespace environment:

```json
{
  "name": "Crypto Raffle Demo",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ritwickdey.LiveServer",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ],
      "settings": {
        "liveServer.settings.port": 5500,
        "liveServer.settings.donotShowInfoMsg": true
      }
    }
  },
  "forwardPorts": [5500],
  "postCreateCommand": "echo 'Codespace ready! Open index.html with Live Server'",
  "remoteUser": "node"
}
```

---

## 🌐 Accessing Your App in Codespaces

### Method 1: Live Server (Recommended)
1. Install "Live Server" extension (if not auto-installed)
2. Right-click `index.html`
3. Select "Open with Live Server"
4. App opens in new tab with your Codespace URL

### Method 2: Python HTTP Server
```bash
python3 -m http.server 8000
```
Then click the "Open in Browser" notification

### Method 3: Port Forwarding
1. Go to "PORTS" tab in Codespaces
2. Add port 5500 (or 8000)
3. Click the globe icon to open in browser

---

## 🔐 Important: MetaMask in Codespaces

### MetaMask Will Work! ✅
- Your Codespace gets a unique URL like: `https://username-repo-xxxxx.github.dev`
- MetaMask works with this URL
- You can connect your wallet normally

### Security Notes:
- ✅ Codespaces URLs are secure (HTTPS)
- ✅ MetaMask will prompt for connection approval
- ✅ Your private keys stay safe in MetaMask
- ✅ Only your wallet address is shared with the app

---

## 📦 Files Already Configured

Your project already has:
- ✅ `.gitignore` - Excludes unnecessary files
- ✅ `README.md` - Complete documentation
- ✅ `config.js` - Configuration file
- ✅ All HTML, CSS, JS files

---

## 🚀 Quick Start Commands

### From Your Local Machine:
```bash
# Navigate to project
cd /Users/Swapblok/Desktop/crypto-raffle-demo

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/crypto-raffle-demo.git

# Push to GitHub
git push -u origin main
```

### In GitHub Codespaces:
```bash
# Check everything is there
ls -la

# Start Live Server (or use VS Code extension)
python3 -m http.server 5500
```

---

## 🎨 Codespaces Features You'll Love

1. **Pre-configured Environment** - Everything works out of the box
2. **Live Server** - Auto-reload on file changes
3. **Port Forwarding** - Access your app from anywhere
4. **VS Code in Browser** - Full IDE experience
5. **Git Integration** - Commit and push easily
6. **Free Hours** - 60 hours/month for free accounts

---

## 🐛 Troubleshooting

### Issue: "Repository not found"
**Solution:** Make sure you created the GitHub repository first

### Issue: "Permission denied"
**Solution:** 
```bash
git remote set-url origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/crypto-raffle-demo.git
```

### Issue: "MetaMask not connecting"
**Solution:**
- Make sure you're using HTTPS (Codespaces uses HTTPS by default)
- Check if MetaMask is unlocked
- Try refreshing the page

### Issue: "Live Server not working"
**Solution:**
- Install Live Server extension in Codespaces
- Or use: `python3 -m http.server 5500`

---

## 📝 Next Steps After Setup

1. ✅ Verify all files are in Codespaces
2. ✅ Test the app with Live Server
3. ✅ Connect MetaMask and test functionality
4. ✅ Make changes and commit them
5. ✅ Share your Codespace URL with others (if needed)

---

## 🎉 You're All Set!

Your crypto raffle demo is now in GitHub Codespaces! You can:
- Access it from any device
- Share it with others
- Make changes and commit them
- Test with real MetaMask wallet

**Your Codespace URL will look like:**
`https://username-crypto-raffle-demo-xxxxx.github.dev`

---

## 💡 Pro Tips

1. **Save Your Work:** Codespaces auto-saves, but commit regularly
2. **Stop When Done:** Stop your Codespace to save free hours
3. **Rebuild:** If something breaks, rebuild the container
4. **Extensions:** Install any VS Code extensions you need
5. **Secrets:** Use Codespace secrets for sensitive data (not needed for this demo)

---

## 📞 Need Help?

- GitHub Codespaces Docs: https://docs.github.com/codespaces
- MetaMask Docs: https://docs.metamask.io
- Your README.md has full app documentation

**Happy coding in the cloud! ☁️🚀**
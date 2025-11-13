# ✅ GitHub Codespaces Setup Checklist

Follow these steps in order. Check each box as you complete it!

---

## 📦 Part 1: Push to GitHub

- [ ] **Step 1:** Open Terminal in VS Code (Terminal → New Terminal)

- [ ] **Step 2:** Run these commands:
  ```bash
  cd /Users/Swapblok/Desktop/crypto-raffle-demo
  git init
  git add .
  git commit -m "Initial commit: Crypto Raffle Demo"
  ```

- [ ] **Step 3:** Go to https://github.com/new in your browser

- [ ] **Step 4:** Fill in:
  - Repository name: `crypto-raffle-demo`
  - Description: "Crypto Raffle Demo with MetaMask Integration"
  - Choose Public or Private
  - **DO NOT** check "Add README"
  - Click "Create repository"

- [ ] **Step 5:** Copy your GitHub username: `_______________`

- [ ] **Step 6:** Run (replace YOUR_USERNAME):
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/crypto-raffle-demo.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Step 7:** Verify on GitHub - refresh your repository page, files should appear!

---

## ☁️ Part 2: Open in Codespaces

- [ ] **Step 8:** On your GitHub repository page, click green **"Code"** button

- [ ] **Step 9:** Click **"Codespaces"** tab

- [ ] **Step 10:** Click **"Create codespace on main"**

- [ ] **Step 11:** Wait 1-2 minutes for Codespace to build ⏳

- [ ] **Step 12:** Codespace opens in browser with VS Code interface

---

## 🚀 Part 3: Run Your App

- [ ] **Step 13:** In Codespaces, find `index.html` in file explorer

- [ ] **Step 14:** Right-click `index.html`

- [ ] **Step 15:** Select **"Open with Live Server"**

- [ ] **Step 16:** App opens in new tab with URL like:
  ```
  https://username-crypto-raffle-demo-xxxxx.github.dev
  ```

- [ ] **Step 17:** Click **"Connect Wallet"** button

- [ ] **Step 18:** Approve MetaMask connection

- [ ] **Step 19:** See your wallet address displayed ✅

- [ ] **Step 20:** Test "Enter Raffle" button

---

## 🎉 Success Indicators

You know it's working when:
- ✅ Files appear on GitHub
- ✅ Codespace opens in browser
- ✅ Live Server starts automatically
- ✅ App loads in new tab
- ✅ MetaMask connects successfully
- ✅ Your wallet address shows in the app

---

## 📸 What You Should See

### On GitHub:
```
crypto-raffle-demo
├── .devcontainer/
│   └── devcontainer.json
├── frontend/
├── index.html
├── app.js
├── admin.js
├── config.js
├── styles.css
├── README.md
└── ... (all your files)
```

### In Codespaces:
- VS Code interface in browser
- All your files in the explorer
- Terminal at the bottom
- Ports tab showing port 5500

### In Your App:
- Beautiful raffle interface
- "Connect Wallet" button
- Countdown timer
- Participants section

---

## 🐛 Troubleshooting

### ❌ "git: command not found"
**Fix:** Git should be pre-installed. Try restarting VS Code.

### ❌ "Permission denied (publickey)"
**Fix:** Use HTTPS instead:
```bash
git remote set-url origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/crypto-raffle-demo.git
```

### ❌ "Live Server not found"
**Fix:** 
1. Click Extensions icon in Codespaces
2. Search "Live Server"
3. Install it
4. Try again

### ❌ "MetaMask not connecting"
**Fix:**
- Make sure MetaMask is unlocked
- Check you're on the right network
- Try refreshing the page

---

## 💾 Saving Your Work

After making changes in Codespaces:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## ⏸️ Stopping Your Codespace

To save free hours:
1. Click your profile icon (bottom left)
2. Select "Stop Current Codespace"
3. Or close the browser tab (auto-stops after 30 min)

---

## 🔄 Reopening Your Codespace

1. Go to https://github.com/codespaces
2. Find your `crypto-raffle-demo` codespace
3. Click to reopen
4. Everything is saved! 🎉

---

## 📊 Your Progress

Total steps: 20
Completed: _____ / 20

**When all 20 are checked, you're done! 🎉**

---

## 🎯 Final Result

You now have:
- ✅ Code on GitHub (backed up)
- ✅ Cloud development environment (Codespaces)
- ✅ Live app accessible from anywhere
- ✅ MetaMask integration working
- ✅ Ability to code from any device

---

## 📞 Need Help?

- **Full guide:** See `CODESPACES_SETUP.md`
- **Quick commands:** See `QUICK_PUSH_COMMANDS.md`
- **App docs:** See `README.md`

**You've got this! 🚀**
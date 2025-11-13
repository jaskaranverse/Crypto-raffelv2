# 🚀 Quick Commands to Push to GitHub

## Copy and paste these commands one by one:

### 1️⃣ Initialize Git (if not already done)
```bash
cd /Users/Swapblok/Desktop/crypto-raffle-demo
git init
```

### 2️⃣ Add all files
```bash
git add .
```

### 3️⃣ Commit your code
```bash
git commit -m "Initial commit: Crypto Raffle Demo with MetaMask"
```

### 4️⃣ Create GitHub repository
Go to: https://github.com/new
- Name: `crypto-raffle-demo`
- Keep it Public or Private (your choice)
- **DO NOT** check "Add README" (you already have one)
- Click "Create repository"

### 5️⃣ Connect to GitHub (REPLACE YOUR_USERNAME!)
```bash
git remote add origin https://github.com/YOUR_USERNAME/crypto-raffle-demo.git
```

**⚠️ IMPORTANT: Replace `YOUR_USERNAME` with your actual GitHub username!**

### 6️⃣ Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### 7️⃣ Open in Codespaces
1. Go to your repository: `https://github.com/YOUR_USERNAME/crypto-raffle-demo`
2. Click green **"Code"** button
3. Click **"Codespaces"** tab
4. Click **"Create codespace on main"**
5. Wait 1-2 minutes ⏳

### 8️⃣ In Codespaces - Run Your App
Once Codespaces opens:
1. Right-click `index.html`
2. Select **"Open with Live Server"**
3. Your app opens in a new tab! 🎉

---

## 🎯 That's It!

Your code is now:
- ✅ On GitHub
- ✅ Running in Codespaces
- ✅ Accessible from anywhere
- ✅ Ready to test with MetaMask

---

## 📝 What You Just Did

1. **Initialized Git** - Made your folder a git repository
2. **Committed code** - Saved a snapshot of your code
3. **Pushed to GitHub** - Uploaded to the cloud
4. **Opened Codespaces** - Got a cloud development environment
5. **Ran the app** - Started Live Server to view your app

---

## 🔗 Your Codespace URL

After opening Codespaces, your app will be at:
```
https://YOUR_USERNAME-crypto-raffle-demo-xxxxx.github.dev
```

You can share this URL with anyone! 🌐

---

## 💡 Quick Tips

- **Save hours:** Stop your Codespace when not using it
- **Make changes:** Edit files in Codespaces, commit, and push
- **Test MetaMask:** Works perfectly in Codespaces!
- **Share:** Send your Codespace URL to others

---

## 🆘 If Something Goes Wrong

### "Repository already exists"
You already created it! Skip step 4 and continue with step 5.

### "Permission denied"
Use this instead:
```bash
git remote set-url origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/crypto-raffle-demo.git
```

### "Nothing to commit"
You already committed! Skip to step 5.

---

## 🎉 You're Done!

Check the full guide in `CODESPACES_SETUP.md` for more details.

**Happy coding! 🚀**
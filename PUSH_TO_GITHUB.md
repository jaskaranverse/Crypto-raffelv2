# 🚀 Push Your Code to GitHub - Simple Steps

## Step 1: Find Your GitHub Username

1. Go to **https://github.com**
2. Log in to your account
3. Click on your profile picture (top right)
4. Your username is shown there (e.g., @username)

## Step 2: Create a New Repository on GitHub

1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name**: `crypto-raffle`
   - **Description**: "Multi-raffle crypto platform"
   - **Public** (must be public for free hosting)
   - **DO NOT** check "Add a README file"
3. Click **"Create repository"**

## Step 3: Copy Your Repository URL

After creating the repository, GitHub will show you a page with commands.

Look for a URL that looks like:
```
https://github.com/YOUR-USERNAME/crypto-raffle.git
```

Copy this URL!

## Step 4: Connect Your Local Code to GitHub

Open your terminal in the project folder and run these commands:

**Replace `YOUR-USERNAME` with your actual GitHub username!**

```bash
# Connect to your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/crypto-raffle.git

# Set the main branch
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Example:
If your username is `john123`, you would run:
```bash
git remote add origin https://github.com/john123/crypto-raffle.git
git branch -M main
git push -u origin main
```

## Step 5: Enter Your GitHub Credentials

When you run `git push`, you'll be asked for:
- **Username**: Your GitHub username
- **Password**: Your GitHub Personal Access Token (NOT your password!)

### How to Get a Personal Access Token:

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "Crypto Raffle Deploy"
4. Select scopes: Check **"repo"** (all repo permissions)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

## Step 6: Verify on GitHub

1. Go to **https://github.com/YOUR-USERNAME/crypto-raffle**
2. You should see all your files!

## Step 7: Enable GitHub Pages

1. In your repository, click **"Settings"**
2. Click **"Pages"** (left sidebar)
3. Under **"Source"**:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**
5. Wait 1-2 minutes

## Step 8: Get Your Live URL

Your site will be live at:
```
https://YOUR-USERNAME.github.io/crypto-raffle/
```

Your admin panel:
```
https://YOUR-USERNAME.github.io/crypto-raffle/admin.html
```

---

## 🆘 Troubleshooting

### "remote origin already exists"
Run this first:
```bash
git remote remove origin
```
Then try Step 4 again.

### "Permission denied"
You need a Personal Access Token (see Step 5).

### "Repository not found"
- Check your username is correct
- Make sure the repository exists on GitHub
- Verify the URL is correct

---

## ✅ Quick Checklist

- [ ] Found my GitHub username
- [ ] Created repository on GitHub
- [ ] Copied repository URL
- [ ] Ran `git remote add origin` command
- [ ] Ran `git push -u origin main`
- [ ] Entered username and token
- [ ] Code is visible on GitHub
- [ ] Enabled GitHub Pages
- [ ] Site is live!

---

## 📞 Need Help?

If you're stuck, tell me:
1. What is your GitHub username?
2. What error message do you see?
3. Which step are you on?

I'll help you fix it!
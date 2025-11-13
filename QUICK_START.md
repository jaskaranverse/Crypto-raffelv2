# Quick Start Guide - Crypto Raffle with Backend

## Problem Solved ✅

**Before:** Raffles created on your computer were only visible to you (stored in browser localStorage)

**After:** Raffles are now stored in a MongoDB database and visible to everyone who visits your site!

## What Changed?

1. **Added Backend Server** - Node.js + Express API
2. **Added Database** - MongoDB to store raffles, participants, and transactions
3. **Updated Frontend** - Now uses API calls instead of localStorage

## Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB

**Option A - Quick Test (Local):**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B - Production (MongoDB Atlas - FREE):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get connection string
5. Create `.env` file in `backend/` folder:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crypto-raffle
PORT=3001
```

### Step 3: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3001
```

### Step 4: Update Frontend API URL

Open `api-service.js` and update line 5:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://YOUR-BACKEND-URL.com/api'; // Update this after deploying backend
```

### Step 5: Test It!

1. Open `index.html` in your browser (or use Live Server)
2. Open `admin.html` and create a raffle
3. Open `index.html` in a **different browser or incognito window**
4. You should see the raffle you just created! 🎉

## Deploying to Production

### Deploy Backend (Choose One):

**Heroku (Easiest):**
```bash
cd backend
heroku create your-raffle-backend
heroku config:set MONGODB_URI="your-connection-string"
git init
git add .
git commit -m "Deploy backend"
git push heroku main
```

**Railway.app (Recommended):**
1. Go to https://railway.app
2. Connect GitHub repo
3. Add `MONGODB_URI` environment variable
4. Deploy automatically

**Render.com:**
1. Go to https://render.com
2. New Web Service → Connect repo
3. Build: `cd backend && npm install`
4. Start: `cd backend && npm start`
5. Add `MONGODB_URI` env variable

### Deploy Frontend:

**Netlify:**
```bash
# Already set up! Just push to GitHub
git add .
git commit -m "Add backend integration"
git push origin main
```

Netlify will auto-deploy from your GitHub repo.

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Can access http://localhost:3001/api/health
- [ ] Can create a raffle in admin panel
- [ ] Raffle appears on main page
- [ ] Can see raffle from different browser/device
- [ ] Can enter raffle with MetaMask
- [ ] Participant appears in admin dashboard

## Common Issues

### "Cannot connect to MongoDB"
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas: Whitelist your IP (or use 0.0.0.0/0 for testing)

### "CORS Error"
- Make sure backend is running
- Check `api-service.js` has correct backend URL

### "Raffle not showing"
- Open browser console (F12)
- Check for API errors
- Verify backend is running and accessible

### "Port 3001 already in use"
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3001   # Windows
```

## File Structure

```
crypto-raffle-demo/
├── backend/                 # NEW - Backend server
│   ├── server.js           # API endpoints
│   ├── package.json        # Dependencies
│   ├── .env               # Your config (create this)
│   └── .env.example       # Example config
├── api-service.js          # NEW - API client
├── app.js                  # Updated to use API
├── admin.js               # Updated to use API
├── index.html             # Main raffle page
├── admin.html             # Admin panel
└── BACKEND_SETUP.md       # Detailed setup guide
```

## What's Next?

1. **Deploy Backend** - Choose Heroku, Railway, or Render
2. **Update API URL** - In `api-service.js` with your deployed backend URL
3. **Deploy Frontend** - Push to GitHub (Netlify auto-deploys)
4. **Test Live** - Create raffle and share link with friends!

## Need Help?

Check these files:
- `BACKEND_SETUP.md` - Detailed backend setup
- `README.md` - Original project documentation
- Backend logs - Check terminal for errors

## Architecture

```
User Browser → Frontend (Netlify) → Backend API (Heroku/Railway) → MongoDB (Atlas)
                                          ↓
                                    Stores raffles,
                                    participants,
                                    transactions
```

Now everyone can see and join your raffles! 🎰🎉
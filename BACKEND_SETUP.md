# Backend Setup Guide

This guide will help you set up the Node.js + MongoDB backend for your crypto raffle application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- Git

## Step 1: Install MongoDB

### Option A: Local MongoDB
1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # On macOS
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically as a service
   ```

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your settings:

### For Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/crypto-raffle
PORT=3001
```

### For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/crypto-raffle?retryWrites=true&w=majority
PORT=3001
```

**Important:** Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual MongoDB Atlas credentials.

## Step 4: Start the Backend Server

### For Development:
```bash
npm run dev
```

### For Production:
```bash
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 3001
📡 API available at http://localhost:3001/api
```

## Step 5: Update Frontend Configuration

1. Open `api-service.js` in your project root
2. Update the `API_BASE_URL` constant:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-backend-url.com/api'; // Update this with your deployed backend URL
```

## Step 6: Test the Backend

Open your browser and visit:
- http://localhost:3001/api/health - Should return `{"status":"ok","message":"Server is running"}`
- http://localhost:3001/api/raffles - Should return `[]` (empty array initially)

## Deploying to Production

### Option 1: Deploy to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   cd backend
   heroku create your-raffle-backend
   ```
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   ```
5. Deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```
6. Your backend will be available at: `https://your-raffle-backend.herokuapp.com`

### Option 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 3001
6. Railway will automatically deploy your backend

### Option 3: Deploy to Render

1. Go to https://render.com
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:** Add `MONGODB_URI`
6. Click "Create Web Service"

## Troubleshooting

### Connection Issues
- **Error: "ECONNREFUSED"**: Make sure MongoDB is running
- **Error: "Authentication failed"**: Check your MongoDB credentials
- **Error: "Network timeout"**: Check your MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)

### CORS Issues
If you get CORS errors in the browser:
1. Make sure the backend `server.js` has `cors()` middleware enabled
2. Check that your frontend URL is allowed in CORS settings

### Port Already in Use
If port 3001 is already in use:
```bash
# Find and kill the process using port 3001
# On macOS/Linux:
lsof -ti:3001 | xargs kill -9

# On Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

## API Endpoints

Once running, your backend provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/raffles` - Get all raffles
- `GET /api/raffles/active` - Get active raffles only
- `GET /api/raffles/:id` - Get single raffle
- `POST /api/raffles` - Create new raffle
- `PUT /api/raffles/:id` - Update raffle
- `DELETE /api/raffles/:id` - Delete raffle
- `GET /api/raffles/:id/participants` - Get raffle participants
- `POST /api/raffles/:id/participants` - Add participant
- `GET /api/raffles/:id/transactions` - Get raffle transactions
- `POST /api/raffles/:id/transactions` - Add transaction
- `GET /api/winners/pending` - Get pending winner payments
- `POST /api/winners` - Add winner
- `PUT /api/winners/:raffleId/paid` - Mark winner as paid
- `GET /api/stats` - Get dashboard statistics

## Next Steps

1. Deploy your backend to a hosting service
2. Update `api-service.js` with your production backend URL
3. Deploy your frontend to Netlify/Vercel
4. Test creating a raffle and entering it from different devices

## Support

If you encounter any issues:
1. Check the server logs for error messages
2. Verify MongoDB connection string is correct
3. Ensure all environment variables are set
4. Check that ports are not blocked by firewall
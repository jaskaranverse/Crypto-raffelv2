# Quick Fix: Make Raffles Visible to Everyone on Netlify

## The Problem
Right now, raffles are stored in localStorage (browser storage), so each person only sees their own raffles.

## The Solution
Use a free cloud database so everyone sees the same raffles.

## Option 1: Supabase (Easiest - 5 minutes)

### Step 1: Create Free Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (free)
4. Create a new project:
   - Name: `crypto-raffle`
   - Database Password: (create a strong password)
   - Region: Choose closest to you
   - Click "Create new project"

### Step 2: Create Tables
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Paste this SQL:

```sql
-- Create raffles table
CREATE TABLE raffles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  prize_pool DECIMAL NOT NULL,
  entry_fee DECIMAL NOT NULL,
  total_spots INTEGER NOT NULL,
  max_per_wallet INTEGER NOT NULL,
  end_time BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  status TEXT DEFAULT 'active',
  winner TEXT,
  winner_avatar TEXT,
  completed_at BIGINT,
  winner_drawn_at BIGINT,
  auto_draw_enabled BOOLEAN DEFAULT true
);

-- Create participants table
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL,
  address TEXT NOT NULL,
  entries INTEGER DEFAULT 1,
  avatar TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  tx_hash TEXT NOT NULL,
  FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE
);

-- Create transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL,
  from_address TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  timestamp BIGINT NOT NULL,
  tx_hash TEXT NOT NULL,
  FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE
);

-- Create winners table
CREATE TABLE winners (
  id SERIAL PRIMARY KEY,
  raffle_id TEXT NOT NULL UNIQUE,
  raffle_title TEXT NOT NULL,
  winner_address TEXT NOT NULL,
  prize_amount DECIMAL NOT NULL,
  drawn_at BIGINT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_at BIGINT,
  participant_number INTEGER NOT NULL,
  total_participants INTEGER NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on raffles" ON raffles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on raffles" ON raffles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on raffles" ON raffles FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on participants" ON participants FOR SELECT USING (true);
CREATE POLICY "Allow public insert on participants" ON participants FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on transactions" ON transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on winners" ON winners FOR SELECT USING (true);
CREATE POLICY "Allow public insert on winners" ON winners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on winners" ON winners FOR UPDATE USING (true);
```

4. Click "Run" to create tables

### Step 3: Get API Keys
1. In Supabase dashboard, go to "Settings" → "API"
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### Step 4: Update Your Code
1. Open `api-service.js`
2. Replace the entire file with this:

```javascript
// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; // Replace with your URL
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY_HERE'; // Replace with your anon key

class RaffleAPI {
    constructor() {
        this.headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
        };
    }

    async getAllRaffles() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/raffles?select=*`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getActiveRaffles() {
        const now = Date.now();
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?select=*&status=eq.active&end_time=gt.${now}`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async createRaffle(raffleData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/raffles`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(raffleData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getParticipants(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*&raffle_id=eq.${raffleId}`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addParticipant(raffleId, participantData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/participants`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ raffle_id: raffleId, ...participantData })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async addTransaction(raffleId, transactionData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ raffle_id: raffleId, ...transactionData })
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getStats() {
        const allRaffles = await this.getAllRaffles();
        const now = Date.now();
        const activeRaffles = allRaffles.filter(r => r.end_time > now && r.status === 'active').length;
        
        // Get all participants
        const participantsResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/participants?select=*`,
            { headers: this.headers }
        );
        const participants = await participantsResponse.json();
        
        // Get all transactions
        const transactionsResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/transactions?select=*`,
            { headers: this.headers }
        );
        const transactions = await transactionsResponse.json();
        
        const totalRevenue = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
        
        // Get pending winners
        const winnersResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/winners?select=*&payment_status=eq.pending`,
            { headers: this.headers }
        );
        const pendingWinners = await winnersResponse.json();
        
        return {
            activeRaffles,
            totalParticipants: participants.length,
            totalRevenue,
            pendingWinners: pendingWinners.length
        };
    }

    // Add other methods as needed...
}

const raffleAPI = new RaffleAPI();
```

### Step 5: Deploy
1. Save the file
2. Push to GitHub:
```bash
git add .
git commit -m "Add Supabase database integration"
git push origin main
```
3. Netlify will auto-deploy
4. Test: Create a raffle, then open in incognito/different browser - you should see it!

## Option 2: Firebase (Alternative)

If you prefer Firebase:
1. Go to https://firebase.google.com
2. Create project
3. Enable Firestore Database
4. Get config and update `api-service.js`

## Option 3: Deploy the Node.js Backend

Follow the `BACKEND_SETUP.md` guide to deploy the full backend to:
- Railway.app (easiest)
- Heroku
- Render.com

## Why This Fixes It

**Before:** localStorage = each browser has its own data
**After:** Supabase = everyone reads/writes to same cloud database

Now when you create a raffle, it's saved to Supabase and EVERYONE who visits your site will see it!

## Cost

- ✅ Supabase: **FREE** (500MB database, 50,000 monthly active users)
- ✅ Firebase: **FREE** (1GB storage, 50K reads/day)
- ✅ Netlify: **FREE** (already using)

Total cost: **$0/month** 🎉
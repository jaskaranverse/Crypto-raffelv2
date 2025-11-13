# Supabase Setup - Step by Step

You've created your Supabase account. Now follow these exact steps:

## Step 1: Run the SQL

1. In your Supabase dashboard, look at the left sidebar
2. Click on **"SQL Editor"** (it has a </> icon)
3. Click **"New Query"** button (top right)
4. Open the file `supabase-schema.sql` from your project
5. Copy ALL the content from that file
6. Paste it into the SQL Editor
7. Click **"Run"** button (or press Ctrl+Enter)
8. You should see "Success. No rows returned" - that's good!

## Step 2: Get Your API Keys

1. In the left sidebar, click on **"Settings"** (gear icon at bottom)
2. Click on **"API"** in the settings menu
3. You'll see a page with your API credentials

### Copy These Two Values:

**1. Project URL**
- Look for "Project URL" section
- It looks like: `https://xxxxxxxxxxxxx.supabase.co`
- Copy this entire URL

**2. anon public Key**
- Scroll down to "Project API keys" section
- Find the key labeled **"anon" "public"**
- It's a very long string starting with `eyJ...`
- Click the copy icon to copy it

## Step 3: Update Your Code

1. Open `api-service.js` in your project
2. Find lines 4-5 at the top:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY_HERE';
```

3. Replace with your actual values:
```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Your Project URL
const SUPABASE_KEY = 'eyJhbGc...'; // Your anon public key
```

## Step 4: Replace the Entire api-service.js

Copy this entire code and replace everything in `api-service.js`:

```javascript
// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; // Replace with your URL
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY_HERE'; // Replace with your anon key

class RaffleAPI {
    constructor() {
        this.headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
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

    async getRaffle(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?select=*&id=eq.${raffleId}`,
                { headers: this.headers }
            );
            const data = await response.json();
            return data[0] || null;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async createRaffle(raffleData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/raffles`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(raffleData)
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateRaffle(raffleId, raffleData) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?id=eq.${raffleId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify(raffleData)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async deleteRaffle(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?id=eq.${raffleId}`,
                {
                    method: 'DELETE',
                    headers: this.headers
                }
            );
            return { message: 'Raffle deleted successfully' };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getParticipants(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*&raffle_id=eq.${raffleId}&order=timestamp.desc`,
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
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getAllParticipants() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*&order=timestamp.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getTransactions(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/transactions?select=*&raffle_id=eq.${raffleId}&order=timestamp.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addTransaction(raffleId, transactionData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ raffle_id: raffleId, from_address: transactionData.from, ...transactionData })
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPendingWinners() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?select=*&payment_status=eq.pending&order=drawn_at.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getAllWinners() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?select=*&order=drawn_at.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addWinner(winnerData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/winners`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(winnerData)
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async markWinnerPaid(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?raffle_id=eq.${raffleId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        payment_status: 'paid',
                        paid_at: Date.now()
                    })
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getStats() {
        try {
            const allRaffles = await this.getAllRaffles();
            const now = Date.now();
            const activeRaffles = allRaffles.filter(r => r.end_time > now && r.status === 'active').length;
            
            const participantsResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*`,
                { headers: this.headers }
            );
            const participants = await participantsResponse.json();
            
            const transactionsResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/transactions?select=*`,
                { headers: this.headers }
            );
            const transactions = await transactionsResponse.json();
            
            const totalRevenue = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
            
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
        } catch (error) {
            console.error('Error:', error);
            return {
                activeRaffles: 0,
                totalParticipants: 0,
                totalRevenue: 0,
                pendingWinners: 0
            };
        }
    }
}

const raffleAPI = new RaffleAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = raffleAPI;
}
```

## Step 5: Deploy

1. Save the file
2. Open terminal and run:
```bash
git add .
git commit -m "Connect to Supabase database"
git push origin main
```

3. Netlify will automatically deploy (takes 1-2 minutes)

## Step 6: Test

1. Go to your Netlify site
2. Open admin panel
3. Create a raffle
4. Open the main site in **incognito/private window**
5. You should see the raffle! 🎉

## Troubleshooting

**If raffles don't show:**
1. Open browser console (F12)
2. Look for errors
3. Check that SUPABASE_URL and SUPABASE_KEY are correct
4. Make sure you ran the SQL schema

**If you see CORS errors:**
1. Go to Supabase → Settings → API
2. Scroll to "CORS Configuration"
3. Make sure your Netlify URL is allowed

## Summary

✅ SQL creates database tables
✅ API keys connect your site to database  
✅ New code uses Supabase instead of localStorage
✅ Everyone sees the same raffles now!

**Cost: $0/month** (Supabase free tier)
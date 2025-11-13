# 🎰 Crypto Raffle - Admin Guide

## Overview
This guide explains how to create and manage multiple raffles using the admin panel. All active raffles automatically appear on the main website for users to enter simultaneously.

---

## 🚀 Quick Start

### 1. Access Admin Panel
- Open `admin.html` in your browser
- Click "Connect Admin Wallet"
- **Select any MetaMask account** you want to use (multi-account support enabled!)
- The selected account will be used to receive raffle entry payments

### 2. Create a New Raffle
Navigate to the **"Create Raffle"** tab and fill in:

- **Raffle Title**: e.g., "0.5 ETH Raffle"
- **Description**: e.g., "Win big with just a small entry fee!"
- **Your Wallet Address**: Auto-filled with your connected wallet (where payments go)
- **Prize Pool (ETH)**: Total prize amount (e.g., 0.5)
- **Entry Fee (ETH)**: Cost per entry (e.g., 0.001)
- **Total Spots Available**: Maximum entries allowed (e.g., 500)
- **Max Entries Per Wallet**: Limit per user (e.g., 10)
- **Duration (Days)**: How long the raffle runs (e.g., 2)

Click **"🎰 Create Raffle"** and it will:
- ✅ Save the raffle
- ✅ **Automatically appear on the main website** (`index.html`)
- ✅ Be visible to all users immediately

---

## 🎯 Key Features

### Multiple Active Raffles
- **Create unlimited raffles** - Run as many raffles as you want simultaneously
- **All active raffles display** - Users see all non-expired raffles on the main website
- **Independent entries** - Each raffle tracks its own participants and transactions
- **Automatic expiration** - Raffles disappear from the website when they expire

### How It Works
1. **Create Multiple Raffles**: You can create several raffles with different prizes, entry fees, and durations
2. **All Show on Website**: Every active (non-expired) raffle appears in a list on `index.html`
3. **Users Choose**: Users can browse all raffles and enter any or all of them
4. **Auto-Remove**: When a raffle's time expires, it automatically stops showing on the website
5. **Track Separately**: Each raffle has its own participant list, transactions, and winner

---

## 📊 Managing Raffles

### View All Raffles
Go to the **"Manage Raffles"** tab to see:
- All created raffles (active and ended)
- Status badges:
  - 🟢 **Live on Website** - Currently active and visible to users
  - 🔴 **Ended** - Expired and no longer accepting entries
- Participant counts for each raffle
- Creation and end dates

### View Details
Click **"👁️ View Details"** to see:
- Total participants
- Revenue collected
- Spots filled
- End time
- Payment wallet address

### Delete Raffle
- Only **ended raffles** can be deleted
- Click **"🗑️ Delete"** to permanently remove
- This action cannot be undone
- Cleans up all participant and transaction data

---

## 🌐 How It Appears on Main Website

### Multi-Raffle Display
The main website (`index.html`) now shows:

1. **Header Stats**:
   - Number of active raffles
   - Total participants across all raffles

2. **Raffle Cards**:
   - Each active raffle displayed in its own card
   - Sorted by end time (ending soonest first)
   - Complete information for each raffle

3. **Individual Entry**:
   - Users can enter any raffle independently
   - Each raffle has its own "Enter" button
   - Separate countdown timers for each

### What Users See Per Raffle
- **Title & Description**: Your raffle details
- **Prize Pool**: Amount to be won
- **Entry Fee**: Cost to enter
- **Countdown Timer**: Time remaining
- **Progress Bar**: Spots filled
- **Participant Count**: Current entries
- **User's Entries**: How many times they've entered
- **Win Chance**: Their probability of winning
- **Recent Entries**: Last 5 participants
- **Enter Button**: One-click entry

---

## 💰 Payment Flow

### How Payments Work
1. User connects their MetaMask wallet (can select any account)
2. User browses all active raffles
3. User clicks "Enter Raffle Now" on their chosen raffle
4. MetaMask prompts for payment approval
5. ETH is sent **directly to the raffle's admin wallet address**
6. Entry is recorded for that specific raffle
7. Participant appears in that raffle's list

### Receiving Payments
- Each raffle can have a **different wallet address**
- All entry fees for a raffle go to its specified address
- Payments are instant and on-chain
- You can track all transactions in MetaMask
- No intermediary - direct wallet-to-wallet transfers

---

## 🎯 Best Practices

### Creating Multiple Raffles
- ✅ **Vary the prizes** - Offer different prize amounts to attract different users
- ✅ **Different entry fees** - Some low-cost, some premium
- ✅ **Stagger end times** - Don't have all raffles end at once
- ✅ **Clear titles** - Make each raffle easily distinguishable
- ✅ **Unique descriptions** - Explain what makes each raffle special

### Managing Multiple Raffles
- ✅ Keep track of which raffles are performing well
- ✅ Monitor participant counts across all raffles
- ✅ Create new raffles before old ones expire to maintain activity
- ✅ Delete old raffles to keep the admin panel clean
- ✅ Use different wallet addresses if managing raffles for different purposes

### Timing Strategy
- ✅ **Overlapping raffles** - Have multiple active at once
- ✅ **Different durations** - Mix short (1 day) and long (7 days) raffles
- ✅ **Regular schedule** - Create new raffles on a consistent schedule
- ✅ **Peak times** - Launch new raffles when your audience is most active

### Security
- ✅ Always verify wallet addresses for each raffle
- ✅ Use secure MetaMask accounts
- ✅ Keep your seed phrase safe
- ✅ Test with small amounts first
- ✅ Monitor all raffles regularly

---

## 🔧 Technical Details

### Data Storage
- All raffles stored in browser localStorage under `allRaffles`
- Each raffle has separate participant data: `raffle_{id}_participants`
- Each raffle has separate transaction data: `raffle_{id}_transactions`
- Data persists across browser sessions

### Multi-Account Support
Both admin panel and main website support:
- Selecting any MetaMask account during connection
- Easy account switching
- Multiple admin accounts for different raffles

### Real-Time Updates
- Main website checks for new/expired raffles every 5 seconds
- Automatic removal of expired raffles from display
- Live countdown timers for each raffle
- Real-time participant count updates

### Automatic Filtering
- Only non-expired raffles show on main website
- Expired raffles automatically hidden
- Admin panel shows all raffles (active and ended)

---

## 📝 Example Workflows

### Scenario 1: Multiple Prize Tiers
1. Create "0.1 ETH Raffle" - Entry: 0.0005 ETH, Duration: 1 day
2. Create "0.5 ETH Raffle" - Entry: 0.001 ETH, Duration: 3 days
3. Create "1 ETH Raffle" - Entry: 0.005 ETH, Duration: 7 days
4. All three appear on website simultaneously
5. Users can enter any or all of them

### Scenario 2: Continuous Activity
1. Monday: Create 2-day raffle
2. Tuesday: Create another 2-day raffle
3. Wednesday: First raffle expires, create new one
4. Result: Always 2-3 active raffles on the website

### Scenario 3: Special Events
1. Regular raffles: 0.1-0.5 ETH prizes
2. Weekend special: 2 ETH prize raffle
3. All run simultaneously
4. Different entry fees attract different audiences

---

## 🆘 Troubleshooting

### Raffles Not Appearing on Main Site
1. Check if raffle has expired (past end time)
2. Refresh the main website
3. Check browser console for errors
4. Ensure localStorage is enabled

### Multiple Raffles Not Showing
1. Verify raffles are not expired
2. Check that end times are in the future
3. Clear browser cache and reload
4. Check localStorage data

### Payments Going to Wrong Address
1. Verify wallet address in raffle creation form
2. Each raffle can have different wallet address
3. Check the specific raffle's details in admin panel

### Can't Delete Raffle
1. Only ended (expired) raffles can be deleted
2. Wait for raffle to expire first
3. Check the raffle's end time

---

## 💡 Pro Tips

### Maximize Participation
- **Run 3-5 raffles simultaneously** for variety
- **Mix prize amounts** to appeal to different budgets
- **Stagger end times** so there's always something ending soon
- **Create urgency** with shorter duration raffles

### Revenue Optimization
- **Volume strategy**: Many low-cost raffles
- **Premium strategy**: Fewer high-value raffles
- **Mixed strategy**: Combination of both

### User Experience
- **Clear naming**: "Quick 0.1 ETH Draw" vs "Grand 1 ETH Prize"
- **Varied durations**: 1 day, 3 days, 7 days options
- **Transparent odds**: Lower entry fees = more participants = lower individual odds

---

## 📊 Success Metrics

Track these for each raffle:
- **Participation rate**: Entries vs. total spots
- **Revenue**: Total entry fees collected
- **Time to fill**: How quickly spots are taken
- **User retention**: How many enter multiple raffles

---

## 🎉 Advanced Strategies

### Seasonal Campaigns
- Holiday specials with themed raffles
- Multiple raffles during peak seasons
- Coordinated launch of several raffles

### Community Building
- Regular weekly raffles
- Loyalty rewards for repeat participants
- Special raffles for community members

### Marketing
- Promote individual raffles on social media
- Highlight ending-soon raffles
- Showcase recent winners

---

**Happy Raffling! 🎰**

*Remember: All active raffles automatically appear on the main website. Create as many as you want, and they'll all be visible to users until they expire!*
# 🎰 Webflow Raffle System - Complete Integration Guide

This folder contains standalone HTML embeds that you can use in Webflow to create a fully functional crypto raffle system.

## 📦 What's Included

### 1. **01-wallet-connect.html** - Wallet Connection Widget
- MetaMask wallet connection
- Shows connected address and balance
- Disconnect functionality
- Must be included on every page

### 2. **02-complete-raffle-system.html** - Main Raffle Display
- Shows all active raffles
- Real-time countdown timers
- Entry form with ETH payment
- Participant tracking
- Win chance calculator
- Progress bars

### 3. **03-admin-panel.html** - Admin Dashboard
- Create new raffles
- Manage existing raffles
- Random winner selection
- Cancel raffles
- View participants
- Wallet-based authentication

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project
3. Go to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

### Step 2: Set Up Database

1. In Supabase, go to **SQL Editor**
2. Open the file `../supabase-schema.sql` from this project
3. Copy all the SQL code
4. Paste it into Supabase SQL Editor
5. Click **Run**
6. You should see "Success. No rows returned"

### Step 3: Configure Embeds

Open each HTML file and replace these placeholders:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';  // Replace with your Project URL
const SUPABASE_KEY = 'YOUR_SUPABASE_KEY';  // Replace with your anon public key
```

For **03-admin-panel.html** also replace:
```javascript
const ADMIN_WALLET = 'YOUR_ADMIN_WALLET';  // Your MetaMask wallet address
```

### Step 4: Add to Webflow

#### For Public Pages (Raffle Display):

1. In Webflow, create a new page (e.g., "Raffles")
2. Add an **Embed** element
3. Copy the entire contents of `01-wallet-connect.html`
4. Paste into the embed
5. Add another **Embed** element below it
6. Copy the entire contents of `02-complete-raffle-system.html`
7. Paste into the embed
8. Publish!

#### For Admin Page:

1. Create a new page (e.g., "Admin" - keep the URL secret!)
2. Add an **Embed** element
3. Copy the entire contents of `01-wallet-connect.html`
4. Paste into the embed
5. Add another **Embed** element below it
6. Copy the entire contents of `03-admin-panel.html`
7. Paste into the embed
8. Publish!

## 🎯 How It Works

### For Users (Public Page):

1. **Connect Wallet** → Click "Connect Wallet" button
2. **View Raffles** → See all active raffles with countdown timers
3. **Enter Raffle** → Click "Enter Raffle Now" button
4. **Pay Entry Fee** → MetaMask will prompt for payment
5. **Confirm Transaction** → Wait for blockchain confirmation
6. **Track Entries** → See your entries and win chance

### For Admin (Admin Page):

1. **Connect Admin Wallet** → Must use the wallet address you configured
2. **Create Raffle** → Fill out the form:
   - Title (e.g., "1 ETH Grand Prize")
   - Description
   - Prize Pool (e.g., 1.0 ETH)
   - Entry Fee (e.g., 0.01 ETH)
   - Total Spots (e.g., 100)
   - Duration (e.g., 24 hours)
3. **Manage Raffles** → View all raffles
4. **Select Winner** → Click "Select Winner" when raffle ends
5. **Send Prize** → Manually send ETH to winner's address

## 💰 Payment Flow

```
User → Pays Entry Fee → Your Wallet Address
You → Manually Send Prize → Winner's Address
```

**Important:** This system does NOT automatically send prizes. You must:
1. Wait for raffle to end
2. Click "Select Winner" in admin panel
3. Copy winner's wallet address
4. Manually send the prize ETH from your wallet

## 🔒 Security Features

- **Admin Authentication**: Only your wallet can access admin panel
- **Blockchain Verification**: All payments verified on-chain
- **Public Database**: Supabase Row Level Security allows public reads
- **No Private Keys**: Never stores or handles private keys

## 🎨 Customization

### Change Colors

Edit the CSS in each file. Look for these gradient values:

```css
/* Primary gradient (purple) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Success gradient (green) */
background: linear-gradient(135deg, #10b981 0%, #059669 100%);

/* Danger gradient (red) */
background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
```

### Change Text

All text is in plain HTML. Search for the text you want to change and edit it directly.

### Add More Fields

To add custom fields to raffles:
1. Update the database schema in Supabase
2. Add form fields in `03-admin-panel.html`
3. Update the display in `02-complete-raffle-system.html`

## 🐛 Troubleshooting

### "Error loading raffles"
- Check your Supabase URL (no spaces!)
- Verify your API key is correct
- Make sure you ran the SQL schema

### "Connect Wallet First"
- Install MetaMask browser extension
- Make sure you're on a supported network (Ethereum mainnet/testnet)
- Refresh the page

### "Insufficient balance"
- You need ETH in your wallet to enter raffles
- Check your wallet balance
- Make sure you're on the correct network

### "Transaction rejected"
- User cancelled the transaction
- Try again

### Admin panel shows "Unauthorized"
- Make sure you're connected with the correct admin wallet
- Check the `ADMIN_WALLET` address in the code
- Addresses are case-insensitive but must match exactly

## 📱 Mobile Support

All embeds are fully responsive and work on:
- ✅ Desktop browsers
- ✅ Mobile browsers (with MetaMask mobile app)
- ✅ Tablets
- ✅ All screen sizes

## 🌐 Network Support

Currently configured for:
- Ethereum Mainnet
- Ethereum Testnets (Sepolia, Goerli)

To add other networks, modify the wallet connection code.

## 📊 Database Structure

### Tables Created:
- `raffles` - Stores raffle information
- `participants` - Tracks who entered each raffle
- `transactions` - Records all payments
- `winners` - Stores selected winners

### Row Level Security:
- Public can READ all tables
- Public can INSERT into participants and transactions
- Only authenticated users can modify raffles

## 🔄 Updates & Maintenance

### To Update a Raffle:
1. Go to Supabase dashboard
2. Open the `raffles` table
3. Edit the row directly
4. Changes appear immediately

### To View Transactions:
1. Go to Supabase dashboard
2. Open the `transactions` table
3. See all payments with timestamps

### To Export Data:
1. In Supabase, go to Table Editor
2. Click the table you want
3. Click "Export" → "CSV"

## 💡 Tips & Best Practices

1. **Test First**: Use Ethereum testnet (Sepolia) before mainnet
2. **Keep Admin URL Secret**: Don't share your admin page URL
3. **Monitor Regularly**: Check Supabase dashboard for activity
4. **Backup Data**: Export tables regularly
5. **Clear Communication**: Tell users how winners are selected
6. **Fast Payouts**: Send prizes quickly after selection
7. **Set Realistic Prizes**: Don't promise more than you can pay

## 🆘 Support

If you need help:
1. Check the troubleshooting section above
2. Review the Supabase logs
3. Check browser console for errors (F12)
4. Verify all credentials are correct

## 📄 License

This code is provided as-is for your use in Webflow projects.

## 🎉 You're Ready!

Your raffle system is now complete and ready to use. Just:
1. ✅ Configure Supabase credentials
2. ✅ Add embeds to Webflow
3. ✅ Publish your site
4. ✅ Start creating raffles!

Good luck with your raffles! 🍀
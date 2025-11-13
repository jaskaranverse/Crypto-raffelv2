# 🔐 Admin Panel Access Guide

## Quick Access

### Main Site (Public)
- **URL**: `index.html` or your deployed URL
- **Purpose**: Users enter raffles here
- **Access**: Anyone can view and participate

### Admin Panel (Private)
- **URL**: `admin.html` or `your-domain.com/admin.html`
- **Purpose**: Create and manage raffles
- **Access**: Only authorized admin wallet

## 🚀 How to Access Admin Panel

### Step 1: Open Admin URL
Navigate to:
```
https://your-deployed-site.com/admin.html
```
Or locally:
```
http://localhost:8000/admin.html
```

### Step 2: Connect Admin Wallet
1. You'll see an authentication screen
2. Click "Connect Admin Wallet"
3. MetaMask will open
4. Select your admin wallet (configured in `config.js`)
5. Click "Connect"

### Step 3: Verify Access
- If authorized: Admin panel loads ✅
- If unauthorized: "Access Denied" message ❌

## 🔑 Admin Wallet Configuration

Your admin wallet is set in [`config.js`](config.js:4):

```javascript
ADMIN_ADDRESS: '0x842bab27de95e329eb17733c1f29c082e5dd94c3'
```

**To change admin wallet:**
1. Open `config.js`
2. Replace the address with your MetaMask address
3. Save the file
4. Redeploy if already deployed

**To get your MetaMask address:**
1. Open MetaMask
2. Click on account name at top
3. Click "Copy address"
4. Paste into `config.js`

## 📊 Admin Panel Features

### Dashboard Tab
- **Live Statistics**: Active raffles, participants, revenue
- **Activity Feed**: Real-time entries and actions
- **Pending Winners**: Winners awaiting payment

### Participants Tab
- **View All Entries**: Complete participant list
- **Search Function**: Find by wallet address
- **Entry Details**: Timestamps, transaction hashes

### Create Raffle Tab
- **Raffle Settings**: Title, description, prize pool
- **Entry Configuration**: Fee, spots, limits
- **Duration Options**: Set days/hours or specific end time
- **Instant Publishing**: Goes live immediately on main site

### Manage Raffles Tab
- **View All Raffles**: Active and completed
- **Edit Raffles**: Modify active raffle settings
- **Delete Raffles**: Remove raffles (with confirmation)
- **View Details**: Participants, revenue, status

### Settings Tab
- **Admin Info**: Your wallet address
- **Network Info**: Current blockchain network

## 🎯 Common Admin Tasks

### Creating a New Raffle

1. Go to **Create Raffle** tab
2. Fill in the form:
   ```
   Title: "Win 0.5 ETH!"
   Description: "Enter for just 0.01 ETH"
   Your Wallet: (auto-filled with admin address)
   Prize Pool: 0.5
   Entry Fee: 0.01
   Total Spots: 50
   Max Per Wallet: 5
   Duration: 2 days
   ```
3. Click "🎰 Create Raffle"
4. Success message appears
5. Raffle is now live on main site!

### Monitoring Active Raffles

1. Go to **Dashboard** tab
2. View live statistics
3. Check activity feed for new entries
4. Monitor countdown timers

### Processing Winner Payments

1. Go to **Dashboard** tab
2. Scroll to "Pending Winner Payments"
3. You'll see:
   - Winner's wallet address
   - Prize amount
   - Entry number
   - Draw timestamp
4. Copy winner's address
5. Open MetaMask
6. Send prize ETH to winner
7. Return to admin panel
8. Click "✅ Mark Paid"
9. Winner removed from pending list

### Viewing Participants

1. Go to **Participants** tab
2. See all entries across all raffles
3. Use search to find specific wallet
4. View entry numbers and timestamps
5. Copy addresses with 📋 button

### Editing a Raffle

1. Go to **Manage Raffles** tab
2. Find the raffle you want to edit
3. Click "✏️ Edit"
4. Modify settings in the form
5. Click "💾 Update Raffle"
6. Changes apply immediately

### Deleting a Raffle

1. Go to **Manage Raffles** tab
2. Find the raffle to delete
3. Click "🗑️ Delete"
4. Confirm deletion
5. Raffle and all data removed

## 🔒 Security Best Practices

### Keep Admin URL Private
- ❌ Don't share `admin.html` URL publicly
- ❌ Don't post on social media
- ✅ Bookmark privately
- ✅ Consider renaming file to something obscure

### Protect Your Admin Wallet
- ✅ Use a dedicated wallet for admin functions
- ✅ Keep seed phrase in secure location
- ✅ Consider hardware wallet for mainnet
- ✅ Never share private keys

### Monitor Access
- ✅ Check Supabase logs regularly
- ✅ Review all transactions
- ✅ Watch for suspicious activity
- ✅ Export data backups weekly

### Use Strong Passwords
- ✅ Secure your Supabase account
- ✅ Enable 2FA where possible
- ✅ Use password manager
- ✅ Change passwords regularly

## 🐛 Troubleshooting Admin Access

### "Access Denied" Message

**Cause**: Connected wallet doesn't match admin address

**Solutions**:
1. Check you're using correct wallet in MetaMask
2. Verify admin address in `config.js` is correct
3. Addresses must match exactly (case-insensitive)
4. Try disconnecting and reconnecting wallet

### Admin Panel Won't Load

**Cause**: JavaScript error or missing files

**Solutions**:
1. Check browser console (F12) for errors
2. Verify all files are uploaded
3. Check Supabase connection
4. Clear browser cache and reload

### Can't Create Raffles

**Cause**: Supabase connection issue

**Solutions**:
1. Verify Supabase URL in `api-service.js`
2. Check API key is correct
3. Ensure database schema was run
4. Check Supabase project is active

### Participants Not Showing

**Cause**: Database query issue

**Solutions**:
1. Check Supabase connection
2. Verify tables exist
3. Check browser console for errors
4. Refresh the page

## 📱 Mobile Admin Access

The admin panel works on mobile devices:

1. **Open in Mobile Browser**
   - Visit admin URL on phone
   - Works in Safari, Chrome, Firefox

2. **Connect MetaMask Mobile**
   - Use MetaMask mobile app
   - Scan QR code or use WalletConnect
   - Approve connection

3. **Responsive Design**
   - All features work on mobile
   - Touch-friendly buttons
   - Scrollable tables

## 🔄 Multiple Admins (Advanced)

To allow multiple admin wallets:

1. Open `admin.js`
2. Find line 113:
   ```javascript
   const authorizedAdmin = RAFFLE_CONFIG.ADMIN_ADDRESS.toLowerCase();
   ```
3. Replace with:
   ```javascript
   const authorizedAdmins = [
       '0xADMIN_WALLET_1'.toLowerCase(),
       '0xADMIN_WALLET_2'.toLowerCase(),
       '0xADMIN_WALLET_3'.toLowerCase()
   ];
   const isAuthorized = authorizedAdmins.includes(connectingWallet);
   ```
4. Update the authorization check accordingly

## 📊 Admin Dashboard Metrics

### Active Raffles
- Number of currently running raffles
- Updates in real-time
- Includes only raffles before end time

### Total Participants
- All entries across all raffles
- Counts individual entries
- Updates with each new entry

### Total Revenue
- Sum of all entry fees collected
- Displayed in ETH
- Calculated from transactions table

### Pending Winners
- Winners awaiting payment
- Shows number of unpaid prizes
- Updates when marked as paid

## 🎯 Admin Workflow Example

**Daily Routine:**

1. **Morning Check** (9:00 AM)
   - Open admin panel
   - Check dashboard stats
   - Review overnight activity
   - Process any pending winners

2. **Midday Monitor** (1:00 PM)
   - Check active raffles
   - Review new participants
   - Respond to any issues

3. **Evening Review** (6:00 PM)
   - Check for ended raffles
   - Process winner payments
   - Plan next raffle

4. **Night Backup** (10:00 PM)
   - Export Supabase data
   - Review day's transactions
   - Prepare for tomorrow

## 📞 Admin Support

If you need help with admin functions:

1. Check this guide first
2. Review browser console for errors
3. Check Supabase logs
4. Verify all configuration is correct
5. Test on testnet before mainnet

## 🎉 Quick Tips

- **Bookmark Admin URL**: Save for quick access
- **Use Keyboard Shortcuts**: Faster navigation
- **Keep Multiple Tabs**: Dashboard + Create Raffle
- **Set Browser Notifications**: For new entries
- **Export Data Regularly**: Weekly backups
- **Test Everything**: On testnet first
- **Respond Quickly**: Process winners fast
- **Stay Organized**: Track all raffles

---

**Remember**: With great power comes great responsibility! 🦸‍♂️

Your admin panel controls real money and real raffles. Always:
- Double-check before creating raffles
- Verify winner addresses before sending
- Keep your admin wallet secure
- Monitor activity regularly
- Process payments promptly

**Happy raffling! 🎰**
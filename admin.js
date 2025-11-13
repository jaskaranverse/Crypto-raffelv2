// Admin Panel JavaScript
let adminState = {
    isAuthenticated: false,
    adminAddress: null,
    raffles: []
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminPanel();
    loadRaffles();
    updateDashboard();
    
    // Update dashboard every 5 seconds
    setInterval(updateDashboard, 5000);
    setInterval(updateLiveActivity, 3000);
});

function initializeAdminPanel() {
    // Check if wallet is already connected
    checkAdminAuth();
    
    // Setup event listeners
    document.getElementById('adminConnectBtn').addEventListener('click', connectAdminWallet);
    document.getElementById('createRaffleForm').addEventListener('submit', createRaffle);
    
    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountChange);
    }
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Reload data based on active tab
    if (tabName === 'manage') {
        displayRaffles();
    } else if (tabName === 'dashboard') {
        updateDashboard();
    } else if (tabName === 'participants') {
        displayAllParticipants();
    }
}

async function checkAdminAuth() {
    if (typeof window.ethereum === 'undefined') {
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await authenticateAdmin(accounts[0]);
        }
    } catch (error) {
        console.error('Error checking auth:', error);
    }
}

async function connectAdminWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('❌ MetaMask is not installed! Please install MetaMask extension.');
        window.open('https://metamask.io/download/', '_blank');
        return;
    }
    
    try {
        // Request account access with wallet_requestPermissions to show account selector
        await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {}
            }]
        });
        
        // Now get the selected accounts
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        
        if (accounts.length === 0) {
            alert('❌ No accounts found. Please unlock MetaMask.');
            return;
        }
        
        await authenticateAdmin(accounts[0]);
    } catch (error) {
        console.error('Error connecting wallet:', error);
        if (error.code !== 4001) { // Don't show error if user rejected
            alert('❌ Failed to connect wallet: ' + error.message);
        }
    }
}

async function authenticateAdmin(address) {
    // Check if this wallet is authorized (from config.js)
    const authorizedAdmin = RAFFLE_CONFIG.ADMIN_ADDRESS.toLowerCase();
    const connectingWallet = address.toLowerCase();
    
    if (connectingWallet !== authorizedAdmin) {
        alert('❌ Access Denied! This wallet is not authorized as admin.\n\nAuthorized wallet: ' + RAFFLE_CONFIG.ADMIN_ADDRESS);
        
        // Disconnect and stay on auth screen
        adminState.isAuthenticated = false;
        adminState.adminAddress = null;
        document.getElementById('authOverlay').style.display = 'flex';
        document.getElementById('adminPanel').style.display = 'none';
        
        console.log('Access denied for:', address);
        return;
    }
    
    // Wallet is authorized - grant access
    adminState.isAuthenticated = true;
    adminState.adminAddress = address;
    
    // Hide auth overlay and show admin panel
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    // Update UI with admin address
    document.getElementById('adminAddressDisplay').value = address;
    document.getElementById('walletAddress').value = address;
    
    console.log('✅ Admin authenticated:', address);
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        // User disconnected
        adminState.isAuthenticated = false;
        adminState.adminAddress = null;
        document.getElementById('authOverlay').style.display = 'flex';
        document.getElementById('adminPanel').style.display = 'none';
    } else {
        // User switched accounts
        authenticateAdmin(accounts[0]);
    }
}

async function createRaffle(e) {
    e.preventDefault();
    
    const form = e.target;
    const editingId = form.dataset.editingId;
    const isEditing = !!editingId;
    
    // Calculate end time based on selected option
    let endTime;
    const timeOption = document.querySelector('input[name="timeOption"]:checked').value;
    
    if (timeOption === 'duration') {
        // Calculate from duration (days, hours, minutes)
        const days = parseInt(document.getElementById('durationDays').value) || 0;
        const hours = parseInt(document.getElementById('durationHours').value) || 0;
        const minutes = parseInt(document.getElementById('durationMinutes').value) || 0;
        
        const totalMilliseconds = (days * 24 * 60 * 60 * 1000) +
                                 (hours * 60 * 60 * 1000) +
                                 (minutes * 60 * 1000);
        
        if (totalMilliseconds === 0) {
            alert('❌ Please set a duration (at least 1 minute)');
            return;
        }
        
        endTime = Date.now() + totalMilliseconds;
    } else {
        // Use specific date/time
        const endDate = document.getElementById('endDate').value;
        const endTimeValue = document.getElementById('endTime').value;
        
        if (!endDate || !endTimeValue) {
            alert('❌ Please select both end date and time');
            return;
        }
        
        endTime = new Date(endDate + 'T' + endTimeValue).getTime();
        
        if (endTime <= Date.now()) {
            alert('❌ End time must be in the future');
            return;
        }
    }
    
    // Get form values
    const raffleData = {
        title: document.getElementById('raffleTitle').value,
        description: document.getElementById('raffleDescription').value,
        walletAddress: document.getElementById('walletAddress').value,
        prizePool: parseFloat(document.getElementById('prizePool').value),
        entryFee: parseFloat(document.getElementById('entryFee').value),
        totalSpots: parseInt(document.getElementById('totalSpots').value),
        maxPerWallet: parseInt(document.getElementById('maxPerWallet').value),
        endTime: endTime
    };
    
    // Validate wallet address
    if (!raffleData.walletAddress.startsWith('0x') || raffleData.walletAddress.length !== 42) {
        alert('❌ Invalid wallet address format');
        return;
    }
    
    if (isEditing) {
        // Update existing raffle
        updateRaffle(editingId, raffleData);
        
        // Show success message
        const successMsg = document.getElementById('createSuccessMessage');
        successMsg.innerHTML = '✅ Raffle updated successfully! <a href="index.html" style="color: #2563EB; text-decoration: underline; margin-left: 0.5rem;">View on main site →</a>';
        successMsg.style.background = '#F0FDF4';
        successMsg.style.borderColor = '#16A34A';
        successMsg.style.color = '#16A34A';
        successMsg.classList.add('show');
        
        // Reset form state
        delete form.dataset.editingId;
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = '🎰 Create Raffle';
        submitBtn.style.background = '#2563EB';
        
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    } else {
        // Create new raffle via API
        const raffle = {
            ...raffleData,
            id: 'raffle_' + Date.now(),
            created_at: Date.now(),
            createdAt: Date.now(),
            end_time: endTime,
            wallet_address: raffleData.walletAddress,
            prize_pool: raffleData.prizePool,
            entry_fee: raffleData.entryFee,
            total_spots: raffleData.totalSpots,
            max_per_wallet: raffleData.maxPerWallet,
            status: 'active',
            auto_draw_enabled: true,
            autoDrawEnabled: true
        };
        
        try {
            await saveRaffle(raffle);
            
            // Show success message
            const successMsg = document.getElementById('createSuccessMessage');
            successMsg.innerHTML = '✅ Raffle created successfully! <a href="index.html" style="color: #2563EB; text-decoration: underline; margin-left: 0.5rem;">View on main site →</a>';
            successMsg.style.background = '#F0FDF4';
            successMsg.style.borderColor = '#16A34A';
            successMsg.style.color = '#16A34A';
            successMsg.classList.add('show');
            
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 8000);
            
            console.log('Raffle created:', raffle);
            console.log('🎰 Raffle is now live on the main website!');
        } catch (error) {
            // Error already shown in saveRaffle function
            return;
        }
    }
    
    // Reset form
    form.reset();
    document.getElementById('walletAddress').value = adminState.adminAddress;
    
    // Reload raffle list
    loadRaffles();
}

async function updateRaffle(raffleId, newData) {
    try {
        await raffleAPI.updateRaffle(raffleId, newData);
        console.log('Raffle updated:', raffleId);
    } catch (error) {
        alert('❌ Raffle not found');
    }
}

async function saveRaffle(raffle) {
    try {
        console.log('Attempting to save raffle:', raffle);
        const result = await raffleAPI.createRaffle(raffle);
        console.log('Raffle saved successfully:', result);
        return result;
    } catch (error) {
        console.error('Error saving raffle:', error);
        alert('❌ Error creating raffle: ' + error.message + '\n\nMake sure you ran the SQL schema in Supabase!');
        throw error;
    }
}

async function loadRaffles() {
    adminState.raffles = await raffleAPI.getAllRaffles();
    displayRaffles();
}

async function displayRaffles() {
    const raffleList = document.getElementById('raffleList');
    
    if (adminState.raffles.length === 0) {
        raffleList.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">No raffles created yet</p>';
        return;
    }
    
    // Sort raffles by creation date (newest first)
    const sortedRaffles = [...adminState.raffles].sort((a, b) => b.createdAt - a.createdAt);
    
    const raffleCards = [];
    for (const raffle of sortedRaffles) {
        const isActive = Date.now() < raffle.endTime;
        const participants = await raffleAPI.getParticipants(raffle.id);
        
        raffleCards.push(`
            <div class="raffle-item">
                <div class="raffle-info">
                    <span class="raffle-status ${isActive ? 'active' : 'ended'}">
                        ${isActive ? '🟢 Live on Website' : '🔴 Ended'}
                    </span>
                    <h3>${raffle.title}</h3>
                    <p style="color: #6B7280; margin-bottom: 0.75rem;">${raffle.description}</p>
                    <div class="raffle-meta">
                        <div class="raffle-meta-item">
                            <strong>Prize:</strong> ${raffle.prizePool} ETH
                        </div>
                        <div class="raffle-meta-item">
                            <strong>Entry Fee:</strong> ${raffle.entryFee} ETH
                        </div>
                        <div class="raffle-meta-item">
                            <strong>Participants:</strong> ${participants.length}/${raffle.totalSpots}
                        </div>
                        <div class="raffle-meta-item">
                            <strong>Created:</strong> ${new Date(raffle.createdAt).toLocaleDateString()}
                        </div>
                        <div class="raffle-meta-item">
                            <strong>Ends:</strong> ${new Date(raffle.endTime).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div class="raffle-actions">
                    <button class="admin-button" onclick="viewRaffleDetails('${raffle.id}')">
                        👁️ View Details
                    </button>
                    ${isActive ? `
                        <button class="admin-button" onclick="editRaffle('${raffle.id}')" style="background: #F59E0B;">
                            ✏️ Edit
                        </button>
                    ` : ''}
                    <button class="admin-button danger" onclick="deleteRaffle('${raffle.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `);
    }
    
    raffleList.innerHTML = raffleCards.join('');
}

async function viewRaffleDetails(raffleId) {
    const raffle = adminState.raffles.find(r => r.id === raffleId);
    if (!raffle) return;
    
    const participants = await raffleAPI.getParticipants(raffleId);
    const transactions = await raffleAPI.getTransactions(raffleId);
    
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    
    alert(`
📊 Raffle Details

Title: ${raffle.title}
Prize Pool: ${raffle.prizePool} ETH
Entry Fee: ${raffle.entryFee} ETH

Participants: ${participants.length}
Total Revenue: ${totalRevenue.toFixed(4)} ETH
Spots Filled: ${participants.length}/${raffle.totalSpots}

Status: ${Date.now() < raffle.endTime ? 'Active' : 'Ended'}
Ends: ${new Date(raffle.endTime).toLocaleString()}

Wallet: ${raffle.walletAddress}
    `);
}

async function deleteRaffle(raffleId) {
    if (!confirm('Are you sure you want to delete this raffle? This action cannot be undone.')) {
        return;
    }
    
    try {
        await raffleAPI.deleteRaffle(raffleId);
        
        // Remove from local state
        adminState.raffles = adminState.raffles.filter(r => r.id !== raffleId);
        
        // Reload display
        await displayRaffles();
        
        alert('✅ Raffle deleted successfully');
    } catch (error) {
        alert('❌ Error deleting raffle: ' + error.message);
    }
}

// Dashboard Functions
async function updateDashboard() {
    const stats = await raffleAPI.getStats();
    
    // Update dashboard stats
    document.getElementById('dashActiveRaffles').textContent = stats.activeRaffles;
    document.getElementById('dashTotalParticipants').textContent = stats.totalParticipants;
    document.getElementById('dashTotalRevenue').textContent = stats.totalRevenue.toFixed(4) + ' ETH';
    document.getElementById('dashPendingWinners').textContent = stats.pendingWinners;
    
    // Update pending winners table
    const unpaidWinners = await raffleAPI.getPendingWinners();
    displayPendingWinners(unpaidWinners);
}

function displayPendingWinners(winners) {
    const container = document.getElementById('pendingWinnersTable');
    
    if (winners.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">No pending winner payments</p>';
        return;
    }
    
    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #F3F4F6; text-align: left;">
                        <th style="padding: 0.75rem; font-weight: 600;">Raffle</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Winner Address</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Prize</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Entry #</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Drawn At</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${winners.map(winner => `
                        <tr style="border-bottom: 1px solid #E5E7EB;">
                            <td style="padding: 0.75rem;">${winner.raffleTitle}</td>
                            <td style="padding: 0.75rem; font-family: monospace; font-size: 0.875rem;">
                                ${winner.winnerAddress.slice(0, 6)}...${winner.winnerAddress.slice(-4)}
                                <button onclick="copyToClipboard('${winner.winnerAddress}')" style="margin-left: 0.5rem; padding: 0.25rem 0.5rem; background: #E5E7EB; border: none; border-radius: 4px; cursor: pointer;">📋</button>
                            </td>
                            <td style="padding: 0.75rem; font-weight: 600; color: #10B981;">${winner.prizeAmount} ETH</td>
                            <td style="padding: 0.75rem;">#${winner.participantNumber} of ${winner.totalParticipants}</td>
                            <td style="padding: 0.75rem; font-size: 0.875rem;">${new Date(winner.drawnAt).toLocaleString()}</td>
                            <td style="padding: 0.75rem;">
                                <button onclick="markWinnerPaid('${winner.raffleId}')" class="admin-button success" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                                    ✅ Mark Paid
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

async function updateLiveActivity() {
    const allParticipants = await raffleAPI.getAllParticipants();
    const activities = [];
    
    // Collect all recent activities (last 10)
    allParticipants.forEach(p => {
        activities.push({
            type: 'entry',
            raffleTitle: p.raffleTitle || 'Unknown Raffle',
            address: p.address,
            timestamp: p.timestamp,
            avatar: p.avatar
        });
    });
    
    // Sort by timestamp (newest first) and take last 10
    activities.sort((a, b) => b.timestamp - a.timestamp);
    const recentActivities = activities.slice(0, 10);
    
    const feedContainer = document.getElementById('liveActivityFeed');
    
    if (recentActivities.length === 0) {
        feedContainer.innerHTML = '<p style="text-align: center; color: #6B7280;">No recent activity</p>';
        return;
    }
    
    feedContainer.innerHTML = recentActivities.map(activity => `
        <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem;">
            <span style="font-size: 1.5rem;">${activity.avatar}</span>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #111827; font-size: 0.875rem;">
                    ${activity.address.slice(0, 6)}...${activity.address.slice(-4)} entered
                </div>
                <div style="font-size: 0.75rem; color: #6B7280;">
                    ${activity.raffleTitle} • ${getTimeAgo(activity.timestamp)}
                </div>
            </div>
            <span style="color: #10B981; font-weight: 600;">🎫</span>
        </div>
    `).join('');
}

async function displayAllParticipants() {
    const allParticipants = await raffleAPI.getAllParticipants();
    
    // Sort by timestamp (newest first)
    allParticipants.sort((a, b) => b.timestamp - a.timestamp);
    
    const container = document.getElementById('participantsTable');
    
    if (allParticipants.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">No participants yet</p>';
        return;
    }
    
    container.innerHTML = `
        <div style="margin-bottom: 1rem; padding: 1rem; background: #EFF6FF; border-radius: 8px;">
            <strong>Total Participants:</strong> ${allParticipants.length}
        </div>
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #F3F4F6; text-align: left;">
                        <th style="padding: 0.75rem; font-weight: 600;">Avatar</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Wallet Address</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Entry #</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Raffle</th>
                        <th style="padding: 0.75rem; font-weight: 600;">Timestamp</th>
                        <th style="padding: 0.75rem; font-weight: 600;">TX Hash</th>
                    </tr>
                </thead>
                <tbody>
                    ${allParticipants.map(p => `
                        <tr style="border-bottom: 1px solid #E5E7EB;">
                            <td style="padding: 0.75rem; font-size: 1.5rem;">${p.avatar}</td>
                            <td style="padding: 0.75rem; font-family: monospace; font-size: 0.875rem;">
                                ${p.address}
                                <button onclick="copyToClipboard('${p.address}')" style="margin-left: 0.5rem; padding: 0.25rem 0.5rem; background: #E5E7EB; border: none; border-radius: 4px; cursor: pointer;">📋</button>
                            </td>
                            <td style="padding: 0.75rem; font-weight: 600; color: #8B5CF6;">#${p.entryNumber} of ${p.totalEntries}</td>
                            <td style="padding: 0.75rem; font-size: 0.875rem;">${p.raffleTitle}</td>
                            <td style="padding: 0.75rem; font-size: 0.875rem;">${new Date(p.timestamp).toLocaleString()}</td>
                            <td style="padding: 0.75rem; font-family: monospace; font-size: 0.75rem;">
                                ${p.txHash ? p.txHash.slice(0, 10) + '...' : 'N/A'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Add search functionality
    document.getElementById('participantSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = container.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const address = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (address.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

async function markWinnerPaid(raffleId) {
    if (!confirm('Confirm that you have sent the prize to the winner?')) {
        return;
    }
    
    try {
        await raffleAPI.markWinnerPaid(raffleId);
        await updateDashboard();
        alert('✅ Winner payment marked as complete!');
    } catch (error) {
        alert('❌ Error marking winner as paid: ' + error.message);
    }
}

function editRaffle(raffleId) {
    const raffle = adminState.raffles.find(r => r.id === raffleId);
    if (!raffle) return;
    
    // Switch to create tab
    switchTab('create');
    
    // Fill form with existing data
    document.getElementById('raffleTitle').value = raffle.title;
    document.getElementById('raffleDescription').value = raffle.description;
    document.getElementById('walletAddress').value = raffle.walletAddress;
    document.getElementById('prizePool').value = raffle.prizePool;
    document.getElementById('entryFee').value = raffle.entryFee;
    document.getElementById('totalSpots').value = raffle.totalSpots;
    document.getElementById('maxPerWallet').value = raffle.maxPerWallet;
    
    // Calculate remaining days
    const remainingDays = Math.ceil((raffle.endTime - Date.now()) / (24 * 60 * 60 * 1000));
    document.getElementById('duration').value = Math.max(1, remainingDays);
    
    // Change form submit behavior
    const form = document.getElementById('createRaffleForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = '💾 Update Raffle';
    submitBtn.style.background = '#F59E0B';
    
    // Store raffle ID for update
    form.dataset.editingId = raffleId;
    
    // Show info message
    const successMsg = document.getElementById('createSuccessMessage');
    successMsg.innerHTML = '✏️ Editing raffle: ' + raffle.title;
    successMsg.style.background = '#FEF3C7';
    successMsg.style.borderColor = '#F59E0B';
    successMsg.style.color = '#92400E';
    successMsg.classList.add('show');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Export data for GitHub sync
async function exportDataForGitHub() {
    try {
        await raffleAPI.exportForGitHub();
    } catch (error) {
        alert('❌ Error exporting data: ' + error.message);
    }
}

// Make functions globally accessible
window.viewRaffleDetails = viewRaffleDetails;
window.deleteRaffle = deleteRaffle;
window.editRaffle = editRaffle;
window.copyToClipboard = copyToClipboard;
window.markWinnerPaid = markWinnerPaid;
window.exportDataForGitHub = exportDataForGitHub;
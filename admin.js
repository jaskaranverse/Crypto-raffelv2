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
    adminState.isAuthenticated = true;
    adminState.adminAddress = address;
    
    // Hide auth overlay and show admin panel
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    // Update UI with admin address
    document.getElementById('adminAddressDisplay').value = address;
    document.getElementById('walletAddress').value = address;
    
    console.log('Admin authenticated:', address);
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

function createRaffle(e) {
    e.preventDefault();
    
    // Get form values
    const raffle = {
        id: 'raffle_' + Date.now(),
        title: document.getElementById('raffleTitle').value,
        description: document.getElementById('raffleDescription').value,
        walletAddress: document.getElementById('walletAddress').value,
        prizePool: parseFloat(document.getElementById('prizePool').value),
        entryFee: parseFloat(document.getElementById('entryFee').value),
        totalSpots: parseInt(document.getElementById('totalSpots').value),
        maxPerWallet: parseInt(document.getElementById('maxPerWallet').value),
        duration: parseInt(document.getElementById('duration').value),
        createdAt: Date.now(),
        endTime: Date.now() + (parseInt(document.getElementById('duration').value) * 24 * 60 * 60 * 1000),
        status: 'active',
        participants: [],
        transactions: []
    };
    
    // Validate wallet address
    if (!raffle.walletAddress.startsWith('0x') || raffle.walletAddress.length !== 42) {
        alert('❌ Invalid wallet address format');
        return;
    }
    
    // Save raffle
    saveRaffle(raffle);
    
    // Show success message with link to main site
    const successMsg = document.getElementById('createSuccessMessage');
    successMsg.innerHTML = '✅ Raffle created successfully! <a href="index.html" style="color: #2563EB; text-decoration: underline; margin-left: 0.5rem;">View on main site →</a>';
    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
        successMsg.innerHTML = '✅ Raffle created successfully!';
    }, 8000);
    
    // Reset form
    document.getElementById('createRaffleForm').reset();
    document.getElementById('walletAddress').value = adminState.adminAddress;
    
    // Reload raffle list
    loadRaffles();
    
    console.log('Raffle created:', raffle);
    console.log('🎰 Raffle is now live on the main website!');
}

function saveRaffle(raffle) {
    // Load existing raffles
    const raffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    
    // Add new raffle
    raffles.push(raffle);
    
    // Save back to localStorage
    localStorage.setItem('allRaffles', JSON.stringify(raffles));
    
    console.log('Raffle saved:', raffle.id);
}

function loadRaffles() {
    adminState.raffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    displayRaffles();
}

function displayRaffles() {
    const raffleList = document.getElementById('raffleList');
    
    if (adminState.raffles.length === 0) {
        raffleList.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">No raffles created yet</p>';
        return;
    }
    
    // Sort raffles by creation date (newest first)
    const sortedRaffles = [...adminState.raffles].sort((a, b) => b.createdAt - a.createdAt);
    
    raffleList.innerHTML = sortedRaffles.map(raffle => {
        const isActive = Date.now() < raffle.endTime;
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
        
        return `
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
                    ${!isActive ? `
                        <button class="admin-button danger" onclick="deleteRaffle('${raffle.id}')">
                            🗑️ Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function viewRaffleDetails(raffleId) {
    const raffle = adminState.raffles.find(r => r.id === raffleId);
    if (!raffle) return;
    
    const participants = JSON.parse(localStorage.getItem(`raffle_${raffleId}_participants`) || '[]');
    const transactions = JSON.parse(localStorage.getItem(`raffle_${raffleId}_transactions`) || '[]');
    
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

function deleteRaffle(raffleId) {
    if (!confirm('Are you sure you want to delete this raffle? This action cannot be undone.')) {
        return;
    }
    
    // Remove from raffles array
    adminState.raffles = adminState.raffles.filter(r => r.id !== raffleId);
    
    // Save updated list
    localStorage.setItem('allRaffles', JSON.stringify(adminState.raffles));
    
    // Clean up raffle-specific data
    localStorage.removeItem(`raffle_${raffleId}_participants`);
    localStorage.removeItem(`raffle_${raffleId}_transactions`);
    
    // Reload display
    displayRaffles();
    
    alert('✅ Raffle deleted successfully');
}

// Dashboard Functions
function updateDashboard() {
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    const now = Date.now();
    const activeRaffles = allRaffles.filter(r => r.endTime > now);
    
    // Count total participants
    let totalParticipants = 0;
    let totalRevenue = 0;
    
    allRaffles.forEach(raffle => {
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
        const transactions = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_transactions`) || '[]');
        
        totalParticipants += participants.length;
        totalRevenue += transactions.reduce((sum, tx) => sum + tx.amount, 0);
    });
    
    // Count pending winners
    const pendingWinners = JSON.parse(localStorage.getItem('pendingWinnerPayments') || '[]');
    const unpaidWinners = pendingWinners.filter(w => w.paymentStatus === 'pending');
    
    // Update dashboard stats
    document.getElementById('dashActiveRaffles').textContent = activeRaffles.length;
    document.getElementById('dashTotalParticipants').textContent = totalParticipants;
    document.getElementById('dashTotalRevenue').textContent = totalRevenue.toFixed(4) + ' ETH';
    document.getElementById('dashPendingWinners').textContent = unpaidWinners.length;
    
    // Update pending winners table
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

function updateLiveActivity() {
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    const activities = [];
    
    // Collect all recent activities (last 10)
    allRaffles.forEach(raffle => {
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
        participants.forEach(p => {
            activities.push({
                type: 'entry',
                raffleTitle: raffle.title,
                address: p.address,
                timestamp: p.timestamp,
                avatar: p.avatar
            });
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

function displayAllParticipants() {
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    const allParticipants = [];
    
    // Collect all participants from all raffles
    allRaffles.forEach(raffle => {
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
        participants.forEach((p, index) => {
            allParticipants.push({
                ...p,
                raffleTitle: raffle.title,
                raffleId: raffle.id,
                entryNumber: index + 1,
                totalEntries: participants.length
            });
        });
    });
    
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

function markWinnerPaid(raffleId) {
    if (!confirm('Confirm that you have sent the prize to the winner?')) {
        return;
    }
    
    const winners = JSON.parse(localStorage.getItem('pendingWinnerPayments') || '[]');
    const updatedWinners = winners.map(w => {
        if (w.raffleId === raffleId) {
            return { ...w, paymentStatus: 'paid', paidAt: Date.now() };
        }
        return w;
    });
    
    localStorage.setItem('pendingWinnerPayments', JSON.stringify(updatedWinners));
    updateDashboard();
    alert('✅ Winner payment marked as complete!');
}

// Make functions globally accessible
window.viewRaffleDetails = viewRaffleDetails;
window.deleteRaffle = deleteRaffle;
window.copyToClipboard = copyToClipboard;
window.markWinnerPaid = markWinnerPaid;
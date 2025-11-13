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
    
    // Reload raffle list if switching to manage tab
    if (tabName === 'manage') {
        displayRaffles();
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

// Make functions globally accessible
window.viewRaffleDetails = viewRaffleDetails;
window.deleteRaffle = deleteRaffle;
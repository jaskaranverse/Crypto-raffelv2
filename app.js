// App State
let appState = {
    isConnected: false,
    walletAddress: null,
    activeRaffles: [],
    provider: null,
    signer: null,
    userEntryNumbers: {} // Store user's entry numbers per raffle
};

// Emoji avatars for participants
const avatars = ['🎭', '🎨', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻', '🎬', '🎮', '🎰', '🎳'];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadAllActiveRaffles();
    checkMetaMaskConnection();
    checkForWinners(); // Check if user won any raffles
    
    // Check for updates periodically
    setInterval(checkForRaffleUpdates, 5000);
    setInterval(updateParticipantLists, 3000); // Update participant lists
    
    // Check for raffle end and auto-draw winner
    setInterval(checkAndDrawWinner, 10000);
});

function initializeApp() {
    // Connect wallet button
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
    }
}

async function checkMetaMaskConnection() {
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask not installed');
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectExistingWallet(accounts[0]);
        }
    } catch (error) {
        console.error('Error checking connection:', error);
    }
}

async function connectWallet() {
    // Detect if user is on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (typeof window.ethereum === 'undefined') {
        if (isMobile) {
            // On mobile, open MetaMask app with deep link
            showGlobalStatus('📱 Opening MetaMask app...', 'success');
            const currentUrl = window.location.href;
            window.location.href = `https://metamask.app.link/dapp/${currentUrl.replace(/^https?:\/\//, '')}`;
            return;
        } else {
            // On desktop, prompt to install
            showGlobalStatus('❌ MetaMask is not installed! Please install MetaMask extension.', 'error');
            window.open('https://metamask.io/download/', '_blank');
            return;
        }
    }
    
    const button = document.getElementById('connectWallet');
    const walletText = document.getElementById('walletText');
    
    if (!appState.isConnected) {
        try {
            button.disabled = true;
            walletText.textContent = 'Connecting...';
            showGlobalStatus('🦊 Opening MetaMask... Please select your account!', 'success');
            
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });
            
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            button.disabled = false;
            
            if (accounts.length === 0) {
                showGlobalStatus('❌ No accounts found. Please unlock MetaMask.', 'error');
                walletText.textContent = 'Connect Wallet';
                return;
            }
            
            const account = accounts[0];
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const networkName = getNetworkName(chainId);
            
            if (typeof ethers !== 'undefined') {
                try {
                    appState.provider = new ethers.providers.Web3Provider(window.ethereum);
                    appState.signer = appState.provider.getSigner();
                } catch (error) {
                    console.log('Ethers.js not available');
                }
            }
            
            appState.isConnected = true;
            appState.walletAddress = account;
            
            button.classList.add('connected');
            walletText.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
            
            showGlobalStatus(`✅ Connected to ${networkName}!`, 'success');
            
            loadAllActiveRaffles();
            checkForWinners();
            
        } catch (error) {
            console.error('Error connecting wallet:', error);
            button.disabled = false;
            walletText.textContent = 'Connect Wallet';
            
            if (error.code === 4001) {
                showGlobalStatus('❌ Connection rejected.', 'error');
            } else {
                showGlobalStatus(`❌ Error: ${error.message}`, 'error');
            }
        }
    } else {
        appState.isConnected = false;
        appState.walletAddress = null;
        
        button.classList.remove('connected');
        walletText.textContent = 'Connect Wallet';
        
        showGlobalStatus('👋 Wallet disconnected', 'success');
        loadAllActiveRaffles();
    }
}

async function connectExistingWallet(account) {
    const button = document.getElementById('connectWallet');
    const walletText = document.getElementById('walletText');
    
    appState.isConnected = true;
    appState.walletAddress = account;
    
    if (typeof ethers !== 'undefined') {
        try {
            appState.provider = new ethers.providers.Web3Provider(window.ethereum);
            appState.signer = appState.provider.getSigner();
        } catch (error) {
            console.log('Ethers.js not available');
        }
    }
    
    button.classList.add('connected');
    walletText.textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
    
    console.log('Already connected:', account);
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        appState.isConnected = false;
        appState.walletAddress = null;
        
        const button = document.getElementById('connectWallet');
        const walletText = document.getElementById('walletText');
        
        button.classList.remove('connected');
        walletText.textContent = 'Connect Wallet';
        
        showGlobalStatus('👋 Wallet disconnected', 'success');
    } else if (accounts[0] !== appState.walletAddress) {
        connectExistingWallet(accounts[0]);
        showGlobalStatus(`🔄 Switched to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`, 'success');
    }
    loadAllActiveRaffles();
    checkForWinners();
}

function getNetworkName(chainId) {
    const networks = {
        '0x1': 'Ethereum Mainnet',
        '0x5': 'Goerli Testnet',
        '0xaa36a7': 'Sepolia Testnet',
        '0x89': 'Polygon Mainnet',
        '0x13881': 'Mumbai Testnet',
        '0xa': 'Optimism',
        '0xa4b1': 'Arbitrum One'
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
}

// Check if user won any raffles
async function checkForWinners() {
    if (!appState.walletAddress) return;
    
    const allRaffles = await raffleAPI.getAllRaffles();
    const completedRaffles = allRaffles.filter(r => r.status === 'completed' && r.winner);
    
    for (const raffle of completedRaffles) {
        if (raffle.winner.toLowerCase() === appState.walletAddress.toLowerCase()) {
            showWinnerBanner(raffle);
            break; // Show only one winner banner at a time
        }
    }
}

function showWinnerBanner(raffle) {
    const container = document.getElementById('rafflesContainer');
    const existingBanner = document.getElementById('winnerBanner');
    
    if (existingBanner) return; // Already showing
    
    const banner = document.createElement('div');
    banner.id = 'winnerBanner';
    banner.className = 'winner-banner';
    banner.innerHTML = `
        <h2>🎉 CONGRATULATIONS! YOU WON! 🎉</h2>
        <p style="font-size: 1.2rem; margin: 1rem 0;">You won the raffle: <strong>${raffle.title}</strong></p>
        <div class="winner-address">Prize: ${raffle.prizePool} ETH</div>
        <p style="margin: 1rem 0; opacity: 0.9;">Your winning wallet: ${appState.walletAddress}</p>
        <button class="claim-button" onclick="claimReward('${raffle.id}')">
            💰 Claim Your Reward
        </button>
        <p style="font-size: 0.875rem; margin-top: 1rem; opacity: 0.8;">
            Click the button above to contact admin for prize distribution
        </p>
    `;
    
    container.insertBefore(banner, container.firstChild);
}

async function claimReward(raffleId) {
    const raffle = await raffleAPI.getRaffle(raffleId);
    if (!raffle) return;
    
    alert(`🎉 Congratulations on winning ${raffle.prizePool} ETH!\n\n` +
          `Your wallet: ${appState.walletAddress}\n\n` +
          `The admin will send your prize shortly. Please check your wallet for the incoming transaction.\n\n` +
          `If you don't receive it within 24 hours, please contact support.`);
}

async function loadAllActiveRaffles() {
    const allRaffles = await raffleAPI.getActiveRaffles();
    
    appState.activeRaffles = allRaffles;
    
    document.getElementById('headerActiveRaffles').textContent = appState.activeRaffles.length;
    
    let totalParticipants = 0;
    for (const raffle of appState.activeRaffles) {
        const participants = await raffleAPI.getParticipants(raffle.id);
        totalParticipants += participants.length;
    }
    document.getElementById('headerTotalParticipants').textContent = totalParticipants;
    
    displayAllRaffles();
}

async function displayAllRaffles() {
    const rafflesList = document.getElementById('rafflesList');
    
    if (appState.activeRaffles.length === 0) {
        rafflesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎰</div>
                <div class="empty-state-text">No active raffles at the moment. Check back soon!</div>
            </div>
        `;
        return;
    }
    
    const sortedRaffles = [...appState.activeRaffles].sort((a, b) => a.endTime - b.endTime);
    
    const cards = [];
    for (const raffle of sortedRaffles) {
        const card = await createRaffleCard(raffle);
        cards.push(card);
    }
    
    rafflesList.innerHTML = cards.join('');
    
    sortedRaffles.forEach(raffle => {
        startCountdown(raffle.id, raffle.endTime);
    });
}

async function createRaffleCard(raffle) {
    const participants = await raffleAPI.getParticipants(raffle.id);
    const userEntries = appState.walletAddress
        ? participants.filter(p => p.address.toLowerCase() === appState.walletAddress.toLowerCase())
        : [];
    
    const filledSpots = participants.length;
    const percentage = ((filledSpots / raffle.totalSpots) * 100).toFixed(1);
    const winChance = filledSpots > 0 ? ((userEntries.length / filledSpots) * 100).toFixed(2) : '0.00';
    
    // Get user's entry number if they entered
    const userEntryNumber = userEntries.length > 0 ? 
        participants.findIndex(p => p.address.toLowerCase() === appState.walletAddress.toLowerCase()) + 1 : null;
    
    return `
        <div class="raffle-card">
            <!-- Raffle Header -->
            <div class="raffle-header">
                <div class="raffle-icon">🎰</div>
                <div class="raffle-title-section">
                    <h2>${raffle.title}</h2>
                    <p>${raffle.description}</p>
                </div>
            </div>
            
            <!-- Countdown Timer -->
            <div class="countdown-timer">
                <div class="countdown-label">⏰ Draw Countdown</div>
                <div class="countdown-value" id="countdown-${raffle.id}">Loading...</div>
            </div>
            
            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-box-label">Prize Pool</div>
                    <div class="stat-box-value success">${raffle.prizePool} ETH</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Entry Fee</div>
                    <div class="stat-box-value primary">${raffle.entryFee} ETH</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Participants</div>
                    <div class="stat-box-value">${filledSpots} / ${raffle.totalSpots}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Your Entries</div>
                    <div class="stat-box-value warning">${userEntries.length}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Win Chance</div>
                    <div class="stat-box-value primary">${winChance}%</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-label">Max Per Wallet</div>
                    <div class="stat-box-value">${raffle.maxPerWallet}</div>
                </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="progress-section">
                <div class="progress-header">
                    <span class="progress-label">Spots Filled</span>
                    <span class="progress-percentage">${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">${filledSpots} / ${raffle.totalSpots} spots filled</div>
            </div>
            
            <!-- Entry Confirmation (if user entered) -->
            ${userEntries.length > 0 ? `
                <div class="entry-confirmation">
                    <div class="entry-confirmation-title">✅ You're Entered!</div>
                    <div class="entry-number">#${userEntryNumber}</div>
                    <div class="entry-details">
                        Your entry number • ${userEntries.length} ${userEntries.length === 1 ? 'entry' : 'entries'} total
                    </div>
                </div>
            ` : ''}
            
            <!-- Entry Button -->
            <button 
                class="entry-button" 
                onclick="enterRaffle('${raffle.id}')"
                ${!appState.isConnected ? 'disabled' : ''}
            >
                ${appState.isConnected ? '🎫 Enter Raffle Now' : '🔒 Connect Wallet First'}
            </button>
            
            <!-- Live Participants List -->
            <div class="participants-section">
                <div class="participants-header">
                    <div class="participants-title">📜 Live Participants</div>
                    <div class="participants-count">${filledSpots} ${filledSpots === 1 ? 'entry' : 'entries'}</div>
                </div>
                <div class="participants-list" id="participants-list-${raffle.id}">
                    ${participants.length === 0 ? 
                        '<div class="empty-state"><div class="empty-state-text">No entries yet. Be the first!</div></div>' :
                        participants.map((p, index) => `
                            <div class="participant-item">
                                <div class="participant-avatar">${p.avatar}</div>
                                <div class="participant-info">
                                    <div class="participant-address">${p.address.slice(0, 6)}...${p.address.slice(-4)}</div>
                                    <div class="participant-time">${getTimeAgo(p.timestamp)}</div>
                                </div>
                                <div class="participant-number">#${index + 1}</div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        </div>
    `;
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

function startCountdown(raffleId, endTime) {
    const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = endTime - now;
        
        const countdownEl = document.getElementById(`countdown-${raffleId}`);
        if (!countdownEl) return;
        
        if (timeLeft <= 0) {
            countdownEl.textContent = '🏆 Drawing Winner...';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

async function updateParticipantLists() {
    for (const raffle of appState.activeRaffles) {
        const listEl = document.getElementById(`participants-list-${raffle.id}`);
        if (!listEl) continue;
        
        const participants = await raffleAPI.getParticipants(raffle.id);
        
        if (participants.length === 0) {
            listEl.innerHTML = '<div class="empty-state"><div class="empty-state-text">No entries yet. Be the first!</div></div>';
        } else {
            listEl.innerHTML = participants.map((p, index) => `
                <div class="participant-item">
                    <div class="participant-avatar">${p.avatar}</div>
                    <div class="participant-info">
                        <div class="participant-address">${p.address.slice(0, 6)}...${p.address.slice(-4)}</div>
                        <div class="participant-time">${getTimeAgo(p.timestamp)}</div>
                    </div>
                    <div class="participant-number">#${index + 1}</div>
                </div>
            `).join('');
        }
    }
}

async function enterRaffle(raffleId) {
    if (!appState.isConnected) {
        showGlobalStatus('❌ Please connect your wallet first!', 'error');
        return;
    }
    
    const raffle = appState.activeRaffles.find(r => r.id === raffleId);
    if (!raffle) {
        showGlobalStatus('❌ Raffle not found!', 'error');
        return;
    }
    
    try {
        showGlobalStatus('💳 Preparing payment...', 'success');
        
        const amountInWei = '0x' + (raffle.entryFee * 1e18).toString(16);
        
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [appState.walletAddress, 'latest']
        });
        
        const balanceInEth = parseInt(balance, 16) / 1e18;
        
        if (balanceInEth < raffle.entryFee) {
            showGlobalStatus(`❌ Insufficient balance! Need ${raffle.entryFee} ETH`, 'error');
            return;
        }
        
        showGlobalStatus('💳 Please approve the transaction in MetaMask...', 'success');
        
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: raffle.walletAddress,
                from: appState.walletAddress,
                value: amountInWei,
            }],
        });
        
        showGlobalStatus('⏳ Transaction submitted. Waiting for confirmation...', 'success');
        
        let confirmed = false;
        let attempts = 0;
        while (!confirmed && attempts < 30) {
            try {
                const txReceipt = await window.ethereum.request({
                    method: 'eth_getTransactionReceipt',
                    params: [txHash],
                });
                
                if (txReceipt && txReceipt.blockNumber) {
                    confirmed = true;
                }
            } catch (e) {}
            
            if (!confirmed) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                attempts++;
            }
        }
        
        const newParticipant = {
            address: appState.walletAddress,
            entries: 1,
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            timestamp: Date.now(),
            txHash: txHash
        };
        
        await raffleAPI.addParticipant(raffleId, newParticipant);
        
        const transaction = {
            from: appState.walletAddress,
            amount: raffle.entryFee,
            timestamp: Date.now(),
            txHash: txHash
        };
        
        await raffleAPI.addTransaction(raffleId, transaction);
        
        // Get entry number
        const participants = await raffleAPI.getParticipants(raffleId);
        const entryNumber = participants.length;
        
        showGlobalStatus(`🎉 Success! You're entry #${entryNumber} in ${raffle.title}!`, 'success');
        
        loadAllActiveRaffles();
        
    } catch (error) {
        console.error('Error entering raffle:', error);
        
        if (error.code === 4001) {
            showGlobalStatus('❌ Transaction rejected', 'error');
        } else {
            showGlobalStatus(`❌ Error: ${error.message}`, 'error');
        }
    }
}

function showGlobalStatus(message, type) {
    const statusEl = document.getElementById('globalStatusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type} show`;
    
    setTimeout(() => {
        statusEl.classList.remove('show');
    }, 5000);
}

async function checkForRaffleUpdates() {
    const activeRaffles = await raffleAPI.getActiveRaffles();
    
    if (activeRaffles.length !== appState.activeRaffles.length) {
        console.log('Raffle count changed, reloading...');
        loadAllActiveRaffles();
    }
}

async function checkAndDrawWinner() {
    const allRaffles = await raffleAPI.getAllRaffles();
    const now = Date.now();
    
    for (const raffle of allRaffles) {
        if (raffle.endTime <= now && raffle.status === 'active' && raffle.autoDrawEnabled) {
            const participants = await raffleAPI.getParticipants(raffle.id);
            
            if (participants.length >= 2) {
                console.log(`Drawing winner for raffle: ${raffle.id}`);
                await drawWinnerAndPay(raffle, participants);
            } else {
                console.log(`Not enough participants for raffle: ${raffle.id}`);
                await raffleAPI.updateRaffle(raffle.id, {
                    status: 'completed',
                    winner: null,
                    completedAt: now
                });
            }
        }
    }
}

async function drawWinnerAndPay(raffle, participants) {
    try {
        const randomIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[randomIndex];
        
        console.log(`Winner selected: ${winner.address}`);
        
        await raffleAPI.updateRaffle(raffle.id, {
            status: 'completed',
            winner: winner.address,
            winnerAvatar: winner.avatar,
            completedAt: Date.now(),
            winnerDrawnAt: Date.now()
        });
        
        showGlobalStatus(`🎉 Winner Selected! ${winner.address.slice(0, 6)}...${winner.address.slice(-4)} won ${raffle.prizePool} ETH!`, 'success');
        
        const winnerInfo = {
            raffleId: raffle.id,
            raffleTitle: raffle.title,
            winnerAddress: winner.address,
            prizeAmount: raffle.prizePool,
            drawnAt: Date.now(),
            paymentStatus: 'pending',
            participantNumber: randomIndex + 1,
            totalParticipants: participants.length
        };
        
        await raffleAPI.addWinner(winnerInfo);
        
        loadAllActiveRaffles();
        checkForWinners();
        
    } catch (error) {
        console.error('Error drawing winner:', error);
    }
}

// Make functions globally accessible
window.enterRaffle = enterRaffle;
window.claimReward = claimReward;
window.drawWinnerAndPay = drawWinnerAndPay;
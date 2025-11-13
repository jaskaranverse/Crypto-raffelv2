// App State
let appState = {
    isConnected: false,
    walletAddress: null,
    activeRaffles: [],
    provider: null,
    signer: null
};

// Emoji avatars for participants
const avatars = ['🎭', '🎨', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻', '🎬', '🎮', '🎰', '🎳'];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadAllActiveRaffles();
    checkMetaMaskConnection();
    
    // Check for updates periodically
    setInterval(checkForRaffleUpdates, 5000);
    
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
    if (typeof window.ethereum === 'undefined') {
        showGlobalStatus('❌ MetaMask is not installed! Please install MetaMask extension.', 'error');
        window.open('https://metamask.io/download/', '_blank');
        return;
    }
    
    const button = document.getElementById('connectWallet');
    const walletText = document.getElementById('walletText');
    
    if (!appState.isConnected) {
        try {
            button.disabled = true;
            walletText.textContent = 'Connecting...';
            showGlobalStatus('🦊 Opening MetaMask... Please select your account!', 'success');
            
            // Request account access with wallet_requestPermissions
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
            
            // Initialize Web3 provider
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
            
            // Reload raffles to update user-specific data
            loadAllActiveRaffles();
            
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
        // Disconnect
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

function loadAllActiveRaffles() {
    // Load all raffles from localStorage
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    
    // Filter only active raffles (not expired)
    const now = Date.now();
    appState.activeRaffles = allRaffles.filter(raffle => raffle.endTime > now);
    
    // Update header stats
    document.getElementById('headerActiveRaffles').textContent = appState.activeRaffles.length;
    
    // Calculate total participants across all raffles
    let totalParticipants = 0;
    appState.activeRaffles.forEach(raffle => {
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
        totalParticipants += participants.length;
    });
    document.getElementById('headerTotalParticipants').textContent = totalParticipants;
    
    // Display raffles
    displayAllRaffles();
}

function displayAllRaffles() {
    const rafflesList = document.getElementById('rafflesList');
    
    if (appState.activeRaffles.length === 0) {
        rafflesList.innerHTML = `
            <p style="text-align: center; color: #6B7280; padding: 3rem; font-size: 1.125rem;">
                No active raffles at the moment. Check back soon!
            </p>
        `;
        return;
    }
    
    // Sort raffles by end time (ending soonest first)
    const sortedRaffles = [...appState.activeRaffles].sort((a, b) => a.endTime - b.endTime);
    
    rafflesList.innerHTML = sortedRaffles.map(raffle => createRaffleCard(raffle)).join('');
    
    // Start countdowns for all raffles
    sortedRaffles.forEach(raffle => {
        startCountdown(raffle.id, raffle.endTime);
    });
}

function createRaffleCard(raffle) {
    // Load raffle-specific data
    const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
    const userEntries = appState.walletAddress 
        ? participants.filter(p => p.address.toLowerCase() === appState.walletAddress.toLowerCase()).length 
        : 0;
    
    const filledSpots = participants.length;
    const percentage = ((filledSpots / raffle.totalSpots) * 100).toFixed(1);
    const winChance = filledSpots > 0 ? ((userEntries / filledSpots) * 100).toFixed(2) : '0.00';
    
    return `
        <div class="raffle-card glass-card" style="margin-bottom: 2rem; padding: 2rem; border-radius: 16px; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Left Side - Raffle Info -->
                <div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                            🎰
                        </div>
                        <div>
                            <h2 style="font-size: 1.75rem; font-weight: 800; color: #111827; margin: 0;">${raffle.title}</h2>
                            <p style="color: #6B7280; margin: 0.25rem 0 0 0;">${raffle.description}</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem;">
                        <div style="background: #F3F4F6; padding: 1rem; border-radius: 8px;">
                            <div style="font-size: 0.875rem; color: #6B7280;">Prize Pool</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #10B981;">${raffle.prizePool} ETH</div>
                        </div>
                        <div style="background: #F3F4F6; padding: 1rem; border-radius: 8px;">
                            <div style="font-size: 0.875rem; color: #6B7280;">Entry Fee</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #3B82F6;">${raffle.entryFee} ETH</div>
                        </div>
                        <div style="background: #F3F4F6; padding: 1rem; border-radius: 8px;">
                            <div style="font-size: 0.875rem; color: #6B7280;">Participants</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #111827;">${filledSpots}</div>
                        </div>
                        <div style="background: #F3F4F6; padding: 1rem; border-radius: 8px;">
                            <div style="font-size: 0.875rem; color: #6B7280;">Your Entries</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #8B5CF6;">${userEntries}</div>
                        </div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div style="margin-top: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.875rem; color: #6B7280;">Spots Filled</span>
                            <span style="font-size: 0.875rem; font-weight: 600; color: #111827;">${percentage}%</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #10B981, #3B82F6); transition: width 0.3s;"></div>
                        </div>
                        <div style="font-size: 0.875rem; color: #6B7280; margin-top: 0.25rem;">
                            ${filledSpots} / ${raffle.totalSpots} spots
                        </div>
                    </div>
                </div>
                
                <!-- Right Side - Entry Form -->
                <div>
                    <!-- Countdown -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
                        <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.5rem;">⏰ Draw Countdown</div>
                        <div id="countdown-${raffle.id}" style="font-size: 1.75rem; font-weight: 700;">Loading...</div>
                    </div>
                    
                    <!-- Entry Details -->
                    <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                            <span style="color: #6B7280;">Max Per Wallet:</span>
                            <span style="font-weight: 600;">${raffle.maxPerWallet} entries</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                            <span style="color: #6B7280;">Your Win Chance:</span>
                            <span style="font-weight: 600; color: #8B5CF6;">${winChance}%</span>
                        </div>
                    </div>
                    
                    <!-- Entry Button -->
                    <button 
                        onclick="enterRaffle('${raffle.id}')" 
                        style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; border: none; border-radius: 8px; font-size: 1.125rem; font-weight: 700; cursor: pointer; transition: transform 0.2s;"
                        onmouseover="this.style.transform='scale(1.02)'"
                        onmouseout="this.style.transform='scale(1)'"
                        ${!appState.isConnected ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                    >
                        ${appState.isConnected ? '🎫 Enter Raffle Now' : '🔒 Connect Wallet First'}
                    </button>
                    
                    ${userEntries > 0 ? `
                        <div style="margin-top: 1rem; padding: 1rem; background: #EFF6FF; border: 1px solid #3B82F6; border-radius: 8px; text-align: center;">
                            <span style="color: #1E40AF; font-weight: 600;">✅ You have ${userEntries} ${userEntries === 1 ? 'entry' : 'entries'} in this raffle!</span>
                        </div>
                    ` : ''}
                    
                    <!-- Recent Entries -->
                    <div style="margin-top: 1.5rem;">
                        <div style="font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem;">
                            📜 Recent Entries (${Math.min(participants.length, 5)})
                        </div>
                        <div id="participants-${raffle.id}" style="max-height: 150px; overflow-y: auto;">
                            ${participants.length === 0 ? 
                                '<p style="text-align: center; color: #6B7280; padding: 1rem;">No entries yet. Be the first!</p>' :
                                participants.slice(-5).reverse().map(p => `
                                    <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background: #F9FAFB; border-radius: 6px; margin-bottom: 0.5rem;">
                                        <span style="font-size: 1.5rem;">${p.avatar}</span>
                                        <span style="font-size: 0.875rem; color: #6B7280;">${p.address.slice(0, 6)}...${p.address.slice(-4)}</span>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function startCountdown(raffleId, endTime) {
    const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = endTime - now;
        
        const countdownEl = document.getElementById(`countdown-${raffleId}`);
        if (!countdownEl) return;
        
        if (timeLeft <= 0) {
            countdownEl.textContent = '🏆 Draw Complete!';
            countdownEl.style.color = '#FCD34D';
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
        
        // Check balance
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
        
        // Wait for confirmation
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
        
        // Add participant
        const newParticipant = {
            address: appState.walletAddress,
            entries: 1,
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            timestamp: Date.now(),
            txHash: txHash
        };
        
        const participants = JSON.parse(localStorage.getItem(`raffle_${raffleId}_participants`) || '[]');
        participants.push(newParticipant);
        localStorage.setItem(`raffle_${raffleId}_participants`, JSON.stringify(participants));
        
        // Save transaction
        const transaction = {
            from: appState.walletAddress,
            amount: raffle.entryFee,
            timestamp: Date.now(),
            txHash: txHash
        };
        
        const transactions = JSON.parse(localStorage.getItem(`raffle_${raffleId}_transactions`) || '[]');
        transactions.push(transaction);
        localStorage.setItem(`raffle_${raffleId}_transactions`, JSON.stringify(transactions));
        
        showGlobalStatus(`🎉 Successfully entered ${raffle.title}!`, 'success');
        
        // Reload raffles to update UI
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
    statusEl.className = `status-message ${type}`;
    statusEl.style.display = 'block';
    
    setTimeout(() => {
        statusEl.style.display = 'none';
    }, 5000);
}

function checkForRaffleUpdates() {
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    const now = Date.now();
    const activeRaffles = allRaffles.filter(raffle => raffle.endTime > now);
    
    // Check if number of active raffles changed
    if (activeRaffles.length !== appState.activeRaffles.length) {
        console.log('Raffle count changed, reloading...');
        loadAllActiveRaffles();
    }
}

// Automatic winner selection and payment
async function checkAndDrawWinner() {
    const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
    const now = Date.now();
    
    for (const raffle of allRaffles) {
        // Check if raffle has ended and hasn't been drawn yet
        if (raffle.endTime <= now && raffle.status === 'active' && raffle.autoDrawEnabled) {
            const participants = JSON.parse(localStorage.getItem(`raffle_${raffle.id}_participants`) || '[]');
            
            // Need at least 2 participants to draw
            if (participants.length >= 2) {
                console.log(`Drawing winner for raffle: ${raffle.id}`);
                await drawWinnerAndPay(raffle, participants);
            } else {
                console.log(`Not enough participants for raffle: ${raffle.id}`);
                // Mark as completed without winner
                raffle.status = 'completed';
                raffle.winner = null;
                raffle.completedAt = now;
                
                const updatedRaffles = allRaffles.map(r => r.id === raffle.id ? raffle : r);
                localStorage.setItem('allRaffles', JSON.stringify(updatedRaffles));
            }
        }
    }
}

// Draw winner randomly and process payment
async function drawWinnerAndPay(raffle, participants) {
    try {
        // Select random winner
        const randomIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[randomIndex];
        
        console.log(`Winner selected: ${winner.address}`);
        
        // Update raffle status
        raffle.status = 'completed';
        raffle.winner = winner.address;
        raffle.winnerAvatar = winner.avatar;
        raffle.completedAt = Date.now();
        raffle.winnerDrawnAt = Date.now();
        
        // Save updated raffle
        const allRaffles = JSON.parse(localStorage.getItem('allRaffles') || '[]');
        const updatedRaffles = allRaffles.map(r => r.id === raffle.id ? raffle : r);
        localStorage.setItem('allRaffles', JSON.stringify(updatedRaffles));
        
        // Show winner announcement
        showGlobalStatus(`🎉 Winner Selected! ${winner.address.slice(0, 6)}...${winner.address.slice(-4)} won ${raffle.prizePool} ETH!`, 'success');
        
        // Note: Actual payment would require admin wallet connection
        // This is a placeholder for the payment logic
        console.log(`Payment of ${raffle.prizePool} ETH should be sent to ${winner.address}`);
        
        // Store winner info for admin to process payment
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
        
        const winners = JSON.parse(localStorage.getItem('pendingWinnerPayments') || '[]');
        winners.push(winnerInfo);
        localStorage.setItem('pendingWinnerPayments', JSON.stringify(winners));
        
        // Reload to show updated status
        loadAllActiveRaffles();
        
    } catch (error) {
        console.error('Error drawing winner:', error);
    }
}

// Make functions globally accessible
window.enterRaffle = enterRaffle;
window.drawWinnerAndPay = drawWinnerAndPay;
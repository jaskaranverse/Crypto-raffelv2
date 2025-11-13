// GitHub-based API Service (Free Database!)
// All users see the same data - stored in GitHub repository

class RaffleAPI {
    constructor() {
        // GitHub configuration - UPDATE THESE!
        this.config = {
            owner: 'jaskaranverse',  // Your GitHub username
            repo: 'Crypto-raffelv2',  // Your repository name
            branch: 'main',
            dataPath: 'data/raffles.json'
        };
        
        // GitHub API endpoint
        this.apiBase = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}`;
        
        // Cache for faster loading
        this.cache = {
            data: null,
            lastFetch: 0,
            cacheDuration: 5000 // 5 seconds
        };
    }

    // Fetch data from GitHub
    async fetchData() {
        // Use cache if recent
        const now = Date.now();
        if (this.cache.data && (now - this.cache.lastFetch) < this.cache.cacheDuration) {
            return this.cache.data;
        }

        try {
            const url = `https://raw.githubusercontent.com/${this.config.owner}/${this.config.repo}/${this.config.branch}/${this.config.dataPath}`;
            const response = await fetch(url, {
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                console.error('Failed to fetch data from GitHub');
                return this.getEmptyData();
            }
            
            const data = await response.json();
            
            // Update cache
            this.cache.data = data;
            this.cache.lastFetch = now;
            
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return this.cache.data || this.getEmptyData();
        }
    }

    getEmptyData() {
        return {
            raffles: [],
            participants: [],
            transactions: [],
            winners: [],
            lastUpdated: 0
        };
    }

    // Note: Writing to GitHub requires authentication
    // For now, we'll use localStorage for writes and GitHub for reads
    // This means admin creates raffles locally, then pushes to GitHub
    
    async saveDataLocally(data) {
        try {
            localStorage.setItem('raffle_data_pending', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving locally:', error);
            return false;
        }
    }

    async getLocalData() {
        try {
            const data = localStorage.getItem('raffle_data_pending');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            return null;
        }
    }

    // Merge local and GitHub data
    async getMergedData() {
        const githubData = await this.fetchData();
        const localData = await this.getLocalData();
        
        if (!localData) {
            return githubData;
        }

        // Merge: GitHub data + local pending changes
        return {
            raffles: [...githubData.raffles, ...localData.raffles.filter(r => 
                !githubData.raffles.find(gr => gr.id === r.id)
            )],
            participants: [...githubData.participants, ...localData.participants.filter(p =>
                !githubData.participants.find(gp => gp.id === p.id)
            )],
            transactions: [...githubData.transactions, ...localData.transactions.filter(t =>
                !githubData.transactions.find(gt => gt.id === t.id)
            )],
            winners: [...githubData.winners, ...localData.winners.filter(w =>
                !githubData.winners.find(gw => gw.id === w.id)
            )],
            lastUpdated: Math.max(githubData.lastUpdated || 0, localData.lastUpdated || 0)
        };
    }

    // Raffle Methods
    async getAllRaffles() {
        const data = await this.getMergedData();
        return data.raffles;
    }

    async getActiveRaffles() {
        const now = Date.now();
        const allRaffles = await this.getAllRaffles();
        return allRaffles.filter(r => r.end_time > now && r.status === 'active');
    }

    async getRaffle(raffleId) {
        const raffles = await this.getAllRaffles();
        return raffles.find(r => r.id === raffleId) || null;
    }

    async createRaffle(raffleData) {
        const localData = await this.getLocalData() || this.getEmptyData();
        
        const newRaffle = {
            id: raffleData.id || 'raffle_' + Date.now(),
            title: raffleData.title,
            description: raffleData.description,
            walletAddress: raffleData.walletAddress || raffleData.wallet_address,
            prizePool: raffleData.prizePool || raffleData.prize_pool,
            entryFee: raffleData.entryFee || raffleData.entry_fee,
            totalSpots: raffleData.totalSpots || raffleData.total_spots,
            maxPerWallet: raffleData.maxPerWallet || raffleData.max_per_wallet,
            endTime: raffleData.endTime || raffleData.end_time,
            createdAt: raffleData.createdAt || raffleData.created_at || Date.now(),
            status: raffleData.status || 'active',
            winner: raffleData.winner || null,
            winnerAvatar: raffleData.winnerAvatar || null,
            completedAt: raffleData.completedAt || null,
            winnerDrawnAt: raffleData.winnerDrawnAt || null,
            autoDrawEnabled: raffleData.autoDrawEnabled !== undefined ? raffleData.autoDrawEnabled : true,
            wallet_address: raffleData.walletAddress || raffleData.wallet_address,
            prize_pool: raffleData.prizePool || raffleData.prize_pool,
            entry_fee: raffleData.entryFee || raffleData.entry_fee,
            total_spots: raffleData.totalSpots || raffleData.total_spots,
            max_per_wallet: raffleData.maxPerWallet || raffleData.max_per_wallet,
            end_time: raffleData.endTime || raffleData.end_time,
            created_at: raffleData.createdAt || raffleData.created_at || Date.now(),
            auto_draw_enabled: raffleData.autoDrawEnabled !== undefined ? raffleData.autoDrawEnabled : true
        };
        
        localData.raffles.push(newRaffle);
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        
        // Clear cache to force refresh
        this.cache.data = null;
        
        return newRaffle;
    }

    async updateRaffle(raffleId, updates) {
        const localData = await this.getLocalData() || this.getEmptyData();
        const githubData = await this.fetchData();
        
        // Find in local or GitHub
        let raffle = localData.raffles.find(r => r.id === raffleId);
        if (!raffle) {
            raffle = githubData.raffles.find(r => r.id === raffleId);
            if (raffle) {
                localData.raffles.push({...raffle, ...updates});
            }
        } else {
            Object.assign(raffle, updates);
        }
        
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return raffle;
    }

    async deleteRaffle(raffleId) {
        const localData = await this.getLocalData() || this.getEmptyData();
        
        localData.raffles = localData.raffles.filter(r => r.id !== raffleId);
        localData.participants = localData.participants.filter(p => p.raffle_id !== raffleId && p.raffleId !== raffleId);
        localData.transactions = localData.transactions.filter(t => t.raffle_id !== raffleId && t.raffleId !== raffleId);
        
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return { message: 'Raffle deleted successfully' };
    }

    // Participant Methods
    async getParticipants(raffleId) {
        const data = await this.getMergedData();
        return data.participants.filter(p => p.raffle_id === raffleId || p.raffleId === raffleId);
    }

    async addParticipant(raffleId, participantData) {
        const localData = await this.getLocalData() || this.getEmptyData();
        
        const newParticipant = {
            id: 'participant_' + Date.now() + '_' + Math.random(),
            raffle_id: raffleId,
            raffleId: raffleId,
            address: participantData.address,
            entries: participantData.entries || 1,
            avatar: participantData.avatar,
            timestamp: participantData.timestamp || Date.now(),
            txHash: participantData.txHash || participantData.tx_hash || ''
        };
        
        localData.participants.push(newParticipant);
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return newParticipant;
    }

    async getAllParticipants() {
        const data = await this.getMergedData();
        const raffles = data.raffles;
        
        return data.participants.map(p => {
            const raffle = raffles.find(r => r.id === p.raffle_id || r.id === p.raffleId);
            return {
                ...p,
                raffleTitle: raffle ? raffle.title : 'Unknown Raffle',
                entryNumber: data.participants.filter(pp => 
                    (pp.raffle_id === p.raffle_id || pp.raffleId === p.raffleId) && 
                    pp.timestamp <= p.timestamp
                ).length,
                totalEntries: data.participants.filter(pp => 
                    pp.raffle_id === p.raffle_id || pp.raffleId === p.raffleId
                ).length
            };
        });
    }

    // Transaction Methods
    async getTransactions(raffleId) {
        const data = await this.getMergedData();
        return data.transactions.filter(t => t.raffle_id === raffleId || t.raffleId === raffleId);
    }

    async addTransaction(raffleId, transactionData) {
        const localData = await this.getLocalData() || this.getEmptyData();
        
        const newTransaction = {
            id: 'tx_' + Date.now() + '_' + Math.random(),
            raffle_id: raffleId,
            raffleId: raffleId,
            from_address: transactionData.from || transactionData.from_address,
            from: transactionData.from || transactionData.from_address,
            amount: transactionData.amount,
            timestamp: transactionData.timestamp || Date.now(),
            txHash: transactionData.txHash || transactionData.tx_hash || ''
        };
        
        localData.transactions.push(newTransaction);
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return newTransaction;
    }

    // Winner Methods
    async getPendingWinners() {
        const data = await this.getMergedData();
        return data.winners.filter(w => w.payment_status === 'pending' || w.paymentStatus === 'pending');
    }

    async getAllWinners() {
        const data = await this.getMergedData();
        return data.winners;
    }

    async addWinner(winnerData) {
        const localData = await this.getLocalData() || this.getEmptyData();
        
        const newWinner = {
            id: 'winner_' + Date.now(),
            raffleId: winnerData.raffleId,
            raffleTitle: winnerData.raffleTitle,
            winnerAddress: winnerData.winnerAddress,
            prizeAmount: winnerData.prizeAmount,
            drawnAt: winnerData.drawnAt || Date.now(),
            paymentStatus: winnerData.paymentStatus || 'pending',
            payment_status: winnerData.paymentStatus || 'pending',
            paidAt: winnerData.paidAt || null,
            participantNumber: winnerData.participantNumber,
            totalParticipants: winnerData.totalParticipants
        };
        
        localData.winners.push(newWinner);
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return newWinner;
    }

    async markWinnerPaid(raffleId) {
        const localData = await this.getLocalData() || this.getEmptyData();
        const githubData = await this.fetchData();
        
        let winner = localData.winners.find(w => w.raffleId === raffleId);
        if (!winner) {
            winner = githubData.winners.find(w => w.raffleId === raffleId);
            if (winner) {
                winner = {...winner};
                localData.winners.push(winner);
            }
        }
        
        if (winner) {
            winner.paymentStatus = 'paid';
            winner.payment_status = 'paid';
            winner.paidAt = Date.now();
        }
        
        localData.lastUpdated = Date.now();
        await this.saveDataLocally(localData);
        this.cache.data = null;
        
        return winner;
    }

    // Statistics
    async getStats() {
        const data = await this.getMergedData();
        const now = Date.now();
        
        const activeRaffles = data.raffles.filter(r => r.end_time > now && r.status === 'active').length;
        const totalRevenue = data.transactions.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
        const pendingWinners = data.winners.filter(w => 
            w.payment_status === 'pending' || w.paymentStatus === 'pending'
        ).length;
        
        return {
            activeRaffles,
            totalParticipants: data.participants.length,
            totalRevenue,
            pendingWinners
        };
    }

    // Utility: Export local data for GitHub commit
    async exportForGitHub() {
        const localData = await this.getLocalData();
        if (!localData) {
            alert('No local data to export');
            return null;
        }
        
        const json = JSON.stringify(localData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'raffles.json';
        a.click();
        URL.revokeObjectURL(url);
        
        alert('✅ Data exported! Replace data/raffles.json in your GitHub repo with this file, then commit and push.');
        return localData;
    }
}

// Create global instance
const raffleAPI = new RaffleAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = raffleAPI;
}

// Add helpful console message
console.log('✅ Raffle API initialized with GitHub storage');
console.log('📖 Reads from: GitHub repository (shared for all users)');
console.log('✏️ Writes to: localStorage (admin syncs to GitHub)');
console.log('🔄 To sync: Export data and commit to GitHub');
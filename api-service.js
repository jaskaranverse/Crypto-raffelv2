// LocalStorage-based API Service (No Database Required!)
// All data stored in browser localStorage - simple and instant!

class RaffleAPI {
    constructor() {
        this.storageKeys = {
            raffles: 'crypto_raffles',
            participants: 'crypto_participants',
            transactions: 'crypto_transactions',
            winners: 'crypto_winners'
        };
        
        // Initialize storage if empty
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKeys.raffles)) {
            localStorage.setItem(this.storageKeys.raffles, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.storageKeys.participants)) {
            localStorage.setItem(this.storageKeys.participants, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.storageKeys.transactions)) {
            localStorage.setItem(this.storageKeys.transactions, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.storageKeys.winners)) {
            localStorage.setItem(this.storageKeys.winners, JSON.stringify([]));
        }
    }

    // Helper methods
    getData(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }

    setData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    // Raffle Methods
    async getAllRaffles() {
        return this.getData(this.storageKeys.raffles);
    }

    async getActiveRaffles() {
        const now = Date.now();
        const allRaffles = this.getData(this.storageKeys.raffles);
        return allRaffles.filter(r => r.end_time > now && r.status === 'active');
    }

    async getRaffle(raffleId) {
        const raffles = this.getData(this.storageKeys.raffles);
        return raffles.find(r => r.id === raffleId) || null;
    }

    async createRaffle(raffleData) {
        const raffles = this.getData(this.storageKeys.raffles);
        
        // Ensure all required fields are present
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
            // Add snake_case versions for compatibility
            wallet_address: raffleData.walletAddress || raffleData.wallet_address,
            prize_pool: raffleData.prizePool || raffleData.prize_pool,
            entry_fee: raffleData.entryFee || raffleData.entry_fee,
            total_spots: raffleData.totalSpots || raffleData.total_spots,
            max_per_wallet: raffleData.maxPerWallet || raffleData.max_per_wallet,
            end_time: raffleData.endTime || raffleData.end_time,
            created_at: raffleData.createdAt || raffleData.created_at || Date.now(),
            auto_draw_enabled: raffleData.autoDrawEnabled !== undefined ? raffleData.autoDrawEnabled : true
        };
        
        raffles.push(newRaffle);
        this.setData(this.storageKeys.raffles, raffles);
        return newRaffle;
    }

    async updateRaffle(raffleId, updates) {
        const raffles = this.getData(this.storageKeys.raffles);
        const index = raffles.findIndex(r => r.id === raffleId);
        
        if (index === -1) {
            throw new Error('Raffle not found');
        }
        
        raffles[index] = { ...raffles[index], ...updates };
        this.setData(this.storageKeys.raffles, raffles);
        return raffles[index];
    }

    async deleteRaffle(raffleId) {
        let raffles = this.getData(this.storageKeys.raffles);
        raffles = raffles.filter(r => r.id !== raffleId);
        this.setData(this.storageKeys.raffles, raffles);
        
        // Also delete associated participants and transactions
        let participants = this.getData(this.storageKeys.participants);
        participants = participants.filter(p => p.raffle_id !== raffleId && p.raffleId !== raffleId);
        this.setData(this.storageKeys.participants, participants);
        
        let transactions = this.getData(this.storageKeys.transactions);
        transactions = transactions.filter(t => t.raffle_id !== raffleId && t.raffleId !== raffleId);
        this.setData(this.storageKeys.transactions, transactions);
        
        return { message: 'Raffle deleted successfully' };
    }

    // Participant Methods
    async getParticipants(raffleId) {
        const participants = this.getData(this.storageKeys.participants);
        return participants.filter(p => p.raffle_id === raffleId || p.raffleId === raffleId);
    }

    async addParticipant(raffleId, participantData) {
        const participants = this.getData(this.storageKeys.participants);
        
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
        
        participants.push(newParticipant);
        this.setData(this.storageKeys.participants, participants);
        return newParticipant;
    }

    async getAllParticipants() {
        const participants = this.getData(this.storageKeys.participants);
        const raffles = this.getData(this.storageKeys.raffles);
        
        // Add raffle title to each participant
        return participants.map(p => {
            const raffle = raffles.find(r => r.id === p.raffle_id || r.id === p.raffleId);
            return {
                ...p,
                raffleTitle: raffle ? raffle.title : 'Unknown Raffle',
                entryNumber: participants.filter(pp => 
                    (pp.raffle_id === p.raffle_id || pp.raffleId === p.raffleId) && 
                    pp.timestamp <= p.timestamp
                ).length,
                totalEntries: participants.filter(pp => 
                    pp.raffle_id === p.raffle_id || pp.raffleId === p.raffleId
                ).length
            };
        });
    }

    // Transaction Methods
    async getTransactions(raffleId) {
        const transactions = this.getData(this.storageKeys.transactions);
        return transactions.filter(t => t.raffle_id === raffleId || t.raffleId === raffleId);
    }

    async addTransaction(raffleId, transactionData) {
        const transactions = this.getData(this.storageKeys.transactions);
        
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
        
        transactions.push(newTransaction);
        this.setData(this.storageKeys.transactions, transactions);
        return newTransaction;
    }

    // Winner Methods
    async getPendingWinners() {
        const winners = this.getData(this.storageKeys.winners);
        return winners.filter(w => w.payment_status === 'pending' || w.paymentStatus === 'pending');
    }

    async getAllWinners() {
        return this.getData(this.storageKeys.winners);
    }

    async addWinner(winnerData) {
        const winners = this.getData(this.storageKeys.winners);
        
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
        
        winners.push(newWinner);
        this.setData(this.storageKeys.winners, winners);
        return newWinner;
    }

    async markWinnerPaid(raffleId) {
        const winners = this.getData(this.storageKeys.winners);
        const index = winners.findIndex(w => w.raffleId === raffleId);
        
        if (index === -1) {
            throw new Error('Winner not found');
        }
        
        winners[index].paymentStatus = 'paid';
        winners[index].payment_status = 'paid';
        winners[index].paidAt = Date.now();
        
        this.setData(this.storageKeys.winners, winners);
        return winners[index];
    }

    // Statistics
    async getStats() {
        const raffles = this.getData(this.storageKeys.raffles);
        const participants = this.getData(this.storageKeys.participants);
        const transactions = this.getData(this.storageKeys.transactions);
        const winners = this.getData(this.storageKeys.winners);
        
        const now = Date.now();
        const activeRaffles = raffles.filter(r => r.end_time > now && r.status === 'active').length;
        const totalRevenue = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0);
        const pendingWinners = winners.filter(w => 
            w.payment_status === 'pending' || w.paymentStatus === 'pending'
        ).length;
        
        return {
            activeRaffles,
            totalParticipants: participants.length,
            totalRevenue,
            pendingWinners
        };
    }

    // Utility Methods
    clearAllData() {
        if (confirm('⚠️ This will delete ALL raffle data. Are you sure?')) {
            localStorage.removeItem(this.storageKeys.raffles);
            localStorage.removeItem(this.storageKeys.participants);
            localStorage.removeItem(this.storageKeys.transactions);
            localStorage.removeItem(this.storageKeys.winners);
            this.initializeStorage();
            return true;
        }
        return false;
    }

    exportData() {
        return {
            raffles: this.getData(this.storageKeys.raffles),
            participants: this.getData(this.storageKeys.participants),
            transactions: this.getData(this.storageKeys.transactions),
            winners: this.getData(this.storageKeys.winners),
            exportedAt: Date.now()
        };
    }

    importData(data) {
        if (data.raffles) this.setData(this.storageKeys.raffles, data.raffles);
        if (data.participants) this.setData(this.storageKeys.participants, data.participants);
        if (data.transactions) this.setData(this.storageKeys.transactions, data.transactions);
        if (data.winners) this.setData(this.storageKeys.winners, data.winners);
        return true;
    }
}

// Create global instance
const raffleAPI = new RaffleAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = raffleAPI;
}

// Add helpful console message
console.log('✅ Raffle API initialized with localStorage (no database required!)');
console.log('💾 All data stored in browser - works offline!');
// API Service for Crypto Raffle
// This replaces localStorage with backend API calls

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://your-backend-url.com/api'; // Update this with your deployed backend URL

class RaffleAPI {
    // ==================== RAFFLE ENDPOINTS ====================
    
    async getAllRaffles() {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles`);
            if (!response.ok) throw new Error('Failed to fetch raffles');
            return await response.json();
        } catch (error) {
            console.error('Error fetching raffles:', error);
            return [];
        }
    }
    
    async getActiveRaffles() {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/active`);
            if (!response.ok) throw new Error('Failed to fetch active raffles');
            return await response.json();
        } catch (error) {
            console.error('Error fetching active raffles:', error);
            return [];
        }
    }
    
    async getRaffle(raffleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}`);
            if (!response.ok) throw new Error('Failed to fetch raffle');
            return await response.json();
        } catch (error) {
            console.error('Error fetching raffle:', error);
            return null;
        }
    }
    
    async createRaffle(raffleData) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(raffleData)
            });
            if (!response.ok) throw new Error('Failed to create raffle');
            return await response.json();
        } catch (error) {
            console.error('Error creating raffle:', error);
            throw error;
        }
    }
    
    async updateRaffle(raffleId, raffleData) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(raffleData)
            });
            if (!response.ok) throw new Error('Failed to update raffle');
            return await response.json();
        } catch (error) {
            console.error('Error updating raffle:', error);
            throw error;
        }
    }
    
    async deleteRaffle(raffleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete raffle');
            return await response.json();
        } catch (error) {
            console.error('Error deleting raffle:', error);
            throw error;
        }
    }
    
    // ==================== PARTICIPANT ENDPOINTS ====================
    
    async getParticipants(raffleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}/participants`);
            if (!response.ok) throw new Error('Failed to fetch participants');
            return await response.json();
        } catch (error) {
            console.error('Error fetching participants:', error);
            return [];
        }
    }
    
    async addParticipant(raffleId, participantData) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}/participants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(participantData)
            });
            if (!response.ok) throw new Error('Failed to add participant');
            return await response.json();
        } catch (error) {
            console.error('Error adding participant:', error);
            throw error;
        }
    }
    
    async getAllParticipants() {
        try {
            const response = await fetch(`${API_BASE_URL}/participants`);
            if (!response.ok) throw new Error('Failed to fetch all participants');
            return await response.json();
        } catch (error) {
            console.error('Error fetching all participants:', error);
            return [];
        }
    }
    
    // ==================== TRANSACTION ENDPOINTS ====================
    
    async getTransactions(raffleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}/transactions`);
            if (!response.ok) throw new Error('Failed to fetch transactions');
            return await response.json();
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    }
    
    async addTransaction(raffleId, transactionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/raffles/${raffleId}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });
            if (!response.ok) throw new Error('Failed to add transaction');
            return await response.json();
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        }
    }
    
    // ==================== WINNER ENDPOINTS ====================
    
    async getPendingWinners() {
        try {
            const response = await fetch(`${API_BASE_URL}/winners/pending`);
            if (!response.ok) throw new Error('Failed to fetch pending winners');
            return await response.json();
        } catch (error) {
            console.error('Error fetching pending winners:', error);
            return [];
        }
    }
    
    async getAllWinners() {
        try {
            const response = await fetch(`${API_BASE_URL}/winners`);
            if (!response.ok) throw new Error('Failed to fetch winners');
            return await response.json();
        } catch (error) {
            console.error('Error fetching winners:', error);
            return [];
        }
    }
    
    async addWinner(winnerData) {
        try {
            const response = await fetch(`${API_BASE_URL}/winners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(winnerData)
            });
            if (!response.ok) throw new Error('Failed to add winner');
            return await response.json();
        } catch (error) {
            console.error('Error adding winner:', error);
            throw error;
        }
    }
    
    async markWinnerPaid(raffleId) {
        try {
            const response = await fetch(`${API_BASE_URL}/winners/${raffleId}/paid`, {
                method: 'PUT'
            });
            if (!response.ok) throw new Error('Failed to mark winner as paid');
            return await response.json();
        } catch (error) {
            console.error('Error marking winner as paid:', error);
            throw error;
        }
    }
    
    // ==================== STATS ENDPOINTS ====================
    
    async getStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return {
                activeRaffles: 0,
                totalParticipants: 0,
                totalRevenue: 0,
                pendingWinners: 0
            };
        }
    }
}

// Create singleton instance
const raffleAPI = new RaffleAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = raffleAPI;
}
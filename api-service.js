// Supabase configuration
const SUPABASE_URL = 'https://mlfjoinf wljransiompk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZmpvaW5md2xqcmFuc2lvbXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDcwNzQsImV4cCI6MjA3ODYyMzA3NH0.10wfmzWNhrTf_z_7IvQLcIPm4iZPr-cnWKNQ2etVEs8';

class RaffleAPI {
    constructor() {
        this.headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        };
    }

    async getAllRaffles() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/raffles?select=*`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getActiveRaffles() {
        const now = Date.now();
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?select=*&status=eq.active&end_time=gt.${now}`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getRaffle(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?select=*&id=eq.${raffleId}`,
                { headers: this.headers }
            );
            const data = await response.json();
            return data[0] || null;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async createRaffle(raffleData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/raffles`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(raffleData)
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async updateRaffle(raffleId, raffleData) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?id=eq.${raffleId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify(raffleData)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async deleteRaffle(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/raffles?id=eq.${raffleId}`,
                {
                    method: 'DELETE',
                    headers: this.headers
                }
            );
            return { message: 'Raffle deleted successfully' };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getParticipants(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*&raffle_id=eq.${raffleId}&order=timestamp.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addParticipant(raffleId, participantData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/participants`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ raffle_id: raffleId, ...participantData })
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getAllParticipants() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*&order=timestamp.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getTransactions(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/transactions?select=*&raffle_id=eq.${raffleId}&order=timestamp.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addTransaction(raffleId, transactionData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ raffle_id: raffleId, from_address: transactionData.from, ...transactionData })
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getPendingWinners() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?select=*&payment_status=eq.pending&order=drawn_at.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async getAllWinners() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?select=*&order=drawn_at.desc`,
                { headers: this.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    async addWinner(winnerData) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/winners`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(winnerData)
            });
            const data = await response.json();
            return data[0] || data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async markWinnerPaid(raffleId) {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?raffle_id=eq.${raffleId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        payment_status: 'paid',
                        paid_at: Date.now()
                    })
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getStats() {
        try {
            const allRaffles = await this.getAllRaffles();
            const now = Date.now();
            const activeRaffles = allRaffles.filter(r => r.end_time > now && r.status === 'active').length;
            
            const participantsResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/participants?select=*`,
                { headers: this.headers }
            );
            const participants = await participantsResponse.json();
            
            const transactionsResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/transactions?select=*`,
                { headers: this.headers }
            );
            const transactions = await transactionsResponse.json();
            
            const totalRevenue = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
            
            const winnersResponse = await fetch(
                `${SUPABASE_URL}/rest/v1/winners?select=*&payment_status=eq.pending`,
                { headers: this.headers }
            );
            const pendingWinners = await winnersResponse.json();
            
            return {
                activeRaffles,
                totalParticipants: participants.length,
                totalRevenue,
                pendingWinners: pendingWinners.length
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                activeRaffles: 0,
                totalParticipants: 0,
                totalRevenue: 0,
                pendingWinners: 0
            };
        }
    }
}

const raffleAPI = new RaffleAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = raffleAPI;
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-raffle';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Raffle Schema
const raffleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    walletAddress: { type: String, required: true },
    prizePool: { type: Number, required: true },
    entryFee: { type: Number, required: true },
    totalSpots: { type: Number, required: true },
    maxPerWallet: { type: Number, required: true },
    endTime: { type: Number, required: true },
    createdAt: { type: Number, required: true },
    status: { type: String, default: 'active' },
    winner: { type: String, default: null },
    winnerAvatar: { type: String, default: null },
    completedAt: { type: Number, default: null },
    winnerDrawnAt: { type: Number, default: null },
    autoDrawEnabled: { type: Boolean, default: true }
});

const Raffle = mongoose.model('Raffle', raffleSchema);

// Participant Schema
const participantSchema = new mongoose.Schema({
    raffleId: { type: String, required: true, index: true },
    address: { type: String, required: true },
    entries: { type: Number, default: 1 },
    avatar: { type: String, required: true },
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true }
});

const Participant = mongoose.model('Participant', participantSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    raffleId: { type: String, required: true, index: true },
    from: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    txHash: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Winner Payment Schema
const winnerPaymentSchema = new mongoose.Schema({
    raffleId: { type: String, required: true },
    raffleTitle: { type: String, required: true },
    winnerAddress: { type: String, required: true },
    prizeAmount: { type: Number, required: true },
    drawnAt: { type: Number, required: true },
    paymentStatus: { type: String, default: 'pending' },
    paidAt: { type: Number, default: null },
    participantNumber: { type: Number, required: true },
    totalParticipants: { type: Number, required: true }
});

const WinnerPayment = mongoose.model('WinnerPayment', winnerPaymentSchema);

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Get all raffles
app.get('/api/raffles', async (req, res) => {
    try {
        const raffles = await Raffle.find().sort({ createdAt: -1 });
        res.json(raffles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get active raffles only
app.get('/api/raffles/active', async (req, res) => {
    try {
        const now = Date.now();
        const raffles = await Raffle.find({ 
            endTime: { $gt: now },
            status: 'active'
        }).sort({ endTime: 1 });
        res.json(raffles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single raffle
app.get('/api/raffles/:id', async (req, res) => {
    try {
        const raffle = await Raffle.findOne({ id: req.params.id });
        if (!raffle) {
            return res.status(404).json({ error: 'Raffle not found' });
        }
        res.json(raffle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new raffle
app.post('/api/raffles', async (req, res) => {
    try {
        const raffle = new Raffle(req.body);
        await raffle.save();
        res.status(201).json(raffle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update raffle
app.put('/api/raffles/:id', async (req, res) => {
    try {
        const raffle = await Raffle.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!raffle) {
            return res.status(404).json({ error: 'Raffle not found' });
        }
        res.json(raffle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete raffle
app.delete('/api/raffles/:id', async (req, res) => {
    try {
        const raffle = await Raffle.findOneAndDelete({ id: req.params.id });
        if (!raffle) {
            return res.status(404).json({ error: 'Raffle not found' });
        }
        
        // Also delete associated participants and transactions
        await Participant.deleteMany({ raffleId: req.params.id });
        await Transaction.deleteMany({ raffleId: req.params.id });
        
        res.json({ message: 'Raffle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get participants for a raffle
app.get('/api/raffles/:id/participants', async (req, res) => {
    try {
        const participants = await Participant.find({ 
            raffleId: req.params.id 
        }).sort({ timestamp: -1 });
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add participant to raffle
app.post('/api/raffles/:id/participants', async (req, res) => {
    try {
        const participant = new Participant({
            raffleId: req.params.id,
            ...req.body
        });
        await participant.save();
        res.status(201).json(participant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get transactions for a raffle
app.get('/api/raffles/:id/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find({ 
            raffleId: req.params.id 
        }).sort({ timestamp: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add transaction
app.post('/api/raffles/:id/transactions', async (req, res) => {
    try {
        const transaction = new Transaction({
            raffleId: req.params.id,
            ...req.body
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all participants (for admin)
app.get('/api/participants', async (req, res) => {
    try {
        const participants = await Participant.find().sort({ timestamp: -1 });
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get pending winner payments
app.get('/api/winners/pending', async (req, res) => {
    try {
        const winners = await WinnerPayment.find({ 
            paymentStatus: 'pending' 
        }).sort({ drawnAt: -1 });
        res.json(winners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all winner payments
app.get('/api/winners', async (req, res) => {
    try {
        const winners = await WinnerPayment.find().sort({ drawnAt: -1 });
        res.json(winners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add winner payment
app.post('/api/winners', async (req, res) => {
    try {
        const winner = new WinnerPayment(req.body);
        await winner.save();
        res.status(201).json(winner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Mark winner as paid
app.put('/api/winners/:raffleId/paid', async (req, res) => {
    try {
        const winner = await WinnerPayment.findOneAndUpdate(
            { raffleId: req.params.raffleId },
            { 
                paymentStatus: 'paid',
                paidAt: Date.now()
            },
            { new: true }
        );
        if (!winner) {
            return res.status(404).json({ error: 'Winner not found' });
        }
        res.json(winner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Dashboard stats
app.get('/api/stats', async (req, res) => {
    try {
        const now = Date.now();
        const activeRaffles = await Raffle.countDocuments({ 
            endTime: { $gt: now },
            status: 'active'
        });
        const totalParticipants = await Participant.countDocuments();
        const transactions = await Transaction.find();
        const totalRevenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        const pendingWinners = await WinnerPayment.countDocuments({ 
            paymentStatus: 'pending' 
        });
        
        res.json({
            activeRaffles,
            totalParticipants,
            totalRevenue,
            pendingWinners
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
});
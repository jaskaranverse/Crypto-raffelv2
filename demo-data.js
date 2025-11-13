// Demo Raffle Data - This creates a sample raffle for demonstration
(function() {
    // Check if we already have raffles
    const existingRaffles = localStorage.getItem('allRaffles');
    
    // Only create demo raffle if none exist
    if (!existingRaffles || JSON.parse(existingRaffles).length === 0) {
        console.log('Creating demo raffle...');
        
        // Create a single raffle with automatic winner selection
        const demoRaffle = {
            id: 'crypto-raffle-main',
            title: '0.01 ETH Crypto Raffle',
            description: 'Win 0.01 ETH! Winner selected randomly and paid automatically.',
            prizePool: 0.01,
            entryFee: 0.0008,
            totalSpots: 50,
            maxPerWallet: 3,
            endTime: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
            walletAddress: '0x842bab27de95e329eb17733c1f29c082e5dd94c3', // Your wallet
            createdAt: Date.now(),
            status: 'active',
            autoDrawEnabled: true
        };
        
        // Save the single raffle
        localStorage.setItem('allRaffles', JSON.stringify([demoRaffle]));
        
        // Initialize empty participants list
        localStorage.setItem('raffle_crypto-raffle-main_participants', JSON.stringify([]));
        
        console.log('Demo raffle created successfully!');
    }
})();
// Demo Raffle Data - This creates a sample raffle for demonstration
(function() {
    // Check if we already have raffles
    const existingRaffles = localStorage.getItem('allRaffles');
    
    // Only create demo raffle if none exist
    if (!existingRaffles || JSON.parse(existingRaffles).length === 0) {
        console.log('Creating demo raffle...');
        
        // Create a demo raffle that expires in 2 days
        const demoRaffle = {
            id: 'demo-raffle-001',
            title: '0.5 ETH Crypto Raffle',
            description: 'Win 0.5 ETH! Connect your wallet and enter now.',
            prizePool: 0.5,
            entryFee: 0.001,
            totalSpots: 100,
            maxPerWallet: 5,
            endTime: Date.now() + (2 * 24 * 60 * 60 * 1000), // 2 days from now
            walletAddress: '0x842bab27de95e329eb17733c1f29c082e5dd94c3', // Your wallet
            createdAt: Date.now(),
            status: 'active'
        };
        
        // Save the demo raffle
        localStorage.setItem('allRaffles', JSON.stringify([demoRaffle]));
        
        // Create some demo participants to make it look active
        const demoParticipants = [
            {
                address: '0x1234567890123456789012345678901234567890',
                entries: 1,
                avatar: '🎭',
                timestamp: Date.now() - 3600000,
                txHash: '0xdemo1'
            },
            {
                address: '0x2345678901234567890123456789012345678901',
                entries: 1,
                avatar: '🎨',
                timestamp: Date.now() - 7200000,
                txHash: '0xdemo2'
            },
            {
                address: '0x3456789012345678901234567890123456789012',
                entries: 1,
                avatar: '🎪',
                timestamp: Date.now() - 10800000,
                txHash: '0xdemo3'
            }
        ];
        
        localStorage.setItem('raffle_demo-raffle-001_participants', JSON.stringify(demoParticipants));
        
        console.log('Demo raffle created successfully!');
    }
})();
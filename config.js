// Raffle Configuration
const RAFFLE_CONFIG = {
    // Admin wallet address (your MetaMask address)
    ADMIN_ADDRESS: '0x842bab27de95e329eb17733c1f29c082e5dd94c3', // Your Ethereum address
    
    // USDC Token Contract Addresses (Sepolia Testnet)
    USDC_CONTRACT: {
        // Sepolia Testnet USDC (Mock USDC for testing)
        address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        decimals: 6, // USDC has 6 decimals
        symbol: 'USDC'
    },
    
    // Raffle Settings (can be modified by admin)
    RAFFLE_SETTINGS: {
        entryFee: 0.0008, // Entry fee in ETH (approximately $2-3 at current ETH prices)
        prizePool: 0.01, // Prize pool in ETH
        duration: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        minParticipants: 2, // Minimum participants to draw winner
        maxParticipants: 50, // Maximum participants allowed
        paymentMethod: 'ETH', // Payment method: ETH or USDC
        autoDrawEnabled: true // Automatically draw winner when raffle ends
    },
    
    // Network Configuration
    NETWORK: {
        chainId: '0xaa36a7', // Sepolia Testnet
        chainName: 'Sepolia Testnet',
        rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
        blockExplorer: 'https://sepolia.etherscan.io'
    }
};

// USDC Token ABI (minimal - only functions we need)
const USDC_ABI = [
    // Read functions
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {"name": "_owner", "type": "address"},
            {"name": "_spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    },
    // Write functions
    {
        "constant": false,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAFFLE_CONFIG, USDC_ABI };
}
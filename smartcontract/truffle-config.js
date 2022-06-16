const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "..."

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
        smartzeniq: {
            provider: () => new HDWalletProvider(mnemonic, "https://smart1.zeniq.network:9545"),
            network_id: 383414847825
        },
    },
    compilers: {
        solc: {
            version: "pragma",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
            }
        }
    },
};

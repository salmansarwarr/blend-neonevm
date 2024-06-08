// require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
require("hardhat-contract-sizer");
require("dotenv").config();
require("hardhat-gas-reporter");
require("hardhat-deploy");

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// const ALCHEMY_API_KEY = `GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj`
// const privateKey = `669a00a5dcee6b12e70ec23b4a793b14bcb38a0f657ce29ada80b578e14743a7`
let _optimizer = {
    // Toggles whether the optimizer is on or off.
    // It's good to keep it off for development
    // and turn on for when getting ready to launch.
    enabled: true,
    // The number of runs specifies roughly how often
    // the deployed code will be executed across the
    // life-time of the contract.
    runs: 400,
};

module.exports = {
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API || "",
        customChains: [
            {
                
            }
        ]
    },
    solidity: {
        compilers: [
            {
                version: "0.8.0",
                settings: {
                    optimizer: _optimizer,
                },
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: _optimizer,
                },
            },
            {
                version: "0.8.21",
                settings: {
                    optimizer: _optimizer,
                },
            }
        ],
    },

    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            accounts: [`0x${process.env.privateKey}`],
            blockConfirmations: 3
        },
        avalanche: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            accounts: [`0x${process.env.privateKey}`],
            blockConfirmations: 3
        },
        spiderChain: {
            url: 'https://node.botanixlabs.dev/',
            chainId: 3636,
            accounts: [`0x${process.env.privateKey}`],
            blockConfirmations: 3
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
            accounts: [`0x${process.env.privateKey}`],
            blockConfirmations: 5
        },
        arbgoerli: {
            url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            accounts: [`0x${process.env.privateKey}`],
        },
        BSCtestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            gasPrice: 21000000000,
            accounts: [`0x${process.env.privateKey}`],
        }, // infura node https://mainnet.infura.io/v3/81ee0087587841369cf57f1b7cd8c9f6
        mainnet: {
            url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
            accounts: [`0x${process.env.privateKey}`],
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/siaBFefLktVP7d_O75mGmJhUXGwxjB4e`,
            accounts: [`0x${process.env.privateKey}`],
        },
    },

    abiExporter: {
        path: "../frontend/src/contracts/ABIs",
        runOnCompile: true,
        clear: true,
        only: [":HorseNFT$"],
        flat: true,
        spacing: 2,
        pretty: true,
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
        only: [":HorseNFT$"],
    },
    mocha: {
        timeout: 100000000,
    },
    gasReporter: {
        outputFile: "gas-report.txt",
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        noColors: true,
        coinmarketcap: process.env.COIN_MARKETCAP_API_KEY || "",
        token: "ETH",
    },
};

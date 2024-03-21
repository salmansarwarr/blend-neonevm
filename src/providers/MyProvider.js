"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Providers } from "@/redux/provider.jsx";

const WALLETCONNECT_PROJECT_ID = "99296b5d7acb2ca478909bd3e7b4f780";
const ALCHEMY_ID = "vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S";

const botanix = {
    id: 3636,
    name: "Botanix Testnet",
    network: "botanix",
    nativeCurrency: {
        decimals: 18,
        name: "Bitcoin",
        symbol: "BTC",
    },
    rpcUrls: {
        public: { http: ["https://node.botanixlabs.dev"] },
        default: { http: ["https://node.botanixlabs.dev"] },
    },
    blockExplorers: {
        etherscan: { name: "3xpl", url: "https://3xpl.com/botanix" },
        default: { name: "3xpl", url: "https://3xpl.com/botanix" },
    },
};

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: ALCHEMY_ID, // or infuraId
        walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Horsly",
        chains: [botanix],
    })
);

const MyProvider = ({ children }) => {
    return (
        <WagmiConfig config={config}>
           <ConnectKitProvider><Providers>{children}</Providers></ConnectKitProvider> 
        </WagmiConfig>
    );
};

export default MyProvider;

"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Providers } from "@/redux/provider.jsx";

const WALLETCONNECT_PROJECT_ID = "99296b5d7acb2ca478909bd3e7b4f780";
const ALCHEMY_ID = "vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S";

const neon = { 
    id: 245022926,
    name: "Neon EVM Devnet",
    network: "Neon",
    nativeCurrency: {
        name: "NEON"
    },
    rpcUrls: {
        public: { http: ["https://devnet.neonevm.org"] },
        default: { http: ["https://devnet.neonevm.org"] },
    },
    blockExplorers: {
        etherscan: { name: "neonscan", url: "https://devnet.neonscan.org/" },
        default: { name: "neonscan", url: "https://devnet.neonscan.org/" },
    },
};

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: ALCHEMY_ID, // or infuraId
        walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Horsly",
        chains: [neon],
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

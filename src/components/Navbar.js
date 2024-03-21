"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDisconnect } from "wagmi";

const Navbar = () => {
    const router = useRouter();
    const [account, setAccount] = useState();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        if(typeof window !== undefined) {
            const helper = async () => {
                const provider = window.ethereum;
                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const signer = ethersProvider.getSigner();
                setAccount(await signer.getAddress());
            }
            helper();
        }
    }, []);

    const handleDisconnect = () => {
        disconnect();
        router.push("/connect");
    };

    return (
        <nav className="flex justify-between px-12 py-8 w-full bg-white">
            <a href={"/"} className="text-3xl font-semibold text-[#E2E2E2]">
                BLEND
            </a>
            {account ? (
                <button
                    onClick={handleDisconnect}
                    className="px-4 py-2 border text-black rounded-lg hover:bg-[#E2E2E2] transition-all"
                >
                    Disconnect Wallet
                </button>
            ) : (
                <button
                    onClick={() => {
                        router.push("/connect");
                    }}
                    className="px-4 py-2 text-black border rounded-lg hover:bg-[#E2E2E2] transition-all"
                >
                    Connect
                </button>
            )}
        </nav>
    );
};

export default Navbar;

//  className="px-4 py-2 text-black border rounded-lg hover:bg-[#E2E2E2] transition-all"

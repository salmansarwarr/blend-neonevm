"use client";

import Connect from "@/components/ConnectBtn";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

const page = () => {
    const {address} = useAccount();

    return (
        <>
            <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                <p>
                    A project developed in the SpiderHack by Botanix: the first
                    EVM Hackathon on Bitcoin
                </p>
            </nav>
            <Navbar />
            <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-20">
                <p className={`text-4xl text-center`}>
                    Test your ERC-5773 PASSPORT
                </p>
                <p className="text-[#888888] w-[450px] text-center text-sm">
                    Scan your wallet and choose the ERC-5773 NFT PASSPORT you
                    minted. Blend will fetch your digital replica with your NFT
                    passport on Spiderchain.
                </p>
                {address ? (
                    <Link
                        href={"/your-nfts/multiAsset"}
                        className="disabled:bg-gray-600 flex items-center bg-[#FFB72C] text-black gap-10 border px-14 py-4 rounded hover:bg-[#FBCD08] transition-all  cursor-pointer"
                    >
                        Scan your wallet
                    </Link>
                ) : (
                    <Connect link={"/"} theme="dark" />
                )}
            </div>
        </>
    );
};

export default page;

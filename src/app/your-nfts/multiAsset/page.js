"use client";

import Navbar from "@/components/Navbar";
import ScanLoading from "@/components/ScanLoading";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { getByAddress, getByAddressMultiAsset } from "@/utils/api";
import Link from "next/link";
import { ethers } from "ethers";

const page = () => {
    const [nfts, setNfts] = useState([]);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const helperFunc = async () => {
            const provider = window.ethereum;
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            const signer = ethersProvider.getSigner();
            const address = await signer.getAddress();
            const { data } = await getByAddressMultiAsset(address);
            const filteredData = data.filter(
                (item) => item.type === "ERC-5773"
            );
            if (filteredData.length === 0) setEmpty(true);
            setNfts(filteredData);
        };
        helperFunc();
    }, []);

    return (
        <>
            <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                <p>
                    A project developed in the SpiderHack by Botanix: the first
                    EVM Hackathon on Bitcoin
                </p>
            </nav>
            {nfts.length != 0 && <Navbar />}
            {nfts.length == 0 ? (
                <ScanLoading empty={empty} />
            ) : (
                <div className="bg-white w-full min-h-screen text-black flex flex-col items-center gap-6 py-20">
                    <p className={`text-4xl text-center`}>
                        Choose your available NFT PASSPORT
                    </p>
                    <p className="text-[#888888] w-[450px] text-center text-sm">
                        Once you choose the NFT Passport which you want to test,
                        Blend will locate your 3D replica files from the IPFS
                        network
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        {nfts.map((nft) => (
                            <Link
                                href={`/your-nfts/multiAsset/${nft.tokenId}`}
                                key={nft._id}
                                className="flex hover:bg-gray-100 transition-all justify-between items-center px-7 w-[326px] h-[65px] rounded-[10px] border border-[#ccc]"
                            >
                                <p>
                                    Token #
                                    {String(nft?.tokenId).padStart(3, "0")}
                                </p>
                                <FaArrowRightLong />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default page;

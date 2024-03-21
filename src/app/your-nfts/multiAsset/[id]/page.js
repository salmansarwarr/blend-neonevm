"use client";

import Navbar from "@/components/Navbar";
import ScanLoading from "@/components/ScanLoading";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMultiAssetByTokenId } from "@/utils/api";
import MultiAssetNft from "@/components/MultiAssetNft";
import { ethers } from "ethers";

const page = () => {
    const [address, setAddress] = useState();
    const [nft, setNft] = useState();
    const id = usePathname().split("/")[3];

    useEffect(() => {
        const helperFunc = async () => {
            const provider = window.ethereum;
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            const signer = ethersProvider.getSigner();
            setAddress(await signer.getAddress());
            const { data } = await getMultiAssetByTokenId(id);
            console.log(data);
            setNft(data);
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
            {nft && <Navbar />}
            {!nft ? (
                <ScanLoading scanPage={false} />
            ) : (
                <MultiAssetNft nft={nft} address={address} />
            )}
        </>
    );
};

export default page;

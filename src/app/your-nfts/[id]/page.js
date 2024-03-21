"use client";

import Navbar from "@/components/Navbar";
import ScanLoading from "@/components/ScanLoading";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { download, getByTokenId } from "@/utils/api";
import Link from "next/link";
import { beautifyAddress, handleDownload } from "@/utils/functions";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { mintImg } from "@/images";
import Image from "next/image";
import MultiAssetNft from "@/components/MultiAssetNft";
import { ethers } from "ethers";
import { useSignMessage } from "wagmi";
import { toast, ToastContainer } from "react-toastify";

const page = () => {
    const [address, setAddress] = useState();
    const [nft, setNft] = useState();
    const id = usePathname().split("/")[2];

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage(
        {
            async onSuccess(data) {
                try {
                    const actualAddress = ethers.utils.verifyMessage(
                        "Download mesh file",
                        data
                    );

                    if (actualAddress !== address) {
                        throw new Error("Unauthorized");
                    }

                    const options = {
                        message: "Download your mesh file",
                        signature: data,
                        owner: nft.address,
                        url: nft.meshFile.data,
                    };
                    const url = await download(options);

                    handleDownload(url.data);
                } catch (error) {
                    console.log(error);
                    toast.error(error, "Error in Downloading Data");
                }
            },

            onError(error) {
                console.log(error);
                toast.error(error, "Error in Downloading Data");
            },
        }
    );

    useEffect(() => {
        const helperFunc = async () => {
            const provider = window.ethereum;
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            const signer = ethersProvider.getSigner();
            setAddress(await signer.getAddress());
            const { data } = await getByTokenId(id);
            setNft(data);
        };
        helperFunc();
    }, []);

    return (
        <>
            <ToastContainer />
            <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                <p>
                    A project developed in the SpiderHack by Botanix: the first
                    EVM Hackathon on Bitcoin
                </p>
            </nav>
            {nft && <Navbar />}
            {!nft ? (
                <ScanLoading scanPage={false} />
            ) : nft.type === "ERC-5773" ? (
                <MultiAssetNft nft={nft} address={address} />
            ) : (
                <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-14">
                    <p
                        className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                            false && "text-[#457827]"
                        }`}
                    >
                        {address ? beautifyAddress(address) : "Your`"}s Digital
                        Identity PASSPORT
                    </p>

                    <div className="flex gap-8 items-center">
                        <Image
                            src={mintImg}
                            height={175}
                            width={175}
                            alt="mint"
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-[#888888] mb-2">
                                Below are the 3D files to render your identity:
                            </p>
                            <div className="flex items-center justify-between px-8 py-3 border rounded-lg">
                                <p className="text-[#888888]">
                                    Face Mesh Object File
                                </p>
                                {nft?.meshFile && (
                                    <button
                                        onClick={() =>
                                            signMessage({
                                                message: "Download mesh file",
                                            })
                                        }
                                    >
                                        <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link
                        href={"/"}
                        className="disabled:bg-gray-600 flex items-center bg-[#FFB72C] text-black gap-10 border px-8 py-2 rounded hover:bg-[#FBCD08] transition-all  cursor-pointer"
                    >
                        Return to homepage
                    </Link>
                </div>
            )}
        </>
    );
};

export default page;

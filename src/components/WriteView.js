"use client"

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar.js";
import { mintImg } from "@/images";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
    handleDownload,
    beautifyAddress,
} from "@/utils/functions.js";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation.js";
import arc721 from '@/assets/ARC721.json';
import { useContractWrite, useAccount, useWaitForTransaction, useContractRead } from 'wagmi'
import Image from "next/image.js";
import MintLoading from "./MintLoading.js";
import MintCompleted from "./MintCompleted.js";

export const WriteView = () => {
    const imageReducer = useSelector((state) => state.imageReducer);
    const router = useRouter();
    const [obj, setObj] = useState(imageReducer.objFile);
    const [isMinted, setIsMinted] = useState(imageReducer.minted);
    const [isPaid, setIsPaid] = useState(imageReducer.isPaid);
    const [ipfsURI, setIpfsURI] = useState(imageReducer.ipfsURI);
    const [name, setName] = useState(imageReducer.name);
    const [localStorageChecked, setLocalStorageChecked] = useState(false);
    const [minting, setMinting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [errored, setErrored] = useState(false);

    const { address } = useAccount();

    const CONTRACT_ADDRESS = "0xC637A7A594e06d6f86d447c1b640D6F06f273F24"

    useEffect(() => {
        if (typeof window !== undefined && window.localStorage) {
            if (!isPaid) {
                setIsPaid(localStorage.getItem("paid"));
            }
            if (!isMinted) {
                setIsMinted(localStorage.getItem("minted"));
            }
            if (!obj) {
                setObj(localStorage.getItem("s3_url"));
            }
            if (!ipfsURI) {
                setIpfsURI(localStorage.getItem("ipfs"));
            }
            if (!name) {
                setName(localStorage.getItem("name"));
            }
            if(!completed) {
                setCompleted(localStorage.getItem('minted'))
            }
            setLocalStorageChecked(true);
        }
    }, []);

    useEffect(() => {
        if (!isPaid && localStorageChecked) {
            toast.error(
                "You need to complete the payment. Redirecting to /payment."
            );
            router.push("/payment");
        }
        if (!ipfsURI && localStorageChecked) {
            toast.error("IPFS URI not available. Redirecting to /name.");
            router.push("/name");
        }
    }, [isPaid, obj, localStorageChecked, ipfsURI]);

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi: arc721,
        functionName: 'mint',
        args: [ipfsURI]
    })

    const waitForTransactions = useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            toast.success("NFT Minted");
            setMinting(false);
            setCompleted(true);
            if(typeof window !== undefined && window.localStorage) {
                localStorage.setItem('minted', true)
            }
        },
        onError(err) {
            toast.error("Failed to mint NFT");
            setMinting(false);
            setErrored(true)
        },
    });

    const handleMint = async () => {
        setMinting(true);
        write();
    };

    const tokenId = useContractRead({
        abi: arc721,
        address: CONTRACT_ADDRESS,
        functionName: 'tokenCounter'
    }).data?.toString();

    if (errored) {
        return (
            <>
                <Navbar />
                <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-12 py-14">
                    <h1 className="text-xl text-black">
                        Some error occured, try reloading!
                    </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            {minting ? <MintLoading /> : completed ? <MintCompleted tokenId={tokenId} address={address} name={name} txHash={data?.hash} ipfsURI={ipfsURI}/> :
                <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-14">
                    <p
                        className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${false && "text-[#457827]"
                            }`}
                    >
                        {address ? beautifyAddress(address) : 'Your`'}s Digital Identity PASSPORT
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
                                Below are the 3D files to render
                                your identity:
                            </p>
                            <div className="flex items-center justify-between px-8 py-3 border rounded-lg">
                                <p className="text-[#888888]">
                                    Face Mesh Object File
                                </p>
                                {obj && (
                                    <button
                                        onClick={() =>
                                            handleDownload(obj)
                                        }
                                    >
                                        <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleMint}
                        className="disabled:bg-gray-600 flex items-center bg-[#FFB72C] text-black gap-10 border px-8 py-2 rounded hover:bg-[#FBCD08] transition-all  cursor-pointer"
                    >
                        Mint into ERC-721 token
                    </button>
                    <p className="text-[#888888] max-w-[532px] text-center text-sm">
                        This DAPP is a demo to showcase the Blend toolkit. If you
                        continue to mint your identity PASSPORT, you agree to make
                        your identity 3D rendering files to be publicly accessible.
                        If you just wanted to view the result, simply download the
                        above files and use a viewer.
                    </p>

                </div >
            }
        </>
    );
};

"use client";

import { beautifyAddress, clearIndexedDB, getObjFromIndexedDB } from "@/utils/functions";
import { mintBigImg } from "@/images";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import erc5773 from "@/assets/ERC5773.json";
import { getByTokenId, getMultiAssetByTokenId, postNft, updateNft, updateNftFiles } from "@/utils/api";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const MintCompleted = ({
    address,
    name,
    txHash,
    tokenId,
    time,
    ipfsURI,
    mintPage = true,
    multiAsset = false,
}) => {
    const router = useRouter();
    const imageReducer = useSelector((state) => state.imageReducer);
    const [fileUris, setFileUris] = useState(imageReducer.fileUris);
    const [fileNames, setFileNames] = useState([]);
    const [fileNo, setFileNo] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== undefined && window.localStorage) {
            if (fileUris.length == 0) {
                setFileUris(JSON.parse(localStorage.getItem("fileUris")));
            }
            const helper = async () => {
                const filesDb = await getObjFromIndexedDB();
                if (fileNames.length === 0) {
                    const newFileNames = filesDb
                        .slice(1)
                        .map((file) => file.name);
                    setFileNames([...newFileNames]); // Update state once
                }
            };
            helper();
        }
    }, []);

    const handleRedirect = async (path) => {
        if (typeof window !== undefined && window.localStorage) {
            localStorage.clear();
            await clearIndexedDB();
            router.push(path);
        }
    };

    const CONTRACT_ADDRESS = "0x70BaEC28BEAb726Cf00F688D1d260B6e6Aec2F66";

    const handleAddAsset = async () => {
        setLoading(true);
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc5773, signer);
        try {
            const txResponse = await contract.addAssets(
                tokenId,
                fileUris[fileNo]
            );
            await txResponse.wait();
    
            const nft = (await getMultiAssetByTokenId(tokenId)).data;
            const files = fileUris.map((file, i) => ({
                name: fileNames[i],
                file,
                equipped: false
            }))
            
            const updatedNft = {
                ...nft,
                files: nft.files ? [...nft.files, ...files] : files,
            } 
                   
            await updateNft(updatedNft);
            toast.success(`Added ${fileNames[fileNo]} as asset`);
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Failed to add ${fileNames[fileNo]} as asset`);
        } finally {
            setLoading(false);
            setFileNo(prev => prev + 1); 
        }
    };
    

    const url = `https://3xpl.com/botanix/transaction/${txHash || ""}`;

    if (loading) {
        return (
            <div className={`flex items-center justify-center bg-white z-50`} style={{ height: 'calc(85vh)' }}>
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-16 h-16 text-gray-200 animate-spin dark:text-white fill-black"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-14">
            <p
                className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                    false && "text-[#457827]"
                }`}
            >
                {beautifyAddress(address)}`s Digital Identity PASSPORT
            </p>
            <>
                <div className="flex gap-8 items-center">
                    <Image
                        src={mintBigImg}
                        height={175}
                        width={175}
                        alt="mint"
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-[1.3rem] font-light">{name}</p>
                        <p className="text-[#888888] text-sm">
                            by {address && beautifyAddress(address)}
                        </p>
                        <p className="text-[#888888] text-sm">
                            Created on
                            {time || "6/12/2023 1:55AM"}
                        </p>
                        <p className="text-sm">
                            {tokenId && (
                                <Link
                                    href={url}
                                    target="_blank"
                                    className="hover:underline"
                                >
                                    Token ID: {tokenId}
                                </Link>
                            )}
                        </p>
                    </div>
                </div>
                <Link
                    className="underline text-blue-500 w-full text-center"
                    href={ipfsURI}
                    target="_blank"
                >
                    {"->"} Your nft metadata
                </Link>
                {mintPage && multiAsset && fileNames[fileNo] && (
                    <button
                        onClick={handleAddAsset}
                        className="disabled:bg-gray-600 flex items-center bg-black text-white gap-10 border px-8 py-2 rounded hover:bg-gray-800 transition-all  cursor-pointer"
                    >
                        Add {fileNames[fileNo]} as Asset
                    </button>
                )}
                <button
                    onClick={() => handleRedirect("/")}
                    className="disabled:bg-gray-600 flex items-center bg-[#FFB72C] text-black gap-10 border px-8 py-2 rounded hover:bg-[#FBCD08] transition-all  cursor-pointer"
                >
                    Redirect to Home Page
                </button>
            </>
        </div>
    );
};

export default MintCompleted;

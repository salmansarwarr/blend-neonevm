"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";;
import { mintImg } from "@/images";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
    handleDownload,
    beautifyAddress,
    getCurrentTimeFormatted,
    clearIndexedDB,
} from "@/utils/functions.js";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation.js";
import erc721 from "@/assets/ERC721.json";
import Image from "next/image.js";
import MintLoading from "@/components/MintLoading.js";
import MintCompleted from "@/components/MintCompleted.js";
import { ethers } from "ethers";
import { encrypt, postNft } from "@/utils/api";
import bg from "../../../../public/bg5.png";
import logo from "@/images/logo.png";

const WriteView = () => {
    const imageReducer = useSelector((state) => state.imageReducer);
    const router = useRouter();
    const [obj, setObj] = useState(imageReducer.objFile);
    const [isPaid, setIsPaid] = useState(imageReducer.isPaid);
    const [ipfsURI, setIpfsURI] = useState(imageReducer.ipfsURI);
    const [name, setName] = useState(imageReducer.name);
    const [localStorageChecked, setLocalStorageChecked] = useState(false);
    const [minting, setMinting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [errored, setErrored] = useState(false);
    const [hash, setHash] = useState();
    const [tokenId, settokenId] = useState();
    const [address, setAddress] = useState();

    const CONTRACT_ADDRESS = "0x351E271906F1473eD8dA8Ca05f8e938c5A537fEc";

    useEffect(() => {
        if (typeof window !== undefined && window.localStorage) {
            if (!isPaid) {
                setIsPaid(localStorage.getItem("paid"));
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
            if (!completed) {
                setCompleted(localStorage.getItem("minted"));
            }
            setHash(localStorage.getItem("txHash"));
            setLocalStorageChecked(true);
        }

        if (typeof window !== undefined) {
            const helper = async () => {
                const provider = window.ethereum;
                const ethersProvider = new ethers.providers.Web3Provider(
                    provider
                );
                const signer = ethersProvider.getSigner();
                setAddress(await signer.getAddress());
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    erc721,
                    signer
                );
                settokenId(parseInt((await contract._tokenIds()).toString()));
            };
            helper();
        }
    }, []);

    useEffect(() => {
        if ((!isPaid || isPaid == "false") && localStorageChecked) {
            toast.error(
                "You need to complete the payment. Redirecting to /payment."
            );
            router.push("/payment/emotable");
        }
        if (!ipfsURI && localStorageChecked) {
            toast.error("IPFS URI not available. Redirecting to /name.");
            router.push("/name/emotable");
        }
    }, [isPaid, obj, localStorageChecked, ipfsURI]);

    const handleMint = async () => {
        setMinting(true);

        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc721, signer);
        try {
            const txResponse = await contract.mint(ipfsURI);
            await txResponse.wait();
            setHash(txResponse?.hash);
            toast.success("NFT Minted");
            indexedDB.deleteDatabase("MyDatabase");
            clearIndexedDB();
            if (typeof window !== undefined && window.localStorage) {
                localStorage.setItem("paid", false);
                localStorage.setItem("txHash", txResponse?.hash);
            }
            setMinting(false);
            const url = `https://3xpl.com/botanix/transaction/${
                txResponse?.hash || ""
            }`;
            const meshFile = await encrypt(obj);
            // const address = useAccount();
            const newNft = {
                name,
                tokenId: (parseInt(tokenId) + 1).toString(),
                address,
                meshFile,
                tokenUri: ipfsURI,
                url,
                time: getCurrentTimeFormatted(),
                type: "ERC-7409",
                emojis: [],
            };
            postNft(newNft);
            settokenId((prev) => parseInt(prev) + 1);
            setCompleted(true);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to mint NFT");
            setMinting(false);
            setErrored(true);
        }
    };

    if (errored) {
        return (
            <div
                style={{
                    background: `url(${bg.src})`,
                }}
                className="w-full h-screen text-white"
            >
                <div className="w-full py-10 px-12">
                    <Image src={logo} height={43} width={101} alt="logo" />
                </div>
                <div className="w-full h-screenflex flex-col items-center gap-12 py-14">
                    <h1 className="text-xl">
                        Some error occured, try reloading!
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            {minting ? (
                <MintLoading />
            ) : completed && completed != "false" ? (
                <MintCompleted
                    tokenId={tokenId}
                    address={address}
                    name={name}
                    txHash={hash}
                    ipfsURI={ipfsURI}
                    time={getCurrentTimeFormatted()}
                />
            ) : (
                <div
                    style={{
                        background: `url(${bg.src})`,
                    }}
                    className="w-full h-screen text-white"
                >
                    <div className="w-full py-10 px-12">
                        <Image src={logo} height={43} width={101} alt="logo" />
                    </div>
                    <div className="flex flex-col items-center gap-10 py-14">
                        <p
                            className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                                false && "text-[#457827]"
                            }`}
                        >
                            {address ? beautifyAddress(address) : "Your`"}s
                            Digital Identity PASSPORT
                        </p>

                        <div className="flex gap-8 items-center">
                            <Image
                                src={mintImg}
                                height={175}
                                width={175}
                                alt="mint"
                                className="opacity-50 rounded"
                            />
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Below are the 3D files to render your
                                    identity:
                                </p>
                                <div className="flex items-center justify-between px-8 py-3 border rounded-lg">
                                    <p>Face Mesh Object File</p>
                                    {obj && (
                                        <button
                                            onClick={() => handleDownload(obj)}
                                        >
                                            <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleMint}
                            style={{
                                borderImageSource:
                                    "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                                borderImageSlice: 1,
                            }}
                            className={`mt-2 border-[4px] px-6 py-3 w-[300px] text-center cursor-pointer`}
                        >
                            Mint into ERC-7409 Token
                        </button>
                        <p className="max-w-[532px] text-center text-sm font-light">
                            This DAPP is a demo to showcase the Blend toolkit.
                            If you continue to mint your identity PASSPORT, you
                            agree to make your identity 3D rendering files to be
                            publicly accessible. If you just wanted to view the
                            result, simply download the above files and use a
                            viewer.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default WriteView;

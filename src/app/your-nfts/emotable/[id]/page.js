"use client";

import Navbar from "@/components/Navbar";
import ScanLoading from "@/components/ScanLoading";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    download,
    getEmotableByTokenId,
    updateEmotableByTokenId,
} from "@/utils/api";
import Link from "next/link";
import { beautifyAddress, handleDownload } from "@/utils/functions";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { mintImg } from "@/images";
import Image from "next/image";
import MultiAssetNft from "@/components/MultiAssetNft";
import EmojiPicker from "emoji-picker-react";
import { FaHeart } from "react-icons/fa";
import { ethers } from "ethers";
import erc7409 from "@/assets/ERC7409.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignMessage } from "wagmi";

const CONTRACT_ADDRESS = "0x18BB6828A09E1bB6B6De229Df35b3951fFAD7d5E";
const ERC721_ADDRESS = "0x78873678Ca6471F4D6791cdfaBEF3Df3313abbE9";

const page = () => {
    const [address, setAddress] = useState();
    const [nft, setNft] = useState();
    const id = usePathname().split("/")[3];
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState();
    const [emojis, setEmojis] = useState([]);

    const handleClick = async (emojiInfo) => {
        const { emoji } = emojiInfo;
        setSelectedEmoji(emoji);
        setLoading(true);

        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc7409, signer);

        try {
            const txResponse = await contract.emote(
                ERC721_ADDRESS,
                id,
                emoji,
                true
            );
            await txResponse.wait();
            let updatedNft;
            if (nft.emojis) {
                updatedNft = { ...nft, emojis: [...nft.emojis, emoji] };
            } else {
                updatedNft = { ...nft, emojis: [emoji] };
            }
            delete updatedNft._id;
            await updateEmotableByTokenId(id, updatedNft);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }

        console.log(emojis);
        emojis ? setEmojis((prev) => [...prev, emoji]) : setEmojis([emoji]);
        setOpen(false);
        setLoading(false);
    };

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
            const { data } = await getEmotableByTokenId(id);
            console.log(data);
            setNft(data);
            setEmojis(data.emojis);
        };
        helperFunc();
    }, []);

    if (loading) {
        return (
            <div className="bg-white w-full min-h-screen h-full text-black flex flex-col justify-center items-center gap-10 py-14">
                <p
                    className={`${"text-4xl"} text-center max-w-[935px] font-light `}
                >
                    Emoting with {selectedEmoji}..
                </p>
                <p className="max-w-[532px] text-center text-sm">
                    Please wait while we emote your NFT Passport
                </p>
                <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full border-t-4 border-black h-12 w-12"></div>
                </div>
            </div>
        );
    }

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
                <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-2">
                    <p
                        className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                            false && "text-[#457827]"
                        }`}
                    >
                        {address ? beautifyAddress(address) : "Your`"}s Digital
                        Identity PASSPORT
                    </p>

                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col items-center">
                            <Image
                                src={mintImg}
                                height={175}
                                width={175}
                                alt="mint"
                            />
                            <button
                                onClick={() => setOpen((prev) => !prev)}
                                className="flex gap-2 items-center justify-center bg-[#FFB72C] hover:bg-[#FBCD08] transition-all rounded-full mt-4 px-4 py-2"
                            >
                                <FaHeart />
                                <p>Emote Me!</p>
                            </button>
                            <EmojiPicker
                                open={open}
                                onEmojiClick={handleClick}
                                theme="dark"
                                className="mt-4"
                                height={290}
                                width={300}
                                style={{ position: "absolute", top: "31rem" }}
                            />
                        </div>
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
                                        onClick={() =>{
                                            console.log('hi');
                                            signMessage({
                                                message: "Download mesh file",
                                            })
                                        }}
                                    >
                                        <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                    </button>
                                )}
                            </div>
                            {emojis && emojis.length > 0 && (
                                <p className="mt-2 px-2">
                                    Your current emoji(s):{" "}
                                    {emojis.map((emoji) => emoji)}{" "}
                                </p>
                            )}
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

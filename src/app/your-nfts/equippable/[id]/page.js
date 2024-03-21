"use client";

import Navbar from "@/components/Navbar";
import ScanLoading from "@/components/ScanLoading";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    download,
    getByTokenId,
    getEquippableByTokenId,
    getMultiAssetByTokenId,
    updateNft,
} from "@/utils/api";
import Link from "next/link";
import { beautifyAddress, handleDownload } from "@/utils/functions";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { mintImg, tickGray, tickGreen } from "@/images";
import Image from "next/image";
import { ethers } from "ethers";
import erc6220 from "@/assets/ERC6220.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { sendFileToPinata } from "@/utils/pinata";
import Loader from "@/components/Loader";
import { useSignMessage } from "wagmi";

const CONTRACT_ADDRESS = "0xA5F1e012619D08a698dc37f6e34AbA254A846DcF";

const page = () => {
    const [address, setAddress] = useState();
    const [nft, setNft] = useState();
    const id = usePathname().split("/")[3];
    const [slotNo, setSlotNo] = useState(1);
    const [children, setChildren] = useState([]);
    const [slots, setSlots] = useState([]);
    const [parts, setParts] = useState();
    const [loading, setLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const router = useRouter();

    useEffect(() => {
        const helperFunc = async () => {
            const provider = window.ethereum;
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            const signer = ethersProvider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                erc6220,
                signer
            );
            setAddress(await signer.getAddress());
            const child = await contract.childrenOf(id);
            setChildren(child);
            const parts = await contract.getAssetAndEquippableData(id, id);
            setParts(parts.partIds);
            const slotsLocal = [];
            child.map(async (c, i) => {
                const equipment = await contract.getEquipment(
                    id,
                    CONTRACT_ADDRESS,
                    parts.partIds[i]
                );
                slotsLocal.push(equipment.childAssetId.toString());
                if (equipment.childAssetId != 0) {
                    setSlotNo((prev) => prev++);
                }
            });
            setSlots(slotsLocal);
            const { data } = await getEquippableByTokenId(id);
            setNft(data);
        };
        helperFunc();
    }, []);

    const handleUnequip = async (tokenId, childIndex) => {
        setLoading(true);
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc6220, signer);
        try {
            const nft = (await getEquippableByTokenId(tokenId)).data;
            const updatedFiles = nft.files;
            updatedFiles[childIndex].equipped = false;

            const updatedNft = {
                ...nft,
                files: updatedFiles,
            };

            await updateNft(updatedNft);
            await (
                await contract.mintChild(tokenId, updatedFiles[0].file)
            ).wait();
            // toast.success("Refresh for the changes to take effect");
            alert("Refresh for the changes to take effect");
            setLoading(false);
        } catch (error) {
            toast.error(error);
            console.log(error);
            setLoading(false);
        }
    };

    const handleEquip = async (
        tokenId,
        childIndex,
        assetId,
        slotId,
        childId
    ) => {
        setLoading(true);
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc6220, signer);

        // const txResponse = await contract.equipToken(
        //     1,
        //     CONTRACT_ADDRESS,
        //     slotId,
        //     [tokenId, childIndex, assetId, slotId, childId]
        // );
        // await txResponse.wait();
        try {
            const nft = (await getEquippableByTokenId(tokenId)).data;
            const updatedFiles = nft.files;
            updatedFiles[childIndex].equipped = true;

            const updatedNft = {
                ...nft,
                files: updatedFiles,
            };

            await updateNft(updatedNft);
            await (
                await contract.mintChild(tokenId, updatedFiles[0].file)
            ).wait();
            // toast.success("Refresh for the changes to take effect");
            alert("Refresh for the changes to take effect");
            setLoading(false);
        } catch (error) {
            toast.error(error);
            console.log(error);
            setLoading(false);
        }
    };

    const handleImageInput = async () => {
        setLoading(true);
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc6220, signer);
        try {
            const res = await sendFileToPinata(uploadedImage);
            const uri = `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`;
            await (await contract.mintChild(id, uri)).wait();
            const { data } = await getEquippableByTokenId(id);

            const newfiles = [
                ...data.files,
                {
                    name: uploadedImage.name,
                    file: uri,
                    equipped: false,
                },
            ];

            const updatedNft = {
                ...nft,
                files: newfiles,
            };

            await updateNft(updatedNft);
            alert("reload for the changes to take effect!");
            setLoading(false);
        } catch (error) {
            console.error(`Error processing file`, error);
            // Handle error as needed, e.g., continue with next file or abort
        }
    };

    const handleChange = (e) => {
        setUploadedImage(e.target.files[0]);
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
                    console.log(url);

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
            {!nft || loading ? (
                <ScanLoading scanPage={false} />
            ) : (
                <div className="bg-white w-full min-h-screen text-black flex flex-col items-center gap-10 py-10">
                    <p
                        className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                            false && "text-[#457827]"
                        }`}
                    >
                        {address ? beautifyAddress(address) : "Your`"}s Digital
                        Identity PASSPORT
                    </p>

                    <div className="flex flex-col gap-8 items-center">
                        <Image
                            src={mintImg}
                            height={175}
                            width={175}
                            alt="mint"
                        />
                        <div className="flex gap-8">
                            <div className="flex flex-col gap-2">
                                <p className="text-[#888888] mb-2">
                                    Below are the 3D files to render your
                                    identity:
                                </p>
                                <div className="flex items-center justify-between px-8 py-3 border rounded-lg">
                                    <p className="text-[#888888]">
                                        Face Mesh Object File
                                    </p>
                                    {nft?.meshFile && (
                                        <button
                                            onClick={() =>
                                                signMessage({
                                                    message:
                                                        "Download mesh file",
                                                })
                                            }
                                        >
                                            <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-[#888888] mt-4 mb-2 ml-2">
                                    Items Equipped (
                                    {children.length -
                                        nft.files.filter(
                                            (file) => file.equipped
                                        ).length}
                                    {"  "}
                                    item slots):
                                </p>
                                {nft?.files &&
                                    nft?.files.map((file, index) => {
                                        if (file.equipped)
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <div className="flex items-center justify-between px-8 py-3 flex-1 border rounded-lg">
                                                        <p className="text-[#888888]">
                                                            {file?.name
                                                                ? file.name
                                                                : `File ${
                                                                      index + 1
                                                                  }`}
                                                        </p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleUnequip(
                                                                        id,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Image
                                                                    src={
                                                                        tickGreen
                                                                    }
                                                                    width={22}
                                                                    height={22}
                                                                    objectFit="contain"
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleDownload(
                                                                file?.file
                                                            )
                                                        }
                                                    >
                                                        <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                                    </button>
                                                </div>
                                            );
                                    })}
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[#888888] mb-2">
                                    Catalog (items available to equip):
                                </p>
                                {nft?.files &&
                                    nft?.files.map((file, index) => {
                                        if (!file?.equipped)
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between px-8 py-3 border rounded-lg"
                                                >
                                                    <p className="text-[#888888]">
                                                        {file?.name
                                                            ? file.name
                                                            : `File ${
                                                                  index + 1
                                                              }`}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEquip(
                                                                    id,
                                                                    index,
                                                                    id,
                                                                    parseInt(
                                                                        parts[
                                                                            slotNo
                                                                        ]
                                                                    ),
                                                                    "abc"
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={tickGray}
                                                                width={22}
                                                                height={22}
                                                                objectFit="contain"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 max-w-[593px]">
                        <label
                            htmlFor="file-upload"
                            className="flex items-center gap-5 w-fit"
                        >
                            <div className="flex items-center gap-10 border px-8 py-3 rounded-lg hover:bg-[#E2E2E2] transition-all  cursor-pointer">
                                <p>
                                    {uploadedImage
                                        ? uploadedImage.name
                                        : "Click here to Mint child"}
                                </p>
                                {uploadedImage ? (
                                    <RxCross2 />
                                ) : (
                                    <FaArrowRightLong />
                                )}
                            </div>
                            {uploadedImage && (
                                <button onClick={handleImageInput}>
                                    <FiArrowRightCircle className="text-3xl text-[#CCCCCC] hover:text-gray-700 cursor-pointer transition-all" />
                                </button>
                            )}
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleChange}
                        />
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

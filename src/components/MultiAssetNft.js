"use client";

import Link from "next/link";
import { beautifyAddress, handleDownload } from "@/utils/functions";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { mintImg } from "@/images";
import Image from "next/image";
import { ethers } from "ethers";
import erc5773 from "@/assets/ERC5773.json";
import { download, updateNft } from "@/utils/api";
import { useRouter } from "next/navigation";
import { sendFileToPinata } from "@/utils/pinata";
import { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";
import { useSignMessage } from "wagmi";
import { toast, ToastContainer } from "react-toastify";

const CONTRACT_ADDRESS = "0xBa90096276c1DdB02A2cCaE929f1df8555Dd5c4e";

const MultiAssetNft = ({ nft, address }) => {
    const router = useRouter();
    const [uploadedImage, setUploadedImage] = useState();
    const [loading, setLoading] = useState(false);

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

    const handleImageInput = async () => {
        setLoading(true);
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, erc5773, signer);
        try {
            const res = await sendFileToPinata(uploadedImage);
            console.log(res);
            const uri = `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`;

            const txResponse = await contract.addAssets(nft.tokenId, uri);
            await txResponse.wait();

            const newfiles = [
                ...nft.files,
                {
                    name: uploadedImage.name,
                    file: uri,
                    equipped: false,
                    added: true,
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

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-white w-full min-h-screen text-black flex flex-col items-center gap-10 py-8">
                <p
                    className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light ${
                        false && "text-[#457827]"
                    }`}
                >
                    {address ? beautifyAddress(address) : "Your`"}s Digital
                    Identity PASSPORT
                </p>

                <div className="flex flex-col gap-8 items-center">
                    <Image src={mintImg} height={175} width={175} alt="mint" />
                    <div className="flex flex-col gap-2">
                        <p className="text-[#888888] mb-2 ml-2">
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

                        <p className="text-[#888888] mt-4 mb-2 ml-2">
                            Assets attached:
                        </p>
                        {nft?.files &&
                            nft.files.map((file, index) => (
                                <>
                                    {file.added && (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between px-8 py-3 border rounded-lg"
                                        >
                                            <p className="text-[#888888]">
                                                {file.name
                                                    ? file.name
                                                    : `File ${index + 1}`}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            file.file
                                                        )
                                                    }
                                                >
                                                    <IoCloudDownloadOutline className="text-[#58B91D] text-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
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
                                    : "Add Asset"}
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
        </>
    );
};

export default MultiAssetNft;

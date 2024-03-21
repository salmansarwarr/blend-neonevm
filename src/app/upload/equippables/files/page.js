"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { beautifyAddress, saveFileToIndexedDB } from "@/utils/functions";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { setMultiAssetFiles } from "@/redux/slices/imageSlice";

const Upload = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const imageReducer = useSelector((state) => state.imageReducer);
    const [isConnected, setIsConnected] = useState(imageReducer.isConnected);
    const [localStorageChecked, setLocalStorageChecked] = useState(false);

    useEffect(() => {
        if (typeof window !== undefined && window.localStorage) {
            if (!isConnected) {
                setIsConnected(localStorage.getItem("isConnected"));
            }
            setLocalStorageChecked(true);
        }
    }, []);

    useEffect(() => {
        if (!isConnected && localStorageChecked) {
            toast.error("You are not connected. Redirecting to /connect.");
            router.push("/connect");
        }
    }, []);

    const handleChange = (e) => {
        setUploadedImages((prev) => [...prev, e.target.files[0]]);
    };

    const handleImageInput = () => {
        uploadedImages.map((image, i) => {
            dispatch(setMultiAssetFiles(image));
            saveFileToIndexedDB(image, `image ${i + 1}`);
        });
        toast.success("Image uploaded successfully. Redirecting to /payment.");
        router.push("/payment/equippable");
    };

    if (!localStorageChecked) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-white w-full h-screen text-black">
                <Navbar />
                <div className="flex justify-center gap-24 pt-10">
                    <div className="flex flex-col gap-6 max-w-[593px]">
                        <p className="text-3xl leading-[1.5] font-light">
                            Upload equippables (support JPEG/PNG) to equip them
                            to your NFT Passport from an inventory catalog.
                        </p>
                        <label
                            htmlFor="file-upload"
                            className="flex items-center gap-5 w-fit"
                        >
                            <div className="flex items-center gap-10 border px-8 py-3 rounded-lg hover:bg-[#E2E2E2] transition-all  cursor-pointer">
                                <p>Click here to upload</p>

                                <FaArrowRightLong />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/jpeg, image/png"
                            style={{ display: "none" }}
                            onChange={handleChange}
                        />
                        <div className="flex items-center gap-5 w-fit mt-2">
                            <button
                                onClick={handleImageInput}
                                className="flex items-center gap-16 bg-[#FFB72C] text-black border px-8 py-3 rounded-lg hover:bg-[#FBCD08] transition-all  cursor-pointer"
                            >
                                <p>Finish Uploading</p>
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col font-light text-2xl gap-3 pt-6">
                        <p className="mb-2">Equippables in the catalog:</p>
                        {uploadedImages.map((img, i) => (
                            <div
                                key={i}
                                className="max-w-[425px] flex items-center gap-10 border px-6 py-3 rounded-lg hover:bg-[#E2E2E2] transition-all  cursor-pointer"
                            >
                                <p className="font-normal text-sm">
                                    {beautifyAddress(img.name, 28)}
                                </p>
                                <RxCross2
                                    onClick={() =>
                                        setUploadedImages((prev) => {
                                            const newImages = [...prev];
                                            newImages.splice(i, 1);
                                            return newImages;
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;

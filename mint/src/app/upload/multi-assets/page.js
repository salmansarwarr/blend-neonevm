"use client";

import { uplaodPageImg } from "@/images";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FiArrowRightCircle } from "react-icons/fi";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setImage } from "@/redux/slices/imageSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveFileToIndexedDB } from "@/utils/functions";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import bg from "../../../../public/bg5.png";
import logo from "@/images/logo.png";
import Image from "next/image";

const Upload = () => {
    const [uploadedImage, setUploadedImage] = useState();
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
        setUploadedImage(e.target.files[0]);
    };

    const handleImageInput = () => {
        dispatch(setImage(uploadedImage));
        saveFileToIndexedDB(uploadedImage, "image");
        toast.success("Image uploaded successfully. Redirecting to /payment.");
        router.push("/upload/files");
    };

    if (!localStorageChecked) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <div
                style={{
                    background: `url(${bg.src})`,
                }}
                className="w-full h-screen text-white"
            >
                <div className="w-full py-10 px-12">
                    <Image src={logo} height={43} width={101} alt="logo" />
                </div>
                <div className="flex items-center justify-center gap-20 pt-10">
                    <div className="flex flex-col gap-6 max-w-[593px]">
                        <p className="text-3xl leading-[1.5] font-light">
                            Upload a high detail image of your front face with
                            clean background and following the correct face
                            ratio and resolution.
                        </p>
                        <label
                            htmlFor="file-upload"
                            className="flex items-center gap-5 w-fit"
                        >
                            <div
                                style={{
                                    borderImageSource:
                                        "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                                    borderImageSlice: 1,
                                }}
                                className={`mt-2 border-[4px] px-6 py-3 flex w-[300px] items-center justify-between transition-all cursor-pointer`}
                            >
                                <p className="inline-block rounded-md bg-transparent text-white text-lg transition duration-150 ">
                                    {uploadedImage
                                        ? uploadedImage.name
                                        : "Click here to upload"}
                                </p>
                                {uploadedImage ? (
                                    <RxCross2 />
                                ) : (
                                    <FaArrowRightLong />
                                )}
                            </div>
                            {uploadedImage && (
                                <button onClick={handleImageInput}>
                                    <FiArrowRightCircle className="text-3xl cursor-pointer transition-all" />
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
                    <div>
                        <div className="text-center mr-[14%] font-light mb-2 text-[1.3rem]">
                            1128
                        </div>
                        <div className="flex gap-2 items-center">
                            <img
                                width={309}
                                height={412}
                                src={uplaodPageImg.src}
                                alt="image standard"
                            />
                            <div className="text-center font-light text-[1.3rem]">
                                1504
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;

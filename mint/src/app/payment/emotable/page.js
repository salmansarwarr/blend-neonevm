"use client";


import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setObjFile, setPaid } from "@/redux/slices/imageSlice";
import { useEffect, useState } from "react";
import {
    uploadImageToS3,
    sendImageToFlask,
    getObjFromIndexedDB,
    clearIndexedDB,
} from "@/utils/functions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import bg from "../../../../public/bg5.png";
import logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const getInstanceState = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_GET_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: process.env.NEXT_PUBLIC_AUTH_TOKEN,
            },
        });
        const data = await response.json();
        return data.body.includes("running");
    } catch (error) {
        console.error("Error getting AWS instance:", error);
    }
};

const startAwsInstance = async (setLoading) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_START_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: process.env.NEXT_PUBLIC_AUTH_TOKEN,
            },
        });

        if (response.ok) {
            console.log("Starting AWS instance...");
            setTimeout(() => {
                setLoading(false);
                console.log("AWS instance started successfully.");
            }, 10 * 1000);
        } else {
            console.error("Failed to start AWS instance.");
        }
    } catch (error) {
        console.error("Error starting AWS instance:", error);
    }
};

const stopInstance = async () => {
    try {
        if (getInstanceState()) {
            const response = await fetch(
                process.env.NEXT_PUBLIC_STOP_ENDPOINT,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorizationToken: process.env.NEXT_PUBLIC_AUTH_TOKEN,
                    },
                }
            );

            if (response.ok) {
                console.log("AWS instance stopped successfully.");
            } else {
                console.error("Failed to stop AWS instance.");
            }
        }
    } catch (error) {
        console.error("Error stopping AWS instance:", error);
    }
};

const Payment = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const imageReducer = useSelector((state) => state.imageReducer);
    const [imageFile, setImageFile] = useState(imageReducer.img);
    const [loading, setLoading] = useState(true);
    const [isPaid, setIsPaid] = useState(imageReducer.isPaid);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [payment, setPayment] = useState(true);

    useEffect(() => {
        startAwsInstance(setLoading);
        const stopAwsInstanceAfterDelay = () => {
            setTimeout(async () => {
                await stopInstance();
            }, 5 * 60 * 1000);
        };

        stopAwsInstanceAfterDelay();

        const beforeUnloadHandler = async (event) => {
            event.preventDefault();
            if (getInstanceState()) {
                await stopInstance();
            }
        };

        if (typeof window !== undefined) {
            window.addEventListener("beforeunload", beforeUnloadHandler);

            return () => {
                window.removeEventListener("beforeunload", beforeUnloadHandler);
            };
        }
    }, []); //

    useEffect(() => {
        if (!imageFile) {
            const files = getObjFromIndexedDB();
            setImageFile(files[0]);
        }
        if (!isPaid) {
            setIsPaid(localStorage.getItem("paid"));
        }
    }, [imageFile]);

    const handleUpload = async () => {
        if (!imageFile) {
            toast.error("No image file to upload.");
            console.error("No image file to upload");
            router.push("/upload/emotable");
            return; // Exit the function early
        }

        if (!(await getInstanceState())) {
            router.push("/?error=true");
            return; // Exit the function early
        }

        let set = 0;
        let s3_url;
        let intervalPromise = new Promise((resolve, reject) => {
            let intervalId = setInterval(async () => {
                if (set > 4) {
                    clearInterval(intervalId);
                    reject("Interval completed without finding S3 URL.");
                } else {
                    set++;
                    const s3Response = await uploadImageToS3(imageFile);
                    const flaskResponse = await sendImageToFlask(imageFile);

                    if (flaskResponse?.s3_url) {
                        s3_url = flaskResponse.s3_url;
                        if (set === 4) {
                            resolve(s3_url);
                        }
                    } else {
                        console.error("S3 URL not available");
                    }
                }
            }, 15 * 1000);
        });

        try {
            s3_url = await intervalPromise;
        } catch (error) {
            console.error(error);
            return; // Exit the function early if interval failed
        }

        dispatch(setObjFile(s3_url));
        localStorage.setItem("s3_url", s3_url);
        await stopInstance();
        await sendTransaction();
    };

    const sendTransaction = async () => {
        setPaymentLoading(true);
        const provider = window.ethereum;

        const ethersProvider = new ethers.providers.Web3Provider(provider);

        const signer = ethersProvider.getSigner();

        const tx = {
            to: "0xB7EEbCC43E97Ec77658F43865b235C1438e465Af",
            value: ethers.utils.parseEther("0.00002"),
        };

        try {
            const txResponse = await signer.sendTransaction(tx);
            const txReceipt = await txResponse.wait();
            if (txReceipt.transactionHash) {
                toast.success(txReceipt.transactionHash);
                setPaid(true);
                if (typeof window !== undefined && window.localStorage) {
                    localStorage.setItem("paid", true);
                }
                router.push("/name/emotable");
            } else {
                toast.error("Transaction failed");
                setLoading(false);
            }
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
        setPaymentLoading(true);
    };

    const handleClick = async () => {
        setWaiting(true);
        setPayment(false);
        setLoading(true);
        await handleUpload();
    };

    return (
        <>
            {loading ? (
                <>
                    <ToastContainer />
                    <Loader waiting={waiting} payment={payment} />
                </>
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
                    <div className="flex w-full py-24 gap-8 flex-col items-center">
                        <p className="text-3xl text-center max-w-[935px] leading-[1.5] font-light">
                            Creation of your digital identity PASSPORT requires
                            a one-time cost of{" "}
                            <span className="font-medium">1 NEON</span> due to
                            the heavy computing resources required.
                        </p>

                        <button
                            disabled={paymentLoading}
                            onClick={handleClick}
                            style={{
                                borderImageSource:
                                    "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                                borderImageSlice: 1,
                            }}
                            className={`mt-2 border-[4px] px-6 py-3 flex w-[300px] items-center justify-between transition-all cursor-pointer`}
                        >
                            <p>
                                {isErrored ? "Click Again" : "Pay 1 NEON now"}
                            </p>
                            <FaArrowRightLong />
                        </button>

                        <Link
                            href={"https://neonfaucet.org/"}
                            className="underline font-light"
                            target="_blank"
                        >
                            Don’t have NEON? Get it from the faucet.
                        </Link>

                        <p
                            className={`text-[#888888] max-w-[532px] text-center text-sm`}
                        >
                            {isErrored
                                ? "This process might take some time. Kindly wait for 1-2 minutes for the whole process to complete and try again."
                                : `This DAPP is just a demo to showcase the Blend engine. The payment of 1 NEON is a fix amount calculated at the time of development and is use to mimic the cover of cost for the on-cloud computation resources which is utilizing currently to power this demo.`}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;

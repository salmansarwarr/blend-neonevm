"use client";

import { FaArrowRight } from "react-icons/fa";
import { images } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { bg } from "../images/index";

const Home = () => {
    const router = useSearchParams();
    const navigator = useRouter();

    useEffect(() => {
        if (router.get("error")) {
            alert(
                "There is an interruption during your digital replica reconstruction process and it is our problem! This is a shared resources and the capacity might be temporary occupied, just kindly try again and the magic will happen!"
            );
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bg-white text-[#343434] h-full flex flex-col min-h-screen items-center">
                <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                    <p>
                        A project developed in the SpiderHack by Botanix: the
                        first EVM Hackathon on Bitcoin
                    </p>
                </nav>
                <main
                    style={{
                        backgroundImage: `url(./bg.svg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100vh",
                        "@media (max-width: 768px)": {
                            backgroundSize: "contain",
                        },
                    }}
                    className="py-6"
                >
                    <div className="w-full py-2 px-8">
                        <p className="bg-[#FFB72C] w-[43px] h-[43px] text-center text-2xl py-[0.3rem] rounded-[5px] font-bold text-white">
                            B
                        </p>
                    </div>
                    <div className="w-full flex flex-col justify-end items-center pt-16 pr-36">
                        <p className="bg-[#FFB72C] text-center text-sm py-[0.3rem] px-3 rounded-[5px]  text-white">
                            Only Possible On Spiderchain
                        </p>
                        <p
                            className="w-0 h-0"
                            style={{
                                borderLeft: "10px solid transparent",
                                borderRight: "10px solid transparent",
                                borderTop: "18px solid #FFB72C",
                            }}
                        ></p>
                    </div>
                    <div className="flex justify-center text-[2.8rem] font-semibold">
                        <p className="text-center text-[#5B5B5B]">
                            Next-Gen OPOS DApp Experience <br /> with NFT
                            Passport.{" "}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-center text-[#5B5B5B] max-w-[742px] py-6">
                            Blend is the first hyper-realistic digital identity
                            NFT passport creation engine built for Spiderchain,
                            the first EVM-equivalent Layer 2 on Bitcoin. With
                            the advance NFT 2.0 implementation and
                            interoperability of Passport, developers have
                            endless possibilities on designing their DApp.
                        </p>
                    </div>
                    <div className="flex justify-center gap-4 py-2">
                        <button onClick={() => navigator.push('/start-blending')} className="bg-[#FFB72C] hover:bg-transparent hover:border-[#FFB72C] hover:border hover:text-[#FFB72C] transition-all w-[200px] h-[54px] rounded-[5px]">
                            Start Blending
                        </button>
                        <button onClick={() => navigator.push('/start-testing')} className="bg-transparent hover:bg-[#FFB72C] hover:text-black hover:border-none border-[#FFB72C] border text-[#FFB72C] transition-all w-[200px] h-[54px] rounded-[5px]">
                            Test Passport
                        </button>
                    </div>
                    <div onClick={() => navigator.push('/repository')} className="flex justify-center gap-4 pt-5">
                        <Link href={"#"} className="text-[#5B5B5B] underline">
                            To Passport Repository
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;

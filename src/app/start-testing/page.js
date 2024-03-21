import MainCard from "@/components/MainCard";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div
            style={{
                background: "rgb(255,255,253)",
                background:
                    "linear-gradient(0deg, rgba(255,255,253,1) 0%, rgba(255,245,226,1) 97%)",
            }}
            className="w-full min-h-screen py-8 px-14"
        >
            <div className="w-full py-2">
                <p className="bg-[#FFB72C] w-[43px] h-[43px] text-center text-2xl py-[0.3rem] rounded-[5px] font-bold text-white">
                    B
                </p>
            </div>
            <div className="pt-10 pb-5">
                <h1 className="text-3xl font-semibold text-[#7D7D7D]">
                    Test your NFT Passport.
                </h1>
            </div>
            <Link href={"/start-blending"} className="underline text-[#7D7D7D]">
                Don’t have a passport? Create one here
            </Link>
            <div className="grid grid-cols-2 xl:grid-cols-3 py-8 gap-y-6">
                <MainCard
                    bgPath={"./card1.svg"}
                    format={"Basic"}
                    nftType={"ERC-721"}
                    text={
                        "Create innovative experience just with a simple NFT Passport."
                    }
                    href={"/connect/test-passport"}
                />
                <MainCard
                    bgPath={"./card3.svg"}
                    format={"Multiassets"}
                    nftType={"ERC-5773"}
                    text={
                        "Bind different format of assets to the NFT Passport, such as MP3, PDF, etc."
                    }
                    href={"/connect/test-passport/multiAsset"}
                />
                <MainCard
                    bgPath={"./card4.svg"}
                    format={"Equippable"}
                    nftType={"ERC-6220"}
                    text={
                        "Equip items onto the NFT Passport and bring it around different application."
                    }
                    href={"/connect/test-passport/equippable"}
                />
                <MainCard
                    bgPath={"./card2.svg"}
                    format={"Emotable"}
                    nftType={"ERC-7409"}
                    text={
                        "Imagine the NFT Passport is a user profile and someone can react an emoji to it on-chain."
                    }
                    href={"/connect/test-passport/emotable"}
                />
            </div>
        </div>
    );
};

export default page;

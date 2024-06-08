import MainCard from "@/components/MainCard";
import logo from "@/images/logo.png";
import Image from "next/image";

const page = () => {
    return (
        <div className="bg-black text-white w-full min-h-screen py-8 px-14">
            <div className="w-full py-1">
                <Image src={logo} height={43} width={101} alt="logo" />
            </div>
            <div className="my-12">
                <h1 className="text-3xl font-semibold">
                    Choose an NFT Passport.
                </h1>
            </div>
            <h1 className="text-3xl mb-6">OPOS</h1>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-6">
                <MainCard
                    bgPath={"./oposCard1.png"}
                    format={"Basic"}
                    text={
                        "Create innovative experience just with a simple NFT Passport."
                    }
                    href={"#"}
                />
                <MainCard
                    bgPath={"./oposCard2.png"}
                    format={"Compressed"}
                    text={
                        "Scale the creation of NFT Passport to new orders of magnitude without worrying about the cost."
                    }
                    href={"#"}
                />
                <MainCard
                    bgPath={"./oposCard3.png"}
                    format={"Cross-Chain"}
                    nftType={"ERC-6220"}
                    text={
                        "The NFT Passport which break through the boundaries of Solana and explore other networks"
                    }
                    href={"#"}
                />
                <MainCard
                    bgPath={"./oposCard4.png"}
                    format={"Composable"}
                    text={
                        "Combine different assets with the NFT Passport and bring around as a bundle."
                    }
                    href={"#"}
                />
                <MainCard
                    bgPath={"./oposCard5.png"}
                    format={"Executable"}
                    text={
                        "The NFT Passport has an embedded application in it which can be executed in the wallet."
                    }
                    href={"#"}
                />
            </div>
            <h1 className="text-3xl mt-20 mb-6">NeonEVM (EVM on Solana)</h1>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-6">
                <MainCard
                    bgPath={"./card1.png"}
                    format={"Basic"}
                    text={
                        "Create innovative experience just with a simple ERC-721 NFT Passport."
                    }
                    href={"/connect"}
                />
                <MainCard
                    bgPath={"./card2.png"}
                    format={"Multiassets"}
                    text={
                        "Bind different format of assets to the NFT Passport, such as MP3, PDF, etc."
                    }
                    href={"/connect/multi-assets"}
                />
                <MainCard
                    bgPath={"./card3.png"}
                    format={"Equippable"}
                    text={
                        "Equip items onto the NFT Passport and bring it around different application."
                    }
                    href={"/connect/equippable"}
                />
                <MainCard
                    bgPath={"./card4.png"}
                    format={"Emotable"}
                    text={
                        "Imagine the NFT Passport is a user profile and someone can react an emoji to it on-chain."
                    }
                    href={"/connect/emotable"}
                />
            </div>
        </div>
    );
};

export default page;

import Image from "next/image";
import bg from "../../public/bg5.png";
import logo from "@/images/logo.png";

const MintLoading = () => {
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
            <div className="flex flex-col items-center gap-10 py-14">
                <p
                    className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light `}
                >
                    PASSPORT minting in progress...
                </p>
                <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full border-t-4 border-black h-12 w-12"></div>
                </div>
                <p className="text-[#888888] max-w-[532px] text-center text-sm">
                    Note: Please do not close the application while the PASSPORT
                    NFT is being minted as it will affect the import.meta.
                    Please make sure you complete all the wallet interaction.
                    Redirect will occur upon completion.
                </p>
            </div>
        </div>
    );
};

export default MintLoading;

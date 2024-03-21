"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Connect = ({ link, theme = "light", toast }) => {
    const router = useRouter();
    const {address} = useAccount();

    // useEffect(() => {
    //     if (address) {
    //         toast("Wallet Connected!");
    //     }
    // }, [address]);

    return (
        <button
            className={`${
                theme == "dark"
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border-white text-white hover:bg-white hover:text-black"
            } border w-fit px-5 py-3 flex gap-4 items-center transition-all cursor-pointer`}
            onClick={() => {
                if (address) {
                    router.push(`/${link}`);
                }
            }}
        >
            <ConnectKitButton.Custom>
                {({
                    isConnected,
                    isConnecting,
                    show,
                    hide,
                    address,
                    ensName,
                    chain,
                }) => {
                    const trimmedAddress = address
                        ? `${address.slice(0, 4)}...${address.slice(-4)}`
                        : "";

                    return (
                        <button
                            onClick={show}
                            className="inline-block rounded-md bg-yellow-800 text-white uppercase text-sm tracking-widest font-heading p-4 transition duration-150 hover:bg-white hover:text-yellow-800 hover:border hover:border-yellow-800"
                        >
                            {isConnected ? trimmedAddress : "Connect"}
                        </button>
                    );
                }}
            </ConnectKitButton.Custom>
            <FaArrowRightLong />
        </button>
    );
};

export default Connect;

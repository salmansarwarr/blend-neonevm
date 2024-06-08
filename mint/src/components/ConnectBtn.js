"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Connect = ({ link, theme = "light", toast }) => {
    const router = useRouter();
    const { address } = useAccount();

    // useEffect(() => {
    //     if (address) {
    //         toast("Wallet Connected!");
    //     }
    // }, [address]);

    return (
        <button
            style={{
                borderImageSource:
                    "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                borderImageSlice: 1,
            }}
            className={`mt-2 border-[4px] px-6 py-3 flex w-[250px] items-center justify-between transition-all cursor-pointer`}
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
                            className="inline-block rounded-md bg-transparent text-white text-lg transition duration-150 "
                        >
                            {isConnected ? trimmedAddress : "Connect Wallet"}
                        </button>
                    );
                }}
            </ConnectKitButton.Custom>
            <FaArrowRightLong />
        </button>
    );
};

export default Connect;

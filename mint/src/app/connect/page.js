import connectImg from "../../../public/bg1.png";
import ConnectBtn from "@/components/ConnectBtn";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import logo from "@/images/logo.png";

const Connect = () => {
    return (
        <>
            <ToastContainer />
            <div
                className=" bg-black text-white w-full min-h-screen py-8 px-14"
                style={{
                    backgroundImage: `url(${connectImg.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="w-full py-1">
                    <Image src={logo} height={43} width={101} alt="logo" />
                </div>
                <div className="ml-20 mt-28 mb-20 max-w-[850px] flex flex-col gap-6 h-full justify-center">
                    <div className="flex gap-4 items-center">
                        <p className="text-[#E2E2E2] text-2xl">
                            You are now creating Basic NFT Passport
                        </p>
                        <p
                            style={{
                                background:
                                    "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                            }}
                            className="rounded-full px-4 py-2"
                        >
                            ERC-721
                        </p>
                    </div>
                    <p className="text-[3.87rem] text-white leading-[1.29] font-light mb-2">
                        Connect yourself to the <br /> NeonEVM network.
                    </p>
                    <ConnectBtn link={"upload"} toast={toast} />
                </div>
            </div>
        </>
    );
};

export default Connect;

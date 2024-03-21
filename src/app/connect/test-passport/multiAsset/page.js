import connectImg from "../../../../../public/connect.png";
import ConnectBtn from "@/components/ConnectBtn";
import { toast, ToastContainer } from "react-toastify";

const Connect = () => {
    return (
        <>
            <ToastContainer />
            <div
                className="h-screen flex flex-col"
                style={{
                    backgroundImage: `url(${connectImg.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                    <p>
                        A project developed in the SpiderHack by Botanix: the
                        first EVM Hackathon on Bitcoin
                    </p>
                </nav>
                <div className="ml-44 mb-20 max-w-[570px] flex flex-col gap-6 h-full justify-center">
                <p className="text-[#E2E2E2] text-2xl">
                        Hey, Welcome to Blend
                    </p>
                    <p className="text-[3.87rem] text-white leading-[1.29] font-light mb-2">
                        Connect yourself to <br/> the the Spiderchain Testnet.
                    </p>
                    <ConnectBtn link={"test-passport/multiAsset"} toast={toast} />
                </div>
            </div>
        </>
    );
};

export default Connect;

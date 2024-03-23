import Image from "next/image";
import img from "@/images/section5.png";

const Section5 = () => {
    return (
        <section className="py-24 px-16 bg-black text-white">
            <h1 className="w-full text-[42px] text-center">
                Supporting EVM Tools, New Horizon on Solana
            </h1>
            <div className="flex justify-center mt-5 mb-20">
                <p className="max-w-[775px] text-center text-[16px]">
                    Blend allow developers to bring NFT2.0 implementation from
                    RMRK on EVM-based network to Solana with the help of NeonEVM
                    with familiar tools on Ethereum, without the need of
                    configurations.
                </p>
            </div>
            <div className="flex justify-center">
                <Image src={img} width={1280} height={678} alt="blend" />
            </div>
        </section>
    );
};

export default Section5;

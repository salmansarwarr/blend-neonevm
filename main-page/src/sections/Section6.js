import Image from "next/image";
import android from "@/images/android.png";
import img from "@/images/section6.png";

const Section6 = () => {
    return (
        <section className="py-12 px-16 bg-black text-white">
            <h1 className="w-full text-4xl">
                Ready for mobile developers on Solana.
            </h1>
            <div className="bg-[#1D1A23] flex p-16 gap-4 mt-10 relative">
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl max-w-[686px] leading-[55px]">
                        More possibilities for NFT Passport with Solana Mobile
                        Stack
                    </h1>
                    <p className="text-[16px] max-w-[566px]">
                        Integrate Blend Engine on mobile-based Solana DApps and
                        introduce innovative use case and experience with NFT
                        Passport. Currently supports Android application
                        development with Solana Mobile Stack.
                    </p>
                    <button className="mt-4 bg-[#15F094] rounded-full flex justify-center items-center gap-3 w-[280px] h-[51px] font-bold">
                        <Image src={android} width={30} height={33} alt="android" />
                        <p className="text-[15px]">Download Android Demo</p>
                    </button>
                </div>
                <Image src={img} width={484} height={433} alt="img" className="overflow-hidden absolute right-1"/>
            </div>
        </section>
    );
};

export default Section6;

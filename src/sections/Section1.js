import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
import sponsors from "@/images/sponsors.png";

const Section1 = () => {
    return (
        <section
            style={{
                backgroundImage: `url(./section1.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                "@media (maxWidth: 768px)": {
                    backgroundSize: "contain",
                },
            }}
            className="py-6 text-white"
        >
            <div className="w-full py-1 px-10">
                <Image src={logo} height={43} width={101} alt="logo" />
            </div>
            <div className="flex justify-center text-[2.8rem] mt-20 font-semibold">
                <p className="text-center">
                    Next-Gen <span style={{ color: "#6686D7" }}>OPOS</span> DApp
                    Experience <br /> with NFT Passport.{" "}
                </p>
            </div>
            <div className="flex justify-center">
                <p className="text-center max-w-[742px] py-6">
                    Blend is the first hyper-realistic digital identity NFT
                    passport creation engine built for native Solana developers
                    and those migrating from EVM-based networks. With the
                    advance NFT implementation of Passport, developers have
                    endless possibilities on designing their DApp.
                </p>
            </div>
            <div className="flex justify-center gap-4 py-2">
                <Link
                    href={"https://blend-mint-neonevm.vercel.app"}
                    style={{
                        background:
                            "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                    }}
                    className="flex justify-center items-center w-[180px] h-[50px] text-sm rounded-full uppercase font-semibold"
                >
                    <p>Start Blending</p>
                </Link>
                <Link
                    href={"https://blend-test-neonevm.vercel.app"}
                    className="flex justify-center items-center bg-transparent border-white border w-[180px] h-[50px] rounded-full text-sm font-semibold"
                >
                    <p>Test Passport</p>
                </Link>
            </div>
            <p className="text-[0.8rem] w-full text-center text-[#5A84F2] mt-20">
                POWERED BY POWERFUL TOOLS AND INTEGRATIONS FROM THE ECOSYSTEM
            </p>
            <div className="flex justify-center mt-8">
                <Image src={sponsors} height={125} width={537} />
            </div>
        </section>
    );
};

export default Section1;

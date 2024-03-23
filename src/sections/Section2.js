import Image from "next/image";
import union from "@/images/Union.png";

const Section2 = () => {
    return (
        <section
            style={{
                backgroundImage: `url(./section2.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                "@media (maxWidth: 768px)": {
                    backgroundSize: "contain",
                },
            }}
            className="py-20 text-white"
        >
            <h1 className="w-full text-center text-4xl mt-18">
                The strongest collaboration of advanced AI & Solana.
            </h1>
            <div className="flex justify-center mt-7">
                <p className="w-full text-center text-sm max-w-[727px]">
                    The advanced deep learning powered AI Core is specially
                    designed by our university research team which have the
                    ability to recreate ultra realistic digital replicate of
                    human. We embedded this technology for consumer via Solana
                    blockchain technology with NFT Passport.
                </p>
            </div>
            <div className="mt-20">
                <div className="flex justify-center">
                    <div
                        style={{
                            background:
                                "linear-gradient(224.2deg, #D9D9D9 26.12%, #737373 98.51%)",
                        }}
                        className="flex justify-center relative items-center rounded-[10px] uppercase px-6 py-[3.9rem]"
                    >
                        <div
                            style={{
                                background:
                                    "linear-gradient(57.61deg, #000000 9.59%, #944CFD 64.08%, #15F094 106.03%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            <p className="text-[3.5rem] leading-none font-extrabold text-center">
                                Blend
                            </p>
                            <p className="text-[2.9rem] leading-none font-extrabold text-center">
                                Ai core
                            </p>
                        </div>
                        <div className="absolute top-[8.22rem] w-full h-[50%]">
                            <Image
                                src={union}
                                height={283}
                                width={237}
                                alt="union"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-[5.2rem]">
                    <p
                        style={{
                            borderImageSource:
                                "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                            borderImageSlice: "1",
                            boxShadow: "0px 4px 100px 13px #944CFD",
                            background:
                                "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            letterSpacing: "1px"
                        }}
                        className="border-[5px] px-4 py-3 font-bold"
                    >
                        SOLANA DAPPS ECOSYSTEM
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section2;

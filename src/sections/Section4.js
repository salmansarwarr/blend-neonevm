"use client";

import Image from "next/image";
import { useState } from "react";
import avatar from "@/images/avatar.png";

const Section4 = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const listItems = ["gaming", "social", "consumer", "identity"];

    const handleChange = (i) => setSelectedIndex(i);

    const selectedItem = (text, i) => (
        <li
            onClick={() => {
                handleChange(i);
            }}
            style={{
                background:
                    "linear-gradient(90deg, #944CFD 0%, #8261EE 18.5%, #6686D7 40.5%, #43B4BB 66%, #25DBA2 86.5%, #15F094 100%)",
            }}
            className="rounded-full cursor-pointer text-[16px] p-1 text-center "
        >
            <p className="bg-[#1D1A23] rounded-full py-2 w-[120px]">{text}</p>
        </li>
    );

    return (
        <section className="py-6 px-16 bg-black text-white">
            <div className="flex justify-between items-center">
                <h1 className="w-full text-4xl mt-18">
                    Build for innovative use case.
                </h1>
                <ul className="uppercase flex gap-3">
                    {listItems.map((item, i) =>
                        selectedIndex === i ? (
                            selectedItem(item, i)
                        ) : (
                            <li
                                onClick={() => {
                                    handleChange(i);
                                }}
                                className="rounded-full cursor-pointer text-[16px] text-center bg-[#1D1A23] py-3 w-[128px] "
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="flex mt-8">
                <Image src={avatar} height={510} width={563} alt="avatar" />
                <div className="bg-[#1D1A23] flex justify-center gap-8 px-16 flex-col">
                    <h1 className="text-4xl leading-[50px] max-w-[629px]">
                        Turning real life Web3 gamers to virtual game character
                        easily.
                    </h1>
                    <p className="text-[16px] max-w-[566px]">
                        Blend create an ultra realistic 3D face mesh using the
                        face data provided by the user. All the information is
                        packed inside the NFT Passport and blockchain game
                        application can easily retrieve and use to render as in
                        game character.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Section4;

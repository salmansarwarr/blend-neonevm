"use client";

import { useState } from "react";
import Gaming from "@/components/Gaming";
import Social from "@/components/Social";
import Consumer from "@/components/Consumer";
import Identity from "@/components/Identity";

const Section4 = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const listItems = ["gaming", "social", "consumer", "identity"];
    const components = [<Gaming />, <Social />, <Consumer />, <Identity />];

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
            {components[selectedIndex]}
        </section>
    );
};

export default Section4;

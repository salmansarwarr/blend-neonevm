import Link from "next/link";
import React from "react";

const MainCard = ({ bgPath, nftType, text, format, href }) => {
    return (
        <Link
            href={href}
            className="p-8 w-[400px] h-[270px] text-white rounded-[10px]"
            style={{
                backgroundImage: `url(${bgPath})`,
            }}
        >
            <div className="flex gap-5">
                <p className="text-3xl font-semibold">{format}</p>
                <p className="bg-[#FDC14D] font-semibold text-center rounded-[30px] px-4 pt-[0.35rem]">
                    {nftType}
                </p>
            </div>
            <p className="mt-4 max-w-[290px]">{text}</p>
        </Link>
    );
};

export default MainCard;

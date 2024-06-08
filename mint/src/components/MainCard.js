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
            <p className="text-3xl font-semibold">{format}</p>
            <p className="mt-4 max-w-[290px]">{text}</p>
        </Link>
    );
};

export default MainCard;

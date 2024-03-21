import { repoImg } from "@/images";
import { beautifyAddress } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";

const NftCard = ({ name, address, time, url, type }) => {
    return (
        <Link className="flex flex-col" href={url} target="_blank">
            <Image
                src={repoImg}
                alt="repository"
                height={180}
                width={200}
                objectFit="contain"
            />
            <h2 className="text-[#343434] text-xl mt-3">{name}</h2>
            <p className="text-[11px] mt-2">by {beautifyAddress(address)}</p>
            <p className="text-[11px] mt-1">Created on {time}</p>
            <div className="bg-[#FFB72C] text-black w-fit px-2 py-1 rounded mt-3 text-sm">{type}</div>
        </Link>
    );
};

export default NftCard;

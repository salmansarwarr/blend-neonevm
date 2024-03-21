"use client";

import { getNfts } from "@/utils/api";
import NftCard from "@/components/NftCard";
import { useEffect, useState } from "react";

const Repository = () => {
    const [data, setData] = useState([]);
    const [displayedItems, setDisplayedItems] = useState(10);

    const handleLoadMore = (type) => {
        if (type == "more") {
            setDisplayedItems(data?.length);
        } else {
            setDisplayedItems(10);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getNfts();
            setData(result?.data);
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white text-[#343434] h-full flex flex-col min-h-screen items-center">
                <nav className="bg-[#FFB72C] py-3 text-sm font-light text-black w-full flex justify-center">
                    <p>
                        A project developed in the SpiderHack by Botanix: the
                        first EVM Hackathon on Bitcoin
                    </p>
                </nav>
            <h1 className="w-[80%] text-3xl py-6 mt-8">PASSPORT Repository</h1>
            <p className="w-[80%] text-sm text-[#888]">
                All of the PASSPORTs created on this demo application will be
                indexed and displayed in this repository and are ordered
                according the date created (most recent on top). These PASSPORTs
                are NFTs minted on the Spiderchain test network and the smart
                contracts are following ERC-721. Each of the 3D face mesh
                bounded with the NFT are stored on IPFS.
            </p>
            {data?.length > 0 ? (
                <div className="grid transition-all gap-y-10 gap-x-2 mb-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-[80%] mt-7">
                    {data
                        .slice(0, displayedItems)
                        .reverse()
                        .map((nft) => {
                            const { name, address, time, _id, url, type } = nft;
                            return (
                                <NftCard
                                    key={_id}
                                    name={name}
                                    address={address}
                                    time={time}
                                    url={url || "https://subnets-test.avax.network/c-chain"}
                                    type={type}
                                />
                            );
                        })}
                </div>
            ) : (
                <div
                    className={`flex mt-20 items-center justify-center bg-white z-50`}
                >
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-16 h-16 text-gray-200 animate-spin dark:text-white fill-black"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            {data.length > 10 && (
                <button
                    onClick={() => {
                        data.length > 10 && displayedItems < data.length
                            ? handleLoadMore("more")
                            : handleLoadMore("less");
                    }}
                    className="w-[80%] py-2 rounded-[5px] my-4 hover:bg-gray-100 transition-all border-[#dfdfdf] border"
                >
                    {displayedItems < data.length ? "Load More" : "See less"}
                </button>
            )}
        </div>
    );
};

export default Repository;

import Image from "next/image";
import gaming from "@/images/gaming.png";

const Gaming = () => {
    return (
        <div className="flex mt-8">
            <Image src={gaming} height={510} width={563} alt="avatar" />
            <div className="bg-[#1D1A23] flex justify-center gap-8 px-16 flex-col">
                <h1 className="text-4xl leading-[50px] max-w-[629px]">
                    Turning real life Web3 gamers to virtual game character
                    easily.
                </h1>
                <p className="text-[16px] max-w-[566px]">
                    Blend create an ultra realistic 3D face mesh using the face
                    data provided by the user. All the information is packed
                    inside the NFT Passport and blockchain game application can
                    easily retrieve and use to render as in game character.
                </p>
            </div>
        </div>
    );
};

export default Gaming;

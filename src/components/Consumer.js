import Image from "next/image";
import consumer from "@/images/consumer.png";

const Consumer = () => {
    return (
        <div className="flex mt-8">
            <div className="bg-white w-[675px] h-[510px] flex justify-center items-center">
                <Image src={consumer} height={408} width={523} alt="avatar" />
            </div>
            <div className="bg-[#1D1A23] flex justify-center gap-8 px-16 flex-col">
                <h1 className="text-4xl leading-[50px] max-w-[629px]">
                    Interoperability of NFT Passport makes assets carrying
                    simpler.
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

export default Consumer;

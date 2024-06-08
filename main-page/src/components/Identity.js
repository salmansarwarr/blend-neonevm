import Image from "next/image";
import identity from "@/images/identity.png";

const Identity = () => {
    return (
        <div className="flex mt-8">
            <div className="bg-white w-[575px] h-[510px] flex justify-center items-center">
                <Image src={identity} height={299} width={519} alt="avatar" />
            </div>
            <div className="bg-[#1D1A23] flex justify-center gap-8 px-16 flex-col">
                <h1 className="text-4xl leading-[50px] max-w-[629px]">
                    Third-party authentication tool utilizing embedded 3D face
                    data.
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

export default Identity;

import { connectToDatabase } from "@/utils/connectDb";
import { NextResponse } from "next/server";     

export async function GET(req) {
    const address = req.url.split("/")[5];
    const type = req.url.split("/")[6];

    const multiAsset = type === "multiAsset";
    const equippable = type === "equippable";

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    if (address) {
        let data;

        if (multiAsset) {
            data = await collection.find({
                address,
                type: "ERC-5773", 
            }).toArray();
        }

        if (equippable && !data) {
            data = await collection.find({
                address,
                type: "ERC-6220", 
            }).toArray();
        }

        if (!data) {
            return NextResponse.json(
                { error: "NFT not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

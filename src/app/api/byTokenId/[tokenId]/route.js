import { connectToDatabase } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
    const tokenId = req.url.split("/")[5];

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    if (tokenId) {
        let data = await collection.findOne({
            tokenId: parseInt(tokenId),
            type: "ERC-721"
        });

        if(!data) {
            data = await collection.findOne({
                tokenId: tokenId.toString(),
                type: "ERC-721"
            });
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

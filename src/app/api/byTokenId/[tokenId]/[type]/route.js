import { connectToDatabase } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
    const tokenId = req.url.split("/")[5];
    const type = req.url.split("/")[6];

    const multiAsset = type === "multiAsset";
    const equippable = type === "equippable";
    const emotable = type === "emotable";

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    if (tokenId) {
        let data;

        if (multiAsset) {
            data = await collection.findOne({
                tokenId: tokenId.toString(),
                type: "ERC-5773",
            });
        }

        if (multiAsset && !data) {
            data = await collection.findOne({
                tokenId: parseInt(tokenId),
                type: "ERC-5773",
            });
        }

        if (equippable && !data) {
            data = await collection.findOne({
                tokenId: tokenId.toString(),
                type: "ERC-6220",
            });
        }

        if (equippable && !data) {
            data = await collection.findOne({
                tokenId: parseInt(tokenId),
                type: "ERC-6220",
            });
        }

        if (emotable && !data) {
            data = await collection.findOne({
                tokenId: tokenId.toString(),
                type: "ERC-7409",
            });
        }

        if (emotable && !data) {
            data = await collection.findOne({
                tokenId: parseInt(tokenId),
                type: "ERC-7409",
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

export async function PUT(req) {
    const tokenId = req.url.split("/")[5];
    const type = req.url.split("/")[6];

    const doc = await req.json();

    const multiAsset = type === "multiAsset";
    const equippable = type === "equippable";
    const emotable = type === "emotable";

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    if (tokenId) {
        let data;

        if (multiAsset) {
            data = await collection.findOneAndUpdate(
                { tokenId: tokenId.toString(), type: "ERC-5773" },
                { $set: doc }
            );
        }

        if (multiAsset && !data) {
            data = await collection.findOneAndUpdate(
                { tokenId: parseInt(tokenId), type: "ERC-5773" },
                { $set: doc }
            );
        }

        if (equippable && !data.value) {
            data = await collection.findOneAndUpdate(
                { tokenId: tokenId.toString(), type: "ERC-6220" },
                { $set: doc }
            );
        }

        if (equippable && !data) {
            data = await collection.findOneAndUpdate(
                { tokenId: parseInt(tokenId), type: "ERC-6220" },
                { $set: doc }
            );
        }

        if (emotable && !data) {
            data = await collection.findOneAndUpdate(
                { tokenId: tokenId.toString(), type: "ERC-7409" },
                { $set: doc }
            );
        }

        if (emotable && !data) {
            data = await collection.findOneAndUpdate(
                { tokenId: parseInt(tokenId), type: "ERC-7409" },
                { $set: doc }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: "NFT not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: data });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

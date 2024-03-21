import { connectToDatabase } from "@/utils/connectDb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
    const db = await connectToDatabase();

    const collection = db.collection("spiderNfts");

    const data = await collection.find({}).toArray();

    return NextResponse.json({ data });
}

export async function POST(req) {
    const { name, tokenId, address, meshFile, tokenUri, url, time, type, files } = await req.json();

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    const newNft = {
        name,
        tokenId,
        address,
        meshFile,
        tokenUri,
        url,
        time,
        type,
        files   
    };
    await collection.insertOne(newNft);

    return new NextResponse(newNft, { status: 200 });
}

export async function PUT(req) {
    const { _id, name, tokenId, address, meshFile, tokenUri, url, time, type, files } = await req.json();

    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    const updatedNft = {
        name,
        tokenId,
        address,
        meshFile,
        tokenUri,
        url,
        time,
        type,
        files
    };

    const id = new ObjectId(_id);

    const result = await collection.updateOne(
        { _id: id }, // Filter
        { $set: updatedNft }, // Update
        { returnDocument: "after" } // Return the updated document
    );

    (result);

    if (result.matchedCount === 0) {
        return new NextResponse({ message: "NFT not found" }, { status: 404 });
    }

    return new NextResponse(result.value, { status: 200 });
}

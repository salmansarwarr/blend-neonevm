import { connectToDatabase } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
    const address = req.url.split("/")[5];
    
    const db = await connectToDatabase();
    const collection = db.collection("spiderNfts");

    const data = await collection.find({ address }).toArray();

    return NextResponse.json({ data });
}

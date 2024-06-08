import { NextResponse } from "next/server";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto
    .createHash("sha256")
    .update(
        String(
            "your-secret-key-32-characters-long-your-secret-key-32-characters-long"
        )
    )
    .digest("base64")
    .substr(0, 32);
const iv = crypto.randomBytes(16);

export async function POST(req) {
    const {url} = await req.json();

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(url, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const hashedUrl = iv.toString('hex') + ':' + encrypted;

    return NextResponse.json({ data: hashedUrl });
}

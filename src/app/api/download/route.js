import { NextResponse } from "next/server";
import { ethers } from "ethers";
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
    const {message, signature, owner, url} = await req.json();

    const textParts = url.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  
    return NextResponse.json({ data: decrypted.toString() });
}

import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT_URL ?? "",
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
    },
});


export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const id = Math.random().toString(36).substring(2, 15);
    const file: File = formData.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
    const key = `${id}${ext}`;

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME ?? "",
        Key: key,
        Body: buffer,
        ContentType: file.type,
    });

    try {
        await r2.send(putObjectCommand);
        const base = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");
        const url = base ? `${base}/${key}` : key;
        return NextResponse.json({ success: true, key, url }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
};

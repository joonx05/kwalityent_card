import { randomUUID } from "crypto";
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
    const file: File = formData.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
    const key = `${randomUUID()}${ext}`;

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME ?? "",
        Key: key,
        Body: buffer,
        ContentType: file.type,
    });

    try {
        const response = await r2.send(putObjectCommand);
        return NextResponse.json({ success: true, key }, { status: 200 });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ success: false, key }, { status: 500 });
    }
};

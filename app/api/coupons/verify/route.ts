import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: "Code is required" }, { status: 400 });
    }

    const filename = `coupons/coupon-${code}.json`;

    try {
      const getCommand = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
      });

      const response = await r2.send(getCommand);
      const str = await response.Body?.transformToString();

      if (!str) {
        throw new Error("Empty file");
      }

      const couponData = JSON.parse(str);

      return NextResponse.json({
        success: true,
        valid: true,
        referrer: couponData.referrer?.name || "Unknown",
        code: couponData.code
      });

    } catch (e: any) {
      if (e.name === 'NoSuchKey') {
        return NextResponse.json({ success: true, valid: false, message: "Invalid code" });
      }
      console.error("Error fetching coupon:", e);
      return NextResponse.json({ success: false, message: "Error validating code" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in verify endpoint:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

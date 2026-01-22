import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// 1. Initialize R2 Client
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract all fields
    const productId = formData.get("productId") as string;
    const productName = formData.get("productName") as string;
    const size = formData.get("size") as string;
    const price = parseFloat(formData.get("price") as string);
    const customerName = formData.get("customerName") as string;
    const phone = formData.get("phone") as string;
    const transactionId = formData.get("transactionId") as string;
    const address = formData.get("address") as string;
    const screenshot = formData.get("screenshot") as File;

    // Validate
    if (!productId || !customerName || !transactionId || !address || !screenshot) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // --- STEP 1: Upload the Screenshot Image ---
    const timestamp = Date.now();
    const sanitizedId = transactionId.replace(/[^a-z0-9]/gi, '_');
    const imageExtension = screenshot.name.split(".").pop() || "png";
    const imageFilename = `receipts/${sanitizedId}-${timestamp}.${imageExtension}`;

    const imageBuffer = Buffer.from(await screenshot.arrayBuffer());

    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: imageFilename,
      Body: imageBuffer,
      ContentType: screenshot.type,
    }));

    // Generate the public URL for the image
    const screenshotUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageFilename}`;

    // --- STEP 2: Create & Upload the Order JSON ---
    
    // Construct the single object containing ALL details
    const orderData = {
      orderId: sanitizedId,
      timestamp: new Date().toISOString(),
      customer: {
        name: customerName,
        phone: phone,
        address: address,
      },
      product: {
        id: productId,
        name: productName,
        size: size,
        price: price,
      },
      payment: {
        transactionId: transactionId,
        screenshotUrl: screenshotUrl, // Link the image here
      },
    };

    // Upload this JSON object as a file to R2
    const jsonFilename = `orders/${sanitizedId}.json`;

    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: jsonFilename,
      Body: JSON.stringify(orderData, null, 2), // Pretty print for readability
      ContentType: "application/json",
    }));

    return NextResponse.json({
      success: true,
      message: "Order processed and saved to R2",
      orderId: sanitizedId,
    });

  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import nodemailer from "nodemailer";

// 1. Initialize R2 Client
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

function getOrderEmailHTML(params: {
  customerName: string;
  orderId: string;
  productName: string;
  size: string;
  price: number;
  transactionId: string;
  address: string;
  logoUrl: string;
}) {
  const {
    customerName,
    orderId,
    productName,
    size,
    price,
    transactionId,
    address,
    logoUrl,
  } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="color-scheme" content="light only" />
  <title>Order Confirmation - TEDxCUSAT</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
          
          <!-- Header -->
          <tr>
            <td style="background:#000;padding:30px;text-align:center">
              <img src="${logoUrl}" height="40" style="margin-bottom:12px" />
              <p style="color:rgba(255,255,255,0.9);margin:0;font-size:14px">
                Order Received
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;text-align:center">
              <h2 style="color:#16a34a;margin-bottom:10px">
                Thank you for your order!
              </h2>
              <p style="color:#6b7280;font-size:16px">
                Hi <strong>${customerName}</strong>, we’ve received your order.
              </p>
              <p style="color:#9ca3af;font-size:14px; line-height: 1.6;">
                We will notify you once your order is confirmed.
              </p>
            </td>
          </tr>

          <!-- Order Details -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Order Details</h3>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID</td>
                                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-family: monospace;">#${orderId.toUpperCase()}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Product</td>
                                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${productName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Size</td>
                                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right;">${size}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Transaction ID</td>
                                                <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-family: monospace;">${transactionId}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td style="color: #1f2937; font-size: 18px; font-weight: bold;">Total Paid</td>
                                                            <td style="color: #16a34a; font-size: 18px; font-weight: bold; text-align: right;">₹${price.toLocaleString("en-IN")}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

          <!-- Address -->
          <tr>
            <td style="padding:0 32px 32px">
              <p style="color:#6b7280;font-size:14px">
                <b>Delivery Address</b><br/>
                ${address}
              </p>
            </td>
          </tr>

          <!-- Footer -->
           <tr>
                        <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Thank you for supporting TEDx!</p>
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated email. Please do not reply directly.</p>
                        </td>
                    </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract all fields
    const productId = formData.get("productId") as string;
    const productName = formData.get("productName") as string;
    const size = formData.get("size") as string;
    const price = parseFloat(formData.get("price") as string);
    const customerName = formData.get("customerName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const transactionId = formData.get("transactionId") as string;
    const address = formData.get("address") as string;
    const screenshot = formData.get("screenshot") as File;

    // Validate
    if (
      !productId ||
      !customerName ||
      !email ||
      !transactionId ||
      !address ||
      !screenshot
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // --- STEP 1: Upload the Screenshot Image ---
    const timestamp = Date.now();
    // Sanitize transaction ID to be filename-safe
    const sanitizedId = transactionId.replace(/[^a-z0-9]/gi, "_");
    const imageExtension = screenshot.name.split(".").pop() || "png";
    const imageFilename = `receipts/${sanitizedId}-${timestamp}.${imageExtension}`;

    const imageBuffer = Buffer.from(await screenshot.arrayBuffer());

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imageFilename,
        Body: imageBuffer,
        ContentType: screenshot.type,
      }),
    );

    // Generate the public URL for the image
    const screenshotUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageFilename}`;

    // --- STEP 2: Create & Upload the Order JSON ---

    // Construct the single object containing ALL details
    const orderData = {
      orderId: sanitizedId,
      timestamp: new Date().toISOString(),
      verified: false, // Default is false until admin verifies payment proof
      status: "pending", //'pending' | 'accepted' | 'rejected'
      customer: {
        name: customerName,
        email: email,
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
        screenshotUrl: screenshotUrl,
      },
    };

    // Upload this JSON object as a file to R2
    const jsonFilename = `orders/${sanitizedId}.json`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: jsonFilename,
        Body: JSON.stringify(orderData, null, 2),
        ContentType: "application/json",
      }),
    );

    // --- STEP 3: Send Confirmation Email ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // MUST be true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"TEDxCUSAT Merch" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Received - #${sanitizedId.toUpperCase()} | TEDxCUSAT`,
      html: getOrderEmailHTML({
        customerName,
        orderId: sanitizedId,
        productName,
        size,
        price,
        transactionId,
        address,
        logoUrl:
          process.env.EMAIL_LOGO_URL ||
          "https://i.postimg.cc/1thNxGhW/logo-white.png",
      }),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully.");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Order processed and saved to R2",
      orderId: sanitizedId,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 },
    );
  }
}

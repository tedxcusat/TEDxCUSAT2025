import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { saveOrder } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extract form fields
        const productId = formData.get("productId") as string;
        const productName = formData.get("productName") as string;
        const size = formData.get("size") as string;
        const price = parseFloat(formData.get("price") as string);
        const customerName = formData.get("customerName") as string;
        const phone = formData.get("phone") as string;
        const transactionId = formData.get("transactionId") as string;
        const address = formData.get("address") as string;
        const screenshot = formData.get("screenshot") as File;

        // Validate required fields
        if (!productId || !productName || !size || !price || !customerName || !phone || !transactionId || !address) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        if (!screenshot) {
            return NextResponse.json(
                { success: false, message: "Payment screenshot is required" },
                { status: 400 }
            );
        }

        // Save screenshot to public/uploads
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadsDir, { recursive: true });

        const timestamp = Date.now();
        const extension = screenshot.name.split(".").pop() || "png";
        const filename = `${transactionId}-${timestamp}.${extension}`;
        const filePath = path.join(uploadsDir, filename);

        const bytes = await screenshot.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        const screenshotPath = `/uploads/${filename}`;

        // Save order to database
        const order = await saveOrder({
            productId,
            productName,
            size,
            price,
            customerName,
            phone,
            transactionId,
            address,
            screenshotPath,
        });

        return NextResponse.json({
            success: true,
            message: "Order submitted successfully",
            orderId: order.id,
        });

    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json(
            { success: false, message: "Failed to process order" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: "TEDxCUSAT Merch API",
        endpoints: {
            POST: "Submit a new order with form data",
        },
    });
}

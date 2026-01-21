import { promises as fs } from "fs";
import path from "path";

export interface OrderData {
    id: string;
    productId: string;
    productName: string;
    size: string;
    price: number;
    customerName: string;
    phone: string;
    transactionId: string;
    address: string;
    screenshotPath: string;
    createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

async function getOrders(): Promise<OrderData[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(ORDERS_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function saveOrder(order: Omit<OrderData, "id" | "createdAt">): Promise<OrderData> {
    const orders = await getOrders();

    const newOrder: OrderData = {
        ...order,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

    return newOrder;
}

export async function getAllOrders(): Promise<OrderData[]> {
    return getOrders();
}

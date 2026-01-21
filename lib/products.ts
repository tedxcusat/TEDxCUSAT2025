export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes: string[];
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: "tshirt-genesis",
        name: "Genesis Tee",
        price: 599,
        description: "Premium cotton t-shirt featuring the iconic TEDxCUSAT Genesis design. Comfortable fit with screen-printed artwork.",
        images: [
            "/merch/products/tshirt-1.png",
            "/merch/products/tshirt-2.png",
            "/merch/products/tshirt-3.png",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
    },
    {
        id: "hoodie-genesis",
        name: "Genesis Hoodie",
        price: 1299,
        description: "Cozy fleece-lined hoodie with embroidered TEDxCUSAT logo. Perfect for those cool evenings.",
        images: [
            "/merch/products/hoodie-1.png",
            "/merch/products/hoodie-2.png",
            "/merch/products/hoodie-3.png",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
    },
    {
        id: "cap-genesis",
        name: "Genesis Cap",
        price: 399,
        description: "Stylish snapback cap with embroidered TEDx logo. Adjustable fit for all sizes.",
        images: [
            "/merch/products/cap-1.png",
            "/merch/products/cap-2.png",
        ],
        sizes: ["One Size"],
        inStock: true,
    },
    {
        id: "totebag-genesis",
        name: "Genesis Tote",
        price: 349,
        description: "Eco-friendly canvas tote bag with bold TEDxCUSAT print. Spacious and durable.",
        images: [
            "/merch/products/tote-1.png",
            "/merch/products/tote-2.png",
        ],
        sizes: ["One Size"],
        inStock: true,
    },
];

export const qrCodes = [
    { id: "qr1", src: "/merch/qr-1.png", label: "GPay QR 1" },
    { id: "qr2", src: "/merch/qr-2.png", label: "GPay QR 2" },
];

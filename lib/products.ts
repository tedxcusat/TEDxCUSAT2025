export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  disabled?: boolean;
}

export const products: Product[] = [
  {
    id: "tshirt-genesis",
    name: "Genesis Tee",
    price: 369,
    description: "Premium cotton t-shirt featuring the iconic TEDxCUSAT Genesis design. Comfortable fit with screen-printed artwork.",
    images: [
      "/merch/products/tshirt-3.png",
      "/merch/products/tshirt-2.png",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
    disabled: false,
  },
  {
    id: "hoodie-genesis",
    name: "Genesis Hoodie",
    price: 749,
    description: "Cozy fleece-lined hoodie with embroidered TEDxCUSAT logo. Perfect for those cool evenings.",
    images: [
      "/merch/products/hoodie-3.png",
      "/merch/products/hoodie-2.png",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
    disabled: false,
  },
];

export const qrCodes = [
  { id: "qr1", src: "/merch/qr.jpg", label: "UPI ID : tedcusat@sbi" },
];

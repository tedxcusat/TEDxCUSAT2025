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
    description: "A clean streetwear-style tee with a small front logo and the large-scale, intricate 'Genesis' phoenix illustration centered across the shoulders and back.",
    images: [
      "/merch/products/tshirt-5.png",
      "/merch/products/tshirt-4.png",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
    disabled: false,
  },
  {
    id: "hoodie-genesis",
    name: "Genesis Hoodie",
    price: 749,
    description: "This hoodie features a minimalist TEDxCUSAT chest logo on the front and a bold, detailed white phoenix graphic on the back titled 'Genesis' with red accents and '2026' branding.",
    images: [
      "/merch/products/hoodie-5.png",
      "/merch/products/hoodie-4.png",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
    disabled: false,
  },
];

export const qrCodes = [
  { id: "qr1", src: "/merch/qr.jpg", label: "UPI ID : tedcusat@sbi" },
];

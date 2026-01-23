"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/lib/products";

interface MerchCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export default function MerchCard({ product, index, onSelect }: MerchCardProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={!product.disabled ? { scale: 1.02 } : undefined}
      onClick={() => !product.disabled && onSelect(product)}
      className={`merch-card relative group p-6 border border-white/20 hover:border-[#EB0028] bg-black/50 backdrop-blur-sm flex flex-col transition-all duration-300 ${!product.inStock || product.disabled ? "opacity-60 cursor-default" : "cursor-pointer"
        }`}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full mb-6 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(235,0,40,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-orbitron font-bold text-xl tracking-wider mb-2 text-white group-hover:text-[#EB0028] transition-colors">
          {product.name}
        </h3>
        <div className="h-0.5 w-12 bg-[#EB0028] mb-4" />
        <p className="font-clash text-gray-400 text-sm mb-4 flex-1">
          {product.description}
        </p>
        <p className="font-clash text-3xl font-semibold text-white">
          ₹{product.price}
        </p>
      </div>

      {/* View Details Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={product.disabled}
        className={`w-full py-3 mt-6 font-clash font-medium tracking-wide transition-colors duration-300 uppercase ${product.disabled
          ? 'bg-transparent border border-white/20 text-white/40 cursor-not-allowed'
          : 'bg-transparent border border-[#EB0028] text-white hover:bg-[#EB0028]'
          }`}
      >
        {!product.inStock ? "Out of Stock" : product.disabled ? "Coming Soon" : "View Details"}
      </motion.button>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#EB0028] transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#EB0028] transition-colors" />

      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-[2px]">
          <div className="-rotate-[30deg] opacity-90 text-center">
            <span className="font-orbitron font-black text-3xl">
              <span className="text-white">OUT OF</span> <span className="text-[#EB0028]">STOCK</span>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

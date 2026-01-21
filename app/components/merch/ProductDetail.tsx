"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Product } from "@/lib/products";
import SizeSelector from "@/app/components/merch/SizeSelector";

interface ProductDetailProps {
    product: Product;
    onClose: () => void;
    onBuy: (product: Product, size: string) => void;
}

export default function ProductDetail({ product, onClose, onBuy }: ProductDetailProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleBuy = () => {
        if (selectedSize) {
            onBuy(product, selectedSize);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-black border border-white/20 w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/30 hover:border-[#EB0028] hover:text-[#EB0028] transition-colors"
                >
                    <X size={20} />
                </motion.button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Gallery */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black">
                        {/* Main Image */}
                        <div className="relative aspect-square">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images[currentImageIndex]}
                                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                                        fill
                                        className="object-contain p-8"
                                        unoptimized
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Red Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(235,0,40,0.1)_0%,_transparent_60%)]" />
                        </div>

                        {/* Navigation Arrows */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/30 hover:border-[#EB0028] hover:text-[#EB0028] transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/30 hover:border-[#EB0028] hover:text-[#EB0028] transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Image Dots */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-[#EB0028]" : "bg-white/30 hover:bg-white/50"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="p-8 flex flex-col justify-center">
                        <h2 className="font-orbitron font-bold text-3xl md:text-4xl tracking-wider mb-4 text-white">
                            {product.name}
                        </h2>
                        <div className="h-1 w-16 bg-[#EB0028] mb-6" />

                        <p className="font-clash text-gray-400 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <p className="font-clash text-4xl font-semibold text-white mb-8">
                            ₹{product.price}
                        </p>

                        {/* Size Selector */}
                        <SizeSelector
                            sizes={product.sizes}
                            selectedSize={selectedSize}
                            onSelect={setSelectedSize}
                        />

                        {/* Buy Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBuy}
                            disabled={!selectedSize || !product.inStock}
                            className={`w-full py-4 mt-8 font-clash font-bold text-lg tracking-wide uppercase transition-all duration-300 ${selectedSize && product.inStock
                                ? "bg-[#EB0028] hover:bg-[#c00020] text-white cursor-pointer"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {!product.inStock ? "Out of Stock" : selectedSize ? "Buy Now" : "Select Size"}
                        </motion.button>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#EB0028]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#EB0028]" />
            </motion.div>
        </motion.div>
    );
}

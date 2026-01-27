"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Product } from "@/lib/products";
import SizeSelector from "@/app/components/merch/SizeSelector";
import SizeChartModal from "@/app/components/merch/SizeChartModal";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onBuy: (product: Product, size: string) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export default function ProductDetail({ product, onClose, onBuy }: ProductDetailProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showSizeChart, setShowSizeChart] = useState(false);

  // We only have 3 images, so we can wrap the index
  const imageIndex = wrap(0, product.images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const jumpTo = (index: number) => {
    const direction = index > imageIndex ? 1 : -1;
    setPage([index, direction]);
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
            <div className="relative aspect-square overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }: PanInfo) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={product.images[imageIndex]}
                    alt={`${product.name} - Image ${imageIndex + 1}`}
                    fill
                    className="object-contain p-8"
                    unoptimized
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Red Glow */}
              <div className="absolute inset-0" />
            </div>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/30 hover:border-[#EB0028] hover:text-[#EB0028] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/30 hover:border-[#EB0028] hover:text-[#EB0028] transition-colors"
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
                    onClick={(e) => { e.stopPropagation(); jumpTo(index); }}
                    className={`w-2 h-2 rounded-full transition-colors z-20 ${index === imageIndex ? "bg-[#EB0028]" : "bg-white/30 hover:bg-white/50"
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

            {/* Size Chart Link */}
            <button
              onClick={() => setShowSizeChart(true)}
              className="font-clash text-sm text-gray-400 hover:text-[#EB0028] underline underline-offset-4 mt-2 mb-0 transition-colors self-start"
            >
              View Size Chart
            </button>

            {/* Buy Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              disabled={!selectedSize || !product.inStock || product.disabled}
              className={`w-full py-4 mt-8 font-clash font-bold text-lg tracking-wide uppercase transition-all duration-300 ${product.disabled
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : selectedSize && product.inStock
                  ? "bg-[#EB0028] hover:bg-[#c00020] text-white cursor-pointer"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
            >
              {!product.inStock ? "Out of Stock" : product.disabled ? "Coming Soon" : selectedSize ? "Buy Now" : "Select Size"}
            </motion.button>
          </div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#EB0028]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#EB0028]" />
      </motion.div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && <SizeChartModal onClose={() => setShowSizeChart(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

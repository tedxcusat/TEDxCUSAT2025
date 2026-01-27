"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface SizeChartModalProps {
  onClose: () => void;
}

const sizeData = [
  { size: "XS", width: "34" },
  { size: "S", width: "36" },
  { size: "M", width: "38" },
  { size: "L", width: "40" },
  { size: "XL", width: "42" },
  { size: "2XL", width: "44" },
  { size: "3XL", width: "46" },
];

export default function SizeChartModal({ onClose }: SizeChartModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[210] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-black border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-[#EB0028]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wide">
            SIZE <span className="text-[#EB0028]">CHART</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 overflow-y-auto max-h-[80vh]">

          {/* Visual Guide */}
          <div className="flex flex-col items-center justify-center">
            {/* Refined Tshirt SVG Visualization */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* T-Shirt Outline - Minimal White Stroke */}
                <path d="M60 40 L40 60 L60 80 L60 180 L140 180 L140 80 L160 60 L140 40 L120 45 Q100 55 80 45 Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Chest Measure Line - Red Dashed */}
                <line x1="62" y1="100" x2="138" y2="100" stroke="#EB0028" strokeWidth="2" strokeDasharray="4 4" />

                {/* Label */}
                <text x="100" y="90" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">CHEST WIDTH</text>
              </svg>
            </div>
            <p className="font-clash text-xs text-gray-400 mt-4 text-center">
              Measure around the fullest part of your chest, keeping the tape horizontal.
            </p>
          </div>

          {/* Size Table */}
          <div className="w-full">
            <div className="bg-[#EB0028] text-white font-clash font-bold text-sm uppercase tracking-wider py-3 px-4 text-center">
              Generic Sizing (Adults)
            </div>
            <div className="border-x border-b border-white/10">
              <div className="grid grid-cols-2 bg-white/5 border-b border-white/10">
                <div className="py-3 px-4 text-center font-clash font-semibold text-white/80 border-r border-white/10">SIZE</div>
                <div className="py-3 px-4 text-center font-clash font-semibold text-white/80">CHEST WIDTH (INCHES)</div>
              </div>
              {sizeData.map((item, index) => (
                <div key={item.size} className={`grid grid-cols-2 hover:bg-white/5 transition-colors ${index !== sizeData.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div className="py-2 px-4 text-center font-clash text-white border-r border-white/10">{item.size}</div>
                  <div className="py-2 px-4 text-center font-clash text-white">{item.width}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Decorative Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#EB0028] to-transparent opacity-50" />
      </motion.div>
    </motion.div>
  );
}

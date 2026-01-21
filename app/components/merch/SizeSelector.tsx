"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
    return (
        <div>
            <p className="font-clash text-gray-400 text-sm mb-3 uppercase tracking-wider">
                Select Size
            </p>
            <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                    <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(size)}
                        className={`min-w-[48px] px-4 py-3 font-clash font-medium text-sm border transition-all duration-300 ${selectedSize === size
                                ? "bg-[#EB0028] border-[#EB0028] text-white"
                                : "bg-transparent border-white/30 text-white hover:border-[#EB0028] hover:text-[#EB0028]"
                            }`}
                    >
                        {size}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

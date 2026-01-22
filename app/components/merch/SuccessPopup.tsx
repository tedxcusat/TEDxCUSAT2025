"use client";

import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface SuccessPopupProps {
    onClose: () => void;
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative bg-black border border-[#EB0028] p-8 md:p-12 max-w-md w-full text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </motion.button>

                {/* Animated Checkmark */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="inline-block mb-6"
                >
                    <div className="w-20 h-20 rounded-full bg-[#EB0028]/20 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", damping: 15 }}
                        >
                            <CheckCircle size={48} className="text-[#EB0028]" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4"
                >
                    Order <span className="text-[#EB0028]">Submitted!</span>
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-clash text-gray-400 mb-8"
                >
                    Thank you for your order! We will verify your payment and contact you shortly.
                </motion.p>

                {/* Animated Lines */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-[#EB0028] to-transparent mb-8"
                />

                {/* Close Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-4 bg-[#EB0028] hover:bg-[#c00020] text-white font-clash font-bold text-lg tracking-wide uppercase transition-colors"
                >
                    Continue Shopping
                </motion.button>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#EB0028]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#EB0028]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#EB0028]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#EB0028]" />
            </motion.div>
        </motion.div>
    );
}

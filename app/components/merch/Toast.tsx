"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface MerchToastProps {
  show: boolean;
  onClose: () => void;
}

export default function MerchToast({ show, onClose }: MerchToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/*DESKTOP */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="hidden md:flex fixed bottom-4 right-4 z-[9999] items-center"
            role="alert"
            aria-live="polite"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <div className="relative bg-black/95 backdrop-blur-md border border-[#EB0028]/50 flex items-center overflow-hidden cursor-pointer">
              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{
                  width: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  paddingLeft: isExpanded ? 6 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); handleClose(); }}
                  className="p-0.5 text-white/50 hover:text-white transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <Link href="/merch" onClick={handleClose}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-[#EB0028] hover:bg-[#B71C1C] text-white font-clash font-medium text-xs tracking-wide uppercase transition-colors duration-200 shrink-0"
                  >
                    Shop
                  </motion.button>
                </Link>
                <span className="font-clash text-sm text-gray-300 shrink-0 mr-3">
                  Merch available!
                </span>
              </motion.div>

              <motion.span
                initial={false}
                animate={{
                  width: isExpanded ? 0 : "auto",
                  opacity: isExpanded ? 0 : 1,
                  paddingLeft: isExpanded ? 0 : 16,
                  paddingRight: isExpanded ? 0 : 12,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-orbitron font-bold text-xs text-white tracking-wide overflow-hidden whitespace-nowrap"
              >
                MERCH LIVE
              </motion.span>

              {/* Icon - Always visible (right side) */}
              <div
                className={`shrink-0 w-10 h-10 flex items-center justify-center transition-colors duration-200 ${isExpanded ? 'bg-[#B71C1C]' : 'bg-[#EB0028]'
                  }`}
              >
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>

          {/* ============ MOBILE: Minimal bottom bar ============ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[9999]"
            role="alert"
            aria-live="polite"
          >
            <div className="bg-black/95 backdrop-blur-md border-t border-[#EB0028]/30 px-4 py-2.5 flex items-center justify-between">
              {/* Left: Icon + Text */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#EB0028] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span className="font-orbitron font-bold text-[11px] text-white tracking-wide">
                  MERCH LIVE
                </span>
              </div>

              {/* Right: CTA + Close */}
              <div className="flex items-center gap-2">
                <Link href="/merch" onClick={handleClose}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-[#EB0028] hover:bg-[#B71C1C] text-white font-clash font-medium text-[11px] tracking-wide uppercase transition-colors duration-200"
                  >
                    Shop
                  </motion.button>
                </Link>
                <button
                  onClick={handleClose}
                  className="p-1.5 text-white/50 hover:text-white transition-colors"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

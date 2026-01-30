"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HappyHourPopupProps {
  show: boolean;
  onClose: () => void;
}

export default function HappyHourPopup({ show, onClose }: HappyHourPopupProps) {
  const [isActive, setIsActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkTime = () => {
      const deadline = new Date("2026-01-31T11:00:00+05:30").getTime();
      const now = new Date().getTime();
      setIsActive(now < deadline);
    };

    checkTime();
    // Re-check every minute just in case
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsDismissed(true);
    onClose();
  };

  if (!isActive || isDismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
        >
          {/* Backdrop with blur & darken effect */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative bg-black border border-[#EB0028]/50 p-6 md:p-8 max-w-[360px] w-full text-center shadow-[0_0_50px_-10px_rgba(235,0,40,0.5)] overflow-hidden rounded-xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-20"
            >
              <X size={20} />
            </motion.button>

            {/* Decorative Elements - Reverted Blob Design */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EB0028]/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EB0028]/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-2">
              <div className="bg-[#EB0028]/20 p-3 rounded-full mb-4 animate-pulse">
                <Clock className="text-[#EB0028] w-6 h-6" />
              </div>

              <h2 className="font-orbitron font-black text-3xl text-white mb-2 tracking-wide">
                HAPPY <span className="text-[#EB0028]">HOURS!!!</span>
              </h2>

              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#EB0028] to-transparent mb-4 opacity-80" />

              <p className="font-clash font-bold text-4xl text-white mb-2">
                FLAT <span className="text-[#EB0028]">30% OFF</span>
              </p>

              <p className="font-clash text-gray-400 text-sm mb-4 max-w-[240px]">
                On all tickets. Grab yours before time runs out!
              </p>

              <div className="bg-[#EB0028]/10 border border-[#EB0028]/20 rounded-lg px-4 py-2 mb-6">
                <p className="font-clash text-xs text-white uppercase tracking-widest font-bold mb-1">
                  Use Coupon Code
                </p>
                <p className="font-orbitron text-xl text-[#EB0028] font-black tracking-widest select-all">
                  HAPPY30
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleClose();
                  router.push("/tickets");
                }}
                className="w-full py-4 bg-[#EB0028] hover:bg-[#EB0028]/90 text-white font-orbitron font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(235,0,40,0.4)] hover:shadow-[0_0_30px_rgba(235,0,40,0.6)] text-sm rounded-lg"
              >
                Claim Discount
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

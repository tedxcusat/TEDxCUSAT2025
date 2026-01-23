"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

interface MerchToastProps {
  show: boolean;
  onClose: () => void;
}

export default function MerchToast({ show, onClose }: MerchToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mobile drag states
  const [isDragging, setIsDragging] = useState(false);
  const [showDropZone, setShowDropZone] = useState(false);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  // Persisted position state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Periodic shake animation
  useEffect(() => {
    if (!isVisible || isDragging) return;

    const shakeInterval = setInterval(() => {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 600);
    }, 8000); // Shake every 8 seconds

    // Initial shake after 2 seconds
    const initialShake = setTimeout(() => {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 600);
    }, 2000);

    return () => {
      clearInterval(shakeInterval);
      clearTimeout(initialShake);
    };
  }, [isVisible, isDragging]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setShowDropZone(true);
    hasMoved.current = false;
    dragStartPos.current = { ...position };
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Check if moved significantly (more than 5px)
    if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
      hasMoved.current = true;
    }

    // Check if over drop zone (bottom 100px of screen)
    const windowHeight = window.innerHeight;
    const elementRect = dragRef.current?.getBoundingClientRect();
    if (elementRect && elementRect.bottom > windowHeight - 100) {
      setIsOverDropZone(true);
    } else {
      setIsOverDropZone(false);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    setShowDropZone(false);

    if (isOverDropZone) {
      // Dismiss the toast
      handleClose();
    } else {
      // Update position to persist the new location
      setPosition({
        x: dragStartPos.current.x + info.offset.x,
        y: dragStartPos.current.y + info.offset.y
      });
    }

    setIsOverDropZone(false);
  };

  const handleTap = () => {
    // Only navigate if we haven't moved (tap, not drag)
    if (!hasMoved.current) {
      window.location.href = "/merch";
      handleClose();
    }
  };

  // Shake animation variants
  const shakeAnimation = {
    shake: {
      x: [0, -3, 3, -3, 3, -2, 2, 0],
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const }
    },
    idle: { x: 0 }
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

          {/* ============ MOBILE: Draggable shopping bag icon ============ */}
          <motion.div
            ref={dragRef}
            drag
            dragMomentum={false}
            dragElastic={0}
            onPointerDown={() => { hasMoved.current = false; }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            initial={{ opacity: 0, scale: 0.8, x: position.x, y: position.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: position.x,
              y: position.y,
              ...(shouldShake && !isDragging ? {
                x: [position.x, position.x - 3, position.x + 3, position.x - 3, position.x + 3, position.x - 2, position.x + 2, position.x],
              } : {})
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={shouldShake ? { duration: 0.5 } : { type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden fixed top-80 left-4 z-[100] touch-none cursor-pointer"
            role="alert"
            aria-live="polite"
            style={{
              boxShadow: shouldShake
                ? "0 0 20px 4px rgba(235, 0, 40, 0.6), 0 4px 15px rgba(0,0,0,0.5)"
                : "0 4px 15px rgba(0,0,0,0.5)"
            }}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center transition-all duration-200 select-none ${isDragging
                ? 'bg-[#B71C1C] scale-110'
                : isOverDropZone
                  ? 'bg-red-700 scale-90'
                  : 'bg-[#EB0028]'
                }`}
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Drop zone - simple trash icon */}
          <AnimatePresence>
            {showDropZone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[99]"
              >
                <motion.div
                  animate={{
                    scale: isOverDropZone ? 1.5 : 1,
                    backgroundColor: isOverDropZone ? "rgba(239, 68, 68, 1)" : "rgba(0, 0, 0, 0.8)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20"
                >
                  <Trash2 className={`transition-all duration-200 ${isOverDropZone ? 'w-7 h-7 text-white' : 'w-5 h-5 text-white/60'}`} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}



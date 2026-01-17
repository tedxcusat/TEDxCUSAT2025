"use client";

import React, { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- HELPERS ---
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// --- DATA ---
interface JourneyEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const journeyEvents: JourneyEvent[] = [
  {
    year: "2019",
    title: "THE BEGINNING",
    description:
      "The inception of TEDxCUSAT, sparking the first flame of ideas worth spreading in our community.",
    image: "/images/event-2019.png",
  },
  {
    year: "2020",
    title: "UN-QUINTESSENTIAL",
    description:
      "Celebrated imperfection and shared humanity, featuring prominent speakers like Dr. M.R. Rajagopal and S. Somnath.",
    image: "/images/event-2020.png",
  },
  {
    year: "2022",
    title: "DIVERGENCE",
    description:
      "Explored the power of divergent thinking, bringing together artists and scientists to challenge the status quo.",
    image: "/images/event-2022.png",
  },
  {
    year: "2024",
    title: "RESILIENCE",
    description:
      "A testament to the human spirit's ability to bounce back, showcasing stories of overcoming adversity.",
    image: "/images/event-2024.png",
  },
];

const yearsList = ["2019", "2020", "2021", "2022", "2023", "2024"];
const flatDigits = yearsList
  .map((year) => year + " . ")
  .join("")
  .split("");
const totalDigits = flatDigits.length;
const angleStep = 360 / totalDigits;

export default function Journey() {
  // --- STATES ---
  const [[page, direction], setPage] = useState([0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const mobileEyeRef = useRef<HTMLDivElement>(null); // NEW: Add this for Mobile
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);

  // --- CAROUSEL LOGIC ---
  const eventIndex = wrap(0, journeyEvents.length, page);
  const currentEvent = journeyEvents[eventIndex];
  const currentIndex = eventIndex; // Alias for backward compatibility with JSX

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleNext = () => paginate(1);
  const handlePrev = () => paginate(-1);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    // Ensure we check for mobile refs as well
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        
        // --- DESKTOP ANIMATION (Unchanged) ---
        "(min-width: 768px)": function () {
          if (!eyeRef.current || !contentRef.current) return;

          gsap.set(eyeRef.current, { y: 0, scale: 1, opacity: 1, clearProps: "all" });
          gsap.set(contentRef.current, { y: 80, opacity: 0, clearProps: "all" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.to(eyeRef.current, {
            y: -50,
            scale: 0.35,
            transformOrigin: "top center",
            duration: 1,
            ease: "power2.inOut",
          });

          tl.to(contentRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6");
        },

        // --- MOBILE ANIMATION (Fixed) ---
        "(max-width: 767px)": function () {
          if (!mobileEyeRef.current || !mobileContentRef.current) return;

          // 1. Setup initial state for mobile
          gsap.set(mobileEyeRef.current, { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            clearProps: "all" 
          });
          
          gsap.set(mobileContentRef.current, { 
            y: 50, // Start slightly lower
            opacity: 0, 
            clearProps: "all" 
          });

          // 2. Apply the SAME Pinning logic as desktop
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top", // Start animating when section hits top
              end: "+=100%",   // Shorter scroll distance for mobile feels better
              scrub: true,
              pin: true,       // Pin the section on mobile too
              anticipatePin: 1,
            },
          });

          // 3. Animate Mobile Eye (Move up and shrink)
          tl.to(mobileEyeRef.current, {
            y: -80,            // Adjust vertical move for mobile layout
            scale: 0.5,        // Don't shrink as much as desktop
            transformOrigin: "center center",
            duration: 1,
            ease: "power2.inOut",
          });

          // 4. Reveal Mobile Content
          tl.to(mobileContentRef.current, { 
            opacity: 1, 
            y: -140, 
            duration: 1, 
            ease: "power2.out" 
          }, "-=0.8"); // Overlap slightly
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
    >
      {/* 
        ========================================
        MOBILE LAYOUT (Flex Column)
        Visible only on small screens < 768px
        ========================================
      */}
      <div className="md:hidden flex flex-col items-center pt-20 pb-48 px-6 min-h-screen">
        {/* Mobile Eye */}
        <div ref={mobileEyeRef} className="relative w-[300px] h-[300px] shrink-0 flex items-center justify-center mb-10">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Spinning Rings (Scaled Down) */}
            <div className="absolute inset-0 animate-[spin_35s_linear_infinite]">
              {flatDigits.map((digit, i) => (
                <div key={`m-outer-${i}`} className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-140px)` }}>
                  <span className="text-white/40 text-[10px] font-mono">{digit}</span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 animate-[spin_30s_linear_infinite_reverse]">
              {flatDigits.map((digit, i) => (
                <div key={`m-inner-${i}`} className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-100px)` }}>
                  <span className="text-white text-[10px] font-bold font-mono">{digit}</span>
                </div>
              ))}
            </div>
            {/* Eye Image */}
            <img src="/images/eye-3d.png" alt="Eye" className="relative z-10 w-[160px] drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]" />
          </div>
        </div>

        {/* Mobile Content */}
        <div ref={mobileContentRef} className="w-full max-w-sm space-y-8">
          <div className="flex justify-between items-end border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold uppercase">Our <span className="text-[#E62B1E]">Journey</span></h2>
            <div className="flex gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
            </div>
          </div>

          <div className="relative h-[400px] w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
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
                onDragEnd={handleDragEnd}
                className="absolute w-full space-y-4 cursor-grab active:cursor-grabbing"
              >
                <div>
                  <h3 className="text-[#E62B1E] text-xl font-bold mb-1">
                    {currentEvent.title}
                  </h3>
                  <p className="text-3xl font-mono text-gray-700 opacity-50">
                    {currentEvent.year}
                  </p>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentEvent.description}
                </p>
                <div className="relative w-full h-[200px] bg-gray-900 rounded-lg overflow-hidden border border-gray-800 mt-4 pointer-events-none">
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots (Mobile) */}
          <div className="flex justify-center mt-6 gap-2">
            {journeyEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > eventIndex ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === eventIndex
                  ? "bg-[#E62B1E] w-8"
                  : "bg-white/20 hover:bg-white/40 w-4"
                  }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>


      {/* 
        ========================================
        DESKTOP LAYOUT (Absolute + Pinned)
        Visible only on medium screens >= 768px
        ========================================
      */}
      <div className="hidden md:block w-full h-full">
        {/* --- DESKTOP EYE --- */}
        <div
          ref={eyeRef} // Shared ref works because standard flow vs absolute doesn't conflict if we manage via matchMedia
          className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
        >
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite]">
              {flatDigits.map((digit, i) => (
                <div key={`d-outer-${i}`} className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-260px)`,
                    transition: "transform 1s"
                  }}>
                  <span className="block text-white/40 font-mono text-sm">{digit}</span>
                </div>
              ))}
            </div>

            {/* Inner Ring */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
              {flatDigits.map((digit, i) => (
                <div key={`d-inner-${i}`} className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-190px)`,
                    transition: "transform 1s"
                  }}>
                  <span className="block text-white font-bold font-mono text-base drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{digit}</span>
                </div>
              ))}
            </div>

            {/* Eye Image */}
            <div className="relative z-30 w-[280px] hover:scale-105 transition-transform duration-500">
              <img
                src="/images/eye-3d.png"
                alt="Journey Eye"
                className="w-full h-auto drop-shadow-[0_0_50px_rgba(220,38,38,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* --- DESKTOP CONTENT --- */}
        <div
          ref={contentRef}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full max-w-5xl pb-32 px-6 opacity-0 z-30"
        >
          {/* Header */}
          <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-6">
            <h2 className="text-4xl font-bold uppercase">
              Our <span className="text-[#E62B1E]">Journey</span>
            </h2>
            <div className="flex gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                aria-label="Next event"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Grid */}
          <div className="relative w-full min-h-[350px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
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
                onDragEnd={handleDragEnd}
                className="absolute w-full grid grid-cols-2 gap-8 items-center cursor-grab active:cursor-grabbing"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[#E62B1E] text-3xl font-bold mb-1">
                      {currentEvent.title}
                    </h3>
                    <p className="text-5xl font-mono text-gray-700 opacity-50">
                      {currentEvent.year}
                    </p>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative h-[320px] w-full bg-gray-900 overflow-hidden group border-2 border-white/10 p-1 pointer-events-none">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
            {journeyEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > eventIndex ? 1 : -1])}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === eventIndex
                  ? "bg-[#E62B1E] w-8 sm:w-10"
                  : "bg-white/20 hover:bg-white/40 w-4 sm:w-6"
                  }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

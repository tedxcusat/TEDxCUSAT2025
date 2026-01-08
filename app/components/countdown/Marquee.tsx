"use client";

import { useState } from "react";

export default function Marquee() {
  // State to determine which image to show
  const [activeImg, setActiveImg] = useState<string | null>(null);

  // Define your images here. Replace with actual paths.
  const IMG_1 = "/image-1.png"; 
  const IMG_2 = "/image-2.jpg"; 

  return (
    // Main Container
    <div 
      className="relative w-full bg-black border-y border-white py-6"
      // Clear image when mouse leaves the entire marquee strip area
      onMouseLeave={() => setActiveImg(null)}
    >
      
      {/* HOVER IMAGE POPUP */}
      <div 
        // CHANGED: 'translate-y-12' (was 4) to bring it further down to overlap the marquee.
        // The constraints (max-w, max-h) remain untouched.
        className={`absolute bottom-[100%] right-4 sm:right-10 z-50 pointer-events-none transition-all duration-500 ease-out transform ${
          activeImg ? "opacity-100 translate-y-12" : "opacity-0 translate-y-20"
        }`}
      >
        {activeImg && (
          <img 
            src={activeImg} 
            alt="Preview" 
            className="w-auto h-auto max-w-[200px] sm:max-w-[300px] max-h-[160px] sm:max-h-[200px] object-contain border border-white/50 shadow-2xl bg-black"
          />
        )}
      </div>

      {/* SCROLLING TRACK CONTAINER */}
      <div className="overflow-hidden w-full h-full relative z-10">
        {/* ANIMATED TRACK */}
        <div className="animate-marquee flex whitespace-nowrap font-clash font-normal text-[18px] sm:text-[20px] lg:text-[22px] leading-none text-white">
          
          {/* TRACK 1 */}
          <div className="flex items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center">
                
                {/* HOVER ZONE 1: Covers "TEDXCUSAT... < Ideas in Motion" */}
                <span 
                  className="flex items-center gap-6 pr-6 cursor-pointer"
                  onMouseEnter={() => setActiveImg(IMG_1)}
                >
                  <span className="font-semibold">TEDXCUSAT’26</span>
                  <span className="text-[#EB0028]">&lt;</span>
                  <span>Ideas in Motion</span>
                </span>

                {/* HOVER ZONE 2: Covers "< Step Into It <" */}
                <span 
                  className="flex items-center gap-6 pr-6 cursor-pointer"
                  onMouseEnter={() => setActiveImg(IMG_2)}
                >
                  <span className="text-[#EB0028]">&lt;</span>
                  <span>Step Into It</span>
                  <span className="text-[#EB0028]">&lt;</span>
                </span>

              </span>
            ))}
          </div>

          {/* TRACK 2 — IDENTICAL COPY */}
          <div className="flex items-center ml-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`dup-${i}`} className="flex items-center">
                
                {/* HOVER ZONE 1 DUPLICATE */}
                <span 
                  className="flex items-center gap-6 pr-6 cursor-pointer"
                  onMouseEnter={() => setActiveImg(IMG_1)}
                >
                  <span className="font-semibold">TEDXCUSAT’26</span>
                  <span className="text-[#EB0028]">&lt;</span>
                  <span>Ideas in Motion</span>
                </span>

                {/* HOVER ZONE 2 DUPLICATE */}
                <span 
                  className="flex items-center gap-6 pr-6 cursor-pointer"
                  onMouseEnter={() => setActiveImg(IMG_2)}
                >
                  <span className="text-[#EB0028]">&lt;</span>
                  <span>Step Into It</span>
                  <span className="text-[#EB0028]">&lt;</span>
                </span>
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
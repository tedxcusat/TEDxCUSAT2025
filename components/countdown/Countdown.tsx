"use client";

import { useEffect, useState, useRef } from "react";
import CountdownTimer from "./CountdownTimer";
import Marquee from "./Marquee";

export default function Countdown() {
  // State to trigger animations when visible
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Trigger animation when the section enters the viewport
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Run once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // Added ref={sectionRef} to monitor visibility
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black flex flex-col overflow-hidden lg:pb-2"
    >
      {/* TOP CONTENT */}
      {/* pt-24 ensures the content is moved down */}
      <div className="pt-24 sm:pt-16 lg:pt-24 flex flex-col items-center w-full">
        
        {/* Heading */}
        {/* ANIMATION: Drop down and fade in from top */}
        <h2 
          className={`relative flex flex-col lg:block items-center mb-6 lg:mb-10 px-4 text-center font-orbitron font-black tracking-[8%] whitespace-nowrap transform transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {/* MODIFIED: Mobile-only Gradient Section */}
          <div 
            // translate-y-20 (Height adjustment)
            className={`absolute bottom-full translate-y-20 inset-x-0 h-[300px] w-full lg:hidden pointer-events-none transition-opacity duration-1000 ${
                isInView ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: -1 }}
          >
            {/* Layer 1: The Planet (Light Source) */}
            <img 
                src="/Planet.png" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    filter: 'blur(20px)', 
                    transform: 'scale(1.1)' 
                }}
            />

            {/* Layer 2: The Texture (Overlay) */}
            <img 
                src="/texture.png"
                alt=""
                // MODIFIED: Removed 'opacity-50' so it is fully visible. Kept mix-blend-overlay for texture effect.
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
          </div>

          <span className="text-white text-[40px] sm:text-[48px] md:text-[64px] lg:text-[92px] lg:mr-6 z-10">
            FINAL
          </span>
          <span className="text-[#EB0028] text-[40px] sm:text-[48px] md:text-[64px] lg:text-[92px] z-10">
            COUNTDOWN
          </span>
        </h2>

        {/* DESKTOP VIEW (Hands + Timer) */}
        <div className="hidden lg:flex w-full items-center justify-between min-h-[200px]">
          
          {/* LEFT HAND */}
          <div 
            className={`w-[180px] xl:w-[260px] flex-shrink-0 flex justify-start z-10 transform transition-all duration-1000 delay-500 ease-out ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <img
              src="/hand-left.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

          {/* CENTER ZONE */}
          <div 
            className={`flex-1 flex justify-center z-0 transform transition-all duration-1000 delay-300 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="border border-white w-full py-4 px-2 xl:px-8 flex justify-center">
              <CountdownTimer />
            </div>
          </div>

          {/* RIGHT HAND */}
          <div 
            className={`w-[180px] xl:w-[260px] flex-shrink-0 flex justify-end z-10 transform transition-all duration-1000 delay-500 ease-out ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <img
              src="/hand-right.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

        </div>

        {/* MOBILE / TABLET VIEW (Timer only) */}
        <div 
          className={`flex justify-center lg:hidden px-4 w-full transform transition-all duration-1000 delay-300 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="w-fit border border-white flex justify-center px-6 sm:px-4 py-6">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div 
        className={`mt-auto w-full transform transition-all duration-1000 delay-1000 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <Marquee />
      </div>
    </section>
  );
}
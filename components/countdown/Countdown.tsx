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
      <div className="pt-12 sm:pt-16 lg:pt-24 flex flex-col items-center w-full">
        
        {/* Heading */}
        {/* ANIMATION: Drop down and fade in from top */}
        <h2 
          className={`mb-6 lg:mb-10 px-4 text-center font-orbitron font-black tracking-[8%] whitespace-nowrap transform transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <span className="text-white text-[32px] sm:text-[48px] md:text-[64px] lg:text-[92px] mr-3 sm:mr-6">
            FINAL
          </span>
          <span className="text-[#EB0028] text-[32px] sm:text-[48px] md:text-[64px] lg:text-[92px]">
            COUNTDOWN
          </span>
        </h2>

        {/* DESKTOP VIEW (Hands + Timer) */}
        <div className="hidden lg:flex w-full items-center justify-between min-h-[200px]">
          
          {/* LEFT HAND */}
          {/* ANIMATION: Fade in from the left side */}
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
          {/* ANIMATION: Drop down and fade in from top (with slight delay) */}
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
          {/* ANIMATION: Fade in from the right side */}
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
        {/* ANIMATION: Drop down and fade in from top (with slight delay) */}
        <div 
          className={`flex justify-center lg:hidden px-4 w-full transform transition-all duration-1000 delay-300 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="w-fit border border-white flex justify-center px-4">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      {/* ANIMATION: Fades in from bottom (Delay 1000ms - Last) */}
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
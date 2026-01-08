"use client";

import { useEffect, useState, useRef } from "react";
import CountdownTimer from "./CountdownTimer";
import Marquee from "./Marquee";

/**
 * Countdown Component
 * 
 * Displays the "Final Countdown" section with animated hands, timer, and a scrolling marquee.
 * Accepts `startAnimation` prop to trigger animations when the section scrolls into view.
 */
export default function Countdown({ startAnimation = false }: { startAnimation?: boolean }) {

  // --------------------------------------------------------------------------
  // STATE & REFS
  // --------------------------------------------------------------------------

  // Controls the visibility state for CSS transitions (opacity/translation)
  const [isInView, setIsInView] = useState(false);

  // Reference to the main section (though currently unused for intersection observer since we use props)
  const sectionRef = useRef<HTMLElement>(null);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------

  // Syncs local `isInView` state with the `startAnimation` prop passed from the parent (ScrollTrigger)
  useEffect(() => {
    if (startAnimation) {
      setIsInView(true);
    }
  }, [startAnimation]);

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black flex flex-col overflow-hidden lg:min-h-screen lg:pb-2"
    >
      {/* =========================================
          TOP CONTENT WRAPPER
          Contains Heading, Hands, and Timer
      ========================================= */}
      <div className="pt-24 sm:pt-16 lg:pt-24 flex flex-col items-center w-full max-w-[1440px] mx-auto">

        {/* ------------------------------------------------
            1. HEADING SECTION ("FINAL COUNTDOWN")
            Animates: Fade In + Drop Down
        ------------------------------------------------ */}
        <h2
          className={`relative flex flex-col lg:block items-center mb-6 lg:mb-10 px-4 text-center font-orbitron font-black tracking-[8%] whitespace-nowrap transform transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
        >
          {/* Mobile Background Gradient & Texture (Hidden on Desktop) */}
          <div
            className={`absolute bottom-full translate-y-20 inset-x-0 h-[300px] w-full lg:hidden pointer-events-none transition-opacity duration-1000 ${isInView ? "opacity-100" : "opacity-0"
              }`}
            style={{ zIndex: -1 }}
          >
            {/* The Planet (Light Source) */}
            <img
              src="/Planet.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'blur(20px)',
                transform: 'scale(1.1)'
              }}
            />

            {/* The Texture (Overlay) */}
            <img
              src="/texture.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
          </div>

          {/* Text Content */}
          <span className="text-white text-[40px] sm:text-[48px] md:text-[64px] lg:text-[92px] lg:mr-6 z-10">
            FINAL
          </span>
          <span className="text-[#EB0028] text-[40px] sm:text-[48px] md:text-[64px] lg:text-[92px] z-10">
            COUNTDOWN
          </span>
        </h2>

        {/* ------------------------------------------------
            2. DESKTOP VIEW
            Layout: [Left Hand] - [Timer] - [Right Hand]
            Hidden on mobile, visible on lg screens
        ------------------------------------------------ */}
        <div className="hidden -mt-16 lg:flex w-full items-center justify-center gap-1 min-h-[200px]">

          {/* LEFT HAND IMAGE */}
          <div
            className={`w-[180px] xl:w-[260px] flex-shrink-0 flex justify-center z-10 transform transition-all duration-1000 delay-500 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
              }`}
          >
            <img
              src="/hand-left.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

          {/* CENTER TIMER */}
          <div
            className={`flex justify-center z-0 transform transition-all duration-1000 delay-300 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
              }`}
          >
            <div className="border border-white w-fit py-4 px-2 xl:px-8 flex justify-center">
              <CountdownTimer />
            </div>
          </div>

          {/* RIGHT HAND IMAGE */}
          <div
            className={`w-[180px] xl:w-[260px] flex-shrink-0 flex justify-center z-10 transform transition-all duration-1000 delay-500 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
          >
            <img
              src="/hand-right.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

        </div>

        {/* ------------------------------------------------
            3. MOBILE / TABLET VIEW
            Layout: [Timer] only
            Visible on small screens, hidden on lg
        ------------------------------------------------ */}
        <div
          className={`flex justify-center lg:hidden px-4 w-full transform transition-all duration-1000 delay-300 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
        >
          <div className="w-fit border border-white flex justify-center px-6 sm:px-4 py-6">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM MARQUEE SECTION
          Scrolling text at the bottom
      ========================================= */}
      <div
        className={`mt-24 lg:mt-auto w-full transform transition-all duration-1000 delay-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        <Marquee />
      </div>
    </section>
  );
}
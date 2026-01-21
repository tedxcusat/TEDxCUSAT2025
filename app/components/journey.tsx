"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- CAROUSEL LOGIC ---

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % journeyEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? journeyEvents.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!sectionRef.current || !eyeRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // when snap lands here
        end: "+=150%", // scroll distance inside section
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // PHASE 1: Eye entrance

    // PHASE 2: Eye moves up + shrinks
    tl.to(
      eyeRef.current,
      {
        y: -30,
        scale: 0.35,
        transformOrigin: "top center",
        duration: 1,
      },
      "+=0.3"
    );

    // Content reveal
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const currentEvent = journeyEvents[currentIndex];

  return (
    <div
      ref={sectionRef}
      className="panel min-h-[110vh] relative w-full bg-black text-white overflow-hidden flex flex-col items-center"
    >
      {/* --- THE EYE CONTAINER --- */}
      <div
        ref={eyeRef}
        className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center opacity-100"
      >
        <div className="relative  w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
          {/* ================= OUTER RING (Dimmer) ================= */}
          <div
            className={`absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite]`}
          >
            {flatDigits.map((digit, i) => {
              const angle = i * angleStep;
              const currentRadius = 260; // outer

              return (
                <div
                  key={`outer-${i}`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${currentRadius}px)`,
                    transition:
                      "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  <span className="block text-white/40 font-mono text-sm">
                    {digit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ================= INNER RING (Brighter) ================= */}
          <div
            className={`absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]`}
          >
            {flatDigits.map((digit, i) => {
              const angle = i * angleStep;
              const currentRadius = 190;

              return (
                <div
                  key={`inner-${i}`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${currentRadius}px)`,
                    transition:
                      "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  <span className="block text-white font-bold font-mono text-base drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {digit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 3. THE 3D EYE IMAGE */}
          <div className="relative z-30 w-[280px] hover:scale-105 transition-transform duration-500">
            <img
              src="/images/eye-3d.png"
              alt="Journey Eye"
              className="w-full h-auto drop-shadow-[0_0_50px_rgba(220,38,38,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div
        ref={contentRef}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 opacity-0"
      >
        {/* Header - Scaled Down */}
        <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Our <span className="text-[#E62B1E]">Journey</span>
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-[#E62B1E] text-white hover:bg-white hover:text-[#E62B1E] transition-all flex items-center justify-center font-bold text-lg"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-[#E62B1E] text-white hover:bg-white hover:text-[#E62B1E] transition-all flex items-center justify-center font-bold text-lg"
            >
              →
            </button>
          </div>
        </div>

        {/* Content Grid - Scaled Down */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <h3 className="text-[#E62B1E] text-2xl font-bold mb-1">
                {currentEvent.title}
              </h3>
              <p className="text-4xl font-mono text-gray-700 opacity-50">
                {currentEvent.year}
              </p>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-md">
              {currentEvent.description}
            </p>
          </div>

          {/* Image - Height reduced */}
          <div className="relative h-[280px] w-full bg-gray-900 rounded-xl overflow-hidden group border border-gray-800">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
              <span className="text-white/50 text-xs tracking-widest">
                EVENT ARCHIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

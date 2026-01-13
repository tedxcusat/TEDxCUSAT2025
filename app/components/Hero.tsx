"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = ({ startAnimation, onComplete }: { startAnimation: boolean; onComplete?: () => void }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Mobile refs
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const mobileSubtitleRef = useRef<HTMLDivElement>(null);
  const mobileHeadRef = useRef<HTMLDivElement>(null);
  const mobileGradientRef = useRef<HTMLImageElement>(null);
  const mobileInfoRef = useRef<HTMLDivElement>(null);
  const mobileBookingRef = useRef<HTMLDivElement>(null);
  const mobileTicketRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Combined targets for shared animations
    const titleTargets = [titleRef.current, mobileTitleRef.current].filter(Boolean);
    const subtitleTargets = [subtitleRef.current, mobileSubtitleRef.current].filter(Boolean);
    const headTargets = [headRef.current, mobileHeadRef.current].filter(Boolean);
    const infoTargets = [infoRef.current, mobileInfoRef.current].filter(Boolean);
    const bookingTargets = [bookingRef.current, mobileBookingRef.current].filter(Boolean);
    const ticketTargets = [ticketRef.current, mobileTicketRef.current].filter(Boolean);

    tl.fromTo(titleTargets,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "power3.out"
      }
    )
      .fromTo(subtitleTargets,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power3.out"
        },
        "<"
      )
      .fromTo(headTargets,
        {
          z: -100,
          y: 100,
          scale: 0.8,
          opacity: 0,
          filter: "blur(10px) brightness(0)",
        },
        {
          z: 20,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.8,
          ease: "power4.out"
        }
      )
      .fromTo([gradientRef.current, mobileGradientRef.current],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        }
      )
      .fromTo(document.getElementById("navbar"),
        {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "<"
      )
      .fromTo(infoTargets,
        {
          clipPath: "inset(0 0 100% 0)",
          y: 30
        },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1,
          ease: "power3.out"
        },
        "<"
      )
      .fromTo(bookingTargets,
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        },
        "<"
      )
      .fromTo(ticketTargets,
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          x: 30
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out"
        },
        "<"
      );

    tlRef.current = tl;
  }, { scope: containerRef });

  useEffect(() => {
    if (startAnimation && tlRef.current) {
      tlRef.current.play();
    }
  }, [startAnimation]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Gradient/Glow */}
      <Image
        src="/hero-grad.svg"
        alt=""
        width={663}
        height={567}
        className="hidden md:block absolute top-[55%] left-[47%] -translate-x-1/2 -translate-y-1/2 -rotate-6 pointer-events-none select-none opacity-75"
        priority
        ref={gradientRef}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/noise.svg')" }}></div>

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:flex relative w-full h-full flex-col items-center justify-center">
        {/* Desktop Content Container */}
        <div className="relative z-10 flex-col items-center justify-center w-full max-w-7xl px-4 -translate-y-30">
          <div className="-mb-2 relative w-full h-auto flex justify-center select-none">
            <div ref={subtitleRef} style={{ willChange: 'clip-path' }}>
              <p className="text-[#7C7C7C] font-orbitron font-black text-xs tracking-[1.2em] opacity-90 text-center w-full">
                FROM CONCEPT TO IMPACT
              </p>
            </div>
          </div>
          <div className="mb-0 relative w-fit mx-auto flex justify-center select-none">
            <div ref={titleRef} style={{ willChange: 'clip-path' }}>
              <h1 className="font-orbitron font-black text-[clamp(5rem,11vw,9rem)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#AEAFAD] text-center w-full">
                GENESIS
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Hero Image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
          <div className="relative w-auto h-[clamp(450px,65vh,800px)] mt-[36vh]">
            <div ref={headRef} className="relative w-full h-full">
              <Image
                src="/hero-img.svg"
                alt="Hero Head"
                width={600}
                height={800}
                className="w-full h-full object-contain"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Info */}
        <div className="absolute bottom-20 w-full max-w-7xl px-42 flex justify-between items-end z-40 text-white font-clash pointer-events-none">
          <div className="text-left pointer-events-auto" ref={infoRef}>
            <p className="text-2xl font-clash leading-tight tracking-[-0.02em]">
              ON 31<br />
              JAN<br />
              2026
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 pointer-events-auto" ref={bookingRef}>
            <span className="text-sm font-light tracking-[-0.02em]" ref={ticketRef}>tickets here!</span>
            <button className="relative bg-[#EB0028] hover:bg-red-900 text-white font-medium py-3 px-8 transition-colors duration-300 z-[100] cursor-pointer">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>


      {/* ================= MOBILE LAYOUT ================= */}
      <div className="md:hidden relative w-full h-full flex flex-col pb-12 -mt-8">
        {/* Mobile Background Gradient (Behind Title) */}
        <Image
          src="/hero-grad.svg"
          alt=""
          width={663}
          height={567}
          className="absolute translate-x-[-37vw] translate-y-[7vh] w-[160vw] max-w-none h-auto -rotate-6 mix-blend-screen z-0 pointer-events-none"
          priority
          ref={mobileGradientRef}
        />

        {/* Mobile Top Section: Title & Subtitle */}
        <div className="relative z-10 flex flex-col items-center pt-28 w-full">
          <div className="mb-2 relative w-full h-auto flex justify-center select-none">
            <div ref={mobileSubtitleRef} style={{ willChange: 'clip-path' }}>
              <p className="text-[#7C7C7C] font-clash font-bold text-[10px] tracking-[0.5em] opacity-90 text-center w-full">
                FROM CONCEPT TO IMPACT
              </p>
            </div>
          </div>
          <div className="relative w-full flex justify-center select-none -mt-2">
            <div ref={mobileTitleRef} style={{ willChange: 'clip-path' }} className="flex justify-center w-full">
              <h1 className="font-orbitron font-black text-7xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#AEAFAD] text-center w-full">
                GENESIS
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Center: Head Image */}
        <div className="relative z-20 flex items-center justify-center -ml-[0.375rem] -mt-[1.75rem] w-full pointer-events-none select-none">
          <div ref={mobileHeadRef} className="relative w-[85vw] h-auto">
            <Image
              src="/hero-img.svg"
              alt="Hero Image"
              width={500}
              height={700}
              className="w-full h-full object-contain relative z-20"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>

        {/* Mobile Bottom Section */}
        <div className="relative w-full px-6 mt-4 flex justify-between items-end z-40 text-white font-clash pointer-events-none">
          {/* Date */}
          <div className="text-left pointer-events-auto" ref={mobileInfoRef}>
            <p className="text-xl font-clash leading-tight tracking-[-0.02em]">
              ON 31<br />
              JAN<br />
              2026
            </p>
          </div>

          {/* Book Button */}
          <div className="flex flex-col items-end gap-1 pointer-events-auto" ref={mobileBookingRef}>
            <span className="text-xs font-light tracking-[-0.02em]" ref={mobileTicketRef}>tickets here!</span>
            <button className="relative bg-[#EB0028] hover:bg-red-900 text-white font-medium py-2.5 px-6 transition-colors duration-300 z-[100] cursor-pointer">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;
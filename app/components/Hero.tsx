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

  // Mobile specific refs
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const mobileSubtitleRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Animation config that targets both desktop and mobile refs if they exist
    const titleTargets = [titleRef.current, mobileTitleRef.current].filter(Boolean);
    const subtitleTargets = [subtitleRef.current, mobileSubtitleRef.current].filter(Boolean);

    tl.fromTo(titleTargets,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 2,
        ease: "power3.out"
      }
    )
      .fromTo(subtitleTargets,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 2,
          ease: "power3.out"
        },
        "<"
      )
      .fromTo(headRef.current,
        {
          z: -100,
          y: 100,
          scale: 0.8,
          opacity: 0,
          filter: "blur(10px) brightness(0)",
        },
        {
          z: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.8,
          ease: "power4.out"
        }
      )
      .fromTo(gradientRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        }
      )
      .fromTo(infoRef.current,
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
      .fromTo(bookingRef.current,
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
      .fromTo(ticketRef.current,
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
        className="absolute top-[55%] left-[47%] -translate-x-1/2 -translate-y-1/2 -rotate-6 pointer-events-none select-none opacity-75"
        priority
        ref={gradientRef}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/noise.svg')" }}></div>

      {/* Main Content Container - Desktop (Original) */}
      <div className="hidden md:flex relative z-10 flex-col items-center justify-center w-full max-w-7xl px-4 -translate-y-30">
        <div className="mb-4 relative w-full h-auto flex justify-center select-none">
          <div ref={subtitleRef} style={{ willChange: 'clip-path' }}>
            <Image
              src="/hero-subtitle.svg"
              alt="FROM CONCEPT TO IMPACT"
              width={500}
              height={50}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="mb-0 relative w-fit mx-auto flex justify-center select-none">
          <div ref={titleRef} style={{ willChange: 'clip-path' }}>
            <Image
              src="/hero-title.svg"
              alt="GENESIS"
              width={900}
              height={200}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content Container - Mobile (New Layout) */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-start w-full px-4 pt-32 h-full pointer-events-none">
        {/* Subtitle Top for Mobile */}
        <div className="mb-2 relative w-full h-auto flex justify-center select-none">
          <div ref={mobileSubtitleRef} style={{ willChange: 'clip-path' }}>
            <Image
              src="/hero-subtitle.svg"
              alt="FROM CONCEPT TO IMPACT"
              width={320}
              height={32}
              className="object-contain opacity-80"
              priority
            />
          </div>
        </div>

        {/* Title Below Subtitle for Mobile */}
        <div className="relative w-full flex justify-center select-none -mt-4">
          <div ref={mobileTitleRef} style={{ willChange: 'clip-path' }}>
            <Image
              src="/hero-title.svg"
              alt="GENESIS"
              width={600}
              height={150}
              className="object-contain w-[90vw]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Hero Image (Head) */}
      <div
        className="absolute top-[80%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] md:-translate-y-1/4 z-20 w-auto h-[70vh] md:h-[73vh] pointer-events-none select-none"
      >
        <div ref={headRef} className="w-full h-full">
          <Image
            src="/hero-img.svg"
            alt="Hero Head"
            width={600}
            height={800}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 md:bottom-20 w-full max-w-7xl px-8 md:px-42 flex justify-between items-end z-40 text-white font-clash pointer-events-none">

        {/* Date */}
        <div className="text-left pointer-events-auto" ref={infoRef}>
          <p className="text-xl md:text-2xl font-clash leading-tight tracking-[-0.02em]">
            ON 30<br />
            JAN<br />
            2026
          </p>
        </div>

        {/* Booking */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto" ref={bookingRef}>
          <span className="text-sm font-light tracking-[-0.02em]" ref={ticketRef}>tickets here!</span>
          <button
            className="relative bg-[#EB0028] hover:bg-red-900 text-white font-medium py-3 px-6 md:px-8 transition-colors duration-300 z-[100] cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 2,
        ease: "power3.out"
      }
    )
      .fromTo(subtitleRef.current,
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
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power1.out"
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
        }
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
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "<"
      )
  });

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[400px] bg-red-600/20 rounded-full blur-3xl pointer-events-none" ref={gradientRef} />

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/noise.svg')" }}></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-4 -translate-y-30">

        {/* Subtitle SVG */}
        <div className="mb-4 relative w-full h-auto flex justify-center">
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

        {/* Title SVG */}
        <div className="mb-0 relative w-fit mx-auto flex justify-center">
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

      {/* Hero Image (Head) - Overlapping */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 z-20 w-auto h-[70vh] pointer-events-none"
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
      <div className="absolute bottom-20 w-full max-w-7xl px-24 flex justify-between items-end z-30 text-white font-clash">
        {/* Date */}
        <div className="text-left" ref={infoRef}>
          <p className="text-xl md:text-2xl font-normal leading-tight tracking-[-0.02em]">
            ON 30<br />
            JAN<br />
            2026
          </p>
        </div>

        {/* Booking */}
        <div className="flex flex-col items-end gap-2" ref={bookingRef}>
          <span className="text-sm font-light tracking-[-0.02em]" ref={ticketRef}>tickets here!</span>
          <button className="bg-[#FF0000] hover:bg-red-700 text-white font-medium py-3 px-8 transition-colors duration-300">
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  // Mobile specific refs
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const mobileSubtextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    const logoTargets = [logoRef.current, mobileLogoRef.current].filter(Boolean);
    const subtextTargets = [subtextRef.current, mobileSubtextRef.current].filter(Boolean);

    tl.fromTo(logoTargets,
      {
        clipPath: "inset(0 0 100% 0)",
        y: 20,
        autoAlpha: 0,
      },
      {
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: "power3.out"
      }
    )
      .fromTo(subtextTargets, {
        yPercent: -600,
        duration: 1.5,
        ease: "power3.out",
        autoAlpha: 0,
      }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: "power3.out",
      }, "<")
      .to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }
      });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`fixed inset-0 z-[100] flex flex-col items-center justify-center min-h-screen bg-[#040404] text-white`}>

      {/* Desktop View */}
      <div className="hidden md:flex relative flex-col items-center w-[360px] max-w-full -mt-16">
        <div className="flex justify-center mb-1.5 w-full overflow-hidden">
          <div ref={logoRef} className="w-full opacity-0">
            <Image
              src="/logo-white.svg"
              alt="TEDxCUSAT"
              width={504}
              height={101}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div ref={subtextRef} className="w-auto opacity-0">
            <Image
              src="/sub-text.svg"
              alt="Presents"
              width={249}
              height={12}
              className="w-auto h-[8.7px]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative flex flex-col items-center w-[80vw] max-w-full -translate-y-[10vh]">
        <div className="flex justify-center mb-1.5 w-full overflow-hidden">
          <div ref={mobileLogoRef} className="w-full opacity-0">
            <Image
              src="/logo-white.svg"
              alt="TEDxCUSAT"
              width={504}
              height={101}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div ref={mobileSubtextRef} className="w-auto opacity-0">
            <Image
              src="/sub-text.svg"
              alt="Presents"
              width={249}
              height={12}
              className="w-auto h-[8.7px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

export default function About({ startAnimation }: { startAnimation: boolean }) {
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Changed to DivElement because this will now wrap the images
  const planetWrapperRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLImageElement>(null);

  const uniqueImages = [
    { src: "/images/photo1.png" },
    { src: "/images/photo2.png" },
    { src: "/images/photo3.png" },
    { src: "/images/photo3.png" },
  ];

  const baseSet = [...uniqueImages, ...uniqueImages, ...uniqueImages];
  const finalDisplayList = [...baseSet, ...baseSet];

  useGSAP(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();
    const images = gsap.utils.toArray<HTMLElement>('.float-img');

    // --- 1. INTRO ANIMATION ---

    // Animate the WRAPPER only. 
    // This allows the <img/> inside to keep its CSS rotation safely.
    // Use fromTo to prevent FOUC since we set opacity-0 in CSS
    tl.fromTo([planetWrapperRef.current, noiseRef.current],
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 0.3, // Match the desired final opacity
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Hands
    tl.fromTo([leftHandRef.current, rightHandRef.current],
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.0)",
        stagger: 0.1
      }, "-=1.2");

    // Logo & Text
    tl.fromTo([logoRef.current, textRef.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.6");

    // Gallery
    tl.to(galleryRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");


    // --- 2. INTERACTIVE ANIMATION (Mouse + Touch) ---

    const updateHump = (inputX: number) => {
      if (!images.length) return;

      const humpWidth = 500;

      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + (rect.width / 2);
        const dist = Math.abs(inputX - imgCenterX);

        if (dist < humpWidth) {
          const normalizedDist = dist / humpWidth;
          const lift = Math.cos(normalizedDist * (Math.PI / 2)) * 100;

          gsap.to(img, {
            y: -lift,
            duration: 0.3,
            ease: "power2.out",
            overwrite: 'auto'
          });
        } else {
          gsap.to(img, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: 'auto'
          });
        }
      });
    };

    updateHump(window.innerWidth / 2);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX;

      // Support for Mobile Touch
      if (window.TouchEvent && e instanceof TouchEvent) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as MouseEvent).clientX;
      }

      const screenWidth = window.innerWidth;
      const centerY = screenWidth / 2;
      const isMobile = screenWidth < 768;

      const riseHeight = isMobile ? 20 : 200;
      const factor = (clientX - centerY) / centerY;

      if (clientX < centerY) {
        // Left side active
        const intensity = Math.abs(factor);
        gsap.to(leftHandRef.current, {
          y: -intensity * riseHeight,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
        gsap.to(rightHandRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      } else {
        // Right side active
        const intensity = factor;
        gsap.to(rightHandRef.current, {
          y: -intensity * riseHeight,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
        gsap.to(leftHandRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      }

      updateHump(clientX);
    };

    // 'passive: false' helps with touch event consistency on some devices
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };

  }, { dependencies: [startAnimation], scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black pt-32 pb-48">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-track {
          display: flex;
          gap: 20px;
          padding-right: 20px;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        .float-img {
          width: 180px; 
          height: auto;
          opacity: 0.8;
          filter: grayscale(100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease;
          position: relative;
          z-index: 40;
          cursor: pointer;
          pointer-events: auto;
          will-change: transform;
        }
        @media (min-width: 768px) {
          .float-img {
            width: 230px;
          }
        }
        .float-img:hover {
          filter: grayscale(0%);
        }
      `}</style>

      {/* Gallery */}
      <div
        className="w-full transition-transform duration-200 ease-out static md:relative opacity-0"
        ref={galleryRef}
      >
        <div className="gallery-track">
          {finalDisplayList.map((img, index) => (
            <Image
              key={index}
              src={img.src}
              className="float-img"
              alt="gallery"
              width={230}
              height={300}
            />
          ))}
        </div>
      </div>

      {/* Logo & Text */}
      <div className="z-50 pointer-events-none flex flex-col items-center">
        <Image
          ref={logoRef}
          src="/logo-white.png"
          alt="TEDxCUSAT Logo"
          className="w-[80vw] max-w-[500px] h-auto md:w-[40vw] opacity-0"
          width={500}
          height={120}
        />
        <p ref={textRef} className="max-w-[600px] leading-relaxed text-[#ccc] text-[14px] px-5 md:px-0 font-clash font-[400] opacity-0">
          TEDxCUSAT is a dynamic platform where the brightest minds of Cochin University of Science And Technology come together to share ideas that have the power to inspire meaningful change.
        </p>
      </div>

      <div
        ref={planetWrapperRef}
        className="absolute left-1/2 -translate-x-1/2 w-full max-w-[670%] h-auto z-[5] pointer-events-none opacity-0 bottom-[60px] md:max-w-[800px] md:bottom-0"
      >
        <Image
          src="/images/Planet.png"
          className="relative w-full h-auto z-[1] translate-y-[60%] lg:translate-y-10"
          alt="Planet"
          width={800}
          height={800}
        />
        <Image
          ref={noiseRef}
          src="/noise.svg"
          className="object-cover mix-blend-overlay z-[2] rotate-180 translate-y-[60%]"
          alt="Noise Overlay"
          fill
        />
      </div>

      {/* Hands */}
      <Image
        ref={leftHandRef}
        src="/images/hand-left.png"
        className="absolute -bottom-[50px] left-0 w-[50vw] z-50 opacity-0 md:w-[25vw] md:max-w-[400px] md:-bottom-[200px] md:z-20 pointer-events-none"
        alt="Left Hand"
        width={400}
        height={600}
      />
      <Image
        ref={rightHandRef}
        src="/images/hand-right.png"
        className="absolute -bottom-[50px] right-0 w-[50vw] z-50 opacity-0 md:w-[25vw] md:max-w-[400px] md:-bottom-[200px] md:z-20 pointer-events-none"
        alt="Right Hand"
        width={400}
        height={600}
      />
    </div>
  );
}
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function About({ startAnimation }: { startAnimation: boolean }) {
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define images inside the component
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

    const leftHand = leftHandRef.current;
    const rightHand = rightHandRef.current;
    const images = gsap.utils.toArray<HTMLElement>('.float-img');

    // Initial setups
    gsap.set(leftHand, { y: 0 });
    gsap.set(rightHand, { y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const screenWidth = window.innerWidth;
      const centerY = screenWidth / 2;
      const isMobile = screenWidth < 768;

      // --- WRIST/HAND LOGIC ---
      // We want the hand to rise when mouse is on its side.
      // riseHeight: how much it comes up.
      // We'll use gsap.to for smooth interpolation.

      const riseHeight = isMobile ? 150 : 200; // Increased Desktop rise for visibility

      if (isMobile) {
        // Mobile logic can be simple or based on touch, but let's stick to simple "active" state if needed
        // For now, let's keep it responsive to touch/interaction if we had touch events, 
        // but user asked to fix "hands dont work". 
        // Let's make them peek up slightly on mobile or similar logic.
        // The original code used 'isTouching' state. 
        // Let's just keep the mouse logic which works for touch drag too usually.
      }

      // Calculate intensity based on distance from center
      const factor = (clientX - centerY) / centerY;
      // factor is -1 (left edge) to 1 (right edge), 0 at center.

      if (clientX < centerY) {
        // Left side active
        const intensity = Math.abs(factor); // 0 to 1
        gsap.to(leftHand, {
          y: -intensity * riseHeight,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
        gsap.to(rightHand, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      } else {
        // Right side active
        const intensity = factor; // 0 to 1
        gsap.to(rightHand, {
          y: -intensity * riseHeight,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
        gsap.to(leftHand, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      }

      // --- HUMP LOGIC FOR IMAGES ---
      // Original logic: lift images near the cursor
      // Increasing the humpWidth slightly for better effect
      const humpWidth = 500;

      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + (rect.width / 2);
        const dist = Math.abs(clientX - imgCenterX);

        if (dist < humpWidth) {
          const normalizedDist = dist / humpWidth;
          // Cosine lift shape: 0 at edges, 1 at center
          const lift = Math.cos(normalizedDist * (Math.PI / 2)) * 100; // 100px lift

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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

      <div
        className="w-full transition-transform duration-200 ease-out static md:relative"
        ref={galleryRef}
      >
        <div className="gallery-track">
          {finalDisplayList.map((img, index) => (
            <img
              key={index}
              src={img.src}
              className="float-img"
              alt="gallery"
            />
          ))}
        </div>
      </div>

      <div className="z-50 pointer-events-none flex flex-col items-center">
        <img
          src="/logo-white.png"
          alt="TEDxCUSAT Logo"
          className="w-[80vw] max-w-[500px] h-auto md:w-[40vw]"
        />
        <p className="max-w-[600px] leading-relaxed text-[#ccc] text-[14px] px-5 md:px-0 font-clash font-[400]">
          TEDxCUSAT is a dynamic platform where the brightest minds of Cochin University of Science And Technology come together to share ideas that have the power to inspire meaningful change. <a href="#" className="text-[#E62B1E] font-normal no-underline pointer-events-auto">
            Learn More →</a>
        </p>
      </div>

      <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-full max-w-[670%] h-auto z-[5] pointer-events-none opacity-30 md:max-w-[800px] md:bottom-0">
        <img
          src="/images/Planet.png"
          className="relative w-full h-auto z-[1]"
          alt="Planet"
        />
        <img
          src="/noise.svg"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay z-[2]"
          alt="Noise Overlay"
        />
      </div>
      <img
        ref={leftHandRef}
        src="/images/hand-left.png"
        className="absolute -bottom-[120px] left-0 w-[50vw] z-50 opacity-100 md:w-[25vw] md:max-w-[400px] md:-bottom-[200px] md:z-20 pointer-events-none"
        alt="Left Hand"
      />
      <img
        ref={rightHandRef}
        src="/images/hand-right.png"
        className="absolute -bottom-[120px] right-0 w-[50vw] z-50 opacity-100 md:w-[25vw] md:max-w-[400px] md:-bottom-[200px] md:z-20 pointer-events-none"
        alt="Right Hand"
      />
    </div>
  );
}

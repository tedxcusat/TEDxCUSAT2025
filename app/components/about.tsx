// src/app/components/About.tsx
'use client'; // 👈 Crucial: This component needs client-side JS

import { useEffect, useRef } from 'react';

export default function About() {
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // --- REFS ---
  const mousePos = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  const isTouchingRef = useRef(false);

  // Define images inside the component (or import them if you prefer)
  const uniqueImages = [
    { src: "/images/photo1.png", styleClass: "img-1" },
    { src: "/images/photo2.png", styleClass: "img-2" },
    { src: "/images/photo3.png", styleClass: "img-3" },
    { src: "/images/photo4.png", styleClass: "img-4" },
  ];

  const baseSet = [...uniqueImages, ...uniqueImages, ...uniqueImages];
  const finalDisplayList = [...baseSet, ...baseSet];

  useEffect(() => {
    // 1. Initialize
    if (typeof window !== 'undefined') {
      mousePos.current = { x: window.innerWidth / 2, y: 0 };
      isMobileRef.current = window.innerWidth < 768;
    }

    const getAllImages = () => document.querySelectorAll<HTMLImageElement>('.float-img');

    // 2. Event Listeners
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
      isTouchingRef.current = true; 
    };

    const handleTouchStart = (event: TouchEvent) => {
      mousePos.current.x = event.touches[0].clientX;
      mousePos.current.y = event.touches[0].clientY;
      isTouchingRef.current = true;
    };

    const handleTouchMove = (event: TouchEvent) => {
      mousePos.current.x = event.touches[0].clientX;
      mousePos.current.y = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
    };
    
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };

    // 3. Animation Loop
    let animationFrameId: number;

    const renderLoop = () => {
      const currentX = mousePos.current.x;
      const screenWidth = window.innerWidth;
      const centerY = screenWidth / 2;
      const isMobile = isMobileRef.current;
      const isTouching = isTouchingRef.current;

      // A. HANDS LOGIC
      const factor = (currentX - centerY) / centerY;
      const riseHeight = isMobile ? 150 : 300;

      if (isMobile) {
        const intensity = isTouching ? 1 : 0; 
        if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
        if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
      } else {
        if (currentX < centerY) {
          const intensity = Math.abs(factor);
          if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
          if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(0px)`;
        } else {
          const intensity = factor;
          if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
          if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(0px)`;
        }
      }

      // B. HUMP LOGIC
      if (galleryRef.current) {
        galleryRef.current.style.transform = `rotate(0deg)`;
      }

      const images = getAllImages();
      
      images.forEach((img) => {
        if (isMobile && !isTouching) {
             img.style.transform = `translateY(0px)`;
             return;
        }

        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + (rect.width / 2);
        const dist = Math.abs(currentX - imgCenterX);
        const humpWidth = 400;

        if (dist < humpWidth) {
          const normalizedDist = dist / humpWidth; 
          const lift = Math.cos(normalizedDist * (Math.PI / 2)) * 100;
          img.style.transform = `translateY(-${lift}px)`;
        } else {
          img.style.transform = `translateY(0px)`;
        }
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // Note: We removed <main> here because we will put it in page.tsx
    // OR we can keep it here if this component IS the hero section.
    // Let's keep the structure simple:
    <div className="hero"> 
      <div className="scrolling-gallery" ref={galleryRef}>
        <div className="gallery-track">
          {finalDisplayList.map((img, index) => (
            <img 
              key={index}
              src={img.src} 
              className={`float-img ${img.styleClass}`} 
              alt="gallery" 
            />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <h1><span className="red-text">TED<sup>x</sup></span>CUSAT</h1>
        <p>TEDxCUSAT is a dynamic platform where the brightest minds of Cochin University of Science And Technology come together to share ideas that have the power to inspire meaningful change. <a href="#" className="red-text" style={{ textDecoration: 'none', fontWeight: 'normal' }}>
          Learn More →</a></p>
      </div>
      
      <img src="/images/planet.png" className="planet-glow" alt="Planet" />

      <img ref={leftHandRef} src="/images/hand-left.png" className="hand-left" alt="Left Hand" />
      <img ref={rightHandRef} src="/images/hand-right.png" className="hand-right" alt="Right Hand" />
    </div>
  );
}



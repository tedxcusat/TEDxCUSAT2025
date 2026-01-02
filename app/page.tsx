'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  // 👇 WE ADD <HTMLImageElement> and <HTMLDivElement> HERE
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 👇 We also specify the type for the event
    const handleMouseMove = (event: MouseEvent) => {
      const screenWidth = window.innerWidth;
      const mouseX = event.clientX;
      const centerY = screenWidth / 2;

      // 1. Calculate how far mouse is from center (-1 to 1)
      const factor = (mouseX - centerY) / centerY;
      
      // 2. Set how high hands should rise (in pixels)
      const riseHeight = 350; 

      // 3. Logic: If mouse is left, raise left hand. If right, raise right hand.
      if (mouseX < centerY) {
        // Left Side
        const intensity = Math.abs(factor);
        if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
        if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(0px)`;
      } else {
        // Right Side
        const intensity = factor;
        if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
        if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(0px)`;
      }

      // 4. Logic: Tilt the gallery
      const rotation = factor * -5; // Max 5 degrees tilt
      if (galleryRef.current) {
        galleryRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup when leaving the page
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="hero">
      {/* Navbar */}
      <nav>
        <div className="logo">TED<span>x</span>CUSAT</div>
        <ul className="nav-links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">SPEAKERS</a></li>
          <li><a href="#">STORIES</a></li>
        </ul>
        <a href="#" className="btn-book">BOOK NOW</a>
      </nav>

      {/* Scrolling Gallery */}
      <div className="scrolling-gallery" ref={galleryRef}>
        <div className="gallery-track">
          {/* Images must be in public/images/ folder */}
          <img src="/images/photo1.png" className="float-img img-1" alt="gallery" />
          <img src="/images/photo2.png" className="float-img img-2" alt="gallery" />
          <img src="/images/photo3.png" className="float-img img-3" alt="gallery" />
          <img src="/images/photo4.png" className="float-img img-4" alt="gallery" />
          {/* Repeat images for seamless loop */}
          <img src="/images/photo1.png" className="float-img img-1" alt="gallery" />
          <img src="/images/photo2.png" className="float-img img-2" alt="gallery" />
          <img src="/images/photo3.png" className="float-img img-3" alt="gallery" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1><span className="red-text">TED<sup>x</sup></span>CUSAT</h1>
        <p>
          Where the brightest minds of Cochin University of Science And Technology 
          come together to share ideas that inspire meaningful change.
        </p>
      </div>

      {/* The Hands */}
      <img ref={leftHandRef} src="/images/hand-left.png" className="hand-left" alt="Left Hand" />
      <img ref={rightHandRef} src="/images/hand-right.png" className="hand-right" alt="Right Hand" />
    </main>
  );
}
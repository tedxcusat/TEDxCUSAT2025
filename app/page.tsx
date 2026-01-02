'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 1. Define your unique images here
  const uniqueImages = [
    { src: "/images/photo1.png", styleClass: "img-1" },
    { src: "/images/photo2.png", styleClass: "img-2" },
    { src: "/images/photo3.png", styleClass: "img-3" },
    { src: "/images/photo4.png", styleClass: "img-4" },
  ];

  // 2. Create a "Base Set" that is long enough to fill ANY screen
  // We repeat the 4 images 3 times to make a set of 12 images.
  const baseSet = [...uniqueImages, ...uniqueImages, ...uniqueImages];

  // 3. For the loop to work, we need [Base Set] + [Base Set] (Duplicate)
  // This ensures that when we scroll 50%, the second half looks exactly like the start.
  const finalDisplayList = [...baseSet, ...baseSet];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const screenWidth = window.innerWidth;
      const mouseX = event.clientX;
      const centerY = screenWidth / 2;

      // Factor (-1 to 1)
      const factor = (mouseX - centerY) / centerY;
      const riseHeight = 350; 

      // Hands Logic
      if (mouseX < centerY) { // Left
        const intensity = Math.abs(factor);
        if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
        if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(0px)`;
      } else { // Right
        const intensity = factor;
        if (rightHandRef.current) rightHandRef.current.style.transform = `translateY(-${intensity * riseHeight}px)`;
        if (leftHandRef.current) leftHandRef.current.style.transform = `translateY(0px)`;
      }

      // Tilt Logic (Inverted as requested: * -5)
      const rotation = factor * -5;
      if (galleryRef.current) {
        galleryRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="hero">
      <nav>
        <div className="logo">TED<span>x</span>CUSAT</div>
        <ul className="nav-links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">STORIES</a></li>
        </ul>
        <a href="#" className="btn-book">BOOK NOW</a>
      </nav>

      {/* Scrolling Gallery */}
      <div className="scrolling-gallery" ref={galleryRef}>
        <div className="gallery-track">
          {/* We map through our long list of images automatically */}
          {finalDisplayList.map((img, index) => (
            <img 
              key={index} // React needs a unique key for list items
              src={img.src} 
              className={`float-img ${img.styleClass}`} 
              alt="gallery" 
            />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <h1><span className="red-text">TED<sup>x</sup></span>CUSAT</h1>
        <p>Where the brightest minds of Cochin University of Science And Technology come together.</p>
      </div>
      
      <img src="/images/planet.png" className="planet-glow" alt="Planet" />

      <img ref={leftHandRef} src="/images/hand-left.png" className="hand-left" alt="Left Hand" />
      <img ref={rightHandRef} src="/images/hand-right.png" className="hand-right" alt="Right Hand" />
    </main>
  );
}
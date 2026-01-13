'use client';

import React, { useState, useEffect } from 'react';

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
    description: "The inception of TEDxCUSAT, sparking the first flame of ideas worth spreading in our community.",
    image: "/images/event-2019.png", 
  },
  {
    year: "2020",
    title: "UN-QUINTESSENTIAL",
    description: "Celebrated imperfection and shared humanity, featuring prominent speakers like Dr. M.R. Rajagopal and S. Somnath.",
    image: "/images/event-2020.png", 
  },
  {
    year: "2022",
    title: "DIVERGENCE",
    description: "Explored the power of divergent thinking, bringing together artists and scientists to challenge the status quo.",
    image: "/images/event-2022.png", 
  },
  {
    year: "2024",
    title: "RESILIENCE",
    description: "A testament to the human spirit's ability to bounce back, showcasing stories of overcoming adversity.",
    image: "/images/event-2024.png", 
  },
];

const yearsList = ["2019", "2020", "2021", "2022", "2023", "2024"];
const flatDigits = yearsList.map(year => year + ' . ').join('').split('');
const totalDigits = flatDigits.length;
const angleStep = 360 / totalDigits;

export default function Journey() {
  // --- STATES ---
  const [eyeEntrance, setEyeEntrance] = useState(false);
  const [ringsEntrance, setRingsEntrance] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- ANIMATION TIMING ---
  useEffect(() => {
    setTimeout(() => setEyeEntrance(true), 100); 
    setTimeout(() => setRingsEntrance(true), 1200); 
  }, []);

  // --- CAROUSEL LOGIC ---
  useEffect(() => {
    if (!isExpanded) return;
    const timer = setInterval(() => handleNext(), 20000); 
    return () => clearInterval(timer);
  }, [currentIndex, isExpanded]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % journeyEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? journeyEvents.length - 1 : prev - 1));
  };

  const currentEvent = journeyEvents[currentIndex];

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col items-center">
      
      {/* --- THE EYE CONTAINER --- */}
      <div 
        className={`absolute z-20 flex items-center justify-center transition-all duration-1000 ease-out cursor-pointer
          ${!eyeEntrance ? 'top-[100%] opacity-0' : ''}
          ${eyeEntrance && !isExpanded ? 'top-[22%] opacity-100 scale-100 origin-center' : ''}
          {/* FIX: Added 'origin-top' so it shrinks upwards, and removed the broken comments */}
          ${isExpanded ? 'top-[16%] scale-[0.35] origin-top' : ''}
        `}
        onClick={() => ringsEntrance && !isExpanded && setIsExpanded(true)}
      >
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          
          {/* ================= OUTER RING (Dimmer) ================= */}
          <div className={`absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite]`}>
            {flatDigits.map((digit, i) => {
              const angle = i * angleStep;
              const currentRadius = ringsEntrance ? 260 : 0;
              
              return (
                <div 
                  key={`outer-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${currentRadius}px)`, 
                    transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${i * 30}ms`
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
          <div className={`absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]`}>
            {flatDigits.map((digit, i) => {
              const angle = i * angleStep;
              const currentRadius = ringsEntrance ? 190 : 0;

              return (
                 <div 
                  key={`inner-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${currentRadius}px)`,
                    transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${i * 30}ms`
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
             <img src="/images/eye-3d.png" alt="Journey Eye" className="w-full h-auto drop-shadow-[0_0_50px_rgba(220,38,38,0.4)]" />
          </div>

          {/* Click Hint */}
          {ringsEntrance && !isExpanded && (
            <p className="absolute -bottom-24 text-gray-500 tracking-[0.5em] text-xs animate-bounce delay-1000 duration-1000 transition-opacity">
              CLICK TO EXPLORE
            </p>
          )}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className={`w-full max-w-5xl px-6 mt-76 transition-all duration-1000 delay-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        
        {/* Header - Scaled Down */}
        <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">Our <span className="text-[#E62B1E]">Journey</span></h2>
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
              <h3 className="text-[#E62B1E] text-2xl font-bold mb-1">{currentEvent.title}</h3>
              <p className="text-4xl font-mono text-gray-700 opacity-50">{currentEvent.year}</p>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-md">{currentEvent.description}</p>
          </div>
          
          {/* Image - Height reduced */}
          <div className="relative h-[280px] w-full bg-gray-900 rounded-xl overflow-hidden group border border-gray-800">
             <img src={currentEvent.image} alt={currentEvent.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-white/50 text-xs tracking-widest">EVENT ARCHIVE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
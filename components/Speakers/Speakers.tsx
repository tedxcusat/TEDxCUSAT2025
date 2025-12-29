"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";


type Speaker = {
  name: string;
  title: string;
  description: string;
  img: string;
};

const speakers: Speaker[] = [
  {
    name: "Olivia Lorem",
    title: "Actress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Michael Amet",
    title: "Entrepreneur",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
    {
    name: "Michael Amet",
    title: "Entrepreneur",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "/speakers/mystery.jpg",
  },
];

export default function Newspeakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const positions = [
  { x: -800, y: 80, rotation: -10 },
  { x: -400, y: 20, rotation: -6 },
  { x: 0, y: 0, rotation: 0 },
  { x: 400, y: 20, rotation: 6 },
  { x: 800, y: 80, rotation: 10 },
];

useEffect(() => {
  cardRefs.current.forEach((card, i) => {
    if (!card) return;

    const position =
      (i - currentIndex + speakers.length) % speakers.length;

    if (position > 4) {
      gsap.set(card, { opacity: 0 });
      return;
    }

    gsap.to(card, {
      ...positions[position],
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
    });
  });
}, [currentIndex]);

  return (
    <section id="speakers" className="bg-black text-white py-20 overflow-hidden">
      {/* Heading */}
      <div className="px-[10%] mb-12 ">        
        <h1 className="text-4xl md:text-8xl font-semibold text-center">
          Voices of <span className="text-[#e62b1e]">’26</span> 
        </h1>

        <div className="flex items-center justify-between gap-6">
        <h2 className="uppercase opacity-60 text-2xl font-bold mb-2 mt-5">Speakers.2026</h2>
      

    <div className="flex gap-10">
    <button 
      onClick={() => {
      setOpenIndex(null);
      setCurrentIndex(
        (prev) => (prev - 1 + speakers.length) % speakers.length
      );
    }}
  >
    <Image src="/left arrow.png" alt="Prev" width={40} height={25} />
      </button>

      <button 
        onClick={() => {
        setOpenIndex(null);
        setCurrentIndex(
        (prev) => (prev + 1) % speakers.length
      );
    }}
  >
    <Image src="/right arrow.png" alt="Next" width={40} height={25} />
      </button>
    </div>
    </div>
    </div>

      <div className="h-px flex-1 bg-white/30  mx-[10%]" />

      {/* Cards */}
      <div className="relative flex items-center justify-center h-[600px] overflow-hidden ">
        {speakers.map((sp, i) => {
          const position =
      (i - currentIndex + speakers.length) % speakers.length;

    if (position > 4) return null; //only 5 cards

     const isOpen = openIndex === i;

          return (
            <div
              ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                key={sp.name + i}
                className={`absolute top-[45%] -translate-y-1/2 w-[350px] aspect-square bg-[#111] border
                  ${isOpen ? "border-[#e62b1e] z-50" : "border-white z-10"}`}
            >
              {/* Image */}
              <Image src={sp.img} alt={sp.name} width={260} height={360} className="w-full h-full object-cover" />

              {/* Name */}
              <p className="absolute bottom-4 left-4 text-[#e62b1e] font-medium">
                {sp.name}
              </p>

              {/* Toggle Arrow */}
              {!isOpen && (
                <button
                  onClick={() => setOpenIndex(i)}
                  className="absolute bottom-0 right-4   transition-transform cursor-pointer"
                  aria-label="Open speaker details"
                >
                  <Image src="/top arrow.png" alt="Open" width={28} height={25} />
                </button>
              )}

              {/* Details Overlay */}
              {isOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-95 p-4 flex flex-col pt-8">
                  {/* Close Arrow - top center, red bg with white arrow */}
                  <button
                    onClick={() => setOpenIndex(null)}
                    className="absolute top-0 right-4 bg-[#e62b1e] p-1  z-10 cursor-pointer"
                    aria-label="Close speaker details"
                  >
                    <svg
                      width="25"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <polyline points="3 7 12 19 21 7" />
                    </svg>
                  </button>

                  <p className="text-[#e62b1e] font-semibold text-lg">
                    {sp.name}
                  </p>
                  <p className="uppercase text-sm opacity-70 mb-3">
                    {sp.title}
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    {sp.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

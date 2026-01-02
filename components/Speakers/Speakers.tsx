"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
gsap.registerPlugin(Draggable);

type Speaker = {
  name: string;
  title: string;
  description: string;
  img: string;
};

const speakers: Speaker[] = [
  {
    name: "Olivia Lorem1",
    title: "Actress",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Michael Amet2",
    title: "Entrepreneur",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem3",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem4",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem5",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Olivia Lorem6",
    title: "Creative Director",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "Michael Amet7",
    title: "Entrepreneur",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: "/speakers/mystery.jpg",
  },
];

export default function Newspeakers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const bg26Ref = useRef<HTMLDivElement>(null);
  const bg26MaskRef = useRef<HTMLDivElement>(null);
  const voicesRef = useRef<HTMLHeadingElement>(null);
  const speakersHeaderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const startIndex = useRef(0);
  const isManual = useRef(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    gsap.set(bg26MaskRef.current, {
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.set(spotlightRef.current, {
      y: -400,
    });

    gsap.set(voicesRef.current, {
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    const tl = gsap.timeline();

    // Stage 2 — spotlight + bg '26
    tl.fromTo(
      spotlightRef.current,
      {
        y: -500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 3.5,
        ease: "expo.out",
      }
    ).to(
      bg26MaskRef.current,
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 2,
        ease: "sine.out",
      },
      "<"
    );

    // Hold
    tl.to({}, { duration: 0.1 });

    // Stage 3 — Voices of '26
    tl.to(voicesRef.current, {
      opacity: 1,
      duration: 2,
      scale: window.innerWidth < 640 ? 1 : 1.5,
      yPercent: window.innerWidth < 640 ? -200 : -50,
      ease: "power3.out",
    });

    // Stage 4 — spotlight + bg fade out
    tl.to([spotlightRef.current, bg26Ref.current], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });

    // Stage 5 — Voices moves to final position
    tl.to(voicesRef.current, {
      top: "5%",
      left: "50%",
      xPercent: -50,
      yPercent: 0,
      scale: 0.8,
      duration: 0.7,
      ease: "power3.inOut",
    });

    // Stage 6 — Speakers header
    tl.to(speakersHeaderRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    tl.to(
      lineRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "<"
    );

    // Stage 7 — Cards
    tl.to(cardsContainerRef.current, {
      opacity: 1,
      duration: 0.4,
    });
  }, []);

  const getScreenType = () => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };

  const layoutCards = () => {
    const screen = getScreenType();

    const containerWidth =
      cardsContainerRef.current?.offsetWidth || window.innerWidth;

    const total = speakers.length;
    const center = 2;

    // ---------- MOBILE ----------
    if (screen === "mobile") {
      const CARD_WIDTH = Math.min(containerWidth * 0.7, 260);
      const GAP = containerWidth < 360 ? 30 : 6;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        let offset = i - startIndex.current;
        offset = ((offset % total) + total) % total;

        gsap.to(card, {
          x: offset * (CARD_WIDTH + GAP)- (containerWidth / 2) + (CARD_WIDTH / 2)+14,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "linear",
        });
      });

      return;
    }

    // ---------- TABLET ----------
    if (screen === "tablet") {
      const CARD_WIDTH = Math.min(containerWidth * 0.45, 360);
      const GAP = 60;
      const BASE_Y = 10;
      const VISIBLE_RANGE = 2;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        let offset = i - center - startIndex.current;
        offset = ((offset % total) + total) % total;
        if (offset > total / 2) offset -= total;

        gsap.to(card, {
          x: offset * (CARD_WIDTH + GAP),
          y: BASE_Y + Math.abs(offset) * 28 + (offset === 0 ? 18 : 0),
          rotation: offset * 3,
          opacity: Math.abs(offset) > VISIBLE_RANGE ? 0 : 1,
          immediateRender: false,
          duration: isManual.current ? 0.7 : 3.2,
          ease: "linear",
        });
      });

      return;
    }

    // ---------- DESKTOP ----------
    const CARD_WIDTH = Math.min(containerWidth * 0.42, 380);
    const GAP = 40;
    const BASE_Y = 20;
    const VISIBLE_RANGE = 2;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      let offset = i - center - startIndex.current;
      offset = ((offset % total) + total) % total;
      if (offset > total / 2) offset -= total;

      gsap.to(card, {
        x: offset * (CARD_WIDTH + GAP),
        y: BASE_Y + Math.abs(offset) * 40 + (offset === 0 ? 25 : 0),
        rotation: offset * 4,
        opacity: Math.abs(offset) > VISIBLE_RANGE ? 0 : 1,
        immediateRender: false,
        duration: isManual.current ? 0.7 : 6,
        ease: "linear",
        overwrite: "auto",
      });
    });
  };

  useEffect(() => {
    layoutCards();
    window.addEventListener("resize", layoutCards);
    return () => window.removeEventListener("resize", layoutCards);
  }, []);

  
  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    isManual.current = true;
    gsap.killTweensOf(cardRefs.current);
    startIndex.current = (startIndex.current + 1) % speakers.length;
    layoutCards();
    setTimeout(() => {
      isManual.current = false;
      isAnimating.current = false;
    }, 100);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    isManual.current = true;
    gsap.killTweensOf(cardRefs.current);
    startIndex.current =
      (startIndex.current - 1 + speakers.length) % speakers.length;
    layoutCards();
    setTimeout(() => {
      isManual.current = false;
      isAnimating.current = false;
    }, 300);
  };

  useEffect(() => {
    let auto: gsap.core.Timeline | null = null;

    if (openIndex === null) {
      auto = gsap.timeline({ repeat: -1 });

      auto.to(
        {},
        {
          duration: 6,
          onComplete: handleNext,
        }
      );
    }

    return () => {
      auto?.kill();
    };
  }, [openIndex]);

  return (
    <section
      id="speakers"
      className="relative bg-black text-white overflow-hidden"
    >
      <div className="relative overflow-hidden h-screen">
        {/* Spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 flex justify-center opacity-0 relative"
        >
          <svg
            width="900"
            height="500"
            viewBox="0 0 1000 500"
            className="absolute top-0 z-10 overflow-visible origin-top scale-[0.6] sm:scale-[0.85] md:scale-100 "
          >
            <defs>
              <linearGradient id="spotGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e62b1e" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#e62b1e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#e62b1e" stopOpacity="0" />
              </linearGradient>
              <filter
                id="blurFilter"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              ></filter>
            </defs>

            <polygon
              points="350,-120 650,-120 1150,520 -150,520"
              fill="url(#spotGrad)"
              className="[filter:blur(14px)] sm:[filter:blur(20px)] md:[filter:blur(25px)]"
            />
          </svg>
        </div>

        {/* Background '26 */}
        <div
          ref={bg26Ref}
          className="pointer-events-none absolute inset-0 flex justify-center"
        >
          <div
            ref={bg26MaskRef}
            className="absolute top-[5%] left-1/2 -translate-x-1/2 flex whitespace-nowrap gap-16 text-[7rem] sm:text-[10rem] md:text-[15rem] font-bold text-white/5 tracking-widest overflow-hidden z-20"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>’26</span>
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden h-[100px] md:h-[140px]">
          <h1
            ref={voicesRef}
            className="absolute z-30 whitespace-nowrap text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold opacity-0 will-change-transform mt-5"
          >
            Voices of <span className="text-[#e62b1e]">’26</span>
          </h1>
        </div>

        <div className="relative z-10 pt-10 md:pt-12px lg:pt-20 ">
          <div className="flex flex-col gap-5 lg:gap-8 px-[5%] ">
            <div
              ref={speakersHeaderRef}
              className="flex items-center justify-between gap-6 opacity-0 mt-0 "
            >
              <h2 className="uppercase opacity-60 text-sm sm:text-base md:text-lg lg:text-2xl font-bold">
                Speakers.2026
              </h2>

              <div className="flex gap-10">
                <button
                  onClick={() => {
                    setOpenIndex(null);
                    handlePrev();
                  }}
                >
                  <Image
                    src="/left arrow.png"
                    alt="Prev"
                    width={40}
                    height={25}
                    className="w-6 sm:w-7 md:w-8 lg:w-10 h-auto"
                  />
                </button>

                <button
                  onClick={() => {
                    setOpenIndex(null);
                    handleNext();
                  }}
                >
                  <Image
                    src="/right arrow.png"
                    alt="Next"
                    width={40}
                    height={25}
                    className="w-6 sm:w-7 md:w-8 lg:w-10 h-auto"
                  />
                </button>
              </div>
            </div>

            <div ref={lineRef} className="h-px bg-white/30 opacity-0" />
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsContainerRef}
          className="relative flex items-center justify-center h-[500px] md:h-[600px] overflow-hidden opacity-0 mt-5 touch-pan-x"
        >
          {speakers.map((sp, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                key={sp.name + i}
                className={`absolute top-[2%]  w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px] aspect-square bg-[#111] border
                  ${isOpen ? "border-[#e62b1e] z-50" : "border-white z-10"}`}
              >
                {/* Image */}
                <Image
                  src={sp.img}
                  alt={sp.name}
                  width={260}
                  height={360}
                  className="w-full h-full object-cover"
                />

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
                    <Image
                      src="/up arrow.png"
                      alt="Open"
                      width={28}
                      height={25}
                    />
                  </button>
                )}

                {/* Details Overlay */}
                {isOpen && (
                  <div className="absolute inset-0 bg-black bg-opacity-95 p-4 flex flex-col pt-8">
                    {/* Close Arrow*/}
                    <button
                      onClick={() => setOpenIndex(null)}
                      className="absolute top-0 right-4 z-10 cursor-pointer rotate-90"
                      aria-label="Close speaker details"
                    >
                      <Image
                        src="/right arrow.png"
                        alt="Prev"
                        width={28}
                        height={25}
                      />
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
      </div>
    </section>
  );
}

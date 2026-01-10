"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
gsap.registerPlugin(Draggable);
import SpeakersMarquee from "./SpeakersMarquee";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

type Speaker = {
  name: string;
  title: string;
  description: string;
  img: string;
};

const speakers: Speaker[] = [
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
  {
    name: "To Be Announced",
    title: "Guest Speaker",
    description:
      "Speaker details will be announced soon.",
    img: "/speakers/mystery.jpg",
  },
];

export default function Newspeakers({
  startAnimation = false,
}: {
  startAnimation?: boolean;
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const bg26Ref = useRef<HTMLDivElement>(null);
  const bg26MaskRef = useRef<HTMLDivElement>(null);
  const voicesRef = useRef<HTMLHeadingElement>(null);
  const speakersHeaderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const renderMobileRef = useRef<() => void>(() => { });
  const startIndex = useRef(0);
  const isManual = useRef(false);
  const isAnimating = useRef(false);
  const CARD = 260;
  const GAP = 20;
  const mobileOffset = useRef(0);
  const mobileAuto = useRef<gsap.core.Tween | null>(null);
  const [screenType, setScreenType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    gsap.set(bg26MaskRef.current, {
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.set(voicesRef.current, {
      position: "absolute",
      top: "30%",
      left: "50%",
      xPercent: -50,
      yPercent: -30,
      scale: window.innerWidth < 640 ? 1 : 1.5,
      opacity: 1,
      clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
    });
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();

    // Stage 2 — spotlight + bg '26
    tl.fromTo(
      spotlightRef.current,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 3,
        ease: "power1.out",
      }
    ).to(
      bg26MaskRef.current,
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 3,
        ease: "power3.out",
      },
      "<"
    );

    // Stage 3 — Voices of '26
    tl.to(voicesRef.current, {
      clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      duration: 1,
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
      yPercent: 0,
      scale: 0.8,
      duration: 0.8,
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
    tl.to([cardsContainerRef.current, marqueeRef.current], {
      opacity: 1,
      duration: 0.4,
    });
  }, [startAnimation]);

  const getScreenType = () => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };

  const layoutCards = (): gsap.core.Tween | null => {
    const screen = getScreenType();

    const containerWidth =
      cardsContainerRef.current?.offsetWidth || window.innerWidth;
    const total = speakers.length;
    const center = 2;
    let lastTween: gsap.core.Tween | null = null;
    const animate = (card: HTMLDivElement, vars: gsap.TweenVars) => {
      lastTween = gsap.to(card, vars);
    };

    // Configuration based on screen type
    const isTablet = screen === "tablet";
    const config = isTablet
      ? {
        width: Math.min(containerWidth * 0.45, 240),
        gap: 20,
        baseY: 10,
        visibleRange: 2,
        yOffsetBase: 28,
        yOffsetCenter: 18,
        duration: 3.2,
      }
      : {
        width: Math.min(containerWidth * 0.42, 260),
        gap: 40,
        baseY: 20,
        visibleRange: 2,
        yOffsetBase: 40,
        yOffsetCenter: 25,
        duration: 6,
      };

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      let offset = i - center - startIndex.current;
      offset = ((offset % total) + total) % total;
      if (offset > total / 2) offset -= total;

      // Conditional rotation: 6 for first card, 4 for others
      const rotFactor = Math.abs(offset) <= 1 ? 5.5 : 4.8;
      const rotation = offset * rotFactor;

      animate(card, {
        x: offset * (config.width + config.gap),
        y: config.baseY + Math.abs(offset) * config.yOffsetBase + (offset === 0 ? config.yOffsetCenter : 0),
        rotation: rotation,
        opacity: Math.abs(offset) > config.visibleRange ? 0 : 1,
        immediateRender: false,
        duration: isManual.current ? 0.7 : config.duration,
        ease: "linear",
        overwrite: "auto",
      });
    });

    return lastTween;
  };

  useEffect(() => {
    const update = () => {
      setScreenType(getScreenType());
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 640) {
      layoutCards();
      window.addEventListener("resize", layoutCards);
      return () => window.removeEventListener("resize", layoutCards);
    }
  }, []);

  useEffect(() => {
    if (!cardsContainerRef.current) return;
    if (window.innerWidth >= 640) return;

    const cards = cardRefs.current;
    const STEP = CARD + GAP;
    const TOTAL = STEP * cards.length;

    const render = () => {
      cards.forEach((card, i) => {
        const x = (((i * STEP + mobileOffset.current) % TOTAL) + TOTAL) % TOTAL;
        gsap.set(card, { x: x - TOTAL / 2 });
      });
    };
    renderMobileRef.current = render;

    render();

    mobileAuto.current = gsap.to(
      {},
      {
        repeat: -1,
        ease: "none",
        duration: 9999,
        onUpdate() {
          mobileOffset.current -= 0.25;
          render();
        },
      }
    );

    const proxy = document.createElement("div");

    Draggable.create(proxy, {
      trigger: cardsContainerRef.current,
      type: "x",
      inertia: true,

      onPress() {
        mobileAuto.current?.pause();
      },

      onDrag() {
        mobileOffset.current += this.deltaX;
        render();
      },

      onRelease() {
        mobileAuto.current?.resume();
      },

      onThrowUpdate() {
        mobileOffset.current += this.deltaX;
        render();
      },
    });

    return () => {
      mobileAuto.current?.kill();
    };
  }, []);

  const moveMobile = (dir: number) => {
    mobileAuto.current?.pause();

    gsap.to(mobileOffset, {
      current: mobileOffset.current + dir * (CARD + GAP),
      duration: 0.6,
      ease: "power2.out",
      onUpdate() {
        renderMobileRef.current();
      },
      onComplete() {
        if (openIndices.length === 0) {
          mobileAuto.current?.resume();
        }
      },
    });
  };

  useEffect(() => {
    if (window.innerWidth < 640) {
      openIndices.length > 0
        ? mobileAuto.current?.pause()
        : mobileAuto.current?.resume();
    }
  }, [openIndices]);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    isManual.current = true;
    gsap.killTweensOf(cardRefs.current);
    startIndex.current = (startIndex.current + 1) % speakers.length;
    const tween = layoutCards();
    tween?.eventCallback("onComplete", () => {
      isManual.current = false;
      isAnimating.current = false;
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    isManual.current = true;
    gsap.killTweensOf(cardRefs.current);
    startIndex.current =
      (startIndex.current - 1 + speakers.length) % speakers.length;
    const tween = layoutCards();
    tween?.eventCallback("onComplete", () => {
      isManual.current = false;
      isAnimating.current = false;
    });
  };

  useEffect(() => {
    let auto: gsap.core.Timeline | null = null;

    if (openIndices.length === 0 && window.innerWidth >= 640) {
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
  }, [openIndices]);

  return (
    <section
      id="speakers"
      className="relative bg-black text-white isolate md:min-h-screen flex flex-col pt-10"
    >
      <div className="md:flex-1">
        <div className="relative overflow-x-visible overflow-y-hidden">
          {/* Spotlight */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              ref={spotlightRef}
              className="pointer-events-none absolute inset-0 flex justify-center"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              }}
            >
              <div className="relative w-[45rem] h-[15rem]">
                <svg
                  width="1500"
                  height="500"
                  viewBox="0 0 1000 500"
                  className="absolute left-1/2 -translate-x-1/2 origin-top scale-[0.3] sm:scale-[0.45] md:scale-50"
                >
                  <defs>
                    <linearGradient id="spotGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#EB0028"
                        stopOpacity="0.85"
                      />
                      <stop
                        offset="70%"
                        stopColor="#EB0028"
                        stopOpacity="0.15"
                      />
                      <stop offset="100%" stopColor="#EB0028" stopOpacity="0" />
                    </linearGradient>

                    <clipPath id="spotClip">
                      <polygon points="200,0 800,0 1150,520 -150,520" />
                    </clipPath>

                    <filter
                      id="softEdges"
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feGaussianBlur
                        stdDeviation={
                          screenType === "mobile"
                            ? 55
                            : screenType === "tablet"
                              ? 35
                              : 18
                        }
                      />
                    </filter>
                  </defs>

                  <polygon
                    points="200,0 800,0 1150,520 -150,520"
                    fill="url(#spotGrad)"
                    style={{ filter: "blur(18px)" }}
                    className="pointer-events-none"
                  />
                </svg>
              </div>
            </div>

            {/* Background '26 */}
            <div
              ref={bg26Ref}
              className="pointer-events-none absolute inset-x-0 top-0 bottom-0 flex justify-center"
            >
              <div
                ref={bg26MaskRef}
                className="absolute top-12 lg:top-8 flex whitespace-nowrap sm:gap-8 lg:gap-12 text-5xl sm:text-7xl md:text-9xl lg:text-9xl font-orbitron font-black text-white/5 tracking-widest overflow-hidden"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i}>’26</span>
                ))}
              </div>
            </div>
          </div>
          {/* Grain Overlay — ABOVE spotlight */}
          <div className="pointer-events-none absolute inset-0 z-10 flex justify-center overflow-x-hidden">
            <div
              className="relative w-[45rem] h-[15rem] opacity-50 mix-blend-overlay"
              style={{
                maskImage:
                  "polygon(200px 0px, 800px 0px, 1150px 520px, -150px 520px)",
                WebkitMaskImage:
                  "polygon(200px 0px, 800px 0px, 1150px 520px, -150px 520px)",
              }}
            >
              <Image
                src="/Texture.svg"
                alt=""
                fill
                priority
                className="absolute inset-0 w-full h-full object-cover scale-[1.8]"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col">
            <h1
              ref={voicesRef}
              className="absolute z-30 whitespace-nowrap text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold opacity-0 will-change-transform font-orbitron"
            >
              Voices of <span className="text-[#EB0028]">’26</span>
            </h1>

            <div className="relative z-10 mt-28 lg:mt-32">
              <div className="flex flex-col gap-4 md:gap-2 lg:gap-2 px-[5%] ">
                <div
                  ref={speakersHeaderRef}
                  className="flex items-center justify-between gap-6 opacity-0 mt-0 "
                >
                  <h2 className="uppercase text-sm sm:text-base md:text-lg font-[600] font-clash">
                    Speakers.2026
                  </h2>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        // setOpenIndices([]); // Don't close on nav
                        if (window.innerWidth < 640) {
                          moveMobile(1);
                        } else {
                          handlePrev();
                        }
                      }}
                      className="border bg-[#EB0028] border-[#EB0028] p-1"
                    >
                      <ChevronLeft className="w-5 sm:w-4 md:w-5 lg:w-6 h-auto" />
                    </button>

                    <button
                      onClick={() => {
                        // setOpenIndices([]); // Don't close on nav
                        if (window.innerWidth < 640) {
                          moveMobile(-1);
                        } else {
                          handleNext();
                        }
                      }}
                      className="border bg-[#EB0028] border-[#EB0028] p-1"
                    >
                      <ChevronRight className="w-5 sm:w-4 md:w-5 lg:w-6 h-auto" />
                    </button>
                  </div>
                </div>

                <div ref={lineRef} className="h-px bg-white/30 opacity-0" />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div
            ref={cardsContainerRef}
            className="relative flex items-center justify-center h-[25rem] md:h-[31.25rem] overflow-hidden opacity-0 mt-5 "
          >
            {speakers.map((sp, i) => {
              const isOpen = openIndices.includes(i);

              return (
                <div
                  ref={(el) => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  key={sp.name + i}
                  className={`absolute top-[2%] w-[16rem] sm:w-[15rem] md:w-[14rem] lg:w-[16rem] h-[24rem] md:h-[18rem] lg:h-[20rem] bg-[#111] will-change-transform ring-1 overflow-hidden
                  ${isOpen ? "ring-[#EB0028] z-50" : "ring-white z-10"}`}
                >
                  {/* Image */}
                  <Image
                    src={sp.img}
                    alt={sp.name}
                    width={260}
                    height={360}
                    className={`w-full h-full object-cover transition-all duration-500 ${isOpen ? "grayscale-0" : "grayscale"}`}
                  />

                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Name */}
                  <p className="absolute bottom-1 left-4 font-clash font-[600] text-xl text-[#EB0028]">
                    {sp.name}
                  </p>

                  {/* Toggle Arrow */}
                  {!isOpen && (
                    <button
                      onClick={() => setOpenIndices((prev) => [...prev, i])}
                      className="absolute bottom-0 right-4 border bg-white transition-transform cursor-pointer"
                      aria-label="Open speaker details"
                    >
                      <ChevronUp color="#EB0028" className="w-9 h-9" />
                    </button>
                  )}

                  {/* Details Overlay */}
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-95 p-4 flex flex-col pt-8 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
                      }`}
                  >
                    {/* Close Arrow*/}
                    <button
                      onClick={() =>
                        setOpenIndices((prev) => prev.filter((idx) => idx !== i))
                      }
                      className="absolute top-0 right-4 z-10 bg-[#EB0028] cursor-pointer rotate-90"
                      aria-label="Close speaker details"
                    >
                      <ChevronRight className="w-9 h-9" />
                    </button>

                    <p className="text-[#e62b1e] font-clash font-[600] text-xl -mt-5">
                      {sp.name}
                    </p>
                    <p className="text-[0.95rem] font-clash font-[500] opacity-50 mb-3">
                      {sp.title}
                    </p>
                    <p className="text-sm font-clash font-[400] leading-relaxed opacity-90">
                      {sp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div >
      <div ref={marqueeRef} className="relative opacity-0 mt-10">
        <SpeakersMarquee />
      </div>
    </section >
  );
}

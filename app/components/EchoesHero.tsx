"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface Speaker {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
}

interface EchoesHeroProps {
  startAnimation?: boolean;
}

// Helper to wrap page index
const wrap = (min: number, max: number, v: number): number => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Slide animation variants for horizontal carousel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 800 : -800,
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    transition: { duration: 0.3, ease: [0.55, 0.05, 0.55, 0.95] as const },
  }),
};

// Swipe threshold for drag gestures
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number): number =>
  Math.abs(offset) * velocity;

// Mock speaker data
const speakers: Speaker[] = [
  {
    id: 1,
    name: "P. R. Poduval ",
    title: "Professor, Author",
    description:
      "A seasoned academic and writer, blending psychology and lived insight to spark reflection, growth, and balanced perspectives on success.",
    image: "/prevspeakers/poduval.png",
  },
  {
    id: 2,
    name: "Hani Musthafa",
    title: "Automobile Journalist",
    description:
      "A keen automotive voice reshaping car reviews into narratives, grounded in engineering sense, cultural context, and authentic curiosity always.",
    image: "/prevspeakers/hani.png",
  },
  {
    id: 3,
    name: "Dr. Venu Vasudevan IAS",
    title: "retired IAS Officer",
    description:
      "A doctor-turned administrator, former Chief Secretary of Kerala, driving progress in tourism, culture, and public policy with lasting impact.",
    image: "/prevspeakers/venu.png",
  },
  {
    id: 4,
    name: "Arvind Venugopal",
    title: "Playback Singer",
    description:
      "A distinctive voice in Malayalam cinema, known for soulful songs that quietly linger, blending emotion, restraint, and narrative depth.",
    image: "/prevspeakers/arvind.png",
  },
  {
    id: 5,
    name: "Siddhi Mahajankatti ",
    title: "Actress",
    description:
      "An actress, data scientist, and creator known for Aanandam, blending academics, analytics, TEDx insights, and adventure sports passions diverse.",
    image: "/prevspeakers/sidhi.png",
  },
  {
    id: 6,
    name: "Anantharaman Ajay ",
    title: "Video Creator",
    description:
      "Challenging thought, Anantharaman Ajay, creator, storyteller, dissects cinema, science, society to expose complacency and cultural amnesia.",
    image: "/prevspeakers/anantharaman.png",
  },
  {
    id: 7,

    name: "Anima Nair",
    title: "Director of NeuroGifted",
    description:
      "A bold neurodiversity advocate, leading NeuroGifted and Interweave’s Neurodiversity Vertical, driving inclusion and change.",
    image: "/prevspeakers/anima.png",
  },
];

// Speaker Card Component
const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 bg-black border border-white/20 overflow-hidden group hover:border-[#E62B1E] transition-colors duration-300 min-h-[200px] sm:min-h-[160px]">
      {/* Image */}
      <div className="w-32 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 relative aspect-[3/4]">
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
          className="object-cover grayscale"
        />
        {/* Red Overlay on Hover */}
        <div className="absolute inset-0 bg-[#E62B1E] mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex-1 py-1 sm:py-2 flex flex-col justify-start relative">
        {/* Decorative Corner Line */}
        <div className="absolute top-0 right-0 w-6 sm:w-8 h-[1px] bg-[#E62B1E]" />

        <h3
          className="text-[#E62B1E] font-medium text-base sm:text-base md:text-lg lg:text-xl tracking-[0.05em] leading-tight mb-1"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {speaker.name}
        </h3>
        <p
          className="text-white text-xs sm:text-sm tracking-[0.08em] uppercase opacity-80"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {speaker.title}
        </p>
        <div className="w-6 sm:w-8 h-[1px] bg-white/20 my-1.5 sm:my-3 group-hover:w-full group-hover:bg-[#E62B1E] transition-all duration-300" />
        <p
          className="text-gray-400 text-xs sm:text-sm leading-relaxed tracking-[0.04em] line-clamp-5 w-[95%]"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {speaker.description}
        </p>
      </div>
    </div>
  );
};

// Main EchoesHero Component
const EchoesHero: React.FC<EchoesHeroProps> = ({ startAnimation = false }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [speakersPerPage, setSpeakersPerPage] = useState<number>(4);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mounting and resize
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setSpeakersPerPage(window.innerWidth < 768 ? 3 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll-based animations - only active when mounted
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  // Animation values based on scroll
  const glowRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -15, 15]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.75]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-30%"]);
  const speakersOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const speakersY = useTransform(scrollYProgress, [0.35, 0.5], ["50px", "0px"]);

  const totalPages = Math.ceil(speakers.length / speakersPerPage);
  const currentPage = wrap(0, totalPages, page);
  const currentSpeakers = speakers.slice(
    currentPage * speakersPerPage,
    (currentPage + 1) * speakersPerPage
  );

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const handleDragEnd = useCallback(
    (
      _e: MouseEvent | TouchEvent | PointerEvent,
      { offset, velocity }: PanInfo
    ) => {
      const swipe = swipePower(offset.x, velocity.x);
      if (swipe < -swipeConfidenceThreshold) {
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1);
      }
    },
    [paginate]
  );

  // Skeleton while not mounted
  if (!isMounted) {
    return (
      <div className="relative bg-black min-h-[200vh]">
        <div className="h-screen" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Hero Title Section - Sticky */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: startAnimation ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Red Glow Background */}
          <motion.div
            style={{ rotate: glowRotate, scale: glowScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/images/red1.svg"
              alt=""
              width={700}
              height={700}
              priority
              className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px]"
            />
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: startAnimation ? 1 : 0.8,
              opacity: startAnimation ? 1 : 0,
            }}
            style={{ scale: textScale, y: textY }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 text-center px-4"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-medium leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-white font-bold">Echoes of </span>
              <span className="text-[#EB0028] font-bold">&apos;24</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Speakers Section */}
      <motion.div
        className="relative z-20 bg-black h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-safe"
        style={{ opacity: speakersOpacity }}
      >
        <section className="relative w-full max-w-6xl mx-auto flex flex-col items-stretch h-full justify-center max-h-[800px]">
          {/* Speakers Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 flex-shrink-0">
            <h2 className="text-white font-clash text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] font-light">
              <span className="border-y border-white/20 py-1 sm:py-2">
                SPEAKERS . <span className="font-[500]">2024</span>
              </span>
            </h2>
            <div className="flex gap-3 sm:gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                aria-label="Previous speakers"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-[#EB0028] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                aria-label="Next speakers"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Speakers Carousel */}
          <div className="relative w-full min-h-[650px] sm:min-h-[400px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 cursor-grab active:cursor-grabbing w-full"
              >
                {currentSpeakers.map((speaker) => (
                  <div key={speaker.id}>
                    <SpeakerCard speaker={speaker} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3 flex-shrink-0">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > currentPage ? 1 : -1])}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentPage
                  ? "bg-[#E62B1E] w-8 sm:w-10"
                  : "bg-white/20 hover:bg-white/40 w-4 sm:w-6"
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default EchoesHero;

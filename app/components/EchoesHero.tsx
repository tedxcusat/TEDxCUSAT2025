"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, PanInfo } from "framer-motion";
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
        transition: { duration: 0.3, ease: [0.55, 0.05, 0.55, 0.95] as const },
    }),
};

// Swipe threshold for drag gestures
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number): number => Math.abs(offset) * velocity;

// Mock speaker data
const speakers: Speaker[] = [
    {
        id: 1,
        name: "Olivia Lorem",
        title: "Actress",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    },
    {
        id: 2,
        name: "Michael Chen",
        title: "Tech Entrepreneur",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face",
    },
    {
        id: 3,
        name: "Sarah Williams",
        title: "Climate Activist",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face",
    },
    {
        id: 4,
        name: "David Kumar",
        title: "Neuroscientist",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    },
    {
        id: 5,
        name: "Emma Rodriguez",
        title: "AI Researcher",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
    },
    {
        id: 6,
        name: "James Park",
        title: "Social Innovator",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci diam, a dictum diam luctus vel. Ut rutrum nibh pretium, elementum eros nec, iaculis leo.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face",
    },
];

// Speaker Card Component
const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
    return (
        <div className="flex gap-1.5 sm:gap-3 md:gap-4 p-1.5 sm:p-3 md:p-4 bg-black border border-white/20 overflow-hidden group hover:border-[#E62B1E] transition-colors duration-300">
            {/* Image */}
            <div className="w-16 sm:w-24 md:w-32 lg:w-36 flex-shrink-0 relative aspect-[3/4]">
                <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                    className="object-cover grayscale"
                />
                {/* Red Overlay on Hover */}
                <div className="absolute inset-0 bg-[#E62B1E] mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex-1 p-1 sm:p-2 md:p-4 flex flex-col justify-center relative">
                {/* Decorative Corner Line */}
                <div className="absolute top-0 right-0 w-4 sm:w-8 h-[1px] bg-[#E62B1E]" />

                <h3
                    className="text-[#E62B1E] font-medium text-[11px] sm:text-base md:text-lg lg:text-xl tracking-[0.05em] leading-tight mb-0.5 sm:mb-1"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                    {speaker.name}
                </h3>
                <p
                    className="text-white text-[9px] sm:text-xs md:text-sm tracking-[0.08em] uppercase opacity-80"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                    {speaker.title}
                </p>
                <div className="w-4 sm:w-8 h-[1px] bg-white/20 my-1 sm:my-2 md:my-3 group-hover:w-full group-hover:bg-[#E62B1E] transition-all duration-300" />
                <p
                    className="text-gray-400 text-[9px] sm:text-xs md:text-sm leading-relaxed tracking-[0.04em] line-clamp-2 sm:line-clamp-3 w-[95%]"
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
        (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
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
                        animate={{ scale: startAnimation ? 1 : 0.8, opacity: startAnimation ? 1 : 0 }}
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
                            <span className="text-[#E62B1E] font-bold">&apos;24</span>
                        </h1>
                    </motion.div>
                </motion.div>
            </div>

            {/* Speakers Section */}
            <motion.div
                className="relative z-20 bg-black h-screen flex items-center justify-center px-3 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-8 md:py-10"
                style={{ opacity: speakersOpacity, y: speakersY }}
            >
                <section className="relative w-full max-w-6xl mx-auto flex flex-col items-stretch">
                    {/* Speakers Header */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
                        <h2 className="text-white text-xs sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] font-light">
                            <span className="border-y border-white/20 py-0.5 sm:py-1">
                                SPEAKERS . <span className="font-bold">2024</span>
                            </span>
                        </h2>
                        <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => paginate(-1)}
                                className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#E62B1E] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                                aria-label="Previous speakers"
                            >
                                <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => paginate(1)}
                                className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#E62B1E] flex items-center justify-center hover:bg-[#B71C1C] transition-colors duration-300 rounded-sm"
                                aria-label="Next speakers"
                            >
                                <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Speakers Carousel */}
                    <div className="relative overflow-hidden">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
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
                                className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 cursor-grab active:cursor-grabbing"
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
                    <div className="flex justify-center mt-3 sm:mt-4 md:mt-5 gap-1.5 sm:gap-2 flex-shrink-0">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage([index, index > currentPage ? 1 : -1])}
                                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${index === currentPage
                                    ? "bg-[#E62B1E] w-6 sm:w-8"
                                    : "bg-white/20 hover:bg-white/40 w-3 sm:w-4"
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

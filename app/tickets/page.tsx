"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const tickets = [
  {
    type: "Early Bird",
    price: "₹399",
    description: "Limited time offer for early bookings.",
    highlight: true,
    soldOut: true,
  },
  {
    type: "Student",
    price: "₹499",
    description: "Access for current students with valid ID.",
    soldOut: false,
  },
  {
    type: "Alumni",
    price: "₹699",
    description: "Special rate for CUSAT alumni.",
    soldOut: false,
  },
  {
    type: "Professional",
    price: "₹899",
    description: "General access for professionals and guests.",
    soldOut: false,
  },
];

const sponsors = [
  { name: "Sponsor 1", logo: "/file.svg" }, // Placeholder logos
  { name: "Sponsor 2", logo: "/file.svg" },
  { name: "Sponsor 3", logo: "/file.svg" },
  { name: "Sponsor 4", logo: "/file.svg" },
];

const faqs = [
  {
    question: "How can I find out more about the speakers or the event schedule?",
    answer: "You can visit the TEDxCUSAT website or follow our social media channels for updates on the event schedule and speaker lineup.",
  },
  {
    question: "Is there a limit to the number of tickets I can buy?",
    answer: "Yes, you can purchase up to 1 ticket per transaction. If you need more, you can make another purchase.",
  },
  {
    question: "When will I receive my ticket?",
    answer: "Once payment is completed, your e-ticket will be sent to your registered email within 1-2 days. Please check your spam/junk folder.",
  },
  {
    question: "Who can I contact for ticket-related issues?",
    answer: "For any ticket-related inquiries, message or call Dhanush - +91 97465 30193",
  },
  {
    question: "What do I need to bring to the event?",
    answer: "Bring a digital or printed copy of your e-ticket and Cusat ID if you have a student ticket. (For first year students, ID pdf is also preferred).",
  },
];

export default function TicketsPage() {
  const [footerInView, setFooterInView] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    // Intro Animation: Title & Subtitle
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.out"
      }
    ).fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Cards Reveal - Simultaneous 3D Reveal
    gsap.fromTo(
      ".ticket-card",
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotateX: -15,
        transformPerspective: 1000
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    );

    // Sponsors Reveal - Simultaneous Fade Up
    gsap.fromTo(
      ".sponsor-logo",
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sponsorsRef.current,
          start: "top 90%",
        },
      }
    );

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 80%",
      onEnter: () => setFooterInView(true),
    });

  }, { scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#EB0028] selection:text-white overflow-x-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#EB0028] transition bg-black/50 backdrop-blur-md cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span className="font-clash text-sm tracking-wide hidden sm:inline">Back to Home</span>
          </motion.div>
        </Link>
      </div>

      {/* Background Noise & Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('/noise.svg')" }}></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 pointer-events-none"></div>

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-24 max-w-[1440px] mx-auto min-h-screen flex flex-col justify-center">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 ref={titleRef} className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            GET YOUR <span className="text-[#EB0028]">TICKETS</span>
          </h1>
          <p ref={subtitleRef} className="mt-6 font-clash text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Secure your spot at TEDxCUSAT 2025. Choose your category and join us for an unforgettable experience.
          </p>
        </div>

        {/* Ticket Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {tickets.map((ticket, index) => (
            <motion.div
              key={index}
              className={`ticket-card relative group p-8 border ${ticket.highlight ? 'border-[#EB0028] shadow-[0_0_30px_rgba(235,0,40,0.2)]' : 'border-white/20 hover:border-white/50'} bg-black/50 backdrop-blur-sm flex flex-col justify-between h-[450px] transition-all duration-300`}
            >
              {/* Card Content */}
              <div>
                <h3 className="font-orbitron font-bold text-2xl tracking-wider mb-2 text-white">
                  {ticket.type}
                </h3>
                <div className="h-0.5 w-12 bg-[#EB0028] mb-6"></div>
                <p className="font-clash text-5xl font-semibold mb-4 text-white">
                  {ticket.price}
                </p>
                <p className="font-clash text-gray-400 leading-relaxed">
                  {ticket.description}
                </p>
              </div>

              {/* Book Button */}
              <button
                disabled={ticket.soldOut}
                className={`w-full py-4 mt-8 bg-transparent border font-clash font-medium tracking-wide transition-colors duration-300 uppercase
                  ${ticket.soldOut
                    ? 'border-white/20 text-white/40 cursor-not-allowed'
                    : 'border-[#EB0028] text-white hover:bg-[#EB0028]'
                  }
                `}
              >
                {ticket.soldOut ? 'Unavailable' : 'Book Now'}
              </button>

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#EB0028] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#EB0028] transition-colors"></div>

              {/* Sold Out Overlay */}
              {ticket.soldOut && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="-rotate-[30deg] opacity-90 text-center">
                    <span className="font-orbitron font-black text-4xl md:text-5xl">
                      <span className="text-white">SOLD</span> <span className="text-[#EB0028]">OUT</span>
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Sponsors Section */}
        <div ref={sponsorsRef} className="text-center pt-20 border-t border-white/10">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl mb-12 tracking-wide text-white/80">
            OUR <span className="text-[#EB0028]">PARTNERS</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 items-center justify-items-center opacity-70">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-logo w-full max-w-[150px] aspect-[3/2] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                {/* 
                  Using a placeholder or a generic icon if actual logos aren't available yet. 
                  Modify src to point to actual sponsor logos.
                */}
                <div className="w-full h-full border border-white/10 flex items-center justify-center bg-white/5 p-4">
                  <span className="font-clash text-sm text-gray-500">{sponsor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center pt-20 border-t border-white/10 mt-20">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl mb-12 tracking-wide text-white/80 uppercase">
            Frequently Asked <span className="text-[#EB0028]">Questions</span>
          </h2>

          <div className="max-w-4xl mx-auto text-left flex flex-col">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-none">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between gap-4 group hover:bg-white/5 transition-colors px-4"
                >
                  <span className="font-clash font-medium text-lg md:text-xl text-white/90 group-hover:text-white text-left">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    {openFaqIndex === index ? (
                      <Minus size={20} className="text-[#EB0028]" />
                    ) : (
                      <Plus size={20} className="text-white/50 group-hover:text-white" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-clash text-gray-400 pt-2 pb-6 px-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div ref={footerRef} className="mt-32 lg:mt-0">
        <Footer startAnimation={footerInView} />
      </div>
    </main>
  );
}

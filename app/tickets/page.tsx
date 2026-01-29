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
    type: "Deluxe Bundle",
    price: "₹5499",
    description: "The ultimate takeover. Bring the whole squad and own the night.",
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=52db7c75-210f-41ad-b064-9821de746526",
    isBundle: true,
    count: "10 Tickets"
  },
  {
    type: "Premier Bundle",
    price: "₹2999",
    description: "The perfect circle. Upgrade your experience without missing a beat.",
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=17e321b6-1f37-460c-97b9-367d65eaf0ee",
    isBundle: true,
    count: "5 Tickets"
  },
  {
    type: "Trio Bundle",
    price: "₹1999",
    description: "Three's a party. More friends, more memories, better value.",
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=1b92dcd7-41b3-4f62-b57a-d1445a5c21ab",
    isBundle: true,
    count: "3 Tickets"
  },
  {
    type: "Couple Bundle",
    price: "₹1399",
    description: "Double the fun. Because the best moments are meant to be shared.",
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=17074073-d06d-4b1d-8371-14a4fc0ef261",
    isBundle: true,
    count: "2 Tickets"
  },
  {
    type: "Early Bird",
    price: "₹699",
    description: "Limited time offer for early bookings.",
    soldOut: true,
    disabled: false,
    label: "Few tickets left",
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=c8a47208-ac03-4724-8d2a-821f5afcdf79",
  },
  {
    type: "Cusatian",
    price: "₹799",
    description: "Access for current students with valid ID.",
    highlight: false,
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=7ff49129-48bb-4354-92d5-0be2c21e947e"
  },
  {
    type: "Cusat Alumni",
    price: "₹899",
    description: "Special rate for CUSAT alumni.",
    highlight: false,
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=f05cd3ca-613c-47d8-be83-6752f236328d",
  },
  {
    type: "Non-Cusatian",
    price: "₹999",
    description: "Access for students outside CUSAT.",
    highlight: false,
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=d905ceb6-15e8-4bd5-a577-08da99e3df94",
  },
  {
    type: "Professional",
    price: "₹1099",
    description: "General access for professionals and guests.",
    highlight: false,
    soldOut: false,
    disabled: false,
    link: "https://makemypass.com/event/tedxcusat-2025?ticket_id=600db8cf-6b62-460a-93b2-e0d357f75dac",
  }
];

const sponsors = [
  { name: "Sponsor 1", logo: "/infopark-logo.svg" },
  { name: "Sponsor 2", logo: "/makemypass-logo.svg" },
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
    answer: "For any ticket-related inquiries, message or call Rayif - +91 97464 02973",
  },
  {
    question: "What do I need to bring to the event?",
    answer: "Bring a digital copy of your e-ticket and Student ID if you have student ticket.",
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
  const [isHappyHour, setIsHappyHour] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const deadline = new Date("2026-01-29T23:00:00+05:30").getTime();
      const now = new Date().getTime();
      setIsHappyHour(now < deadline);
    };

    checkTime();
    // Re-check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

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
        duration: 0.8,
        ease: "power4.out"
      }
    ).fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
    ).fromTo(
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
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      },
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
        <div ref={cardsRef} className="flex flex-wrap justify-center gap-6 mb-32 max-w-7xl mx-auto">
          {tickets.map((ticket, index) => (
            <motion.div
              key={index}
              className={`ticket-card opacity-0 relative group p-8 border backdrop-blur-sm flex flex-col justify-between min-h-[400px] w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-all duration-300
                ${/* @ts-ignore */
                ticket.isBundle
                  ? 'bg-gradient-to-br from-black/80 to-[#EB0028]/10 border-[#EB0028]/40 hover:border-[#EB0028] hover:shadow-[0_0_30px_-5px_rgba(235,0,40,0.3)]'
                  : 'bg-black/50 border-white/20 hover:border-white/50'
                }
              `}
            >
              {/* Card Content */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-orbitron font-bold text-2xl tracking-wider text-white flex items-center gap-3 ${/* @ts-ignore */ ticket.isBundle ? 'text-[#EB0028] drop-shadow-sm' : ''}`}>
                    {ticket.type}
                  </h3>
                </div>

                <div className={`h-0.5 w-16 mb-6 ${/* @ts-ignore */ ticket.isBundle ? 'bg-[#EB0028]' : 'bg-white/50'}`}></div>

                <div className="flex flex-col mb-4">
                  {/* @ts-ignore */}
                  {isHappyHour && !ticket.isBundle ? (
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-clash text-xl text-gray-500 line-through decoration-[#EB0028]/50 decoration-2">
                          {ticket.price}
                        </p>
                        <div className="px-2 py-0.5 rounded bg-[#EB0028]/20 border border-[#EB0028]/30">
                          <span className="text-xs font-bold text-[#EB0028] uppercase tracking-wider">30% OFF</span>
                        </div>
                      </div>
                      <p className="font-clash text-5xl font-semibold text-white mt-1">
                        {/* Calculate 30% off */}
                        ₹{(parseInt(ticket.price.replace('₹', '')) * 0.7).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-clash text-5xl font-semibold text-white">
                      {ticket.price}
                    </p>
                  )}
                </div>

                <p className="font-clash text-gray-400 leading-relaxed text-lg">
                  {ticket.description}
                </p>
              </div>

              {/* Book Button */}
              {/* @ts-ignore */}
              {(ticket.count || ticket.label) && !ticket.soldOut && !ticket.disabled && (
                <div className="mt-auto">
                  <p className={`text-[#EB0028] font-clash font-bold text-sm tracking-widest uppercase mb-4 ${/* @ts-ignore */ ticket.label ? 'animate-pulse' : ''}`}>
                    {/* @ts-ignore */ ticket.count || ticket.label}
                  </p>
                </div>
              )}
              <button
                onClick={() => ticket.link && window.open(ticket.link, "_blank")}
                disabled={ticket.soldOut || ticket.disabled}
                className={`w-full py-4 bg-transparent border font-clash font-medium tracking-wide transition-colors duration-300 uppercase
                  ${ticket.soldOut || ticket.disabled
                    ? 'border-white/20 text-white/40 cursor-not-allowed hidden'
                    : /* @ts-ignore */ ticket.isBundle
                      ? 'border-[#EB0028] bg-[#EB0028] text-white hover:bg-[#EB0028]/80 hover:border-[#EB0028]/80 mt-0 font-bold shadow-[0_0_15px_rgba(235,0,40,0.4)]'
                      : 'border-[#EB0028] text-white hover:bg-[#EB0028] mt-0'
                  }
                `}
              >
                {ticket.soldOut ? 'Sold Out' : ticket.disabled ? 'Coming Soon' : 'Book Now'}
              </button>

              {/* Decorative Corners */}
              <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors ${/* @ts-ignore */ ticket.isBundle ? 'border-[#EB0028]' : 'border-white/30 group-hover:border-[#EB0028]'}`}></div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors ${/* @ts-ignore */ ticket.isBundle ? 'border-[#EB0028]' : 'border-white/30 group-hover:border-[#EB0028]'}`}></div>

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

          <div className={`grid gap-8 md:gap-16 items-center justify-items-center opacity-70 ${sponsors.filter(s => s.logo).length === 1 ? 'grid-cols-1' :
            sponsors.filter(s => s.logo).length === 2 ? 'grid-cols-2' :
              sponsors.filter(s => s.logo).length === 3 ? 'grid-cols-3' :
                'grid-cols-2 md:grid-cols-4'
            }`}>
            {sponsors.filter(sponsor => sponsor.logo).map((sponsor, index) => (
              <div key={index} className="sponsor-logo w-full max-w-[150px] aspect-[3/2] flex items-center justify-center transition-all duration-500 overflow-visible">
                <div className="w-full h-full flex items-center justify-center">
                  <SponsorLogo name={sponsor.name} logo={sponsor.logo} />
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
function SponsorLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);

  if (!failed && logo) {
    return (
      <Image
        src={logo}
        alt={name}
        width={200}
        height={125}
        className="object-contain w-[200px] h-[125px]"
        onError={() => setFailed(true)}
      />
    );
  }

  // fallback with box styling
  return (
    <div className="w-full h-full border border-white/10 flex items-center justify-center bg-white/5 p-4">
      <span className="font-clash text-sm text-gray-500">
        {name}
      </span>
    </div>
  );
}

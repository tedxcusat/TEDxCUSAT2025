"use client";

import { useEffect, useState, useRef } from "react";

export default function Footer() {
  // State to trigger animations
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If footer is visible, trigger animations and stop observing
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    // Attached ref here to monitor visibility
    <footer ref={footerRef} className="bg-black text-white overflow-hidden">
      {/* MAIN FOOTER CONTENT */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0">
          
          {/* LEFT COLUMN */}
          <div className="relative w-full overflow-hidden lg:pr-16">
            
            {/* Heading & Subheading */}
            {/* ANIMATION: Appears first (Fade In) */}
            <div 
              className={`transform transition-all duration-1000 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="font-orbitron text-3xl md:text-[48px] tracking-[-2%]">
                Got a <span className="text-[#EB0028]">Question?</span>
              </h3>

              <p className="mt-2 font-orbitron text-xl md:text-[24px] opacity-80">
                Contact
              </p>
            </div>

            {/* HAND IMAGE — TOP RIGHT (Hidden on Mobile) */}
            {/* ANIMATION: Fades in from the middle side partition */}
            <img
              src="/footer-hand.png"
              alt=""
              className={`
                absolute
                right-[-253px]
                top-[-225px]
                origin-top-right
                hidden xl:block pointer-events-none
                transform transition-all duration-1000 delay-300 ease-out
                ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}
              `}
            />

            {/* CONTACT CARDS */}
            <div className="mt-10 lg:mt-[100px] space-y-6 lg:space-y-10">
              
              {/* CONTACT CARD 1 */}
              {/* ANIMATION: Fades directly in (Delay 500ms) */}
              <div 
                className={`border border-white px-5 py-4 w-full max-w-[380px] transform transition-opacity duration-1000 delay-500 ease-out ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="font-clash text-2xl md:text-[26px] tracking-[-2%] text-[#EB0028]">
                  IVINE JOJU
                </p>

                <p className="mt-0.5 font-clash text-[12px] text-white/70">
                  Organizer – TEDxCUSAT’26
                </p>

                <div className="mt-1 h-px w-full bg-white/30" />

                <a
                  href="tel:+919895545390"
                  className="mt-3 flex items-center gap-3 font-clash text-[16px] text-white hover:opacity-80 transition"
                >
                  <img
                    src="/call.png"
                    alt="Call"
                    className="h-4 w-4"
                  />
                  <span>+91 98955 45390</span>
                </a>
              </div>

              {/* CONTACT CARD 2 */}
              {/* ANIMATION: Fades directly in (Delay 700ms) */}
              <div 
                className={`border border-white px-5 py-4 w-full max-w-[380px] transform transition-opacity duration-1000 delay-700 ease-out ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="font-clash text-2xl md:text-[26px] tracking-[-2%] text-[#EB0028]">
                  IVINE JOJU
                </p>

                <p className="mt-0.5 font-clash text-[12px] text-white/70">
                  Organizer – TEDxCUSAT’26
                </p>

                <div className="mt-1 h-px w-full bg-white/30" />
                <a
                  href="tel:+919895545390"
                  className="mt-3 flex items-center gap-3 font-clash text-[16px] text-white hover:opacity-80 transition"
                >
                  <img
                    src="/call.png"
                    alt="Call"
                    className="h-4 w-4"
                  />
                  <span>+91 98955 45390</span>
                </a>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER (Hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/40" />

          {/* RIGHT COLUMN */}
          {/* ANIMATION: Drops and fades in from the top (Delay 1000ms) */}
          <div 
            className={`w-full lg:pl-16 transform transition-all duration-1000 delay-1000 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
            }`}
          >
            <h3 className="font-orbitron text-3xl md:text-[42px] tracking-[5%]">
              See You <span className="text-[#EB0028]">there!</span>
            </h3>
            
            {/* Location */}
            <div className="mt-6 flex items-start gap-3 font-clash text-lg md:text-[20px] leading-relaxed text-white/90">
              <img
                src="/location.png"
                alt="Location"
                className="mt-1 h-5 w-5 flex-shrink-0"
              />
              <span>
                Seminar Complex, CUSAT, University Road, South Kalamassery,
                Kalamassery, Ernakulam, Kochi, Kerala 682022.
              </span>
            </div>

            {/* Parking */}
            <div className="mt-4 flex items-center gap-3 font-clash text-base md:text-[18px] text-white">
              <img
                src="/car.png"
                alt="Parking"
                className="h-5 w-5 flex-shrink-0"
              />
              <span>Free Parking Space available!</span>
            </div>

            {/* Map */}
            <div className="mt-8 h-[200px] md:h-[260px] w-full border border-white/30 overflow-hidden">
              <iframe
                title="Seminar Complex, CUSAT"
                src="https://www.google.com/maps?q=Seminar+Complex+CUSAT&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      {/* ANIMATION: Fades directly in (Delay 1200ms) */}
      <div 
        className={`border-t border-white/40 transform transition-opacity duration-1000 delay-1200 ease-out ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-6 py-6 lg:px-16">
          
          {/* LEFT — LOGO */}
          <img
            src="/tedxcusat-logo.png"
            alt="TEDxCUSAT"
            className="h-[30px] md:h-[40px]"
          />

          {/* CENTER */}
          <span className="font-clash text-sm md:text-[16px] text-white/80">
            ©TEDxCUSAT’26
          </span>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-clash text-xs md:text-[14px] text-white/70">
              FOLLOW US ON.
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/tedxcusat21/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="/facebook.png"
                  alt="Facebook"
                  className="h-5 w-5 hover:opacity-80 transition"
                />
              </a>

              <a
                href="https://www.instagram.com/tedxcusat/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="h-5 w-5 hover:opacity-80 transition"
                />
              </a>

              <a
                href="https://x.com/tedx_cusat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <img
                  src="/twitter.png"
                  alt="X (Twitter)"
                  className="h-5 w-5 hover:opacity-80 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
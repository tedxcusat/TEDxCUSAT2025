"use client";

import { useEffect, useState, useRef } from "react";

export default function Footer({ startAnimation = false }: { startAnimation?: boolean }) {
  // State to trigger animations
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (startAnimation) {
      setIsInView(true);
    }
  }, [startAnimation]);

  return (
    // Attached ref here to monitor visibility
    <footer ref={footerRef} className="bg-black text-white lg:pt-10">
      {/* MAIN FOOTER CONTENT */}
      <div className="relative mx-auto w-full max-w-screen px-6 lg:px-16 lg:pt-24 lg:pb-12 lg:mt-0 -mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0">

          {/* LEFT COLUMN */}
          <div className="relative w-full lg:pr-16" style={{ clipPath: "polygon(0% -300px, 100% -300px, 100% 100%, 0% 100%)" }}>

            {/* Heading & Subheading */}
            {/* ANIMATION: Appears first (Fade In) */}
            <div
              className={`transform transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                right-[-225px]
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
                className={`border border-white px-5 py-4 w-full max-w-[380px] transform transition-opacity duration-1000 delay-500 ease-out ${isInView ? "opacity-100" : "opacity-0"
                  }`}
              >
                <p className="font-clash text-2xl md:text-[26px] tracking-[-2%] text-[#EB0028]">
                  DEVA NANDAN
                </p>

                <p className="mt-0.5 font-clash text-[12px] text-white/70">
                  Organizer – TEDxCUSAT’25
                </p>

                <div className="mt-1 h-px w-full bg-white/30" />

                <a
                  href="tel:+919188227875"
                  className="mt-3 flex items-center gap-3 font-clash text-[16px] text-white hover:opacity-80 transition"
                >
                  <img
                    src="/call.png"
                    alt="Call"
                    className="h-4 w-4"
                  />
                  <span>+91 91882 27875</span>
                </a>
              </div>

              {/* CONTACT CARD 2 */}
              {/* ANIMATION: Fades directly in (Delay 700ms) */}
              <div
                className={`border border-white px-5 py-4 w-full max-w-[380px] transform transition-opacity duration-1000 delay-700 ease-out ${isInView ? "opacity-100" : "opacity-0"
                  }`}
              >
                <p className="font-clash text-2xl md:text-[26px] tracking-[-2%] text-[#EB0028]">
                  ADITHYAN PRAMOD
                </p>

                <p className="mt-0.5 font-clash text-[12px] text-white/70">
                  Organizer – TEDxCUSAT’25
                </p>

                <div className="mt-1 h-px w-full bg-white/30" />
                <a
                  href="tel:+918304988035"
                  className="mt-3 flex items-center gap-3 font-clash text-[16px] text-white hover:opacity-80 transition"
                >
                  <img
                    src="/call.png"
                    alt="Call"
                    className="h-4 w-4"
                  />
                  <span>+91 83049 88035</span>
                </a>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER (Hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/40" />

          {/* RIGHT COLUMN */}
          {/* ANIMATION: Drops and fades in from the top (Delay 1000ms) */}
          <div
            className={`w-full lg:pl-16 transform transition-all duration-1000 delay-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
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
                Athulya Hall, Athulya Rd, Infopark Campus, Infopark, Kakkanad, Kerala 682042
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
            <div className="my-8 h-[200px] md:h-[260px] w-full border border-white/30 overflow-hidden">
              <iframe
                title="Seminar Complex, CUSAT"
                src="https://www.google.com/maps?q=2956+JM8,+Athulya+Rd,+Infopark+Campus,+Kakkanad,+Kerala+682042&output=embed"
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
        className={`border-t border-white/40 transform transition-opacity duration-1000 delay-1200 ease-out ${isInView ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-row items-center justify-between md:gap-0 px-4 py-4 lg:px-12">

          {/* LEFT — LOGO */}
          <img
            src="/logo-white.png"
            alt="TEDxCUSAT"
            className="h-[24px] md:h-[40px]"
          />

          {/* CENTER */}
          <span className="font-clash text-[10px] -ml-3 md:text-[16px] lg:-ml-8 text-white/80 text-center leading-tight">
            ©TEDxCUSAT’25
          </span>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-clash text-[8px] md:text-[14px] text-white/70 whitespace-nowrap">
              FOLLOW US ON.
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <a
                href="https://www.facebook.com/tedxcusat21/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="/facebook.svg"
                  alt="Facebook"
                  className="mb-0.5 h-3 w-3 md:h-5 md:w-5 hover:opacity-80 transition"
                />
              </a>

              <a
                href="https://www.instagram.com/tedxcusat/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  className="h-3 w-3 md:h-5 md:w-5 hover:opacity-80 transition"
                />
              </a>

              <a
                href="https://x.com/tedx_cusat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <img
                  src="/twitter.svg"
                  alt="X (Twitter)"
                  className="h-3 w-3 md:h-5 md:w-5 hover:opacity-80 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
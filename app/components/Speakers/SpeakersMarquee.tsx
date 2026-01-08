"use client";

export default function Marquee() {
  return (
    <div className="relative w-full bg-black border-y border-white py-3 sm:py-6">
      {/* SCROLLING TRACK CONTAINER */}
      <div className="overflow-hidden w-full">
        {/* ANIMATED TRACK */}
        <div className="animate-speakers-marquee flex whitespace-nowrap font-clash font-normal text-[14px] sm:text-[18px] lg:text-[22px] leading-none text-white">

          {/* TRACK 1 */}
          <div className="flex items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6 pr-6">
                <span >TEDXCUSAT’26</span>
                <span className="text-[#EB0028]">&lt;</span>
                <span>SPEAKERS  •  STORIES  •  IMPACT</span>
                <span className="text-[#EB0028]">&lt;</span>
              </span>
            ))}
          </div>

          {/* TRACK 2 — DUPLICATE FOR SEAMLESS LOOP */}
          <div className="flex items-center ml-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-6 pr-6">
                <span className="font-semibold">TEDXCUSAT’26</span>
                <span className="text-[#EB0028]">&lt;</span>
                <span>SPEAKERS  •  STORIES  •  IMPACT</span>
                <span className="text-[#EB0028]">&lt;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

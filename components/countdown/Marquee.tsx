export default function Marquee() {
  return (
    // Changed: Removed 'fixed bottom-0'.
    // Added: 'relative w-full' to flow naturally with the page.
    // 'border-y' ensures both top and bottom lines are visible.
    <div className="relative w-full bg-black border-y border-white py-6 overflow-hidden">
      
      {/* ANIMATED TRACK */}
      <div className="animate-marquee flex whitespace-nowrap font-clash font-normal text-[18px] sm:text-[20px] lg:text-[22px] leading-none text-white">
        
        {/* TRACK 1 */}
        <div className="flex items-center gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span className="font-semibold">TEDXCUSAT’26</span>
              <span className="text-[#EB0028]">&lt;</span>
              <span>Ideas in Motion</span>
              <span className="text-[#EB0028]">&lt;</span>
              <span>Step Into It</span>
              <span className="text-[#EB0028]">&lt;</span>
            </span>
          ))}
        </div>

        {/* TRACK 2 — IDENTICAL COPY */}
        <div className="flex items-center gap-6 ml-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-6">
              <span className="font-semibold">TEDXCUSAT’26</span>
              <span className="text-[#EB0028]">&lt;</span>
              <span>Ideas in Motion</span>
              <span className="text-[#EB0028]">&lt;</span>
              <span>Step Into It</span>
              <span className="text-[#EB0028]">&lt;</span>
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
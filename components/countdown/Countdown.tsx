import CountdownTimer from "./CountdownTimer";
import Marquee from "./Marquee";

export default function Countdown() {
  return (
    // Added 'lg:pb-12' to create the buffer space on Desktop.
    // Mobile stays at default (pb-0), so Marquee touches the bottom.
    <section className="relative min-h-screen w-full bg-black flex flex-col overflow-hidden lg:pb-2">
      {/* TOP CONTENT */}
      <div className="pt-12 sm:pt-16 lg:pt-24 flex flex-col items-center w-full">
        
        {/* Heading */}
        <h2 className="mb-6 lg:mb-10 px-4 text-center font-orbitron font-black tracking-[8%] whitespace-nowrap">
          <span className="text-white text-[32px] sm:text-[48px] md:text-[64px] lg:text-[92px] mr-3 sm:mr-6">
            FINAL
          </span>
          <span className="text-[#EB0028] text-[32px] sm:text-[48px] md:text-[64px] lg:text-[92px]">
            COUNTDOWN
          </span>
        </h2>

        {/* DESKTOP VIEW (Hands + Timer) */}
        <div className="hidden lg:flex w-full items-center justify-between min-h-[200px]">
          
          {/* LEFT HAND */}
          <div className="w-[180px] xl:w-[260px] flex-shrink-0 flex justify-start z-10">
            <img
              src="/hand-left.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

          {/* CENTER ZONE */}
          <div className="flex-1 flex justify-center z-0">
            <div className="border border-white w-full py-4 px-2 xl:px-8 flex justify-center">
              <CountdownTimer />
            </div>
          </div>

          {/* RIGHT HAND */}
          <div className="w-[180px] xl:w-[260px] flex-shrink-0 flex justify-end z-10">
            <img
              src="/hand-right.png"
              alt=""
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

        </div>

        {/* MOBILE / TABLET VIEW (Timer only) */}
        <div className="flex justify-center lg:hidden px-4 w-full">
          <div className="w-fit border border-white flex justify-center px-4">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="mt-auto w-full">
        <Marquee />
      </div>
    </section>
  );
}
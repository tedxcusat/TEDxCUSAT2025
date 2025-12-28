import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(logoRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "power3.out"
      }
    )
      .from(subtextRef.current, {
        yPercent: -600, // Move DOWN from 100% up
        duration: 1.5,
        ease: "power3.out"
      }, "<");
  }, { scope: logoRef });

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#040404] text-white`}>

      <div className="relative flex flex-col items-center w-[360px] max-w-full -mt-16">

        <div className="flex justify-center mb-1.5 w-full overflow-hidden">
          <div ref={logoRef} className="w-full">
            <Image
              src="/logo-white.svg"
              alt="TEDxCUSAT"
              width={504}
              height={101}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div ref={subtextRef} className="w-auto">
            <Image
              src="/sub-text.svg"
              alt="Presents"
              width={249}
              height={12}
              className="w-auto h-[8.7px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
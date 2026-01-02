"use client";

import { useEffect, useState } from "react";
import { COUNTDOWN_TARGET_ISO } from "./countdown.constants";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft | null {
  const target = new Date(COUNTDOWN_TARGET_ISO).getTime();
  const now = Date.now();
  const diff = target - now;

  // MODIFIED: If time is up, return 0s instead of null so it stays visible.
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !timeLeft) return null;

  return (
    // Changed to justify-center: Spacing is now controlled strictly by the divider margins
    <div className="flex items-center justify-center w-full py-4 sm:py-6">
      
      {Object.entries(timeLeft).map(([label, value], index) => (
        <div key={label} className="flex items-center">
          
          {/* UNIT GROUP (Number + Letter) */}
          <div className="flex items-end gap-[2px] sm:gap-2">
            
            {/* NUMBER */}
            {/* Reduced clamp vw from 4vw to 3vw to prevent overflow on tablets */}
            <span
              className="font-orbitron font-bold text-[#EB0028]
                    text-[clamp(14px,3vw,82px)] 
                    tabular-nums text-center leading-none"
              style={{ width: "2.3ch" }}
            >
              {value.toString().padStart(2, "0")}
            </span>

            {/* LETTER (D, H, M, S) */}
            <span
              className="font-orbitron font-bold
                    text-[clamp(14px,3vw,82px)] leading-none"
              style={{
                WebkitTextStroke: "1px #EB0028",
                color: "transparent",
              }}
            >
              {label.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* DIVIDER */}
          {/* This logic ensures uniform spacing everywhere */}
          {index < 3 && (
            <div
              className="
                mx-2         /* Mobile gap */
                sm:mx-6      /* Tablet gap */
                lg:mx-8      /* Desktop gap */
                xl:mx-12     /* Large Desktop gap */
                h-6 sm:h-10 lg:h-16
              "
              style={{
                width: "1px",
                backgroundColor: "#ffffff",
                opacity: 0.6,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Participant {
  id: string;
  name: string;
  couponsSold: number;
  department: string;
  revenue: number;
}

interface LeaderboardData {
  participants: Participant[];
  totalRevenue: number;
  targetRevenue: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/leaderboard', { cache: 'no-store' });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.details || 'Failed to fetch data');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const { participants = [], totalRevenue = 0, targetRevenue = 75000 } = data || {};
  const progressPercentage = Math.min((totalRevenue / targetRevenue) * 100, 100);

  // GSAP Animations
  useGSAP(() => {
    if (loading || error) return;

    const tl = gsap.timeline();

    // Title Reveal (Clip Path)
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        ease: "power4.out"
      }
    );

    // KPI Cards Entrance
    tl.fromTo(
      ".kpi-card",
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // List Items Entrance
    if (listRef.current) {
      gsap.fromTo(
        ".participant-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 90%",
          }
        }
      );
    }

  }, { scope: containerRef, dependencies: [loading, data] });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-clash relative overflow-hidden">
        {/* Background Noise */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('/noise.svg')" }}></div>
        <div className="text-xl font-orbitron text-[#EB0028] tracking-widest animate-pulse">
          LOADING SYSTEM...
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-clash text-xl p-8 text-center relative z-10">
        <div className="text-[#EB0028] font-orbitron text-3xl mb-4">SYSTEM ERROR</div>
        <div className="text-gray-400 text-base font-clash border border-white/20 p-6 bg-black/50 backdrop-blur-sm max-w-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen w-full bg-black text-white overflow-hidden font-clash relative selection:bg-[#EB0028] selection:text-white flex flex-col md:flex-row">

      {/* Background Noise & Gradient (From Tickets Page) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('/noise.svg')" }}></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 pointer-events-none"></div>

      {/* LEFT SECTION - FIXED (Revenue & Stats) */}
      <section ref={leftPanelRef} className="relative z-10 w-full md:w-[40%] lg:w-[35%] h-auto md:h-screen md:sticky md:top-0 border-r border-white/10 bg-black/20 backdrop-blur-sm flex flex-col justify-center p-8 md:p-12 lg:p-16 overflow-hidden">

        <div className="flex flex-col h-full justify-center relative">
          {/* Header Badge */}
          <div className="my-12">
            <h1 ref={titleRef} className="text-5xl lg:text-6xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-[0.9] tracking-tight">
              LEADER<br /><span className="text-[#EB0028]">BOARD</span>
            </h1>
          </div>

          {/* KPI Section */}
          <div ref={kpiRef} className="space-y-6 mb-12">
            {/* Total Revenue Card */}
            <div className="kpi-card opacity-0 relative group p-8 border border-white/20 hover:border-[#EB0028]/50 bg-black/40 backdrop-blur-sm transition-all duration-300">
              <h3 className="font-orbitron text-xs text-white/60 tracking-widest uppercase mb-2">Total Deployed Revenue</h3>
              <div className="font-clash text-4xl lg:text-5xl font-semibold text-white">
                ₹{totalRevenue.toLocaleString()}
              </div>
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-[#EB0028] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-[#EB0028] transition-colors"></div>
            </div>

            {/* Goal Card */}
            <div className="kpi-card opacity-0 relative group p-6 border border-white/20 hover:border-white/40 bg-black/40 backdrop-blur-sm transition-all duration-300">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="font-orbitron text-xs text-white/60 tracking-widest uppercase mb-1">Target Protocol</h3>
                  <div className="font-clash text-2xl text-white/40">
                    ₹{targetRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-orbitron text-3xl font-bold text-[#EB0028]">{progressPercentage.toFixed(1)}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white/10 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                  className="h-full bg-[#EB0028]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SECTION - SCROLLABLE (Ranks) */}
      <section className="relative z-10 w-full md:w-[60%] lg:w-[65%] h-auto md:h-screen overflow-y-auto scroll-smooth">
        <div ref={listRef} className="p-6 md:p-12 lg:p-16 min-h-screen">

          {/* Sticky Table Header */}
          <div className="sticky top-0 bg-black/90 backdrop-blur-xl z-20 py-4 mb-6 border-b border-white/10 flex items-center justify-between text-xs font-orbitron text-white/50 tracking-widest uppercase">
            <span>Agent Profile</span>
            <span className="text-right">Metrics</span>
          </div>

          <div className="space-y-4 pb-24">
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className="participant-row opacity-0 relative group p-6 border border-white/10 hover:border-[#EB0028] bg-black/40 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(235,0,40,0.1)]"
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6 md:gap-10">
                    {/* Rank */}
                    <div className={`
                            text-3xl font-bold font-orbitron w-12 text-center
                            ${index === 0 ? 'text-[#ffd700]' :
                        index === 1 ? 'text-[#c0c0c0]' :
                          index === 2 ? 'text-[#cd7f32]' :
                            'text-white/20'}
                          `}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className={`text-lg md:text-xl font-bold font-clash tracking-wide text-white group-hover:text-[#EB0028] transition-colors duration-300`}>
                        {participant.name}
                        {index === 0 && <span className="ml-3 text-[10px] bg-[#ffd700] text-black px-1.5 py-0.5 rounded font-bold align-middle font-orbitron">MVP</span>}
                      </h3>
                      <p className="text-xs text-gray-500 font-clash uppercase tracking-wider mt-1 group-hover:text-white transition-colors">{participant.department}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-3xl font-bold font-orbitron text-white">
                      {participant.couponsSold}
                    </div>
                    <div className="text-[10px] text-gray-500 font-clash uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100">Coupons</div>
                  </div>
                </div>

                {/* Decorative Corners for List Items */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#EB0028] transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#EB0028] transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

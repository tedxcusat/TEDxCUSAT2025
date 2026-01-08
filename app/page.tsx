'use client';

import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Placeholder from './components/Placeholder';
import Countdown from './components/countdown/Countdown';
import Footer from './components/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [loaderFinished, setLoaderFinished] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);
  const [countdownInView, setCountdownInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [navbarFinished, setNavbarFinished] = useState(false);

  useEffect(() => {
    if (!navbarFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Refresh ScrollTrigger after unlocking overflow to ensure calculations are correct
      ScrollTrigger.refresh();
    }
  }, [navbarFinished]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (navbarFinished && !loaderFinished) {
      // Logic if needed between navbar finish and loader? 
      // Actually existing code waited for loaderFinished to start Hero animation.
      // And Hero onComplete -> setHeroFinished.
    }
  }, [navbarFinished, loaderFinished]);

  useGSAP(() => {
    if (loaderFinished) {
      // Create Snap Trigger
      const sections = gsap.utils.toArray('.panel') as HTMLElement[];

      // Calculate snap points based on section positions
      // This handles variable section heights correctly
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const snapPoints = sections.map(section => section.offsetTop / scrollHeight);

      // Ensure we always have valid snap points (fallback to empty if calculation fails or 0 scroll)
      const validSnapPoints = snapPoints.length > 0 && scrollHeight > 0 ? snapPoints : undefined;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: validSnapPoints || 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.8 },
          delay: 0,
          ease: "power1.inOut"
        }
      });

      // Triggers for components
      ScrollTrigger.create({
        trigger: countdownRef.current,
        start: "top 60%",
        onEnter: () => setCountdownInView(true),
      });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 60%",
        onEnter: () => setFooterInView(true),
      });
    }
  }, [loaderFinished]);

  return (
    <main ref={containerRef}>
      <Loader onComplete={() => setLoaderFinished(true)} />
      <Navbar startAnimation={heroFinished} onComplete={() => setNavbarFinished(true)} />

      <section ref={heroRef} className="panel min-h-screen w-full relative">
        <Hero startAnimation={loaderFinished} onComplete={() => setHeroFinished(true)} />
      </section>

      <section ref={countdownRef} className="panel min-h-screen w-full relative bg-black">
        <Countdown startAnimation={countdownInView} />
      </section>

      <section ref={footerRef} className="panel min-h-screen w-full relative bg-black">
        <Footer startAnimation={footerInView} />
      </section>
    </main>
  );
}
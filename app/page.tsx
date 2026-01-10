'use client';

import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Placeholder from './components/Placeholder';
import Countdown from './components/countdown/Countdown';
import Speakers from './components/Speakers/Speakers';
import Footer from './components/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const speakersRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [loaderFinished, setLoaderFinished] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);
  const [speakersInView, setSpeakersInView] = useState(false);
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
      // Triggers for components
      ScrollTrigger.create({
        trigger: speakersRef.current,
        start: "top 60%",
        onEnter: () => setSpeakersInView(true),
      });

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

      <section ref={heroRef} className="panel min-h-screen w-full relative snap-start">
        <Hero startAnimation={loaderFinished} onComplete={() => setHeroFinished(true)} />
      </section>

      <section ref={countdownRef} className="panel min-h-screen w-full relative bg-black snap-start">
        <Countdown startAnimation={countdownInView} />
      </section>

      <section ref={speakersRef} className="panel min-h-[125vh] w-full relative bg-black snap-start">
        <Speakers startAnimation={speakersInView} />
      </section>

      <section ref={footerRef} className="panel min-h-screen w-full relative bg-black snap-start">
        <Footer startAnimation={footerInView} />
      </section>
    </main>
  );
}
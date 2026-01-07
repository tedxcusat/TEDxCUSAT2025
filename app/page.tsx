'use client';

import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Placeholder from './components/Placeholder';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);
  const [placeholderInView1, setPlaceholderInView1] = useState(false);
  const [placeholderInView2, setPlaceholderInView2] = useState(false);

  const placeholderWrapperRef1 = useRef<HTMLDivElement>(null);
  const placeholderWrapperRef2 = useRef<HTMLDivElement>(null);

  const [navbarFinished, setNavbarFinished] = useState(false);

  useEffect(() => {
    if (!navbarFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [navbarFinished]);

  useGSAP(() => {
    if (loaderFinished) {
      ScrollTrigger.create({
        trigger: placeholderWrapperRef1.current,
        start: "top 60%",
        onEnter: () => setPlaceholderInView1(true),
      });
    }
    if (loaderFinished) {
      ScrollTrigger.create({
        trigger: placeholderWrapperRef2.current,
        start: "top 60%",
        onEnter: () => setPlaceholderInView2(true),
      });
    }
  }, [loaderFinished]);

  return (
    <main>
      <Loader onComplete={() => setLoaderFinished(true)} />
      <Navbar startAnimation={heroFinished} onComplete={() => setNavbarFinished(true)} />
      <Hero startAnimation={loaderFinished} onComplete={() => setHeroFinished(true)} />
      <div ref={placeholderWrapperRef1}>
        <Placeholder startAnimation={placeholderInView1} />
      </div>
      <div ref={placeholderWrapperRef2}>
        <Placeholder startAnimation={placeholderInView2} />
      </div>
    </main>
  );
}
'use client';

import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';

export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <Hero />
    </main>
  );
}
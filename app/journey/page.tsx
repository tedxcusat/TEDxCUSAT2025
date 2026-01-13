// src/app/journey/page.tsx
'use client';

import Journey from '../components/journey';
//import Navbar from '../components/Navbar'; // Optional: if you want to see the nav too

export default function JourneyPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* <Navbar /> */}
      <Journey />
    </main>
  );
}
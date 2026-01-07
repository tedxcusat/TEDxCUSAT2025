"use client";

import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SPEAKERS", href: "/speakers" },
  { name: "STORIES", href: "/stories" },
];

const mobileItems = [
  { id: "1", name: "VENUE", href: "/venue" },
  { id: "2", name: "SPEAKERS", href: "/speakers" },
  { id: "3", name: "CONTACT", href: "/contact" },
  { id: "4", name: "TEAM", href: "/team" },
];

const Navbar = ({ startAnimation, onComplete }: { startAnimation: boolean; onComplete?: () => void }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.fromTo(navRef.current,
      {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
      },
      {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    tlRef.current = tl;
  }, { scope: navRef });

  useEffect(() => {
    if (startAnimation && tlRef.current) {
      tlRef.current.play();
    }
  }, [startAnimation]);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuRef.current, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.5,
        ease: "power3.out"
      });
      // Stagger items animation
      gsap.fromTo(".mobile-nav-item", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className="w-full h-[80px] flex items-center justify-between px-6 md:px-16 z-[100] fixed top-0 left-0 bg-transparent pointer-events-auto"
        ref={navRef}
      >
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger (Hamburger) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer select-none">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="TEDxCUSAT Logo"
                width={180}
                height={40}
                className="object-contain h-6 md:h-8 -mt-3 w-auto"
                priority
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-12 mt-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-clash font-normal text-[14px] leading-[100%] tracking-[-0.02em] text-white hover:text-[#EB0028] transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Placeholder for spacing on mobile if needed, or keeping justify-between structure */}
        <div className="md:hidden w-8"></div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-black z-[110] flex flex-col opacity-0 pointer-events-none"
      >
        {/* Header with Close Button */}
        <div className="h-[80px] flex items-center justify-end px-6">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-white p-2 focus:outline-none"
            aria-label="Close menu"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col justify-center px-8" ref={menuItemsRef}>
          <div className="space-y-8">
            {mobileItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-item flex items-center gap-6 group"
              >
                <div className="bg-[#EB0028] text-white font-sans text-sm w-8 h-8 flex items-center justify-center">
                  {item.id}
                </div>
                <span className="font-clash font-light text-5xl text-white tracking-wide group-hover:text-[#EB0028] transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gray-800 my-8 mobile-nav-item"></div>

          {/* Bottom Section */}
          <div className="space-y-6 mobile-nav-item">
            <p className="text-gray-400 text-sm">Join the experience!</p>
            <button className="w-full bg-[#EB0028] text-white font-bold py-4 text-xl tracking-wider hover:bg-[#c00020] transition-colors uppercase">
              Book Now
            </button>
          </div>
        </div>

        {/* Footer Socials */}
        <div className="px-8 pb-8 flex items-center gap-6 mobile-nav-item">
          <a href="#" className="text-white hover:text-[#EB0028] transition-colors">
            {/* Facebook Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" className="text-white hover:text-[#EB0028] transition-colors">
             {/* Instagram Icon */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="text-white hover:text-[#EB0028] transition-colors">
            {/* X (Twitter) Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
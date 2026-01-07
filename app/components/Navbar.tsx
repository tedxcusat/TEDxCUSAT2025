"use client";

import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

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
        className="w-full h-[90px] flex items-center justify-between px-6 md:px-16 z-[100] fixed top-0 left-0 bg-transparent pointer-events-auto"
        ref={navRef}
      >
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger (Hamburger) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 focus:outline-none"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[3px] rounded-sm bg-white"></span>
            <span className="block w-6 h-[3px] rounded-sm bg-white"></span>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-default select-none -mt-1.5">
            <Image
              src="/logo-white.svg"
              alt="TEDxCUSAT Logo"
              width={180}
              height={40}
              className="object-contain h-8 w-auto"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden ml-8 md:flex items-center gap-12 mt-1">
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
            className="text-white p-2 focus:outline-none mt-1"
            aria-label="Close menu"
          >
            <X strokeWidth={4} size={24} />
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
                <div className="bg-[#EB0028] text-white font-clash text-sm w-8 h-8 flex items-center justify-center">
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
          <div className="mobile-nav-item">
            <p className="text-gray-400 text-sm font-bold font-clash pb-1">Join the experience!</p>
            <button className="w-full bg-[#EB0028] text-white font-clash font-bold py-8 text-4xl tracking-wider hover:bg-[#c00020] transition-colors uppercase">
              Book Now
            </button>
          </div>
        </div>

        {/* Footer Socials */}
        <div className="px-8 pb-8 flex items-center gap-6 mobile-nav-item">
          <a href="#" className="transition-colors hover:opacity-80">
            <Image
              src="/facebook.svg"
              alt="Facebook"
              width={20}
              height={20}
              className="w-5 h-5 text-white"
            />
          </a>
          <a href="#" className="transition-colors hover:opacity-80">
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
              className="w-5 h-5 text-white"
            />
          </a>
          <a href="#" className="transition-colors hover:opacity-80">
            <Image
              src="/twitter.svg"
              alt="X (Twitter)"
              width={20}
              height={20}
              className="w-5 h-5 text-white"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
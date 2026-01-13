"use client";

import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "ABOUT", href: "/#about" },
  { name: "SPEAKERS", href: "/#speakers" },
  { name: "JOURNEY", href: "/#journey" },
  { name: "TEAM", href: "/team" },
];

const mobileItems = [
  { id: "1", name: "ABOUT", href: "/#about" },
  { id: "2", name: "SPEAKERS", href: "/#speakers" },
  { id: "3", name: "CONTACT", href: "/#contact" },
  { id: "4", name: "TEAM", href: "/team" },
];

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const bookBtnRef = useRef<HTMLButtonElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);



  // Book Now Button Scroll Trigger
  useGSAP(() => {
    // Initial state: hidden
    gsap.set(bookContainerRef.current, { width: 0, opacity: 0, marginLeft: 0 });

    ScrollTrigger.create({
      trigger: document.body,
      start: "100vh top", // Start when 100vh (Hero) is scrolled out
      end: "bottom bottom",
      onEnter: () => {
        gsap.to(bookContainerRef.current, {
          width: "auto",
          opacity: 1,
          marginLeft: "2rem", // Create space
          duration: 0.5,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(bookContainerRef.current, {
          width: 0,
          opacity: 0,
          marginLeft: 0,
          duration: 0.5,
          ease: "power3.in"
        });
      }
    });
  }, []);

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

      // Hamburger Morph Animation (into X)
      gsap.to(line1Ref.current, {
        rotation: 45,
        y: 4.5,
        backgroundColor: "#ffffff",
        duration: 0.4,
        ease: "power2.inOut"
      });
      gsap.to(line2Ref.current, {
        rotation: -45,
        y: -4.5,
        backgroundColor: "#ffffff",
        duration: 0.4,
        ease: "power2.inOut"
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

      // Hamburger Morph Animation (back to lines)
      gsap.to(line1Ref.current, {
        rotation: 0,
        y: 0,
        backgroundColor: "#ffffff",
        duration: 0.4,
        ease: "power2.inOut"
      });
      gsap.to(line2Ref.current, {
        rotation: 0,
        y: 0,
        backgroundColor: "#ffffff",
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        id="navbar"
        className="w-full h-[70px] flex items-center justify-between px-6 md:px-24 md:pr-12 z-[120] fixed top-0 left-0 bg-black opacity-0 pointer-events-auto"
        ref={navRef}
      >
        {/* Logo */}
        {!isMenuOpen && (
          <div className="flex-shrink-0 flex items-center cursor-default select-none -mt-1">
            <Image
              src="/logo-white.png"
              alt="TEDxCUSAT Logo"
              width={180}
              height={40}
              className="object-contain h-9 w-auto"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Mobile Menu Trigger (Hamburger) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 w-9 h-9 focus:outline-none z-[120] relative"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span ref={line1Ref} className="block w-6 h-[3px] rounded-sm bg-white origin-center"></span>
          <span ref={line2Ref} className="block w-6 h-[3px] rounded-sm bg-white origin-center"></span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center mt-1 mr-10">
          <div className="flex items-center gap-12">
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

          {/* Book Now Button (appears on scroll) */}
          <div ref={bookContainerRef} className="overflow-hidden">
            <button
              ref={bookBtnRef}
              className="relative bg-[#EB0028] hover:bg-red-900 text-white font-clash font-normal text-[14px] leading-[100%] tracking-[-0.02em] py-4 px-8 transition-colors duration-300 z-[100] cursor-pointer whitespace-nowrap"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black z-[110] flex flex-col opacity-0 pointer-events-none"
      >

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
                <span className="font-clash font-light text-3xl text-white tracking-wide group-hover:text-[#EB0028] transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gray-800 my-8 mobile-nav-item"></div>

          {/* Bottom Section */}
          <div className="mobile-nav-item">
            <p className="text-gray-400 text-sm font-clash pb-1">Join the experience!</p>
            <button className="w-full bg-[#EB0028] text-white font-clash font-bold py-6 text-3xl tracking-wider hover:bg-[#c00020] transition-colors uppercase">
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
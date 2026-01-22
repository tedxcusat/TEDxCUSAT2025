"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";

const navLinks = [
  { name: "STORE", href: "/merch" },
  { name: "ABOUT", href: "/#about" },
  { name: "SPEAKERS", href: "/#speakers" },
  { name: "JOURNEY", href: "/#journey" },
  { name: "TEAM", href: "/team" },
];

const mobileItems = [
  { id: "1", name: "STORE", href: "/merch" },
  { id: "2", name: "ABOUT", href: "/#about" },
  { id: "3", name: "SPEAKERS", href: "/#speakers" },
  { id: "4", name: "CONTACT", href: "/#contact" },
  { id: "5", name: "TEAM", href: "/team" },
];

const Navbar = ({ startAnimation = true }: { startAnimation?: boolean }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBookBtn, setShowBookBtn] = useState(false);
  const { scrollY } = useScroll();

  if (pathname === "/team") return null;

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show button after scrolling past 80vh
    if (latest > window.innerHeight * 0.8 && !showBookBtn) {
      setShowBookBtn(true);
    } else if (latest <= window.innerHeight * 0.8 && showBookBtn) {
      setShowBookBtn(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // Mobile Menu Variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut", when: "beforeChildren" }
    }
  };

  const menuItemVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={startAnimation ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} // Delay for loader
        className="w-full h-[70px] flex items-center justify-between px-6 md:px-10 z-[120] fixed top-0 left-0 bg-black pointer-events-auto"
      >
        {/* Logo */}
        <AnimatePresence>
          {!isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-shrink-0 flex items-center cursor-default select-none -ml-8 md:ml-0"
            >
              <Image
                src="/logo-white.png"
                alt="TEDxCUSAT Logo"
                width={180}
                height={40}
                className="object-contain h-[32px] md:h-[40px]"
                priority
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Trigger (Hamburger) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 w-9 h-9 focus:outline-none z-[120] relative"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 4.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
            className="block w-6 h-[3px] rounded-sm bg-white origin-center"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -4.5, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
            className="block w-6 h-[3px] rounded-sm bg-white origin-center"
          />
        </motion.button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center mt-1 mr-10">
          <div className="flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-clash font-normal text-[14px] leading-[100%] tracking-[-0.02em] text-white hover:text-[#EB0028] transition-colors cursor-pointer py-4"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Book Now Button (appears on scroll) */}
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={showBookBtn ? { width: "auto", opacity: 1, marginLeft: "2rem" } : { width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Link href="/tickets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-[#EB0028] hover:bg-[#B71C1C] text-white font-clash font-normal text-[14px] leading-[100%] tracking-[-0.02em] py-4 px-8 transition-colors duration-300 z-[100] cursor-pointer whitespace-nowrap"
              >
                BOOK NOW
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black z-[110] flex flex-col pointer-events-auto"
          >
            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="space-y-8">
                {mobileItems.map((item, i) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-6 group"
                  >
                    <motion.div
                      custom={i}
                      variants={menuItemVariants}
                      className="bg-[#EB0028] text-white font-clash text-sm w-8 h-8 flex items-center justify-center"
                    >
                      {item.id}
                    </motion.div>
                    <motion.span
                      custom={i}
                      variants={menuItemVariants}
                      className="font-clash font-light text-3xl text-white tracking-wide group-hover:text-[#EB0028] transition-colors"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
              </div>

              <motion.div
                variants={menuItemVariants}
                custom={4}
                className="w-full h-[1px] bg-gray-800 my-8"
              />

              {/* Bottom Section */}
              <motion.div variants={menuItemVariants} custom={5}>
                <p className="text-gray-400 text-sm font-clash pb-1">Join the experience!</p>
                <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#EB0028] text-white font-clash font-bold py-6 text-3xl tracking-wider hover:bg-[#c00020] transition-colors uppercase"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Footer Socials */}
            <motion.div variants={menuItemVariants} custom={6} className="px-8 pb-8 flex items-center gap-6">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
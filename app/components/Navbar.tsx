import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SPEAKERS", href: "/speakers" },
  { name: "STORIES", href: "/stories" },
];

const Navbar = () => {
  return (
    <nav className="w-full h-[80px] flex items-center justify-between px-8 md:px-16 z-50 fixed top-0 left-0 bg-transparent">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <Link href="/">
          <Image
            src="/logo-white.svg"
            alt="TEDxCUSAT Logo"
            width={180}
            height={40}
            className="object-contain h-8 w-auto" 
            priority
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-12 mt-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="font-clash font-normal text-[14px] leading-[100%] tracking-[-0.02em] text-white hover:opacity-80 transition-opacity" 
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button - Placeholder */}
      <div className="md:hidden">
        {/* We can add a hamburger menu here if needed */}
        <button className="text-white">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;

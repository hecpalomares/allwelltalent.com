'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'For Companies', href: '/companies' },
  { label: 'For Talent', href: '/talent' },
  { label: 'Methodology', href: '/#methodology' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-neutral-200 py-4' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          onClick={handleNavClick}
          className="font-bold text-2xl md:text-3xl tracking-tighter text-black"
        >
          ALL WELL<span className="text-[var(--accent-color)]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className={`text-base font-bold hover:text-[var(--accent-color)] hover:scale-105 transition-all tracking-wide uppercase cursor-pointer ${
                pathname === item.href ? 'text-[var(--accent-color)]' : 'text-neutral-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/companies"
            onClick={handleNavClick}
            className="bg-black text-white px-6 py-3 text-base font-bold hover:bg-[var(--accent-color)] hover:text-black transition-colors active:scale-95 cursor-pointer"
          >
            Hire Engineers
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-white z-50 flex flex-col overflow-y-auto animate-in fade-in duration-200">
          <div className="p-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="text-3xl font-bold text-black hover:text-[var(--accent-color)] py-4 border-b border-neutral-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/companies"
              onClick={handleNavClick}
              className="bg-black text-white w-full py-6 text-xl font-bold mt-4 active:scale-95 transition-transform text-center block"
            >
              Hire Engineers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

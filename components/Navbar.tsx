"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from "@/components/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`sticky top-0 left-0 w-full z-[999] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-gray-800 shadow-xl py-4' 
          : 'bg-black border-transparent py-6'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex justify-between items-center text-white">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group relative z-50">
          <Image 
            src="/logo.png?v=4" 
            alt="Darnera" 
            width={600} 
            height={150} 
            priority
            unoptimized={true} 
            className="w-[160px] md:w-[260px] h-auto object-contain group-hover:opacity-80 transition-opacity duration-300" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-10">
          <Link href="/" className="text-[11px] tracking-[0.2em] text-gray-300 font-medium relative group py-2">
            <span className="group-hover:text-[#d4af37] transition-colors duration-300">HOME</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <div className="relative group py-2">
            <Link href="/collection" className="text-[11px] tracking-[0.2em] text-gray-300 font-medium flex items-center gap-1.5 group-hover:text-[#d4af37] transition-colors duration-300">
              COLLECTION 
              <span className="text-[8px] transition-transform duration-300 group-hover:rotate-180">▼</span>
            </Link>
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out z-50">
              <div className="bg-[#050505]/95 backdrop-blur-xl border border-gray-900 rounded-sm p-2 flex flex-col min-w-[180px] shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
                <Link href="/collection?category=him" className="group/link relative flex items-center justify-center px-4 py-4 rounded-sm">
                  <span className="text-[10px] tracking-[0.25em] text-gray-400 group-hover/link:text-[#d4af37] transition-colors duration-300 z-10">FOR HIM</span>
                </Link>
                <div className="w-8 h-[1px] bg-gray-800 mx-auto"></div>
                <Link href="/collection?category=her" className="group/link relative flex items-center justify-center px-4 py-4 rounded-sm">
                  <span className="text-[10px] tracking-[0.25em] text-gray-400 group-hover/link:text-[#d4af37] transition-colors duration-300 z-10">FOR HER</span>
                </Link>
                <div className="w-8 h-[1px] bg-gray-800 mx-auto"></div>
                <Link href="/collection?category=unisex" className="group/link relative flex items-center justify-center px-4 py-4 rounded-sm">
                  <span className="text-[10px] tracking-[0.25em] text-gray-400 group-hover/link:text-[#d4af37] transition-colors duration-300 z-10">UNISEX</span>
                </Link>
              </div>
            </div>
          </div>

          <Link href="#" className="text-[11px] tracking-[0.2em] text-gray-300 font-medium relative group py-2">
            <span className="group-hover:text-[#d4af37] transition-colors duration-300">ABOUT US</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Desktop Right Actions: Hi Rohit & Cart */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/account" className="flex items-center gap-2 text-gray-300 hover:text-[#d4af37] transition-all duration-300 group py-1.5 px-3.5 border border-gray-800 hover:border-[#d4af37]/60 rounded-sm bg-[#060606] shadow-sm">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            <span className="text-xs tracking-wider font-medium text-[#d4af37]">Hi Rohit</span>
          </Link>

          <button 
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer text-gray-400 hover:text-[#d4af37] transition-all duration-300 group hover:scale-110 p-1"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
            <span className="absolute -top-1 -right-2 bg-[#d4af37] text-black text-[9px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center border border-black shadow-sm">
              {totalItems}
            </span>
          </button>
        </div>

        {/* Mobile Right Actions: Cart & Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer text-gray-300 hover:text-[#d4af37] p-1"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>
            <span className="absolute -top-1 -right-2 bg-[#d4af37] text-black text-[9px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
              {totalItems}
            </span>
          </button>

          <button 
            className="text-[#d4af37] z-50 p-1.5 cursor-pointer focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Slide-over Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-[85%] max-w-sm h-full bg-[#080808] border-l border-gray-800 p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            
            {/* Top Header with Close Button */}
            <div>
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-900">
                <span className="text-xs tracking-[0.25em] text-[#d4af37] uppercase font-semibold">MENU</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-black border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm tracking-[0.2em] text-gray-200 hover:text-[#d4af37] uppercase font-serif"
                >
                  Home
                </Link>
                <div className="space-y-3 pt-2">
                  <Link 
                    href="/collection" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm tracking-[0.2em] text-gray-200 hover:text-[#d4af37] uppercase font-serif"
                  >
                    Collection
                  </Link>
                  <div className="pl-4 space-y-2.5 border-l border-gray-800 text-xs tracking-widest text-gray-400">
                    <Link href="/collection?category=him" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#d4af37] uppercase">For Him</Link>
                    <Link href="/collection?category=her" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#d4af37] uppercase">For Her</Link>
                    <Link href="/collection?category=unisex" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#d4af37] uppercase">Unisex</Link>
                  </div>
                </div>
                <Link 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm tracking-[0.2em] text-gray-200 hover:text-[#d4af37] uppercase font-serif pt-2"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Bottom Section: Account / Login / Signup */}
            <div className="pt-8 border-t border-gray-900 space-y-4">
              <Link 
                href="/account" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#111] border border-[#d4af37]/40 py-3.5 px-4 rounded-sm text-xs tracking-widest text-[#d4af37] uppercase font-semibold shadow-md"
              >
                <span>Hi Rohit (Account)</span>
              </Link>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link 
                  href="/account" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-black border border-gray-800 text-gray-300 text-[10px] tracking-widest uppercase hover:border-[#d4af37]"
                >
                  Login
                </Link>
                <Link 
                  href="/account" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-[#d4af37] text-black font-bold text-[10px] tracking-widest uppercase hover:bg-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
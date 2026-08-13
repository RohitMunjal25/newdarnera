"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { useCart } from "@/components/context/CartContext";

export default function Navbar() { 
  const router = useRouter(), 
        { totalItems, setIsOpen } = useCart(), 
        { isLoggedIn, openAuth } = useAuth(); 
        
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8dfd6] bg-[#fffdfa]/95 px-5 py-3 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LOGO & BRAND NAME FIX */}
        <Link href="/" className="flex items-center gap-1.5 md:gap-2 group">
          <Image 
            src="/logo.png?v=3" 
            alt="Darnera Logo" 
            width={45} 
            height={45} 
            unoptimized={true} 
            className="h-8 w-auto md:h-10 object-contain transition-transform duration-500 group-hover:scale-105" 
          />
          <span className="font-serif text-lg md:text-xl tracking-[0.3em] text-[#4a3b32] uppercase">
            Darnera
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 text-[11px] font-medium tracking-[.16em] text-[#66594f] lg:flex">
          <Link href="/" className="hover:text-[#b88962] transition-colors">HOME</Link>
          <Link href="/collection" className="hover:text-[#b88962] transition-colors">COLLECTION</Link>
          <Link href="/collection?category=him" className="hover:text-[#b88962] transition-colors">FOR HIM</Link>
          <Link href="/collection?category=her" className="hover:text-[#b88962] transition-colors">FOR HER</Link>
          <Link href="/discovery-packs" className="hover:text-[#b88962] transition-colors">DISCOVERY PACKS</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button aria-label="Search collection" onClick={() => router.push("/collection")} className="grid h-10 w-10 place-items-center rounded-full text-[#57463a] transition-colors hover:bg-[#f0e7dc]">
            <Icon type="search" />
          </button>
          <button aria-label="Your account" onClick={() => isLoggedIn ? router.push("/account") : openAuth("login")} className="grid h-10 w-10 place-items-center rounded-full text-[#57463a] transition-colors hover:bg-[#f0e7dc]">
            <Icon type="user" />
          </button>
          <button aria-label="Open bag" onClick={() => setIsOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full bg-[#312820] text-white transition-transform hover:scale-105">
            <Icon type="bag" />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-[#fffdfa] bg-[#b88962] text-[9px] font-bold shadow-sm">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </nav>
  ); 
}

function Icon({ type }: { type: "search" | "user" | "bag" }) { 
  const paths = type === "search" ? 
    <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></> : 
    type === "user" ? 
    <><circle cx="12" cy="8" r="3.5"/><path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6"/></> : 
    <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>; 
    
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">{paths}</svg>; 
}

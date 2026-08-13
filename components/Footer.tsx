"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Footer() { 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 

  async function subscribe(event: FormEvent) { 
    event.preventDefault(); 
    try { 
      await api("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) }); 
      setEmail(""); 
      setMessage("You’re on the list."); 
    } catch (err) { 
      setMessage(err instanceof Error ? err.message : "Please try again."); 
    } 
  } 

  return (
    <footer className="bg-[#241c16] px-5 py-16 text-[#f5eee7] md:px-12 border-t border-[#3d3228]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-4 md:grid-cols-2">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="font-serif text-3xl tracking-[.25em] text-[#f5eee7]">DARNERA</h2>
          <p className="text-xs font-semibold tracking-[.2em] text-[#d9ad88] uppercase">The Scent of Authority</p>
          <p className="text-sm leading-relaxed text-[#cfc0b1]">
            Fragrances made for the moments you want to keep close. Crafted with passion, inspired by excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[10px] font-bold tracking-[.25em] text-[#d9ad88] uppercase">DISCOVER</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-[#ddd1c5]">
            <Link href="/collection" className="transition hover:text-white">All fragrances</Link>
            <Link href="/collection?category=him" className="transition hover:text-white">For him</Link>
            <Link href="/collection?category=her" className="transition hover:text-white">For her</Link>
            <Link href="/discovery-packs" className="transition hover:text-white">Discovery Packs</Link>
          </div>
        </div>

        {/* Company & About */}
        <div>
          <p className="text-[10px] font-bold tracking-[.25em] text-[#d9ad88] uppercase">THE HOUSE</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-[#ddd1c5]">
            <Link href="/about" className="transition hover:text-white">About Us</Link>
            <Link href="/contact" className="transition hover:text-white">Contact & Location</Link>
            <Link href="/account/orders" className="transition hover:text-white">Track Order</Link>
          </div>
          <div className="mt-4 text-xs text-[#b8a99a] space-y-1">
            <p>📧 darneragragnance@gmail.com</p>
            </div>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-[10px] font-bold tracking-[.25em] text-[#d9ad88] uppercase">STAY IN THE LOOP</p>
          <p className="mt-4 text-sm text-[#ddd1c5]">New releases, private offers and scent stories—sent sparingly.</p>
          <form onSubmit={subscribe} className="mt-4 flex rounded-xl bg-[#fffaf3] p-1 shadow-sm">
            <input 
              required 
              type="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#332820] outline-none" 
              placeholder="Your email address" 
            />
            <button className="rounded-lg bg-[#b48261] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#9d6e4f]">
              Join
            </button>
          </form>
          {message && <p className="mt-2 text-xs text-[#d9c6b5]">{message}</p>}
        </div>

      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#b8a99a]">
        <p>© 2026 Darnera. All rights reserved. Made with intention.</p>
        <p className="font-serif tracking-wider text-[#d9ad88]">SCENT OF AUTHORITY</p>
      </div>
    </footer>
  ); 
}
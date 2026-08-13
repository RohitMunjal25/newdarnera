"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/context/CartContext";

type Scent = { id: number; name: string; note: string; price: number; image: string; description: string };

const scents: Scent[] = [
  { id: 1, name: "Eidolon", note: "White oud · amber", price: 2999, image: "/perfume/eidolon.png", description: "A luminous white oud anchored by warm amber and polished woods. Built to stay close, then quietly take over the room." }, 
  { id: 2, name: "Obsidian", note: "Dark musk · leather", price: 2999, image: "/perfume/obsidian.png", description: "Dark musk, soft leather and a peppered mineral edge. A deeper scent for an after-dark kind of presence." }, 
  { id: 3, name: "Nyra", note: "Rose · soft woods", price: 1799, image: "/perfume/nyra.png", description: "A petal-soft floral that settles into creamy woods. Modern, graceful and made for a little everyday ceremony." }
];

export default function WatchAndBuy() { 
  const { addToCart } = useCart(); 
  const [selected, setSelected] = useState<Scent | null>(null); 
  const video = useRef<HTMLVideoElement>(null); 

  useEffect(() => { 
    document.body.style.overflow = selected ? "hidden" : ""; 
    return () => { document.body.style.overflow = ""; }; 
  }, [selected]); 

  function add(scent: Scent) { 
    addToCart({ id: scent.id, name: scent.name, subtitle: scent.note, price: scent.price, image: scent.image }); 
  } 

  return (
    <section className="bg-[#1f2622] px-5 py-24 text-[#fffaf3] md:px-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Centered Header */}
        <div className="mb-16 text-center">
          <p className="text-[10px] font-bold tracking-[.3em] text-[#e3bd91]">WATCH & BUY</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Find your <i className="text-[#e6c39a]">signature trail.</i>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#b5c2b0]">
            Tap a bottle to enter its world. Watch the ritual, read the notes, and bring it to your bag.
          </p>
        </div>

        {/* 3-Column Spaced Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {scents.map((scent) => (
            <button 
              key={scent.id} 
              onClick={() => setSelected(scent)} 
              className="group text-left transition duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a362f] to-[#1f2622] shadow-xl">
                <Image 
                  src={scent.image} 
                  alt={scent.name} 
                  fill 
                  className="object-contain p-10 transition duration-700 group-hover:scale-110" 
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/30" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition duration-500 group-hover:bg-white group-hover:text-[#1f2622]">
                  ▶
                </span>
              </div>
              
              <div className="mt-6 px-2">
                <p className="text-[10px] font-semibold tracking-[.2em] text-[#e3bd91]">
                  {scent.note.toUpperCase()}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white">{scent.name}</h3>
                  <p className="text-sm font-medium text-[#b5c2b0]">₹ {scent.price.toLocaleString()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Popup remains mostly the same, just keeping it consistent */}
      {selected && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[#111513]/90 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#fffaf3] shadow-2xl lg:grid-cols-[1.2fr_.8fr] lg:overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => { video.current?.pause(); setSelected(null); }} 
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/10 text-xl text-[#47382d] backdrop-blur-md transition hover:bg-black/20"
            >
              ×
            </button>
            
            <div className="min-h-[340px] bg-[#1a201c] p-4 lg:min-h-[600px]">
              <video 
                ref={video} 
                src="/perfume/video.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="h-full w-full rounded-2xl object-cover" 
              />
            </div>
            
            <div className="flex flex-col p-8 md:p-12">
              <p className="text-[10px] font-bold tracking-[.24em] text-[#a7785b]">WATCH THE SCENT FILM</p>
              <h3 className="mt-3 font-serif text-4xl text-[#342b24]">{selected.name}</h3>
              <p className="mt-2 text-xs tracking-[.15em] text-[#8d7160]">{selected.note.toUpperCase()}</p>
              
              <div className="my-8 h-px bg-[#e8dfd6]" />
              
              <p className="text-sm leading-7 text-[#66584e]">{selected.description}</p>
              
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#d2c3b5] bg-transparent px-4 py-1.5 text-[9px] font-bold tracking-widest text-[#796b60]">EXTRAIT DE PARFUM</span>
                <span className="rounded-full border border-[#d2c3b5] bg-transparent px-4 py-1.5 text-[9px] font-bold tracking-widest text-[#796b60]">LONG LASTING</span>
              </div>
              
              <div className="mt-auto pt-10">
                <div className="mb-5 flex items-end justify-between">
                  <span className="text-xs font-semibold text-[#8c7564]">50 ML</span>
                  <strong className="font-serif text-3xl text-[#342b24]">₹ {selected.price.toLocaleString()}</strong>
                </div>
                <button 
                  onClick={() => add(selected)} 
                  className="w-full rounded-xl bg-[#242b27] py-4 text-xs font-bold tracking-[.15em] text-white transition hover:bg-[#1f2622]"
                >
                  ADD TO BAG
                </button>
                <p className="mt-4 text-center text-[9px] tracking-wider text-[#8f7c6d]">
                  COMPLIMENTARY SHIPPING · SECURE CHECKOUT
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  ); 
}
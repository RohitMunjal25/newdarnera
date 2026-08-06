"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";

const collection = [
  { 
    id: 1, 
    name: "EIDOLON", 
    subtitle: "WHITE OUD", 
    price: 2999, 
    image: "/perfume/eidolon.png", 
    hoverImage: "/perfume/aeris.png",
    reviews: 128 
  },
  { 
    id: 2, 
    name: "NYRA", 
    subtitle: "FLORAL ELEGANCE", 
    price: 1799, 
    image: "/perfume/nyra.png", 
    hoverImage: "/perfume/veldrift.png",
    reviews: 94 
  },
  { 
    id: 3, 
    name: "OBSIDIAN", 
    subtitle: "DARK MUSK", 
    price: 2999, 
    image: "/perfume/obsidian.png", 
    hoverImage: "/perfume/verdelune.png",
    reviews: 112 
  },
  { 
    id: 4, 
    name: "SOLVERIN", 
    subtitle: "SPICED LEATHER", 
    price: 2199, 
    image: "/perfume/solverin.png", 
    hoverImage: "/perfume/eidolon.png",
    reviews: 85 
  }
];

export default function FeaturedCollection() {
  const { addToCart } = useCart();

  return (
    <section className="bg-black py-20 px-6 md:px-12 border-b border-gray-900/80 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[400px] bg-[#d4af37] opacity-[0.015] blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[#d4af37] text-xs">✦</span>
              <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#d4af37]/60"></div>
              <span className="text-gray-400 text-[10px] tracking-[0.35em] uppercase font-medium">CURATED SELECTION</span>
              <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#d4af37]/60"></div>
              <span className="text-[#d4af37]">✦</span>
            </div>
            
            <h2 className="text-white text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase mb-3">
              FEATURED COLLECTION
            </h2>
            
            <p className="text-gray-400 text-xs tracking-[0.15em] font-light max-w-lg">
              Exquisite fragrances crafted for those who appreciate the finest things in life.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {collection.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col bg-[#060606] rounded-sm border border-gray-900 hover:border-[#d4af37]/50 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] text-left"
            >
              
              <button 
                onClick={() => addToCart({ id: item.id, name: item.name, subtitle: item.subtitle, price: item.price, image: item.image })}
                className="absolute top-4 right-4 z-35 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-gray-800 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-md cursor-pointer"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
              </button>

              <Link href={`/product/${item.id}`} className="w-full relative aspect-[4/5] bg-[#030303] overflow-hidden border-b border-gray-900/60 block cursor-pointer">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover p-3 absolute inset-0 z-20 group-hover:opacity-0 transition-opacity duration-700 ease-in-out" 
                />
                <Image 
                  src={item.hoverImage} 
                  alt={`${item.name} alternate`} 
                  fill 
                  className="object-cover p-3 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-in-out z-10" 
                />
              </Link>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-[#d4af37] text-[9px] tracking-[0.3em] uppercase mb-1.5 font-medium">
                    {item.subtitle}
                  </p>
                  
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-white font-serif tracking-[0.15em] text-xl mb-3 uppercase group-hover:text-[#d4af37] transition-colors duration-300">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#d4af37] text-xs tracking-widest">★★★★★</span>
                    <span className="text-gray-500 text-[10px] tracking-wider">({item.reviews})</span>
                  </div>

                  <p className="text-white font-serif text-xl tracking-wide mb-6">
                    ₹ {item.price.toLocaleString()}
                  </p>
                </div>

                <Link href={`/product/${item.id}`} className="w-full relative overflow-hidden flex items-center justify-between border border-gray-800 group-hover:border-[#d4af37] bg-[#080808] px-5 py-3.5 text-[10px] font-semibold tracking-[0.25em] transition-colors duration-500 rounded-sm">
                  <span className="absolute inset-0 bg-[#d4af37] w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></span>
                  <span className="relative z-10 text-gray-300 group-hover:text-black transition-colors duration-300 uppercase">VIEW DETAIL</span>
                  <span className="relative z-10 text-gray-300 group-hover:text-black transition-colors duration-300 transform group-hover:translate-x-1.5">→</span>
                </Link>

              </div>

            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[#d4af37] text-xs mb-2 tracking-widest">✦ ✦ ✦</div>
          <Link href="/collection">
            <button className="border border-[#d4af37]/60 bg-black text-[#d4af37] text-[10px] tracking-[0.35em] px-12 py-4 uppercase font-semibold rounded-sm transition-all duration-300 hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              DISCOVER ALL COLLECTIONS
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
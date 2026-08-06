"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy Database (Admin API will replace this)
const allProducts = [
  { id: 1, name: "EIDOLON", category: "unisex", desc: "White Oud", price: "₹ 2,999", image: "/perfume/eidolon.png", hoverImage: "/perfume/aeris.png", badge: "BEST SELLER" },
  { id: 2, name: "NYRA", category: "her", desc: "Floral Elegance", price: "₹ 1,799", image: "/perfume/nyra.png", hoverImage: "/perfume/veldrift.png" },
  { id: 3, name: "OBSIDIAN", category: "him", desc: "Dark Musk", price: "₹ 2,999", image: "/perfume/obsidian.png", hoverImage: "/perfume/verdelune.png", badge: "LIMITED" },
  { id: 4, name: "SOLVERIN", category: "him", desc: "Spiced Leather", price: "₹ 2,199", image: "/perfume/solverin.png", hoverImage: "/perfume/aeris.png" },
  { id: 5, name: "AERIS", category: "unisex", desc: "Fresh Breeze", price: "₹ 2,499", image: "/perfume/aeris.png", hoverImage: "/perfume/eidolon.png" },
  { id: 6, name: "VELDRIFT", category: "her", desc: "Velvet Warmth", price: "₹ 2,699", image: "/perfume/veldrift.png", hoverImage: "/perfume/nyra.png" },
  { id: 7, name: "VERDELUNE", category: "unisex", desc: "Botanical Mystery", price: "₹ 2,599", image: "/perfume/verdelune.png", hoverImage: "/perfume/obsidian.png" }
];

// Inner component that handles searchParams logic
function CollectionContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category"); // reads ?category=him

  const [activeFilter, setActiveFilter] = useState("all");

  // Sync URL parameter with active filter state when page loads or URL changes
  useEffect(() => {
    if (categoryQuery && ["him", "her", "unisex"].includes(categoryQuery)) {
      setActiveFilter(categoryQuery);
    } else {
      setActiveFilter("all");
    }
  }, [categoryQuery]);

  // Filter Logic
  const filteredProducts = activeFilter === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeFilter);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] text-white uppercase mb-4">
          THE <span className="text-[#d4af37] italic">COLLECTION</span>
        </h1>
        <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.3em] uppercase max-w-2xl mx-auto">
          Explore our complete range of meticulously crafted fragrances.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-5xl mx-auto px-6 mb-16 flex flex-wrap justify-center gap-8 md:gap-16 border-b border-gray-900 pb-6">
        {[
          { label: "ALL SCENTS", value: "all" },
          { label: "FOR HIM", value: "him" },
          { label: "FOR HER", value: "her" },
          { label: "UNISEX", value: "unisex" }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`text-[10px] md:text-xs tracking-[0.2em] uppercase relative pb-2 transition-colors duration-300 ${
              activeFilter === tab.value ? "text-[#d4af37]" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeFilter === tab.value && (
              <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#d4af37]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-32 min-h-[50vh]">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {filteredProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="flex flex-col items-center group cursor-pointer animate-fade-in">
                
                <div className="w-full relative aspect-[4/5] bg-[#050505] mb-6 overflow-hidden border border-gray-800 group-hover:border-[#d4af37]/40 transition-colors duration-500 shadow-xl">
                  {item.badge && (
                    <div className="absolute top-4 left-4 z-30 bg-black text-[#d4af37] text-[8px] tracking-[0.2em] px-3 py-1.5 border border-[#d4af37]/50 uppercase">
                      {item.badge}
                    </div>
                  )}
                  <Image src={item.image} alt={item.name} fill className="object-cover p-2 absolute inset-0 z-20 group-hover:opacity-0 transition-opacity duration-700 ease-in-out" />
                  <Image src={item.hoverImage} alt={`${item.name} alternate`} fill className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s] ease-in-out z-10" />
                </div>
                
                <div className="text-center w-full px-2 flex flex-col items-center">
                  <h3 className="text-white font-serif tracking-[0.2em] text-lg mb-1 group-hover:text-[#d4af37] transition-colors duration-300 uppercase">{item.name}</h3>
                  <p className="text-gray-500 text-[10px] tracking-[0.2em] mb-4 uppercase">{item.desc}</p>
                  <p className="text-[#d4af37] text-sm font-medium tracking-widest mb-6">{item.price}</p>
                  
                  <div className="relative overflow-hidden flex items-center justify-center gap-3 border border-gray-800 group-hover:border-[#d4af37] text-gray-400 group-hover:text-black bg-transparent px-8 py-3 text-[10px] font-semibold tracking-[0.25em] transition-all duration-500 w-full max-w-[220px]">
                    <span className="absolute inset-0 bg-[#d4af37] w-0 group-hover:w-full transition-all duration-500 ease-out -z-10"></span>
                    <span className="relative z-10">VIEW DETAIL</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-xs tracking-widest uppercase">
            No products found in this category.
          </div>
        )}
      </div>
    </>
  );
}

// Next.js requires components utilizing useSearchParams to be wrapped in a Suspense boundary
export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#d4af37] tracking-widest text-xs">LOADING COLLECTION...</div>}>
        <CollectionContent />
      </Suspense>
      <Footer />
    </main>
  );
}
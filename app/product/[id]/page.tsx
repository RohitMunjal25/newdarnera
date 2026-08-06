"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy data for the specific product
const getProduct = (id: string) => {
  return { 
    id, 
    name: "EIDOLON", 
    subtitle: "EXTRAIT DE PARFUM",
    price: "₹ 2,999", 
    images: [
      "/perfume/eidolon.png",
      "/perfume/aeris.png", 
      "/perfume/veldrift.png",
      "/perfume/verdelune.png"
    ],
    desc: "A masterpiece of contrast where rare White Oud meets warm woods and smoky depth. Bold. Refined. Unforgettable. Crafted for those who leave a mark.",
    notes: { top: "Saffron, Nutmeg", heart: "White Oud, Rose", base: "Leather, Dark Amber" },
    reviews: 128
  };
};

const relatedProducts = [
  { id: 2, name: "NYRA", desc: "FLORAL ELEGANCE", price: "₹ 1,799", image: "/perfume/nyra.png" },
  { id: 3, name: "OBSIDIAN VEIL", desc: "DARK MUSK", price: "₹ 2,999", image: "/perfume/obsidian.png" },
  { id: 4, name: "SOLVÉRIN", desc: "SWEET FLORAL", price: "₹ 2,199", image: "/perfume/solverin.png" }
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProduct(resolvedParams.id);
  
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState('notes');
  
  // Naye States for Image Zoom and Fullscreen
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Background scroll roko jab modal open ho
  useEffect(() => {
    if (isFullscreen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFullscreen]);

  // Mouse Move Handler for Dynamic Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white">
      <Navbar />
      
      {/* --- FULLSCREEN LIGHTBOX MODAL --- */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-10 animate-fade-in">
          
          <button 
            onClick={() => setIsFullscreen(false)} 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-500 hover:text-white transition-colors z-50 p-2 bg-black/50 border border-gray-800 rounded-sm"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="relative w-full max-w-5xl h-[70vh] md:h-[85vh] flex items-center justify-center">
            <Image 
              src={selectedImage} 
              alt={product.name} 
              fill 
              className="object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.15)]" 
            />
          </div>

          <div className="absolute bottom-10 flex gap-4 z-50">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-20 border transition-all duration-300 ${selectedImage === img ? 'border-[#d4af37] scale-110' : 'border-gray-800 opacity-50 hover:opacity-100'}`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PRODUCT MAIN SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column - Image Gallery */}
        <div className="flex flex-col gap-4">
          
          {/* Main Image with Zoom & Fullscreen Feature */}
          <div 
            className="relative aspect-[4/3] bg-[#050505] border border-gray-800 rounded-sm flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setIsFullscreen(true)}
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Standard Image (hides when hovering for zoom) */}
            <Image 
              src={selectedImage} 
              alt={product.name} 
              fill 
              className={`object-contain p-6 transition-opacity duration-300 z-10 ${isZoomed ? 'opacity-0' : 'opacity-100'}`} 
            />

            {/* Magnified Zoom Image (shows on hover) */}
            <div 
              className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundSize: '200%', // Adjust this for more/less zoom (e.g., 250%)
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Tap to expand hint */}
            <div className={`absolute bottom-4 right-4 z-30 bg-black/60 backdrop-blur-sm border border-gray-800 text-[9px] tracking-widest text-gray-400 px-3 py-1.5 transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
              <span className="flex items-center gap-2">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                ENLARGE
              </span>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-white px-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div className="flex-1 grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[4/5] bg-[#050505] rounded-sm transition-all duration-300 ${
                    selectedImage === img ? 'border border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'border border-gray-800 opacity-60 hover:opacity-100 hover:border-gray-600'
                  }`}
                >
                  <Image src={img} alt={`${product.name} angle ${index + 1}`} fill className="object-cover p-1" />
                </button>
              ))}
            </div>

            <button className="text-gray-500 hover:text-white px-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Right Column - Product Data */}
        <div className="flex flex-col justify-center">
          
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-500 mb-6 uppercase">
            <Link href="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-[#d4af37] transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-[#d4af37]">{product.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-white mb-3">
            {product.name}
          </h1>
          <p className="text-[#d4af37] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {product.subtitle}
          </p>

          <div className="flex items-center gap-3 w-64 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/60"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]"></div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/60"></div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#d4af37] text-sm tracking-widest">★★★★★</span>
            <span className="text-gray-400 text-xs">({product.reviews} Reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-serif text-white">{product.price}</span>
            <span className="text-xs text-gray-500">Tax included.</span>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 max-w-xl">
            {product.desc}
          </p>

          <div className="grid grid-cols-3 gap-2 border border-gray-800 rounded-sm bg-[#050505] p-4 mb-8">
            <div className="flex flex-col items-center text-center gap-2 border-r border-gray-800 px-2">
              <svg width="20" height="20" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="text-[#d4af37] text-[9px] tracking-widest font-semibold">LONG LASTING</p>
                <p className="text-gray-500 text-[10px]">10+ Hours</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 border-r border-gray-800 px-2">
              <svg width="20" height="20" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              <div>
                <p className="text-[#d4af37] text-[9px] tracking-widest font-semibold">PREMIUM</p>
                <p className="text-gray-500 text-[10px]">INGREDIENTS</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 px-2">
              <svg width="20" height="20" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              <div>
                <p className="text-[#d4af37] text-[9px] tracking-widest font-semibold">UNISEX</p>
                <p className="text-gray-500 text-[10px]">FRAGRANCE</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            <button className="w-full flex items-center justify-center gap-3 border border-[#d4af37] bg-black text-[#d4af37] font-semibold text-xs tracking-widest py-3.5 hover:bg-[#d4af37]/5 transition-colors duration-300 rounded-sm">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
              ADD TO CART
            </button>
            <button className="w-full bg-[#dca842] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm">
              BUY IT NOW
            </button>
          </div>

          <div className="bg-[#050505] border border-gray-900 rounded-sm p-6">
            <div className="flex gap-8 mb-6 border-b border-gray-800 pb-2">
              <button 
                onClick={() => setActiveTab('notes')}
                className={`text-[10px] tracking-widest uppercase font-semibold pb-2 relative transition-colors ${activeTab === 'notes' ? 'text-[#d4af37]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Fragrance Notes
                {activeTab === 'notes' && <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#dca842]"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`text-[10px] tracking-widest uppercase font-semibold pb-2 relative transition-colors ${activeTab === 'details' ? 'text-[#d4af37]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Shipping & Returns
                {activeTab === 'details' && <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#dca842]"></span>}
              </button>
            </div>

            <div className="min-h-[120px]">
              {activeTab === 'notes' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-gray-900 pb-3">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                      <span className="text-[10px] text-gray-300 tracking-widest uppercase">Top Notes</span>
                    </div>
                    <span className="text-xs text-gray-400">{product.notes.top}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-900 pb-3">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                      <span className="text-[10px] text-gray-300 tracking-widest uppercase">Heart Notes</span>
                    </div>
                    <span className="text-xs text-gray-400">{product.notes.heart}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" className="text-[#d4af37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      <span className="text-[10px] text-gray-300 tracking-widest uppercase">Base Notes</span>
                    </div>
                    <span className="text-xs text-gray-400">{product.notes.base}</span>
                  </div>
                </div>
              )}
              {activeTab === 'details' && (
                <div className="text-xs text-gray-400 tracking-wider leading-relaxed animate-fade-in space-y-3">
                  <p><strong className="text-gray-200">Free Shipping:</strong> On all orders above ₹2,000.</p>
                  <p><strong className="text-gray-200">Returns:</strong> We accept returns within 7 days of delivery for unused products in original packaging.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- OTHER COLLECTIONS / YOU MAY ALSO LIKE --- */}
      <section className="bg-black py-20 px-6 border-t border-gray-900">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-center gap-4 mb-16">
              <span className="text-[#d4af37]">✧</span>
              <div className="h-[1px] w-8 bg-[#d4af37]/60"></div>
              <h2 className="text-white text-xl md:text-2xl font-serif tracking-widest uppercase">YOU MAY ALSO LIKE</h2>
              <div className="h-[1px] w-8 bg-[#d4af37]/60"></div>
              <span className="text-[#d4af37]">✧</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="flex flex-col group cursor-pointer bg-[#070707] border border-gray-900 rounded-sm hover:border-gray-700 transition-colors">
                
                <div className="w-full relative aspect-[4/3] bg-black overflow-hidden border-b border-gray-900">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  />
                </div>
                
                <div className="p-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-serif tracking-wider text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-[10px] tracking-widest mb-3 uppercase">{item.desc}</p>
                    <p className="text-[#d4af37] text-sm font-semibold tracking-widest">{item.price}</p>
                  </div>
                  
                  <button className="border border-[#d4af37] p-2.5 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors rounded-sm">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/components/context/CartContext";
import { useRouter } from "next/navigation";

type PerfumeItem = {
  id: number;
  title: string;
  subtitle: string;
  price50: number;
  price100: number;
  price50Str: string;
  price100Str: string;
  image: string;
  videoUrl: string;
  reviews: number;
  description: string;
  tags: string[];
};

const items: PerfumeItem[] = [
  {
    id: 1, title: "EIDOLON WHITE OUD", subtitle: "EXTRAIT DE PARFUM", price50: 2999, price100: 5499, price50Str: "₹ 2,999", price100Str: "₹ 5,499",
    image: "/perfume/eidolon.png", videoUrl: "/perfume/video.mp4", reviews: 128,
    description: "A masterpiece of contrast where rare White Oud meets warm woods and smoky depth. Bold. Refined. Unforgettable.", tags: ["UNISEX", "LONG LASTING"]
  },
  {
    id: 2, title: "NYRA", subtitle: "EXTRAIT DE PARFUM", price50: 1799, price100: 3499, price50Str: "₹ 1,799", price100Str: "₹ 3,499",
    image: "/perfume/nyra.png", videoUrl: "/perfume/video.mp4", reviews: 94,
    description: "An intoxicating blend of delicate florals and sweet amber notes designed for the graceful and alluring personality.", tags: ["FOR HER", "ELEGANT"]
  },
  {
    id: 3, title: "OBSIDIAN", subtitle: "EXTRAIT DE PARFUM", price50: 2999, price100: 5499, price50Str: "₹ 2,999", price100Str: "₹ 5,499",
    image: "/perfume/obsidian.png", videoUrl: "/perfume/video.mp4", reviews: 112,
    description: "Deep, mysterious and commanding. Obsidian wraps you in rich dark musk, leather, and spicy undertones.", tags: ["FOR HIM", "INTENSE"]
  },
  {
    id: 4, title: "SOLVERIN", subtitle: "EXTRAIT DE PARFUM", price50: 2199, price100: 3999, price50Str: "₹ 2,199", price100Str: "₹ 3,999",
    image: "/perfume/solverin.png", videoUrl: "/perfume/video.mp4", reviews: 85,
    description: "A commanding fragrance built on rich spiced leather and earthy notes, crafted for those who take charge.", tags: ["FOR HIM", "BOLD"]
  }
];

export default function WatchAndBuy() {
  const [selectedItem, setSelectedItem] = useState<PerfumeItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'50ML' | '100ML'>('50ML');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedItem]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    const price = selectedSize === '50ML' ? selectedItem.price50 : selectedItem.price100;
    addToCart({
      id: selectedItem.id,
      name: selectedItem.title,
      subtitle: `${selectedItem.subtitle} (${selectedSize})`,
      price: price,
      image: selectedItem.image
    });
  };

  const handleProceedCheckout = () => {
    handleAddToCart();
    handleClose();
    router.push('/checkout');
  };

  return (
    <section className="bg-[#050505] text-white py-32 px-4 relative border-t border-gray-900">
      
      {/* Premium Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
        <span className="text-[#d4af37] text-[10px] tracking-[0.3em] mb-4">IMMERSIVE EXPERIENCE</span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-[0.15em] text-white">WATCH & <span className="text-gray-500 italic">BUY</span></h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-8"></div>
      </div>

      {/* Cinematic Horizontal Scroll */}
      <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-12 pt-4 px-4 md:px-12 snap-x snap-mandatory">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="snap-center min-w-[300px] md:min-w-[400px] h-[500px] relative rounded-none overflow-hidden cursor-pointer group bg-black flex-shrink-0 border border-gray-800 hover:border-[#d4af37]/50 transition-all duration-500"
          >
            <Image 
              src={item.image} 
              alt={item.title} 
              fill 
              className="object-cover p-4 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:bg-[#d4af37] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#d4af37] group-hover:text-black ml-1 transition-colors">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-lg md:text-xl tracking-[0.1em] text-white mb-2">{item.title}</h3>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] text-[#d4af37] tracking-[0.2em] uppercase">{item.subtitle}</p>
                  <span className="text-gray-500 text-xs">—</span>
                  <p className="text-[10px] text-gray-400 tracking-[0.2em]">WATCH FILM</p>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ultra-Premium Modal - Added pt-24 so it sits below Navbar */}
      {selectedItem && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 pt-24 md:pt-28 transition-opacity duration-300">
          <div className="bg-[#0a0a0a] w-full max-w-6xl max-h-[85vh] rounded-sm overflow-hidden flex flex-col lg:flex-row relative shadow-2xl border border-gray-800">
            
            {/* Close Button - Placed securely with high z-index */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 z-50 text-gray-300 hover:text-white transition-colors w-10 h-10 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-full border border-gray-700 hover:border-[#d4af37] cursor-pointer shadow-xl"
            >
              ✕
            </button>

            {/* Video Area (Left Side) */}
            <div className="w-full lg:w-[55%] relative h-[35vh] lg:h-auto bg-black flex items-center justify-center overflow-hidden">
                <video 
                  ref={videoRef}
                  src={selectedItem.videoUrl} 
                  autoPlay 
                  loop 
                  muted={false} 
                  playsInline
                  className="w-full h-full object-contain pointer-events-none"
                />
            </div>

            {/* Content & Buy Area (Right Side) */}
            <div className="w-full lg:w-[45%] bg-[#0d0d0d] flex flex-col h-[50vh] lg:h-auto">
              
              {/* Scrollable Details Section */}
              <div className="p-6 md:p-10 pt-8 overflow-y-auto flex-1 space-y-6">
                <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">{selectedItem.subtitle}</span>
                    <h2 className="font-serif text-2xl md:text-3xl tracking-wider text-white mt-1 uppercase">{selectedItem.title}</h2>
                </div>
                
                <div className="flex items-center gap-3 border-y border-gray-900 py-3">
                    <div className="flex text-[#d4af37] text-xs">★★★★★</div>
                    <span className="text-gray-500 text-xs tracking-wider">{selectedItem.reviews} Reviews</span>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed font-light">{selectedItem.description}</p>

                <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                        <span key={tag} className="border border-gray-800 bg-black text-gray-300 text-[9px] px-3 py-1.5 uppercase tracking-[0.1em]">{tag}</span>
                    ))}
                </div>

                {/* Size Selector */}
                <div>
                  <p className="text-[10px] text-gray-500 tracking-[0.2em] mb-3">SELECT BOTTLE SIZE</p>
                  <div className="grid grid-cols-2 gap-3">
                      <button 
                          onClick={() => setSelectedSize('50ML')}
                          className={`p-3.5 border transition-all duration-300 cursor-pointer text-left ${selectedSize === '50ML' ? 'border-[#d4af37] bg-[#d4af37]/5 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                      >
                          <span className="block text-xs tracking-widest mb-1">50 ML</span>
                          <span className="block text-[#d4af37] text-xs">{selectedItem.price50Str}</span>
                      </button>
                      <button 
                          onClick={() => setSelectedSize('100ML')}
                          className={`p-3.5 border transition-all duration-300 cursor-pointer text-left ${selectedSize === '100ML' ? 'border-[#d4af37] bg-[#d4af37]/5 text-white' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                      >
                          <span className="block text-xs tracking-widest mb-1">100 ML</span>
                          <span className="block text-[#d4af37] text-xs">{selectedItem.price100Str}</span>
                      </button>
                  </div>
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="p-6 md:p-8 bg-black border-t border-gray-900 space-y-3 flex-shrink-0">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#d4af37] text-black font-semibold text-xs tracking-[0.2em] py-4 transition-all duration-300 cursor-pointer uppercase shadow-lg hover:bg-white flex items-center justify-center gap-2 rounded-sm"
                >
                  <span>ADD TO CART — {selectedSize === '50ML' ? selectedItem.price50Str : selectedItem.price100Str}</span>
                </button>

                <button 
                  onClick={handleProceedCheckout}
                  className="w-full border border-gray-800 bg-[#080808] hover:border-[#d4af37] text-gray-300 hover:text-[#d4af37] font-semibold text-xs tracking-[0.2em] py-3.5 transition-all duration-300 cursor-pointer uppercase rounded-sm flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                </button>

                <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-widest pt-1">
                    <span className="flex items-center gap-1.5"><span className="text-[#d4af37]">✓</span> Free Shipping</span>
                    <span className="flex items-center gap-1.5"><span className="text-[#d4af37]">✓</span> Secure Pay</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
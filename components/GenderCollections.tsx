import Image from "next/image";
import Link from "next/link";

export default function GenderCollections() {
  return (
    <section className="bg-black py-20 px-6 border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto relative h-[450px] rounded-sm overflow-hidden flex flex-col md:flex-row border border-gray-800 shadow-2xl bg-black">
        
        {/* For Him Side */}
        <div className="w-full md:w-1/2 relative h-full flex items-center group overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <Image 
            src="/men.png?v=3" 
            alt="For Him" 
            fill 
            unoptimized={true}
            className="object-contain object-right p-4 transition-transform duration-700 opacity-90" 
          />
          
          <div className="relative z-20 p-8 md:p-12 lg:pl-16 flex flex-col items-start text-left">
            <span className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase mb-2">CURATED FOR MEN</span>
            <h3 className="text-white font-serif text-3xl md:text-4xl tracking-[0.15em] mb-3 uppercase">FOR HIM</h3>
            <p className="text-gray-300 text-xs tracking-wider mb-8 font-light max-w-xs">Bold. Strong. Unforgettable.</p>
            <Link href="/collection?category=him">
              <button className="border border-[#d4af37]/60 bg-black/40 backdrop-blur-sm text-[#d4af37] text-[10px] tracking-[0.3em] px-8 py-3.5 uppercase font-semibold rounded-sm hover:bg-[#d4af37] hover:text-black transition-all duration-300 cursor-pointer shadow-lg">
                DISCOVER COLLECTION
              </button>
            </Link>
          </div>
        </div>

        {/* For Her Side */}
        <div className="w-full md:w-1/2 relative h-full flex items-center justify-end group overflow-hidden bg-black border-t md:border-t-0 md:border-l border-gray-800/80">
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10"></div>
          <Image 
            src="/women.png?v=3" 
            alt="For Her" 
            fill 
            unoptimized={true}
            className="object-contain object-left p-4 transition-transform duration-700 opacity-90" 
          />
          
          <div className="relative z-20 p-8 md:p-12 lg:pr-16 flex flex-col items-end text-right">
            <span className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase mb-2">CURATED FOR WOMEN</span>
            <h3 className="text-white font-serif text-3xl md:text-4xl tracking-[0.15em] mb-3 uppercase">FOR HER</h3>
            <p className="text-gray-300 text-xs tracking-wider mb-8 font-light max-w-xs">Elegant. Alluring. Timeless.</p>
            <Link href="/collection?category=her">
              <button className="border border-[#d4af37]/60 bg-black/40 backdrop-blur-sm text-[#d4af37] text-[10px] tracking-[0.3em] px-8 py-3.5 uppercase font-semibold rounded-sm hover:bg-[#d4af37] hover:text-black transition-all duration-300 cursor-pointer shadow-lg">
                DISCOVER COLLECTION
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
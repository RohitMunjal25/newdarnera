import Navbar from "@/components/Navbar";
import GenderCollections from "@/components/GenderCollections";
import WatchAndBuy from "@/components/WatchAndBuy";
import FeaturedCollection from "@/components/FeaturedCollection";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar fixed and sticky with high z-index */}
      <Navbar />
      
      {/* Hero Section: Direct clean image display */}
      <section className="relative w-full overflow-hidden bg-black">
        
        {/* Mobile Hero Image (Direct display, no text overlay) */}
        <div className="relative w-full block md:hidden aspect-[3/4]">
          <Image 
            src="/mobilehero.png?v=2" 
            alt="Darnera Mobile Hero" 
            fill 
            priority
            unoptimized={true}
            className="object-cover object-center w-full h-full"
          />
        </div>

        {/* Desktop Hero Section */}
        <div className="relative hidden md:flex w-full h-[90vh] items-center">
          <div className="absolute inset-0">
            <Image 
              src="/hero.png" 
              alt="Darnera Desktop Hero" 
              fill 
              priority
              unoptimized={true}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-12 text-left w-full">
            <span className="text-[#d4af37] text-xs tracking-[0.35em] uppercase mb-4 block">
              TIMELSS FRAGRANCE OF AUTHORITY
            </span>
            <h1 className="font-serif text-7xl tracking-[0.15em] text-white uppercase mb-6 leading-tight">
              SCENT OF <span className="text-gray-400 italic">POWER</span>
            </h1>
            <p className="text-gray-300 text-sm tracking-widest max-w-md font-light mb-10 leading-relaxed">
              Immerse yourself in rare, hand-crafted extraits de parfum designed for those who command presence.
            </p>
            <Link 
              href="/collection" 
              className="inline-block bg-[#d4af37] text-black font-semibold text-xs tracking-[0.25em] px-10 py-4 uppercase rounded-sm hover:bg-white transition-all duration-300 shadow-xl cursor-pointer"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>

      </section>

      {/* Sections stacked properly */}
      <FeaturedCollection />
      <WatchAndBuy />
      <GenderCollections />
      <Reviews />
      <InstagramGrid />
      <Footer />
    </main>
  );
}
import Navbar from "@/components/Navbar";
import GenderCollections from "@/components/GenderCollections";
import WatchAndBuy from "@/components/WatchAndBuy";
import FeaturedCollection from "@/components/FeaturedCollection";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar fixed and sticky with high z-index */}
      <Navbar />
      
      {/* Hero Section: Pure clean images for both Mobile & Desktop */}
      <section className="relative w-full overflow-hidden bg-black">
        
        {/* Mobile Hero Image (Visible on small screens) */}
        <div className="w-full block md:hidden">
          <Image 
            src="/mobilehero.png?v=5" 
            alt="Darnera Mobile Hero" 
            width={1200}
            height={1600}
            priority
            unoptimized={true}
            className="w-full h-auto object-cover block"
          />
        </div>

        {/* Desktop Hero Image (Visible on desktop/laptop screens) */}
        <div className="w-full hidden md:block">
          <Image 
            src="/hero.png?v=5" 
            alt="Darnera Desktop Hero" 
            width={1920}
            height={1080}
            priority
            unoptimized={true}
            className="w-full h-auto object-cover block"
          />
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
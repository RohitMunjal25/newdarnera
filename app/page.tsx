import Navbar from "@/components/Navbar";
import GenderCollections from "@/components/GenderCollections";
import WatchAndBuy from "@/components/WatchAndBuy";
import FeaturedCollection from "@/components/FeaturedCollection";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#342b24]">
      <Navbar />
      <Hero />
      <WatchAndBuy />
      <FeaturedCollection />
      <GenderCollections />
      <Reviews />
      <InstagramGrid />
      <Footer />
    </main>
  );
}

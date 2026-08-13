import Navbar from "@/components/Navbar";
import HomeSectionsGate from "@/components/HomeSectionsGate";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#342b24]">
      <Navbar />
      <Hero />
      <HomeSectionsGate />
      <Footer />
    </main>
  );
}

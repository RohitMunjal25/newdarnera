import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#342b24]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-10">
        <p className="text-[10px] font-bold tracking-[.3em] text-[#a47b60] uppercase">THE HOUSE OF DARNERA</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl text-[#342b24]">About DAR NERA</h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-[#736254] max-w-2xl mx-auto font-serif italic">
          &ldquo;At DAR NERA, fragrance is more than a product—it is a craft built on curiosity, patience, and a genuine appreciation for the art of perfumery.&rdquo;
        </p>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-sm md:text-base leading-7 text-[#5c4e43] space-y-12 md:px-10">
        
        <div className="space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl text-[#342b24]">Our Origin</h2>
          <p>
            Founded by <strong>Rishi Raj and Piyush</strong>, DAR NERA was born from countless hours spent exploring the world of fragrance, studying renowned creations, understanding ingredients, and appreciating the work of the master perfumers who have shaped this remarkable industry.
          </p>
          <p>
            What started as conversations between two enthusiasts soon became a shared ambition: to build a brand that reflects quality, elegance, and a deep respect for the art of scent.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl text-[#342b24]">Our Journey</h2>
          <p>
            Like many fragrance lovers, we began as passionate collectors and learners. We were fascinated by the way a fragrance could express confidence, sophistication, individuality, and character.
          </p>
          <p>
            From reading books on perfumery and studying iconic compositions to exploring raw materials and understanding the balance between creativity and craftsmanship, our journey has always been guided by a desire to learn and improve. Every step we take is driven by the same enthusiasm that first brought us into this world.
          </p>
        </div>

        {/* Philosophy Highlight Box */}
        <div className="rounded-3xl border border-[#eadfd4] bg-[#faf7f2] p-8 md:p-10 my-10">
          <h3 className="font-serif text-2xl text-[#342b24] mb-6 text-center">Our Philosophy</h3>
          <p className="mb-6 text-center text-[#736254]">
            We believe that exceptional fragrances are created through dedication, attention to detail, and an unwavering commitment to quality. At DAR NERA, we are inspired by some of the most admired fragrances ever created and strive to offer compositions that allow people to experience luxury, confidence, and elegance in their everyday lives.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-center">
            <div className="bg-white p-4 rounded-2xl border border-[#f0eade]">
              <p className="font-serif font-bold text-[#342b24]">Quality</p>
              <p className="text-xs text-[#8c7b6d] mt-1">Over shortcuts</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#f0eade]">
              <p className="font-serif font-bold text-[#342b24]">Craftsmanship</p>
              <p className="text-xs text-[#8c7b6d] mt-1">Over trends</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#f0eade]">
              <p className="font-serif font-bold text-[#342b24]">Consistency</p>
              <p className="text-xs text-[#8c7b6d] mt-1">Over compromise</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#f0eade]">
              <p className="font-serif font-bold text-[#342b24]">Passion</p>
              <p className="text-xs text-[#8c7b6d] mt-1">Over popularity</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl text-[#342b24]">Built by Passion</h2>
          <p>
            As founders, Rishi Raj and Piyush remain closely involved in every aspect of the brand—from researching fragrance materials and refining compositions to selecting packaging and creating an experience that reflects our standards.
          </p>
          <p>
            We do not claim to know everything. We see ourselves as lifelong students of perfumery, constantly learning, experimenting, and pushing ourselves to do better with every creation. Because great fragrances are not built overnight. They are built through patience, passion, and respect for the craft.
          </p>
        </div>

        <div className="space-y-4 border-t border-[#eadfd4] pt-8">
          <h2 className="font-serif text-2xl md:text-3xl text-[#342b24]">Our Promise</h2>
          <p>
            Our commitment is to deliver fragrances that people can wear with pride—fragrances that embody elegance, sophistication, and timeless appeal. As we continue to grow, our purpose remains unchanged: To pursue excellence, honor the artistry of perfumery, and share our passion for fragrance with those who appreciate it as much as we do.
          </p>
        </div>

        <div className="text-center pt-10">
          <p className="font-serif text-2xl tracking-wider text-[#342b24]">DAR NERA</p>
          <p className="text-xs font-bold tracking-[.3em] text-[#a47b60] uppercase mt-2">The Scent of Authority</p>
          <p className="text-xs text-[#8c7b6d] mt-1">Crafted with passion. Inspired by excellence.</p>
        </div>

      </section>

      <Footer />
    </main>
  );
}
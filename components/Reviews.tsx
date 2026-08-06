"use client";

const baseReviews = [
  { text: "\"Eidolon White Oud is not just a perfume, it's a statement. I get compliments every single time.\"", author: "Arjun M.", role: "Verified Connoisseur" },
  { text: "\"The scent, the packaging, the experience - everything about Darnera is premium. Highly recommended!\"", author: "Neha P.", role: "Verified Connoisseur" },
  { text: "\"Long lasting and rich fragrance. Finally found my signature scent.\"", author: "Rohan S.", role: "Verified Connoisseur" },
  { text: "\"An absolute masterpiece. The projection and depth are unlike anything else in my collection.\"", author: "Kabir V.", role: "Verified Connoisseur" },
  { text: "\"Pure luxury in a bottle. The packaging and delivery experience were top-notch.\"", author: "Simran K.", role: "Verified Connoisseur" },
  { text: "\"Obsidian is bold, dark, and incredibly sophisticated. Lasts all day on skin and clothes.\"", author: "Aditya R.", role: "Verified Connoisseur" },
  { text: "\"Nyra has this delicate floral elegance that feels expensive and rare. Absolutely love it.\"", author: "Priya D.", role: "Verified Connoisseur" },
  { text: "\"Solverin gives off pure power. Wearing it to board meetings changes the whole vibe.\"", author: "Vikram T.", role: "Verified Connoisseur" },
  { text: "\"The unboxing felt like receiving a high-end artifact. Darnera has redefined luxury fragrances.\"", author: "Ananya M.", role: "Verified Connoisseur" },
  { text: "\"Exceptional quality. The oud notes evolve beautifully over hours.\"", author: "Karan N.", role: "Verified Connoisseur" }
];

const reviews = Array.from({ length: 5 }, () => baseReviews).flat();

export default function Reviews() {
  return (
    <section className="bg-black py-32 border-t border-gray-900 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <span className="text-[#d4af37] text-[10px] tracking-[0.3em] mb-4 uppercase">CLIENT TESTIMONIALS</span>
        <h2 className="text-3xl md:text-4xl font-serif tracking-[0.15em] text-white">VOICES OF <span className="text-gray-500 italic">DISTINCTION</span></h2>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6"></div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        <div className="flex gap-6 py-4 marquee-track">
          {[...reviews, ...reviews].map((review, index) => (
            <div 
              key={index} 
              className="flex flex-col justify-between bg-[#080808] border border-gray-800/80 hover:border-[#d4af37]/60 p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 w-[350px] md:w-[420px] flex-shrink-0 group"
            >
              <div>
                <div className="flex text-[#d4af37] text-xs tracking-widest mb-4 gap-1">★★★★★</div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 font-light italic">
                  {review.text}
                </p>
              </div>
              
              <div className="border-t border-gray-900 pt-4 mt-auto">
                <h4 className="font-serif text-white tracking-wider uppercase text-xs">{review.author}</h4>
                <span className="text-[9px] text-[#d4af37] tracking-[0.2em] uppercase mt-0.5 block">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 180s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
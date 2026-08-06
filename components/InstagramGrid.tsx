import Image from "next/image";

export default function InstagramGrid() {
  const instaImages = [
    "/perfume/aeris.png", 
    "/perfume/veldrift.png",
    "/perfume/verdelune.png",
    "/perfume/nyra.png",
    "/perfume/solverin.png"
  ];

  return (
    <section className="bg-black py-20 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        
        <h2 className="text-[#d4af37] text-xl font-serif tracking-widest mb-10">OUR INSTAGRAMS</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {instaImages.map((src, index) => (
            <div key={index} className="relative aspect-square bg-white/5 overflow-hidden group cursor-pointer border border-gray-800">
              <Image 
                src={src} 
                alt={`Instagram post ${index + 1}`} 
                fill 
                className="object-contain p-4 group-hover:scale-110 group-hover:opacity-70 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <span className="text-white text-2xl">📸</span>
              </div>
            </div>
          ))}
        </div>

        <button className="border border-gray-700 text-gray-300 text-xs tracking-widest px-8 py-3 hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex items-center gap-2 mx-auto">
          <span>📸</span> FOLLOW US @DARNERA.OFFICIAL
        </button>

      </div>
    </section>
  );
}
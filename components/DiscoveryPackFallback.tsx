import Image from "next/image";
import Link from "next/link";

export default function DiscoveryPackFallback() { 
  return (
    <section id="discovery-packs" className="bg-[#fffdfa] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Side: Elegant Image Frame */}
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            <div className="group relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[#eadfd4] bg-white shadow-sm">
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(164,123,96,0.05)_0,transparent_70%)]" />
              
              <Image 
                src="/discovery.png" 
                alt="Darnera Discovery Collection" 
                fill 
                className="object-contain p-4 md:p-5 transition-transform duration-1000 group-hover:scale-105" 
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 z-10 md:bottom-8 md:left-8">
                <span className="rounded-full bg-white/95 px-5 py-2 text-[9px] font-bold uppercase tracking-[.25em] text-[#342b24] shadow-sm backdrop-blur-md border border-[#eadfd4]">
                  Curated Sets
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#a47b60]">
              EXPERIENCE DARNERA
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#342b24] md:text-5xl lg:text-6xl">
              A small set.<br /> A wider world.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#736254] md:text-base lg:mx-0">
              Discover your signature through a considered collection of miniature bottles. Each pack is thoughtfully curated to let you experience our most captivating fragrance stories before committing to a full bottle.
            </p>
            
            <div className="mt-10">
              <Link 
                href="/discovery-packs" 
                className="inline-flex items-center justify-center rounded-2xl bg-[#342b24] px-8 py-4 text-xs font-bold tracking-[.2em] text-white transition-all hover:bg-[#1a1511] hover:shadow-lg"
              >
                EXPLORE PACKS
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  ); 
}
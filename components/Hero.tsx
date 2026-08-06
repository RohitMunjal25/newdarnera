import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full bg-black flex flex-col items-center border-b border-gray-800 pb-12">
      
      {/* Wrapped the entire banner in a Link. Hovering slightly dims the image to indicate it's clickable */}
      <Link 
        href="/shop" 
        className="relative w-full max-w-[1920px] flex justify-center group cursor-pointer"
      >
        <Image 
          src="/hero.png" 
          alt="Darnera Signature Collection" 
          width={1920}
          height={1080}
          priority
          quality={100}
          className="w-full h-auto object-contain block relative z-0 group-hover:opacity-90 transition-opacity duration-500"
        />
      </Link>
      
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import { api } from "@/lib/api"; 

// Backend se aane wale product ka type
type Product = { 
  _id: string; 
  name: string; 
  brand?: string; 
  price: number; 
  images?: string[]; 
  coverImage?: string;
};

// Cover image ya first image nikalne ka function
const getImage = (p?: Product) => p?.coverImage || p?.images?.[0] || "";

export default function FeaturedCollection() { 
  const { addToCart } = useCart(); 
  const [featured, setFeatured] = useState<Product[]>([]);

  // Admin panel (backend) se featured products fetch karna
  useEffect(() => {
    api<{ products: Product[] }>("/api/products?featured=true&limit=12")
      .then((r) => setFeatured(r.products))
      .catch(() => undefined);
  }, []);

  // Agar backend se koi featured product na aaye toh section hide rakho
  if (featured.length === 0) return null;

  return (
    <section className="bg-[#faf7f2] px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex items-baseline justify-between border-b border-[#eadfd4] pb-4">
          <h2 className="font-serif text-3xl text-[#342b24]">Featured collection</h2>
          <Link href="/collection" className="text-xs tracking-wider text-[#8c684f] transition hover:text-[#5e4533]">
            Explore all →
          </Link>
        </div>

        {/* Product Container - Swipe Fixed (Flex & Snap) */}
        <div className="flex snap-x gap-4 overflow-x-auto pb-6 md:gap-6 scrollbar-hide">
          {featured.map((item) => {
            const imgSrc = getImage(item);
            
            return (
              <article 
                key={item._id} 
                // Swipe ke liye widths: Mobile pe 75%, Tablet pe 45%, PC pe 23.5%
                className="group flex min-w-[75%] snap-center flex-col overflow-hidden rounded-xl border border-[#f0eade] bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:min-w-[45%] lg:min-w-[23.5%]"
              >
                
                {/* Image Container - Click karte hi product khulega */}
                <Link href={`/product/${item._id}`} className="relative aspect-square w-full overflow-hidden bg-[#f9f8f6]">
                  {imgSrc && (
                    <Image 
                      src={imgSrc} 
                      alt={item.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  )}
                </Link>
                
                {/* Content Container */}
                <div className="flex flex-col p-4 md:p-5">
                  <h3 className="font-serif text-lg text-[#342b24]">{item.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#796b60]">₹ {item.price.toLocaleString()}</p>
                  
                  <button 
                    onClick={() => addToCart({ id: item._id, name: item.name, subtitle: item.brand || "", price: item.price, image: imgSrc })} 
                    className="mt-5 w-full rounded-lg border border-[#342b24] bg-transparent py-2.5 text-xs font-semibold tracking-widest text-[#342b24] transition-colors hover:bg-[#342b24] hover:text-white"
                  >
                    ADD TO BAG
                  </button>
                </div>
                
              </article>
            );
          })}
        </div>
        
      </div>
    </section>
  ); 
}
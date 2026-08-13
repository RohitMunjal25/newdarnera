"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

type Product = { 
  _id: string; 
  name: string; 
  brand?: string; 
  category?: string; 
  description?: string; 
  price: number; 
  stock: number; 
  images?: string[]; 
  productImages?: { url: string }[] 
};

function CollectionContent() { 
  const search = useSearchParams();
  const [filter, setFilter] = useState(search.get("category") || "unisex"); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => { 
    const category = search.get("category") || "unisex"; 
    setFilter(category); 
  }, [search]); 

  useEffect(() => { 
    setLoading(true); 
    api<{ products: Product[] }>(`/api/products?limit=100&category=${filter}`)
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false)); 
  }, [filter]); 

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 text-center md:px-10">
        <p className="text-[10px] font-bold tracking-[.3em] text-[#ad8265]">THE DARNERA LIBRARY</p>
        <h1 className="mt-3 font-serif text-4xl text-[#342b24] md:text-6xl">Find your fragrance.</h1>
      </div>
      
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 border-b border-[#eadfd4] px-5 pb-7">
        {[
          { label: "For him", value: "him" }, 
          { label: "For her", value: "her" }, 
          { label: "Unisex", value: "unisex" }
        ].map((item) => (
          <button 
            key={item.value} 
            onClick={() => setFilter(item.value)} 
            className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
              filter === item.value 
                ? "bg-[#342a22] text-white" 
                : "bg-[#f2ebe3] text-[#725f51] hover:bg-[#e8ded5]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mx-auto min-h-[45vh] max-w-7xl px-5 py-12 md:px-10">
        {loading ? (
          <p className="text-center text-sm text-[#806f63]">Loading the collection…</p>
        ) : error ? (
          <p className="text-center text-sm text-red-700">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-[#806f63]">No fragrances in this collection yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => { 
              const image = product.images?.[0] || product.productImages?.[0]?.url || "/perfume/eidolon.png"; 
              
              // FIX: Markdown symbols (**, ##, etc) ko hatane ke liye replace regex lagaya h
              const cleanDescription = (product.description || "An extraordinary Darnera fragrance.")
                .replace(/[*#_~`]/g, ""); // Ye saare ajeeb symbols uda dega
              
              return (
                <Link 
                  href={`/product/${product._id}`} 
                  key={product._id} 
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#eadfd4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f9f8f6]">
                    <img 
                      src={image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] font-bold tracking-[.18em] text-[#a47b60] uppercase">
                      {product.brand || product.category || "DARNERA"}
                    </p>
                    <h2 className="mt-2 font-serif text-xl text-[#342b24]">{product.name}</h2>
                    
                    {/* Yahan hum cleanDescription use kar rahe hain */}
                    <p className="mt-2 text-xs leading-5 text-[#806f63] line-clamp-3">
                      {cleanDescription}
                    </p>
                    
                    <div className="mt-auto pt-5 flex items-end justify-between text-sm font-medium">
                      <span className="text-[#342b24]">₹ {product.price.toLocaleString()}</span>
                      <span className={`text-xs ${product.stock > 0 ? "text-[#55704f]" : "text-[#a05f55]"}`}>
                        {product.stock > 0 ? "In stock" : "Sold out"}
                      </span>
                    </div>
                  </div>
                  
                </Link>
              ); 
            })}
          </div>
        )}
      </div>
    </>
  ); 
}

export default function CollectionPage() { 
  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-20 text-center font-serif text-xl text-[#806f63]">Loading…</div>}>
        <CollectionContent />
      </Suspense>
      <Footer />
    </main>
  ); 
}
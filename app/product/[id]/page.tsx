"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/context/CartContext";
import { api } from "@/lib/api";

type Product = { 
  _id: string; 
  name: string; 
  brand?: string; 
  category?: string; 
  description?: string; 
  price: number; 
  stock: number; 
  bottleSizeMl?: number; 
  images?: string[]; 
  coverImage?: string;
  productImages?: { url: string }[] 
};

// Image nikalne ka helper function
const getImage = (p?: Product) => p?.coverImage || p?.images?.[0] || "";

export default function ProductPage() { 
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart(); 
  
  const [product, setProduct] = useState<Product | null>(null);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [error, setError] = useState(""); 
  
  // Naya state: Image pe click krne ke baad full screen dikhane ke liye
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => { 
    // 1. Current Product Fetch Karna
    api<{ product: Product }>(`/api/products/${params.id}`)
      .then((data) => setProduct(data.product))
      .catch((err) => setError(err.message)); 

    // 2. Dynamic More Collections ke liye Featured Products Fetch Karna
    api<{ products: Product[] }>("/api/products?featured=true&limit=5")
      .then((data) => setFeatured(data.products))
      .catch(() => undefined);
  }, [params.id]); 

  if (error) return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <p className="p-20 text-center text-red-700">{error}</p>
      <Footer />
    </main>
  ); 

  if (!product) return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="flex h-[60vh] items-center justify-center">
        <p className="font-serif text-xl text-[#8c7b6d] animate-pulse">Loading fragrance…</p>
      </div>
      <Footer />
    </main>
  ); 

  // Images Filter Logic
  let allImages: string[] = [];
  if (product.coverImage) allImages.push(product.coverImage);
  if (product.images?.length) allImages = [...allImages, ...product.images];
  else if (product.productImages?.length) allImages = [...allImages, ...product.productImages.map((item) => item.url)];
  
  const displayImages = Array.from(new Set(allImages)).slice(0, 3);
  if (displayImages.length === 0) displayImages.push("/perfume/eidolon.png");

  // Niche wale section se current product ko exclude karna
  const relatedProducts = featured.filter(p => p._id !== product._id).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      
      {/* Lightbox / Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1511]/95 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Full screen preview" 
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl" 
          />
        </div>
      )}

      {/* Product Details Section */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-2 md:px-10 lg:gap-16">
        
        {/* Images Section (Clickable) */}
        <div className="flex flex-col gap-4">
          {displayImages[0] && (
            <div 
              className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#f9f8f6] group"
              onClick={() => setSelectedImage(displayImages[0])}
            >
              <img src={displayImages[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          )}
          {displayImages.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {displayImages.slice(1, 3).map((img, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-[#f9f8f6] group"
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.name} ${index + 2}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Info Section */}
        <section className="md:pt-8">
          <Link href="/collection" className="text-xs font-medium tracking-widest text-[#926b50] transition hover:text-[#5e4533]">
            ← BACK TO COLLECTION
          </Link>
          
          <p className="mt-8 text-[10px] font-bold tracking-[.3em] text-[#a47b60] uppercase">
            {product.brand || product.category || "DARNERA"}
          </p>
          
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-[#342b24]">{product.name}</h1>
          
          {product.bottleSizeMl && (
            <p className="mt-3 text-xs font-semibold tracking-widest text-[#8c7b6d]">
              {product.bottleSizeMl} ML EXTRAIT DE PARFUM
            </p>
          )}
          
          <div className="my-8 h-px bg-[#eadfd4]" />
          
          {/* Text Fix: whitespace-pre-wrap lagane se ab paragraphs proper line breaks k sath dikhenge */}
          <div className="text-sm leading-8 text-[#66584e] whitespace-pre-wrap">
            {product.description || "A carefully composed Darnera fragrance."}
          </div>
          
          <div className="my-8 h-px bg-[#eadfd4]" />
          
          <p className="font-serif text-3xl text-[#342b24]">₹ {product.price.toLocaleString()}</p>
          
          <button 
            disabled={product.stock <= 0} 
            onClick={() => addToCart({ id: product._id, name: product.name, subtitle: product.brand || product.category || "DARNERA", price: product.price, image: displayImages[0] })} 
            className="mt-8 w-full rounded-xl bg-[#342b24] py-4 text-xs font-bold tracking-[.2em] text-white transition hover:bg-[#1a1511] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock > 0 ? "ADD TO BAG" : "OUT OF STOCK"}
          </button>
          
          <p className="mt-4 text-center text-[10px] tracking-widest text-[#8c7b6d] uppercase">
            Complimentary Shipping · Secure Checkout
          </p>
        </section>
      </div>

      {/* Dynamic More Collections Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-10 border-t border-[#eadfd4] bg-[#faf7f2] px-5 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-[10px] font-bold tracking-[.3em] text-[#a47b60]">CONTINUE EXPLORING</p>
              <h2 className="mt-4 font-serif text-3xl text-[#342b24] md:text-4xl">More from the collection</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
              {relatedProducts.map((related) => {
                const img = getImage(related);
                return (
                  <article key={related._id} className="group flex flex-col overflow-hidden rounded-xl border border-[#f0eade] bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    <Link href={`/product/${related._id}`} className="relative aspect-square w-full overflow-hidden bg-[#f9f8f6]">
                      {img && <img src={img} alt={related.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                    </Link>
                    <div className="flex flex-col p-4 text-center md:p-5">
                      <h3 className="font-serif text-lg text-[#342b24]">{related.name}</h3>
                      <p className="mt-1 text-sm font-medium text-[#796b60]">₹ {related.price.toLocaleString()}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  ); 
}
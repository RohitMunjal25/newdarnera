"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/context/CartContext";
import { api } from "@/lib/api";

type Product = { _id: string; name: string; category?: string; price: number; images?: string[]; coverImage?: string; productImages?: { url: string }[] };
type Pack = { _id: string; name: string; description: string; price: number; image: string; bottleCount: number; bottleSizeMl?: number };

const getImage = (p?: Product) => p?.coverImage || p?.images?.[0] || p?.productImages?.[0]?.url || "/perfume/eidolon.png";

export default function DiscoveryPacksPage() {
  const { addToCart } = useCart();
  
  const [packs, setPacks] = useState<Pack[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal / Selection State
  const [activePack, setActivePack] = useState<Pack | null>(null);
  const [selectedPerfumes, setSelectedPerfumes] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    Promise.all([
      api<{ packs: Pack[] }>("/api/discovery-packs"),
      api<{ products: Product[] }>("/api/products?limit=100")
    ])
      .then(([packData, productData]) => {
        setPacks(packData.packs);
        setProducts(productData.products);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-[#fffdfa]"><Navbar /><p className="p-20 text-center font-serif text-xl text-[#8c7b6d]">Loading your experience…</p><Footer /></main>
  );

  if (packs.length === 0) return (
    <main className="min-h-screen bg-[#fffdfa]"><Navbar /><p className="p-20 text-center text-[#8c7b6d]">No discovery packs available right now.</p><Footer /></main>
  );

  const handleSelect = (product: Product) => {
    if (!activePack) return;
    const maxSlots = activePack.bottleCount || 4;
    if (selectedPerfumes.length < maxSlots) {
      setSelectedPerfumes([...selectedPerfumes, product]);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setSelectedPerfumes(selectedPerfumes.filter((_, idx) => idx !== indexToRemove));
  };

const handleAddToCart = () => {
    if (!activePack) return;
    const maxSlots = activePack.bottleCount || 4;
    if (selectedPerfumes.length !== maxSlots) return;
    
    const selectedNames = selectedPerfumes.map(p => p.name).join(", ");
    const finalItemName = `${activePack.name} (${selectedNames})`;
    
addToCart({
      id: activePack._id, 
      name: finalItemName, 
      price: activePack.price,
      image: activePack.image || "/perfume/solverin.png",
    } as any);
    setActivePack(null);
    setSelectedPerfumes([]);
    
    setToastMessage(`${activePack.name} added to your bag!`);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };
  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-[#fffdfa] relative">
      <Navbar />
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-10 left-1/2 z-[200] -translate-x-1/2 transform rounded-full bg-[#342b24] px-8 py-4 text-xs font-bold tracking-widest text-white shadow-2xl transition-all duration-500 ease-out ${
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {toastMessage}
      </div>

      {/* Dynamic Popup (Modal) for Building the Set */}
      {activePack && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1511]/90 p-4 backdrop-blur-md transition-opacity">
          <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-[#fffdfa] shadow-2xl">
            
            <header className="flex items-center justify-between border-b border-[#eadfd4] px-6 py-5 md:px-8">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#342b24]">Build your {activePack.name}</h3>
                <p className="mt-1.5 text-[10px] md:text-[11px] font-bold tracking-[.25em] text-[#a47b60] uppercase">
                  {activePack.bottleSizeMl || 18} ML EACH · <span className={selectedPerfumes.length === activePack.bottleCount ? "text-[#55704f]" : ""}>{selectedPerfumes.length} / {activePack.bottleCount || 4} SELECTED</span>
                </p>
              </div>
              <button 
                onClick={() => { setActivePack(null); setSelectedPerfumes([]); }} 
                className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-[#f2ebe3] text-xl text-[#342b24] transition hover:bg-[#e8ded5] hover:scale-105"
              >
                ×
              </button>
            </header>
            
            {/* Selected Slots */}
            <div className="border-b border-[#eadfd4] bg-[#faf7f2] px-6 py-5 md:px-8">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {Array.from({ length: activePack.bottleCount || 4 }).map((_, index) => {
                  const selected = selectedPerfumes[index];
                  return selected ? (
                    <div key={index} className="group relative aspect-square w-20 md:w-24 shrink-0 overflow-hidden rounded-xl border border-[#eadfd4] bg-white shadow-sm transition-transform hover:-translate-y-1">
                      <img src={getImage(selected)} alt={selected.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 pb-1.5 pt-5 text-center">
                        <p className="truncate px-1 text-[9px] font-medium tracking-wide text-white">{selected.name}</p>
                      </div>
                      <button 
                        onClick={() => handleRemove(index)}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[10px] text-[#a05f55] shadow-sm backdrop-blur transition hover:bg-[#a05f55] hover:text-white opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div key={index} className="flex aspect-square w-20 md:w-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-[#cfc0b1] bg-[#fdfcfa] transition-colors hover:border-[#a47b60] hover:bg-[#f9f8f6]">
                      <span className="text-2xl font-light text-[#cfc0b1]">+</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 border-b border-[#eadfd4] px-6 py-4 md:px-8 overflow-x-auto scrollbar-hide">
              {[{label: "All", val: "all"}, {label: "Unisex", val: "unisex"}, {label: "For Him", val: "him"}, {label: "For Her", val: "her"}].map(f => (
                <button 
                  key={f.val} 
                  onClick={() => setFilter(f.val)}
                  className={`shrink-0 flex items-center justify-center h-10 rounded-full px-6 text-[11px] font-bold tracking-widest uppercase transition-all ${filter === f.val ? "bg-[#342b24] text-white shadow-md" : "bg-[#f2ebe3] text-[#796b60] hover:bg-[#e8ded5]"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Perfume List */}
            <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredProducts.map((p) => (
                  <div 
                    key={p._id} 
                    onClick={() => handleSelect(p)}
                    className="group cursor-pointer rounded-xl border border-transparent p-2 transition-all hover:border-[#eadfd4] hover:bg-white hover:shadow-sm"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f9f8f6]">
                      <img src={getImage(p)} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 text-center font-serif text-[13px] md:text-[14px] text-[#342b24]">{p.name}</p>
                    <p className="mt-1 text-center text-[9px] font-bold tracking-[.2em] text-[#a47b60] uppercase">{p.category || "UNISEX"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="border-t border-[#eadfd4] bg-white px-6 py-5 md:px-8">
              <button 
                disabled={selectedPerfumes.length !== (activePack.bottleCount || 4)}
                onClick={handleAddToCart}
                className="w-full rounded-2xl py-3.5 text-xs font-bold tracking-[.2em] transition-all disabled:cursor-not-allowed disabled:bg-[#f2ebe3] disabled:text-[#a47b60] bg-[#342b24] text-white hover:bg-[#1a1511]"
              >
                {selectedPerfumes.length === (activePack.bottleCount || 4) 
                  ? `ADD SET TO BAG · ₹ ${activePack.price.toLocaleString()}` 
                  : `SELECT ${(activePack.bottleCount || 4) - selectedPerfumes.length} MORE SCENTS`}
              </button>
            </footer>
            
          </div>
        </div>
      )}

      {/* Main Page: Packs Grid */}
      <section className="bg-[#faf7f2] px-5 py-20 md:px-10 min-h-[75vh]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:text-left">
            <p className="text-[10px] font-bold tracking-[.3em] text-[#a47b60] uppercase">CURATED SETS</p>
            <h1 className="mt-4 font-serif text-4xl text-[#342b24] md:text-5xl">Discovery Packs</h1>
            <p className="mt-4 text-sm text-[#8c7b6d] max-w-2xl">
              Explore our collection on your own terms. Choose a pack size and build your perfect fragrance wardrobe.
            </p>
          </div>

          <div className="flex snap-x items-stretch gap-5 overflow-x-auto pb-8 md:gap-8 scrollbar-hide">
            {packs.map((pack) => {
              const cleanDescription = pack.description.replace(/[*#_~`]/g, "");
              const maxSlots = pack.bottleCount || 4;
              const mlSize = pack.bottleSizeMl || 18;

              return (
                <article 
                  key={pack._id} 
                  className="group flex h-auto min-w-[85%] snap-center flex-col overflow-hidden rounded-[2rem] border border-[#eadfd4] bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:min-w-[45%] lg:min-w-[31%]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#f9f8f6]">
                    <img 
                      src={pack.image || "/perfume/solverin.png"} 
                      alt={pack.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col p-8">
                    <div>
                      <p className="text-[10px] font-bold tracking-[.25em] text-[#a47b60] uppercase">
                        SET OF {maxSlots} · {mlSize} ML EACH
                      </p>
                      <h3 className="mt-3 min-h-[32px] font-serif text-3xl text-[#342b24]">{pack.name}</h3>
                      <p className="mt-4 min-h-[72px] text-sm leading-6 text-[#66584e] line-clamp-3">
                        {cleanDescription}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-8">
                      <p className="font-serif text-2xl text-[#342b24] mb-5">₹ {pack.price.toLocaleString()}</p>
                      <button 
                        onClick={() => { setActivePack(pack); setSelectedPerfumes([]); }}
                        className="w-full rounded-2xl border border-[#342b24] bg-transparent py-4 text-xs font-bold tracking-widest text-[#342b24] transition-colors hover:bg-[#342b24] hover:text-white"
                      >
                        BUILD YOUR SET
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
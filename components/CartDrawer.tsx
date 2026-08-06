"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-over Drawer from Right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#050505] border-l border-gray-900 text-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37]">✦</span>
              <h2 className="font-serif tracking-[0.2em] text-sm uppercase">YOUR SHOPPING BAG</h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-[#d4af37] p-2 transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-900/80 items-center">
                  <div className="relative w-20 h-24 bg-black border border-gray-800 rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover p-2" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif tracking-wider text-sm">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-400 text-xs transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[#d4af37] text-[9px] tracking-[0.2em] uppercase mt-0.5">{item.subtitle}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-gray-800 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-serif text-sm text-[#d4af37]">₹ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4">
                <div className="w-16 h-16 rounded-full bg-gray-900/50 border border-gray-800 flex items-center justify-center text-[#d4af37] mb-6">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                </div>
                <h3 className="font-serif text-lg tracking-wider mb-2">NOTHING ADDED</h3>
                <p className="text-gray-500 text-xs tracking-wider mb-8 max-w-xs">Your shopping bag is currently empty. Explore our luxury collection to find your signature scent.</p>
                <Link 
                  href="/collection" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] px-8 py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase"
                >
                  SHOP NOW
                </Link>
              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-900 bg-black/60 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-xs tracking-widest uppercase">Subtotal</span>
                <span className="font-serif text-lg text-white">₹ {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-500 tracking-wider mb-6">Shipping & taxes calculated at checkout.</p>
              
              <div className="space-y-3">
                <Link 
                  href="/checkout" 
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full border border-gray-800 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] text-xs tracking-[0.2em] py-3.5 transition-colors duration-300 rounded-sm uppercase"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
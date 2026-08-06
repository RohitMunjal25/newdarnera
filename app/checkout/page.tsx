"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  
  // Auth state for checkout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Shipping details state
  const [formData, setFormData] = useState({
    fullName: "Rohit Munjal",
    phone: "9876543210",
    address: "Flat No. 402, Royal Palms Luxury Towers",
    city: "Jaipur",
    pincode: "302001"
  });

  // Order Success Screen State
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (email === "sample@gmail.com" && password === "sample") {
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid credentials! Use sample@gmail.com / sample");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "DRN-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative">
      <Navbar />

      {/* Order Success Full-Screen Overlay */}
      {orderPlaced && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
          <div className="max-w-xl w-full bg-[#080808] border border-[#d4af37]/40 p-8 md:p-12 text-center rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
            <div className="text-[#d4af37] text-2xl mb-3">✦ ✦ ✦</div>
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase mb-2 text-white">
              ORDER PLACED SUCCESSFULLY
            </h2>
            <p className="text-xs text-[#d4af37] tracking-[0.2em] font-mono mb-8">
              ORDER ID: {orderId}
            </p>

            <div className="bg-black/60 border border-gray-900 p-6 rounded-sm text-left mb-8 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-900 pb-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Payment Method</span>
                <span className="text-xs font-semibold text-[#d4af37]">Cash on Delivery (COD)</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Shipping Address</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {formData.fullName} ({formData.phone})<br />
                  {formData.address}, {formData.city} - {formData.pincode}
                </p>
              </div>
              <div className="border-t border-gray-900 pt-3 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Amount</span>
                <span className="font-serif text-lg text-[#d4af37]">₹ {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <Link 
              href="/collection" 
              className="inline-block w-full bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase shadow-lg"
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-16">
        
        <div className="mb-12 border-b border-gray-900 pb-6">
          <div className="flex items-center gap-2 text-[#d4af37] text-xs tracking-widest uppercase mb-2">
            <span>✦</span>
            <span>SECURE CHECKOUT</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.15em] uppercase">COMPLETE YOUR ACQUISITION</h1>
        </div>

        {!isLoggedIn ? (
          /* Authentication Required Card */
          <div className="max-w-md mx-auto bg-[#060606] border border-gray-900 p-8 rounded-sm shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-[#d4af37] text-xl">✦</span>
              <h3 className="font-serif text-lg tracking-widest uppercase mt-2">MEMBER AUTHENTICATION</h3>
              <p className="text-xs text-gray-500 mt-1">Please sign in to proceed with your luxury checkout.</p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-900/50 text-red-400 text-xs tracking-wider text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sample@gmail.com"
                  className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="sample"
                  className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <p className="text-[10px] text-gray-500 tracking-wider">
                Hint: Use <span className="text-[#d4af37]">sample@gmail.com</span> / <span className="text-[#d4af37]">sample</span>
              </p>

              <button 
                type="submit"
                className="w-full bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase mt-4"
              >
                PROCEED TO CHECKOUT
              </button>
            </form>
          </div>
        ) : (
          /* Checkout Form & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Cols: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Shipping Address Section */}
              <div className="bg-[#060606] border border-gray-900 p-8 rounded-sm">
                <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-6 flex items-center gap-2">
                  <span>✦</span> 1. SHIPPING ADDRESS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Street Address</label>
                    <input 
                      type="text" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">City</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">Pincode</label>
                    <input 
                      type="text" 
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-sm px-4 py-3 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Option Section */}
              <div className="bg-[#060606] border border-gray-900 p-8 rounded-sm">
                <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-6 flex items-center gap-2">
                  <span>✦</span> 2. PAYMENT METHOD
                </h3>

                <div className="border border-[#d4af37]/50 bg-[#d4af37]/5 p-4 rounded-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-[#d4af37] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-gray-400">Pay securely with cash upon delivery at your doorstep.</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#d4af37] font-mono">PREFERRED</span>
                </div>
              </div>

            </div>

            {/* Right Col: Order Summary */}
            <div className="bg-[#060606] border border-gray-900 p-8 rounded-sm h-fit">
              <h3 className="font-serif text-sm tracking-widest text-[#d4af37] uppercase mb-6 border-b border-gray-900 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 bg-black border border-gray-800 rounded-sm overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                        </div>
                        <div>
                          <p className="font-serif">{item.name}</p>
                          <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-serif">₹ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 text-center py-4">Your bag is empty.</p>
                )}
              </div>

              <div className="border-t border-gray-900 pt-4 space-y-2 mb-8 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#d4af37]">FREE</span>
                </div>
                <div className="flex justify-between text-white font-serif text-base pt-2 border-t border-gray-900">
                  <span>Total Payable</span>
                  <span className="text-[#d4af37]">₹ {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full bg-[#d4af37] text-black font-bold text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors duration-300 rounded-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                PLACE ORDER (COD)
              </button>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
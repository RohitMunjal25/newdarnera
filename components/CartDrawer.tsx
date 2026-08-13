"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/context/AuthContext";
import { useCart } from "@/components/context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();
  const { isLoggedIn, openAuth } = useAuth();
  if (!isOpen) return null;

  const requestCheckout = () => {
    setIsOpen(false);
    if (!isLoggedIn) openAuth("login", "/checkout");
  };

  return <div className="fixed inset-0 z-[90] bg-[#342a22]/30 backdrop-blur-sm"><div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[#fffdfa] shadow-2xl">
    <header className="flex items-center justify-between border-b border-[#eadfd4] p-6"><div><p className="text-[10px] font-bold tracking-[.22em] text-[#a47b60]">YOUR DARNERA</p><h2 className="mt-1 font-serif text-2xl">Shopping bag</h2></div><button onClick={() => setIsOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#f1e8df] text-xl">×</button></header>
    <div className="flex-1 overflow-y-auto p-6">{cart.length === 0 ? <div className="grid h-full place-items-center text-center"><div><p className="font-serif text-2xl">Your bag is waiting.</p><Link href="/collection" onClick={() => setIsOpen(false)} className="mt-6 inline-block rounded-xl bg-[#342a22] px-5 py-3 text-xs text-white">EXPLORE COLLECTION</Link></div></div> : <div className="space-y-5">{cart.map((item) => <article key={item.id} className="flex gap-4 border-b border-[#eee5dc] pb-5"><div className="relative h-24 w-20 shrink-0 rounded-xl bg-[#f2ebe3]">{item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-2" />}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h3 className="font-serif text-lg">{item.name}</h3><p className="mt-1 text-[10px] tracking-[.12em] text-[#9d7659]">{item.subtitle}</p></div><button onClick={() => removeItem(item.id)} className="text-sm text-[#9d7659]">Remove</button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-[#dfd4c9] text-sm"><button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1.5">−</button><span className="min-w-8 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1.5">+</button></div><span className="font-serif">₹ {(item.price * item.quantity).toLocaleString()}</span></div></div></article>)}</div>}</div>
    {cart.length > 0 && <footer className="border-t border-[#eadfd4] bg-[#faf7f2] p-6"><div className="flex justify-between font-serif text-xl"><span>Total</span><span>₹ {subtotal.toLocaleString()}</span></div><p className="mt-2 text-xs text-[#806f63]">Shipping will be confirmed at checkout.</p>{isLoggedIn ? <Link href="/checkout" onClick={() => setIsOpen(false)} className="mt-5 block rounded-xl bg-[#342a22] py-4 text-center text-xs font-semibold tracking-[.14em] text-white">CHECKOUT SECURELY</Link> : <button onClick={requestCheckout} className="mt-5 w-full rounded-xl bg-[#342a22] py-4 text-xs font-semibold tracking-[.14em] text-white">SIGN IN TO CHECKOUT</button>}</footer>}
  </div></div>;
}

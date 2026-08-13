"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/context/AuthContext";
import { useCart } from "@/components/context/CartContext";
import { api, token } from "@/lib/api";

type Address = { fullName: string; phone: string; address: string; city: string; state: string; pincode: string };
type Profile = { name: string; addresses: Address[] };

export default function CheckoutPage() { 
  const { isLoggedIn, openAuth } = useAuth(), { cart, subtotal, clearCart } = useCart(); 
  const [form, setForm] = useState<Address>({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [useSavedAddress, setUseSavedAddress] = useState(true);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [error, setError] = useState(""), [orderId, setOrderId] = useState(""), [placing, setPlacing] = useState(false); 

  // Backend se saved addresses fetch karna aur default pehli address ko pre-fill karna
  useEffect(() => { 
    if (!isLoggedIn) return; 
    api<{ user: Profile }>("/api/auth/profile", { token: token() })
      .then(({ user }) => { 
        if (user.addresses && user.addresses.length > 0) {
          setSavedAddresses(user.addresses);
          // Default pehli saved address ko automatically form me set kar do
          setForm(user.addresses[0]); 
        } else {
          setForm({ fullName: user.name, phone: "", address: "", city: "", state: "", pincode: "" });
        }
      })
      .catch(() => undefined); 
  }, [isLoggedIn]); 

  // Coupon Apply Handler
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await api<{ discountValue?: number; discount?: number }>(`/api/coupons/apply`, {
        method: "POST",
        body: JSON.stringify({ code: couponCode, totalAmount: subtotal })
      });
      const val = res.discountValue || res.discount || 100;
      setDiscount(val);
      setCouponMessage("Coupon applied successfully!");
      setError("");
    } catch (err) {
      setCouponMessage("");
      setError(err instanceof Error ? err.message : "Invalid or expired coupon code.");
    }
  };

  const finalPayable = Math.max(0, subtotal - discount);

  async function placeOrder(event: FormEvent) { 
    event.preventDefault(); 
    if (!isLoggedIn) return openAuth("login"); 
    if (!cart.length) return setError("Your bag is empty."); 
    setPlacing(true); 
    setError(""); 
    try { 
      const data = await api<{ order: { _id: string } }>("/api/orders", { 
        method: "POST", 
        token: token(), 
        body: JSON.stringify({ 
          products: cart.map((item) => ({ name: item.name, image: item.image, price: item.price, quantity: item.quantity, subtitle: item.subtitle })), 
          totalAmount: subtotal, 
          finalAmount: finalPayable, 
          shippingAddress: form, 
          paymentStatus: "pending", 
          orderStatus: "pending" 
        }) 
      }); 
      setOrderId(data.order._id); 
      clearCart(); 
    } catch (err) { 
      setError(err instanceof Error ? err.message : "Order could not be placed."); 
    } finally { 
      setPlacing(false); 
    } 
  } 

  if (orderId) return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 text-center">
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-10 shadow-sm">
          <p className="text-[10px] font-bold tracking-[.25em] text-[#a47b60]">ORDER CONFIRMED</p>
          <h1 className="mt-4 font-serif text-4xl text-[#342b24]">Your fragrance is on its way.</h1>
          <p className="mt-4 text-sm leading-6 text-[#806f63]">Order #{orderId.slice(-8).toUpperCase()} has been created. We’ll send shipment updates to your registered email.</p>
          <Link href="/account/orders" className="mt-8 inline-block rounded-xl bg-[#342a22] px-6 py-3 text-xs font-semibold tracking-[.14em] text-white transition hover:bg-[#1a1511]">
            VIEW MY ORDERS
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  ); 

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-10">
        
        <p className="text-[10px] font-bold tracking-[.28em] text-[#a47b60]">SECURE CHECKOUT</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl text-[#342b24]">One step closer.</h1>

        {!isLoggedIn ? (
          <section className="mt-8 max-w-xl rounded-3xl border border-[#eadfd4] bg-[#f1e8df] p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[#342b24]">Sign in to continue</h2>
            <p className="mt-3 text-sm leading-6 text-[#806f63]">Use your official Darnera account. The same email and password or email OTP you created at login will work here.</p>
            <button onClick={() => openAuth("login")} className="mt-6 rounded-xl bg-[#342a22] px-6 py-3 text-xs font-semibold tracking-[.14em] text-white transition hover:bg-[#1a1511]">
              SIGN IN SECURELY
            </button>
          </section>
        ) : (
          <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            
            {/* Left Column: Delivery Form */}
            <section className="rounded-3xl border border-[#eadfd4] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold tracking-[.22em] text-[#a47b60]">DELIVERY DETAILS</p>
                {savedAddresses.length > 0 && (
                  <span className="text-xs text-[#55704f] font-medium">✓ Default saved address loaded</span>
                )}
              </div>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(["fullName", "phone", "city", "state", "pincode"] as const).map((key) => (
                  <label key={key} className="text-xs font-medium capitalize text-[#796b60]">
                    {key.replace("fullName", "full name")}
                    <input 
                      required 
                      value={form[key]} 
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })} 
                      className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                    />
                  </label>
                ))}
                
                <label className="text-xs font-medium text-[#796b60] sm:col-span-2">
                  Street address
                  <input 
                    required 
                    value={form.address} 
                    onChange={(e) => setForm({ ...form, address: e.target.value })} 
                    className="mt-2 w-full rounded-xl border border-[#dfd4c9] bg-[#fffdfa] p-3 text-sm text-[#342b24] outline-none focus:border-[#a47b60]" 
                  />
                </label>
              </div>

              <div className="mt-8 rounded-2xl border border-[#d8e2d4] bg-[#edf0e9] p-5">
                <p className="text-xs font-semibold tracking-[.12em] text-[#40503e]">CASH ON DELIVERY</p>
                <p className="mt-2 text-sm text-[#627160]">Pay securely when your Darnera luxury package arrives at your doorstep.</p>
              </div>
            </section>

            {/* Right Column: Order Summary & Bag */}
            <aside className="h-fit rounded-3xl bg-[#314137] p-8 text-[#fffaf3] shadow-lg">
              <p className="text-[10px] font-bold tracking-[.22em] text-[#e3bd91]">YOUR BAG SUMMARY</p>
              
              <div className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-1" />}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-serif text-base">{item.name}</p>
                      <p className="mt-0.5 text-xs text-[#d4ddd0]">{item.subtitle} · Qty {item.quantity}</p>
                      <p className="mt-2 font-medium">₹ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="mt-6 border-t border-white/15 pt-5">
                <p className="text-xs font-medium tracking-wider text-[#e3bd91]">HAVE A COUPON CODE?</p>
                <div className="mt-2 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-xl border border-white/20 bg-black/20 px-3 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#e3bd91]"
                  />
                  <button 
                    type="button" 
                    onClick={applyCoupon}
                    className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold tracking-wider text-[#fffaf3] transition hover:bg-white/20"
                  >
                    APPLY
                  </button>
                </div>
                {couponMessage && <p className="mt-2 text-xs text-[#a9dfbf]">{couponMessage}</p>}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
                <div className="flex justify-between text-[#d4ddd0]">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#a9dfbf]">
                    <span>Discount</span>
                    <span>- ₹ {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 font-serif text-xl text-white">
                  <span>Total Payable</span>
                  <span>₹ {finalPayable.toLocaleString()}</span>
                </div>
              </div>

              {error && <p className="mt-4 rounded-xl bg-red-500/20 p-3 text-xs text-red-100">{error}</p>}

              <button 
                disabled={placing || !cart.length} 
                className="mt-8 w-full rounded-xl bg-[#f3d0aa] py-4 text-xs font-bold tracking-[.18em] text-[#342a22] transition hover:bg-[#ebd0b1] disabled:opacity-50"
              >
                {placing ? "PLACING ORDER..." : `PLACE ORDER · ₹ ${finalPayable.toLocaleString()}`}
              </button>
            </aside>

          </form>
        )}

      </div>
      <Footer />
    </main>
  ); 
}